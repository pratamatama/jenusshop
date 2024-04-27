<template>
  <div
    v-if="!item.products"
    :class="`${
      offer_style ? 'tp-product-offer-item' : 'mb-25'
    } tp-product-item transition-3`"
  >
    <div class="tp-product-thumb p-relative fix m-img">
      <nuxt-link :href="`/product-details/${item.id}`">
        <img :src="item.image" alt="product-electronic" />
      </nuxt-link>

      <!-- product badge -->
      <div class="tp-product-badge">
        <span v-if="item.stock === 0" class="product-hot">out-of-stock</span>
      </div>

      <!-- product action -->
      <div class="tp-product-action">
        <div class="tp-product-action-item d-flex flex-column">
          <button
            type="button"
            class="tp-product-action-btn tp-product-quick-view-btn"
            data-bs-toggle="modal"
            :data-bs-target="`#${utilityStore.modalId}`"
            @click="
              utilityStore.handleOpenModal(`product-modal-${item.id}`, item)
            "
          >
            <svg-quick-view />
            <span class="tp-product-tooltip">Quick View</span>
          </button>
        </div>
      </div>
    </div>
    <!-- product content -->
    <div class="tp-product-content">
      <div class="tp-product-category">
        <nuxt-link :href="`/product-details/${item.id}`">{{
          item.categories?.name
        }}</nuxt-link>
      </div>
      <h3 class="tp-product-title">
        <nuxt-link :href="`/product-details/${item.id}`">
          {{ item.name }}
        </nuxt-link>
      </h3>
      <div class="tp-product-rating d-flex align-items-center flex-wrap">
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
          <span>({{ item.product_reviews?.length }} Reviews)</span>
        </div>
      </div>
      <div class="tp-product-price-wrapper">
        <div v-if="item.discount > 0">
          <span class="tp-product-price old-price">{{
            toCurrency(item.price)
          }}</span>
          <span class="tp-product-price new-price" style="margin-left: 8px">
            {{
              toCurrency(
                Number(item.price) -
                  (Number(item.price) * Number(item.discount)) / 100,
              )
            }}
          </span>
        </div>
        <span v-else class="tp-product-price new-price">{{
          toCurrency(item.price)
        }}</span>
      </div>

      <div class="tp-product-countdown" v-if="offer_style">
        <div class="tp-product-countdown-inner">
          <ul>
            <li>
              <span>{{ timer.days }}</span> Day
            </li>
            <li>
              <span>{{ timer.hours }}</span> Hrs
            </li>
            <li>
              <span>{{ timer.minutes }}</span> Min
            </li>
            <li>
              <span>{{ timer.seconds }}</span> Sec
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div
    v-else
    :class="`${
      offer_style ? 'tp-product-offer-item' : 'mb-25'
    } tp-product-item transition-3`"
  >
    <div class="tp-product-thumb p-relative fix m-img">
      <nuxt-link :href="`/product-details/${item.id}`">
        <img :src="item.products.thumbnail" alt="product-electronic" />
      </nuxt-link>

      <!-- product badge -->
      <div class="tp-product-badge">
        <span v-if="item.products.stock === 0" class="product-hot"
          >out-of-stock</span
        >
      </div>

      <!-- product action -->
      <div class="tp-product-action">
        <div class="tp-product-action-item d-flex flex-column">
          <button
            type="button"
            class="tp-product-action-btn tp-product-quick-view-btn"
            data-bs-toggle="modal"
            :data-bs-target="`#${utilityStore.modalId}`"
            @click="
              utilityStore.handleOpenModal(
                `product-modal-${item.products.id}`,
                item,
              )
            "
          >
            <svg-quick-view />
            <span class="tp-product-tooltip">Quick View</span>
          </button>
        </div>
      </div>
    </div>
    <!-- product content -->
    <div class="tp-product-content">
      <div class="tp-product-category">
        <nuxt-link :href="`/product-details/${item.products.id}`">{{
          item.products.categories?.name
        }}</nuxt-link>
      </div>
      <h3 class="tp-product-title">
        <nuxt-link :href="`/product-details/${item.products.id}`">
          {{ item.products.name }}
        </nuxt-link>
      </h3>
      <div class="tp-product-rating d-flex align-items-center flex-wrap">
        <div class="tp-product-rating-icon">
          <template v-if="item.products.average_ratings > 0">
            <span v-for="(_, i) in item.products.average_ratings" :key="i"
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
          <span>({{ item.products.product_reviews?.length }} Reviews)</span>
        </div>
      </div>
      <div class="tp-product-price-wrapper">
        <div v-if="item.discount > 0">
          <span class="tp-product-price old-price">{{
            toCurrency(item.products.price)
          }}</span>
          <span class="tp-product-price new-price" style="margin-left: 8px">
            {{
              toCurrency(
                Number(item.products.price) -
                  (Number(item.products.price) * Number(item.discount)) / 100,
              )
            }}
          </span>
        </div>
        <span v-else class="tp-product-price new-price"
          >Rp.{{ item.products.price }}</span
        >
      </div>

      <div class="tp-product-countdown" v-if="offer_style">
        <div class="tp-product-countdown-inner">
          <ul>
            <li>
              <span>{{ timer.days }}</span> Day
            </li>
            <li>
              <span>{{ timer.hours }}</span> Hrs
            </li>
            <li>
              <span>{{ timer.minutes }}</span> Min
            </li>
            <li>
              <span>{{ timer.seconds }}</span> Sec
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/pinia/useCartStore'
import { useWishlistStore } from '@/pinia/useWishlistStore'
import { useUtilityStore } from '@/pinia/useUtilityStore'
import type { IProduct } from '@/types/product-type'
import { useTimer, type UseTimer } from 'vue-timer-hook'

const props = defineProps<{ item: any; offer_style?: boolean }>()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const utilityStore = useUtilityStore()

let timer: UseTimer
if (props.item.expired_at) {
  const endTime = new Date(props.item.expired_at)
  const endTimeMs = endTime.getTime()
  timer = useTimer(endTimeMs)
}
</script>

<style scoped>
.tp-product-action-btn .icon {
  width: 20px !important;
}

.tp-product-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media screen and (max-width: 768px) {
  .tp-product-content {
    padding: 10px 10px;
  }
}
</style>
