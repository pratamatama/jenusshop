<template>
  <div class="tp-product-list-item d-md-flex">
    <div class="tp-product-list-thumb p-relative fix">
      <nuxt-link
        :href="`/product-details/${item.slug}`"
        style="height: 310px; background-color: #f2f3f5"
      >
        <img :src="item.image" alt="product-img" />
      </nuxt-link>

      <!-- product action -->
      <div class="tp-product-action-2 tp-product-action-blackStyle">
        <div class="tp-product-action-item-2 d-flex flex-column">
          <button
            type="button"
            class="tp-product-action-btn-2 tp-product-quick-view-btn"
            data-bs-toggle="modal"
            :data-bs-target="`#${utilityStore.modalId}`"
            @click="
              utilityStore.handleOpenModal(`product-modal-${item.slug}`, item)
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
    <div class="tp-product-list-content">
      <div class="tp-product-content-2 pt-15">
        <div class="tp-product-tag-2">
          <a href="#">{{ item.categories.name }}</a>
        </div>
        <h3 class="tp-product-title-2">
          <nuxt-link :href="`/product-details/${item.slug}`">{{
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

        <p>{{ item.description.slice(0, 100) }}</p>
        <div class="tp-product-list-add-to-cart">
          <button
            @click="cartStore.addCartProduct(item)"
            class="tp-product-list-add-to-cart-btn"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUtilityStore } from '@/pinia/useUtilityStore'
import { useCompareStore } from '@/pinia/useCompareStore'
import { useCartStore } from '@/pinia/useCartStore'
import { useWishlistStore } from '@/pinia/useWishlistStore'

defineProps<{ item: any }>()

const compareStore = useCompareStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const utilityStore = useUtilityStore()
</script>
