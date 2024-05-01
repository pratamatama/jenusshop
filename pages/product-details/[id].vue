<template>
  <div v-if="!pending && product">
    <!-- breadcrumb start -->
    <product-details-breadcrumb :product="product" />
    <!-- breadcrumb end -->

    <!-- product details area start -->
    <product-details-area :product="product" />
    <!-- product details area end -->

    <!-- related products start -->
    <product-related :product="product" />
    <!-- related products end -->
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '@/pinia/useProductStore'
const route = useRoute()

const productStore = useProductStore()

const id = computed(() => route.params.id)
const { data: product, pending } = await useFetch<any>(
  `/api/products/${id.value}`,
  { watch: [id] },
)

const { data: products, pending: productsPending } = await useFetch<any>(
  `/api/products`,
)

useSeoMeta({ title: 'Product Details Page' })
onMounted(() => {
  product.value = products.value.find((b: any) => b.id == route.params.id)
  if (product.value?.image) {
    productStore.activeImg = product.value.image
  }
})
</script>
