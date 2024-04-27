<template>
  <div v-if="!pending && data && data.length > 0">
    <h3 class="tp-shop-widget-title">Top Rated Products</h3>
    <div class="tp-shop-widget-content">
      <div class="tp-shop-widget-product">
        <div
          v-for="item in data"
          :key="item.slug"
          class="tp-shop-widget-product-item d-flex align-items-center"
        >
          <div class="tp-shop-widget-product-thumb">
            <nuxt-link :href="`/product-details/${item.slug}`">
              <img :src="item.image" alt="product-img" />
            </nuxt-link>
          </div>
          <div class="tp-shop-widget-product-content">
            <div
              class="tp-shop-widget-product-rating-wrapper d-flex align-items-center"
            >
              <div class="tp-shop-widget-product-rating">
                <span>
                  <svg-rating />
                </span>
                <span>
                  <svg-rating />
                </span>
                <span>
                  <svg-rating />
                </span>
                <span>
                  <svg-rating />
                </span>
                <span>
                  <svg-rating />
                </span>
              </div>
              <div class="tp-shop-widget-product-rating-number">
                <span>({{ item.average_ratings }})</span>
              </div>
            </div>
            <h4 class="tp-shop-widget-product-title">
              <nuxt-link :href="`/product-details/${item.slug}`">{{
                item.name
              }}</nuxt-link>
            </h4>
            <div class="tp-shop-widget-product-price-wrapper">
              <span class="tp-shop-widget-product-price">{{
                toCurrency(item.price)
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data, pending } = await useFetch('/api/products', {
  query: { topRated: true, limit: 4 },
})
</script>
