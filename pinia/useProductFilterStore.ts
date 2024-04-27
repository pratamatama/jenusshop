import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useProductFilterStore = defineStore('product_filter', () => {
  const route = useRoute()
  const router = useRouter()
  let selectVal = ref<string>('')
  const products = ref<any[]>([])

  const loadProducts = async () => {
    try {
      const data = await $fetch('/api/products')
      products.value = data
    } catch (error) {
      console.log('failed to fetch products', error)
    }
  }

  const handleSelectFilter = (e: { value: string; text: string }) => {
    console.log('handle selec', e)
    selectVal.value = e.value
  }

  const maxProductPrice = products.value.reduce((max, product) => {
    return product.price > max ? product.price : max
  }, 0)

  let priceValues = ref([0, maxProductPrice])

  const handlePriceChange = (value: number[]) => {
    priceValues.value = value
  }

  const handleResetFilter = () => {
    priceValues.value = [0, maxProductPrice]
  }

  // filteredProducts
  const filteredProducts = computed(() => {
    if (route.query.minPrice && route.query.maxPrice) {
      return products.value.filter(
        (p) =>
          p.price >= Number(route.query.minPrice) &&
          p.price <= Number(route.query.maxPrice),
      )
    } else if (route.query.status) {
      if (route.query.status === 'on-sale') {
        return products.value.filter((p) => p.discount > 0)
      } else if (route.query.status === 'in-stock') {
        return products.value.filter((p) => p.status === 'in-stock')
      }
    } else if (route.query.category) {
      return products.value.filter(
        (p) =>
          p.categories.name
            .toLowerCase()
            .replace('&', '')
            .split(' ')
            .join('-') === route.query.category,
      )
    } else if (route.query.subCategory) {
      return products.value.filter(
        (p) =>
          p.subcategories.name
            .toLowerCase()
            .replace('&', '')
            .split(' ')
            .join('-') === route.query.subCategory,
      )
    } else if (route.query.brand) {
      return products.value.filter(
        (p) =>
          p.brand_officials?.name
            .toLowerCase()
            .replace('&', '')
            .split(' ')
            .join('-') === route.query.brand,
      )
    } else if (selectVal.value) {
      if (selectVal.value === 'default-sorting') {
        return products.value
      } else if (selectVal.value === 'low-to-hight') {
        return products.value
          .slice()
          .sort((a, b) => Number(a.price) - Number(b.price))
      } else if (selectVal.value === 'high-to-low') {
        return products.value
          .slice()
          .sort((a, b) => Number(b.price) - Number(a.price))
      } else if (selectVal.value === 'new-added') {
        return products.value.slice(-8)
      } else if (selectVal.value === 'on-sale') {
        return products.value.filter((p) => p.discount > 0)
      } else {
        return products.value
      }
    } else {
      return products.value
    }
  })

  // filteredProducts
  const searchFilteredItems = computed(() => {
    let filteredProducts = [...products.value]

    if (route.query.searchText && !route.query.productType) {
      filteredProducts = filteredProducts.filter((prd) =>
        prd.name.toLowerCase().includes(route.query.searchText.toLowerCase()),
      )
    }
    if (!route.query.searchText && route.query.productType) {
      filteredProducts = filteredProducts.filter(
        (prd) =>
          prd.productType.toLowerCase() ===
          route.query.productType.toLowerCase(),
      )
    }
    if (route.query.searchText && route.query.productType) {
      filteredProducts = filteredProducts
        .filter(
          (prd) =>
            prd.productType.toLowerCase() ===
            route.query.productType.toLowerCase(),
        )
        .filter((p) =>
          p.title.toLowerCase().includes(route.query.searchText.toLowerCase()),
        )
    }
    switch (selectVal.value) {
      case 'default-sorting':
        break
      case 'low-to-high':
        filteredProducts = filteredProducts
          .slice()
          .sort((a, b) => Number(a.price) - Number(b.price))
        break
      case 'high-to-low':
        filteredProducts = filteredProducts
          .slice()
          .sort((a, b) => Number(b.price) - Number(a.price))
        break
      case 'new-added':
        filteredProducts = filteredProducts.slice(-6)
        break
      case 'on-sale':
        filteredProducts = filteredProducts.filter((p) => p.discount > 0)
        break
      default:
    }
    return filteredProducts
  })

  watch(
    () => route.query || route.path,
    () => {},
  )
  return {
    loadProducts,
    maxProductPrice,
    priceValues,
    handleSelectFilter,
    filteredProducts,
    handlePriceChange,
    handleResetFilter,
    selectVal,
    searchFilteredItems,
  }
})
