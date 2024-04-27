<template>
  <div class="tp-shop-sidebar mr-10">
    <!-- categories -->
    <div class="tp-shop-widget mb-50">
      <h3 class="tp-shop-widget-title">Categories</h3>
      <!-- filter categories start -->
      <shop-sidebar-filter-categories
        :right_side="shop_right"
        :shop_full="shop_full"
        :shop_1600="shop_1600"
      />
      <!-- filter categories end -->
    </div>
    <!-- product rating -->
    <div class="tp-shop-widget mb-50">
      <!-- filter top-product start -->
      <shop-sidebar-top-product />
      <!-- filter top-product end -->
    </div>
    <!-- brand -->
    <div class="tp-shop-widget mb-50">
      <h3 class="tp-shop-widget-title">Popular Brands</h3>
      <!-- filter brand start -->
      <shop-sidebar-filter-brand
        :right_side="shop_right"
        :shop_full="shop_full"
        :shop_1600="shop_1600"
      />
      <!-- filter brand end -->
    </div>
    <!-- reset filter start -->
    <shop-sidebar-reset-filter
      :right_side="shop_right"
      :shop_full="shop_full"
      :shop_1600="shop_1600"
    />
    <!-- reset filter end -->
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  shop_right?: boolean
  shop_full?: boolean
  shop_1600?: boolean
}>()
</script>
