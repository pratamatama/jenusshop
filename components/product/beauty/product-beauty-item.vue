<template>
  <div
    :class="`tp-product-item-3 ${
      primary_style ? 'tp-product-style-primary' : ''
    } mb-50 ${isCenter ? 'text-center' : ''}`"
  >
    <div
      class="tp-product-thumb-3 mb-15 fix p-relative z-index-1"
      :style="`background-color: ${style_2 ? '#f6f6f6' : '#fff'};`"
    >
      <nuxt-link :href="`/product-details/${item.id}`">
        <img :src="item.image" alt="product-img" />
      </nuxt-link>
    </div>
    <div class="tp-product-content-3">
      <div class="tp-product-tag-3">
        <span>{{ item.categories.name }}</span>
      </div>
      <h3 class="tp-product-title-3">
        <nuxt-link :href="`/product-details/${item.id}`">{{
          item.name
        }}</nuxt-link>
      </h3>
      <div class="tp-product-price-wrapper-3">
        <span class="tp-product-price-3">{{ toCurrency(item.price) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  item: any
  style_2?: boolean
  isCenter?: boolean
  primary_style?: boolean
}>()
</script>

<style scoped>
.tp-product-action-btn .icon {
  width: 20px !important;
}
</style>
