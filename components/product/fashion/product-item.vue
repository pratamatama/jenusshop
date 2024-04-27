<template>
  <div :class="`tp-product-item-2 ${spacing ? 'mb-40' : ''}`">
    <div
      class="tp-product-thumb-2 p-relative z-index-1 fix w-img"
      style="background-color: #f2f3f5"
    >
      <nuxt-link :href="`/product-details/${item.id}`">
        <img :src="item.image" alt="product-img" />
      </nuxt-link>

      <!-- product badge -->
      <div class="tp-product-badge">
        <span v-if="item.status === 'out-of-stock'" class="product-hot"
          >out-of-stock</span
        >
      </div>

      <!-- product action -->
      <div class="tp-product-action-2 tp-product-action-blackStyle">
        <div class="tp-product-action-item-2 d-flex flex-column">
          <button
            type="button"
            class="tp-product-action-btn-2 tp-product-quick-view-btn"
            data-bs-toggle="modal"
            :data-bs-target="`#${utilityStore.modalId}`"
            @click="
              utilityStore.handleOpenModal(`product-modal-${item.id}`, item)
            "
          >
            <svg-quick-view />
            <span class="tp-product-tooltip tp-product-tooltip-right"
              >Quick View</span
            >
          </button>
        </div>
      </div>
    </div>
    <div class="tp-product-content-2 pt-15">
      <div class="tp-product-tag-2">
        <a href="#">{{ item.categories.name }}</a>
      </div>
      <h3 class="tp-product-title-2">
        <nuxt-link :href="`/product-details/${item.id}`">{{
          item.name
        }}</nuxt-link>
      </h3>
      <div class="tp-product-rating-icon tp-product-rating-icon-2">
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
      <div class="tp-product-price-wrapper-2">
        <div v-if="item.discount > 0">
          <span class="tp-product-price-2 new-price">{{
            toCurrency(item.price)
          }}</span>
          <span class="tp-product-price-2 old-price">
            {{
              toCurrency(
                Number(item.price) -
                  (Number(item.price) * Number(item.discount)) / 100,
              )
            }}
          </span>
        </div>
        <span v-else class="tp-product-price-2 new-price">{{
          toCurrency(item.price)
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProduct } from '@/types/product-type'
import { useCompareStore } from '@/pinia/useCompareStore'
import { useCartStore } from '@/pinia/useCartStore'
import { useUtilityStore } from '@/pinia/useUtilityStore'
import { useWishlistStore } from '@/pinia/useWishlistStore'

const compareStore = useCompareStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const utilityStore = useUtilityStore()

const props = withDefaults(defineProps<{ item: any; spacing?: boolean }>(), {
  spacing: true,
})
</script>

<style scoped>
.tp-product-action-btn-2 .icon {
  width: 20px !important;
}
</style>
