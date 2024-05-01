<template>
  <div class="tp-header-category tp-category-menu tp-header-category-toggle">
    <button
      @click="handleActive"
      @mouseenter="handleActive"
      class="tp-category-menu-btn tp-category-menu-toggle"
    >
      <span>
        <SvgDropdown />
      </span>
    </button>
    <Transition>
      <nav
        v-if="isActive"
        @mouseleave="handleInactive"
        class="tp-category-menu-content"
      >
        <ul>
          <li v-for="(item, i) in categories" class="has-dropdown" :key="i">
            <a class="cursor-pointer" @click="handleParentCategory(item.slug)">
              <span v-if="item.image">
                <img
                  :src="item.image"
                  alt="cate img"
                  style="width: 50px; height: 50px; object-fit: contain"
                />
              </span>
              {{ item.name }}
            </a>

            <ul v-if="item.sub_categories" class="tp-submenu">
              <li v-for="(child, i) in item.sub_categories" :key="i">
                <a
                  class="cursor-pointer"
                  @click="handleSubCategory(child.slug)"
                  >{{ child.name }}</a
                >
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { data: categories } = await useFetch('/api/categories')

const router = useRouter()
let isActive = ref<boolean>(false)

// handle active
const handleActive = () => (isActive.value = !isActive.value)
const handleInactive = () => (isActive.value = false)

// handle parent
const handleParentCategory = (value: string) => {
  const newCategory = value.toLowerCase().replace('&', '').split(' ').join('-')
  router.push(`/shop?category=${newCategory}`)
}

// handle parent
const handleSubCategory = (value: string) => {
  const newCategory = value.toLowerCase().replace('&', '').split(' ').join('-')
  router.push(`/shop?subCategory=${newCategory}`)
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
