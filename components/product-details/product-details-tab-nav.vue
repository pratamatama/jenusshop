<template>
  <div class="tp-product-details-tab-nav tp-tab">
    <nav>
      <div
        class="nav nav-tabs justify-content-center p-relative tp-product-tab"
        id="navPresentationTab"
        role="tablist"
      >
        <button
          @click="handleActiveMarker($event)"
          class="nav-link"
          id="nav-description-tab"
          data-bs-toggle="tab"
          data-bs-target="#nav-description"
          type="button"
          role="tab"
          aria-controls="nav-description"
          aria-selected="true"
        >
          Description
        </button>

        <button
          @click="handleActiveMarker($event)"
          class="nav-link active"
          id="nav-addInfo-tab"
          data-bs-toggle="tab"
          data-bs-target="#nav-addInfo"
          type="button"
          role="tab"
          aria-controls="nav-addInfo"
          aria-selected="false"
        >
          Additional information
        </button>

        <button
          @click="handleActiveMarker($event)"
          class="nav-link"
          id="nav-review-tab"
          data-bs-toggle="tab"
          data-bs-target="#nav-review"
          type="button"
          role="tab"
          aria-controls="nav-review"
          aria-selected="false"
        >
          Reviews ({{ product?.product_reviews?.length }})
        </button>
        <span id="productTabMarker" class="tp-product-details-tab-line"></span>
      </div>
    </nav>
    <div class="tab-content" id="navPresentationTabContent">
      <div
        class="tab-pane fade"
        id="nav-description"
        role="tabpanel"
        aria-labelledby="nav-description-tab"
        tabindex="0"
      >
        <div class="tp-product-details-desc-wrapper pt-80">
          <div class="row justify-content-center">
            <div class="col-xl-10">
              <div class="tp-product-details-desc-item pb-105">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="tp-product-details-desc-content pt-25">
                      <span>{{ product?.categories.name }}</span>
                      <h3 class="tp-product-details-desc-title">
                        {{ product?.title }}
                      </h3>
                      <p>{{ product?.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade show active"
        id="nav-addInfo"
        role="tabpanel"
        aria-labelledby="nav-addInfo-tab"
        tabindex="0"
      >
        <div class="tp-product-details-additional-info">
          <div class="row justify-content-center">
            <div class="col-xl-10">
              <table>
                <tbody>
                  <tr v-for="(info, i) in product?.product_infos" :key="i">
                    <td>{{ info.label }}</td>
                    <td>{{ info.info }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="nav-review"
        role="tabpanel"
        aria-labelledby="nav-review-tab"
        tabindex="0"
      >
        <div class="tp-product-details-review-wrapper pt-60">
          <div class="row">
            <div class="col-lg-6">
              <div class="tp-product-details-review-statics">
                <!-- number -->
                <div
                  class="tp-product-details-review-number d-inline-block mb-50"
                >
                  <h3 class="tp-product-details-review-number-title">
                    Customer reviews
                  </h3>
                  <div
                    class="tp-product-details-review-summery d-flex align-items-center"
                  >
                    <div class="tp-product-details-review-summery-value">
                      <span>{{ product?.average_ratings ?? 0 }}</span>
                    </div>
                    <div
                      class="tp-product-details-review-summery-rating d-flex align-items-center"
                    >
                      <template v-if="product?.average_ratings > 0">
                        <span
                          v-for="(_, i) in product?.average_ratings"
                          :key="i"
                          ><i class="fa-solid fa-star"></i
                        ></span>
                      </template>
                      <template v-else>
                        <span v-for="i in 5" :key="i"
                          ><i
                            class="fa-solid fa-star"
                            style="color: #eaeaea"
                          ></i
                        ></span>
                      </template>
                      <p>({{ product?.product_reviews?.length }} Reviews)</p>
                    </div>
                  </div>
                  <div class="tp-product-details-review-rating-list">
                    <!-- rating item -->
                    <product-details-rating-item
                      :star="5"
                      :width="ratePercents.five.toString()"
                    />
                    <product-details-rating-item
                      :star="4"
                      :width="ratePercents.four.toString()"
                    />
                    <product-details-rating-item
                      :star="3"
                      :width="ratePercents.three.toString()"
                    />
                    <product-details-rating-item
                      :star="2"
                      :width="ratePercents.two.toString()"
                    />
                    <product-details-rating-item
                      :star="1"
                      :width="ratePercents.one.toString()"
                    />
                    <!-- end rating item -->
                  </div>
                </div>

                <!-- reviews -->
                <div class="tp-product-details-review-list pr-110">
                  <h3 class="tp-product-details-review-title">
                    Rating & Review
                  </h3>
                  <div
                    v-if="
                      product?.product_reviews &&
                      product?.product_reviews.length > 0
                    "
                  >
                    <div
                      v-for="(item, i) in product.reviews"
                      :key="i"
                      class="tp-product-details-review-avater d-flex align-items-start"
                    >
                      <div class="tp-product-details-review-avater-thumb">
                        <a href="#">
                          <img :src="item.user" alt="user" />
                        </a>
                      </div>
                      <div class="tp-product-details-review-avater-content">
                        <div
                          class="tp-product-details-review-avater-rating d-flex align-items-center"
                        >
                          <span><i class="fa-solid fa-star"></i></span>
                          <span><i class="fa-solid fa-star"></i></span>
                          <span><i class="fa-solid fa-star"></i></span>
                          <span><i class="fa-solid fa-star"></i></span>
                          <span><i class="fa-solid fa-star"></i></span>
                        </div>
                        <h3 class="tp-product-details-review-avater-title">
                          {{ item.name }}
                        </h3>
                        <span class="tp-product-details-review-avater-meta"
                          >{{ item.date }}
                        </span>

                        <div class="tp-product-details-review-avater-comment">
                          <p>{{ item.review }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <h5>No Reviews Found</h5>
                  </div>
                </div>
              </div>
            </div>
            <!-- end col -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// handleActiveMarker
const handleActiveMarker = (event: MouseEvent) => {
  const marker = document.getElementById('productTabMarker')
  if (marker && event.target) {
    marker.style.left = (event.target as HTMLButtonElement).offsetLeft + 'px'
    marker.style.width = (event.target as HTMLButtonElement).offsetWidth + 'px'
  }
}

const props = defineProps<{ product: any }>()

const ratePercents = computed(() => {
  if (!props.product) {
    return {
      five: 0,
      four: 0,
      three: 0,
      two: 0,
      one: 0,
    }
  }

  const getPercent = (rate: number) => {
    const res =
      (props.product.product_reviews.filter(
        (item: any) => item.ratings === rate,
      ).length /
        props.product.product_reviews.length) *
      100

    return isNaN(res) ? 0 : res
  }

  return {
    five: getPercent(5),
    four: getPercent(4),
    three: getPercent(3),
    two: getPercent(2),
    one: getPercent(1),
  }
})

onMounted(() => {
  const nav_active = document.getElementById('nav-addInfo-tab')
  const marker = document.getElementById('productTabMarker')
  if (nav_active?.classList.contains('active') && marker) {
    marker.style.left = nav_active.offsetLeft + 'px'
    marker.style.width = nav_active.offsetWidth + 'px'
  }
})
</script>
