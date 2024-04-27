import product_data from '@/data/product-data'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductStore = defineStore('product', () => {
  const products = ref<any[]>([])
  const loadProducts = async () => {
    try {
      const data = await $fetch('/api/products')
      products.value = data
    } catch (error) {
      console.log('error when loading products', error)
    }
  }

  let activeImg = computed({
    get: () => products.value[0]?.image,
    set: (value) => {
      if (value) {
        products.value[0].image = value
      }
    },
  })

  let openFilterDropdown = ref<boolean>(false)
  let openFilterOffcanvas = ref<boolean>(false)

  // handle image active
  const handleImageActive = (img: string) => {
    activeImg.value = img
  }

  // handle image active
  const handleOpenFilterDropdown = () => {
    openFilterDropdown.value = !openFilterDropdown.value
  }

  // handle image active
  const handleOpenFilterOffcanvas = () => {
    openFilterOffcanvas.value = !openFilterOffcanvas.value
  }

  return {
    loadProducts,
    activeImg,
    handleImageActive,
    handleOpenFilterDropdown,
    openFilterDropdown,
    openFilterOffcanvas,
    handleOpenFilterOffcanvas,
  }
})
