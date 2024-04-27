<template>
  <div v-if="!pending" class="tp-shop-widget-content">
    <div
      class="tp-shop-widget-brand-list d-flex align-items-center justify-content-between flex-wrap"
    >
      <div
        v-for="item in data"
        :key="item.id"
        class="tp-shop-widget-brand-item"
      >
        <a
          @click.prevent="handleBrandRoute(item.name)"
          v-if="item.logo"
          class="cursor-pointer"
        >
          <img :src="item.logo" alt="logo" />
        </a>
        <a
          @click.prevent="handleBrandRoute(item.name)"
          v-else
          class="cursor-pointer"
        >
          {{ item.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  filter_dropdown?: boolean
  filter_offcanvas?: boolean
  load_more?: boolean
  right_side?: boolean
  shop_full?: boolean
  shop_1600?: boolean
}>()
const router = useRouter()

const { data, pending } = await useFetch('/api/brand-officials')

// handle Brand route
const handleBrandRoute = (value: string) => {
  const newBrand = value.toLowerCase().replace('&', '').split(' ').join('-')
  if (props.filter_dropdown) {
    router.push(`/shop-filter-dropdown?brand=${newBrand}`)
  } else if (props.filter_offcanvas) {
    router.push(`/shop-filter-offcanvas?brand=${newBrand}`)
  } else if (props.load_more) {
    router.push(`/shop-load-more?brand=${newBrand}`)
  } else if (props.right_side) {
    router.push(`/shop-right-sidebar?brand=${newBrand}`)
  } else if (props.shop_full) {
    router.push(`/shop-full-width?brand=${newBrand}`)
  } else if (props.shop_1600) {
    router.push(`/shop-1600?brand=${newBrand}`)
  } else {
    router.push(`/shop?brand=${newBrand}`)
  }
}
</script>

<style scoped>
.cursor-pointer img {
  width: 50px;
}
</style>
