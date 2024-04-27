<template>
  <section class="tp-product-sm-area">
    <div class="container">
      <div class="row">
        <div class="col-xl-4 col-md-6">
          <div class="tp-product-sm-list mb-50">
            <div class="tp-section-title-wrapper mb-40">
              <h3 class="tp-section-title tp-section-title-sm">
                Discount Products
              </h3>
            </div>

            <div class="tp-product-sm-wrapper mr-20">
              <ProductElectronicsSmItem
                v-for="item in discountProducts"
                :key="item.id"
                :item="item"
              />
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-md-6">
          <div class="tp-product-sm-list mb-50">
            <div class="tp-section-title-wrapper mb-40">
              <h3 class="tp-section-title tp-section-title-sm">
                Featured Products
              </h3>
            </div>

            <div class="tp-product-sm-wrapper mr-20">
              <ProductElectronicsSmItem
                v-for="item in featuredProducts"
                :key="item.id"
                :item="item"
              />
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-md-6">
          <div class="tp-product-sm-list mb-50">
            <div class="tp-section-title-wrapper mb-40">
              <h3 class="tp-section-title tp-section-title-sm">
                Selling Products
              </h3>
            </div>

            <div class="tp-product-sm-wrapper mr-20">
              <ProductElectronicsSmItem
                v-for="item in topProducts"
                :key="item.id"
                :item="item"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import product_data from '@/data/product-data'

const { data: discountProducts, pending: discountProductsPending } = useFetch(
  '/api/products',
  { query: { discount: true, random: true, limit: 3 } },
)

const { data: featuredProducts, pending: featuredProductsPending } = useFetch(
  '/api/products',
  { query: { featured: true, random: true, limit: 3 } },
)

const { data: topProducts, pending: topProductsPending } = useFetch(
  '/api/products',
  { query: { top: true, random: true, limit: 3 } },
)
</script>
