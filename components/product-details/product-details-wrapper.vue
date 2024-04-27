<template>
  <div class="tp-product-details-wrapper has-sticky">
    <div class="tp-product-details-category">
      <span>{{ product?.categories?.name }}</span>
    </div>
    <h3 class="tp-product-details-title">{{ product?.name }}</h3>

    <!-- inventory details -->
    <div class="tp-product-details-inventory d-flex align-items-center mb-10">
      <div
        class="tp-product-details-rating-wrapper d-flex align-items-center mb-10"
      >
        <div class="tp-product-details-rating">
          <template v-if="product?.average_ratings > 0">
            <span v-for="(_, i) in product?.average_ratings" :key="i"
              ><i class="fa-solid fa-star"></i
            ></span>
          </template>
          <template v-else>
            <span v-for="i in 5" :key="i"
              ><i class="fa-solid fa-star" style="color: #eaeaea"></i
            ></span>
          </template>
        </div>
        <div class="tp-product-details-reviews">
          <span>({{ product?.product_reviews?.length }} Reviews)</span>
        </div>
      </div>
    </div>
    <p class="whitespace-pre-wrap">
      {{
        textMore
          ? product?.description
          : `${product?.description?.substring(0, 100)}...`
      }}
      <span @click="textMore = !textMore">{{
        textMore ? 'See less' : 'See more'
      }}</span>
    </p>

    <!-- price -->
    <div class="tp-product-details-price-wrapper mb-20">
      <div v-if="product?.discount > 0">
        <span class="tp-product-details-price old-price">{{
          toCurrency(product.price)
        }}</span>
        <span class="tp-product-details-price new-price">
          {{
            toCurrency(
              Number(product.price) -
                (Number(product.price) * Number(product.discount)) / 100,
            )
          }}
        </span>
      </div>
      <span v-else class="tp-product-details-price">{{
        toCurrency(product?.price)
      }}</span>
    </div>

    <!-- product countdown start -->
    <div v-if="product?.offerDate?.endDate">
      <product-details-countdown :product="product" />
    </div>
    <!-- product countdown end -->

    <!-- actions -->
    <div class="tp-product-details-action-wrapper">
      <a
        :href="`https://wa.me/?text=${buyInWa}`"
        target="_blank"
        class="tp-product-details-buy-now-btn w-100 text-center text-white"
      >
        <span class="fab fa-whatsapp"></span> Buy Now</a
      >
    </div>

    <div v-if="isShowBottom">
      <div class="tp-product-details-query">
        <div class="tp-product-details-query-item d-flex align-items-center">
          <span>SKU: </span>
          <p>{{ product?.sku }}</p>
        </div>
        <div class="tp-product-details-query-item d-flex align-items-center">
          <span>Category: </span>
          <p>{{ product?.categories?.name }}</p>
        </div>
        <div class="tp-product-details-query-item d-flex align-items-center">
          <span>Tag: </span>
          <p>{{ product?.tags?.map((tag: any) => tag.name).join(', ') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{ product: any; isShowBottom?: boolean }>(),
  {
    isShowBottom: true,
  },
)
let textMore = ref<boolean>(false)

// disini untuk mengubah description untuk intro membeli

const introBuy = 'Halo, Saya ingin order produk'
const buyInWa = `${introBuy} ${
  props.product.name
} - ${props.product.description?.substring(0, 100)}...`
</script>

<style lang="scss">
.tp-product-detail-commerce {
  margin-bottom: 20px;
  .com-icon {
    width: 30px;
    text-align: center;
    margin-left: 5px;
  }
}
</style>
