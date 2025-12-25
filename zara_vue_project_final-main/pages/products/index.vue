<template>
  <div class="products-page">
    <O_ProductsGrid
      :products="mappedProducts"
      :loading="loading"
      title="TÜM ÜRÜNLER"
      @product-click="goToProduct"
    />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '~/stores/products'
import O_ProductsGrid from '~/src/components/organisms/O_ProductsGrid.vue'

const router = useRouter()
const productStore = useProductStore()

const loading = computed(() => productStore.loading)

const mappedProducts = computed(() => {
  return productStore.products.map((product) => ({
    id: product.id,
    title: product.title || 'Ürün',
    price: typeof product.price === 'number' ? `${product.price} TL` : product.price,
    image: product.image || 'https://placehold.co/400x600',
  }))
})

onMounted(async () => {
  await productStore.fetchProducts()
})

const goToProduct = (id) => {
  router.push(`/product/${id}`)
}
</script>

<style scoped>
.products-page {
  min-height: 100vh;
  background: white;
}
</style>
