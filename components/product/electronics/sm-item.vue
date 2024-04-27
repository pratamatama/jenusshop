<template>
  <div class="tp-product-sm-item d-flex align-items-center">
    <div class="tp-product-thumb mr-25 fix">
      <nuxt-link :href="`/product-details/${item.slug}`">
        <img :src="item.image" alt="product-img" width="140" height="140" />
      </nuxt-link>
    </div>
    <div class="tp-product-sm-content">
      <div class="tp-product-category">
        <nuxt-link :href="`/product-details/${item.slug}`">{{
          item.categories.name
        }}</nuxt-link>
      </div>
      <h3 class="tp-product-title">
        <nuxt-link :href="`/product-details/${item.id}`">{{
          item.name
        }}</nuxt-link>
      </h3>
      <div class="tp-product-rating d-sm-flex align-items-center">
        <div class="tp-product-rating-icon">
          <template v-if="item.average_ratings > 0">
            <span v-for="(_, i) in item.average_ratings" :key="i"
              ><i class="fa-solid fa-star"></i
            ></span>
          </template>
          <template v-else>
            <span v-for="i in 5" :key="i"
              ><i class="fa-solid fa-star" style="color: #eaeaea"></i
            ></span>
          </template>
        </div>
        <div class="tp-product-rating-text">
          <span>({{ item.product_reviews?.length }} Review)</span>
        </div>
      </div>
      <div class="tp-product-price-wrapper">
        <span class="tp-product-price">{{ toCurrency(item.price) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ item: any }>()
</script>
