<template>
  <section class="tp-slider-area p-relative z-index-1">
    <Swiper
      loop
      autoplay
      :slidesPerView="1"
      :spaceBetween="30"
      :navigation="{
        nextEl: '.tp-slider-button-next',
        prevEl: '.tp-slider-button-prev',
      }"
      :pagination="{
        el: '.tp-slider-dot',
        clickable: true,
      }"
      :modules="[Navigation, Pagination, Autoplay]"
      :onSlideChange="(swiper) => handleActiveIndex(swiper.activeIndex)"
      :class="`tp-slider-active tp-slider-variation swiper-container ${
        isActive ? 'is-light' : ''
      }`"
    >
      <SwiperSlide
        v-for="(item, i) in promos"
        :key="i"
        class="tp-slider-item tp-slider-height d-flex align-items-center"
      >
        <img :src="item.banner" :alt="`slider-${i}`" class="img-fluid" />
      </SwiperSlide>
      <div class="tp-slider-arrow tp-swiper-arrow d-none d-lg-block">
        <button type="button" class="tp-slider-button-prev">
          <SvgPrevArrow />
        </button>
        <button type="button" class="tp-slider-button-next">
          <SvgNextArrow />
        </button>
      </div>
      <div class="tp-slider-dot tp-swiper-dot"></div>
    </Swiper>
  </section>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

const { data: promos } = await useFetch('/api/promos')

const isActive = ref<boolean>(false)

const handleActiveIndex = (index: number) => {
  if (index === 2) {
    isActive.value = true
  } else {
    isActive.value = false
  }
}
</script>

<style scoped>
:deep(.tp-slider-active .tp-slider-dot) {
  bottom: 10px;
}
</style>
