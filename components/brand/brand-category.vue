<template>
  <section class="tp-brand-area pt-40 pb-40">
    <div class="container mb-40">
      <div class="row">
        <div class="col-12">
          <div class="tp-section-title-wrapper mb-40">
            <h3 class="tp-section-title">Brand Official</h3>
          </div>
        </div>
        <div class="col-xl-12">
          <div class="tp-brand-slider p-relative">
            <Swiper
              :slidesPerView="5"
              :spaceBetween="0"
              :navigation="{
                nextEl: '.tp-brand-slider-button-next',
                prevEl: '.tp-brand-slider-button-prev',
              }"
              :modules="[Navigation]"
              :breakpoints="{
                '992': {
                  slidesPerView: 5,
                },
                '768': {
                  slidesPerView: 4,
                },
                '576': {
                  slidesPerView: 3,
                },
                '0': {
                  slidesPerView: 1,
                },
              }"
              class="tp-brand-slider-active swiper-container"
            >
              <SwiperSlide
                v-for="(brand, i) in data"
                :key="i"
                class="tp-brand-item text-center"
              >
                <nuxt-link :to="`shop?brand=${brand.slug}`">
                  <img :src="brand.logo" alt="brand" />
                </nuxt-link>
              </SwiperSlide>
            </Swiper>

            <div class="tp-brand-slider-arrow">
              <button class="tp-brand-slider-button-prev">
                <svg-prev-arrow />
              </button>
              <button class="tp-brand-slider-button-next">
                <svg-next-arrow />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'

const { data } = await useFetch('/api/brand-officials')
</script>

<style scoped>
.tp-brand-slider img {
  width: 100px;
}
</style>
