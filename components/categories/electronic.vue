<template>
  <section class="tp-product-category pt-60 pb-15">
    <div class="container">
      <div class="row">
        <div class="col-xl-5 col-lg-6 col-md-5">
          <div class="tp-section-title-wrapper mb-40">
            <h3 class="tp-section-title">Shop Categories</h3>
          </div>
        </div>
      </div>

      <div class="row items row-cols-xl-5 row-cols-lg-5">
        <div v-for="(item, i) in data" :key="i" class="col">
          <div class="tp-product-category-item text-center mb-40">
            <div class="tp-product-category-thumb fix">
              <a
                class="cursor-pointer"
                @click="handleParentCategory(item.slug)"
              >
                <img :src="item.image" alt="product-category" />
              </a>
            </div>
            <div class="tp-product-category-content">
              <h3 class="tp-product-category-title">
                <a
                  class="cursor-pointer"
                  @click="handleParentCategory(item.slug)"
                >
                  {{ item.name }}
                </a>
              </h3>
              <p>{{ item.products.length }} Product</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { data } = await useFetch('/api/categories')

const handleParentCategory = (value: string) => {
  navigateTo(`/shop?category=${value}`)
}
</script>

<style scoped>
@media screen and (max-width: 768px) {
  .tp-product-category .items {
    overflow-x: scroll;
    display: flex !important;
    flex-wrap: nowrap;
  }
}
</style>
