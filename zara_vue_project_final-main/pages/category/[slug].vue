<template>
  <div class="category-page">
    <O_ProductsGrid
      :products="mappedProducts"
      :loading="loading"
      :title="categoryTitle"
      @product-click="goToProduct"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '~/stores/products'
import O_ProductsGrid from '~/src/components/organisms/O_ProductsGrid.vue'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()

const slug = computed(() => String(route.params.slug))
const loading = computed(() => productStore.loading)

const categoryTitle = computed(() => {
  // Extract only the last part (e.g., "the-new" from "kadin-the-new")
  const parts = slug.value.split('-')
  const lastTwoParts = parts.slice(-2) // Get last 2 words: ["the", "new"]
  return lastTwoParts.map((word) => word.toUpperCase()).join(' ')
})

const mappedProducts = computed(() => {
  console.log('Raw category products:', productStore.categoryProducts)
  const mapped = productStore.categoryProducts.slice(0, 12).map((product) => ({
    id: product.id,
    title: product.title || 'Ürün',
    price: product.price || '0 TL',
    image: product.image || 'https://placehold.co/400x600',
  }))
  console.log('Mapped products:', mapped)
  return mapped
})

onMounted(() => {
  productStore.fetchProductsBySlug(slug.value)
})

watch(slug, (newSlug) => {
  productStore.fetchProductsBySlug(newSlug)
})

const goToProduct = (id: string) => {
  console.log('Navigating to product:', id)
  router.push(`/product/${id}`)
}
</script>

<style scoped>
.category-page {
  min-height: 100vh;
  background: white;
}
</style>
