<template>
  <div class="products-grid-container">
    <div class="products-header">
      <div class="header-left"></div>
      <h1 class="products-title">{{ title }}</h1>
      <div class="header-right">
        <span class="view-label">GÖRÜNÜM</span>
        <div class="view-selector">
          <button
            v-for="view in [1, 2, 3]"
            :key="view"
            :class="['view-btn', { active: selectedView === view }]"
            @click="selectedView = view"
          >
            {{ view }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
    </div>

    <div v-else-if="products.length > 0" class="products-grid">
      <NuxtLink
        v-for="product in products"
        :key="product.id"
        :to="`/product/${product.id}`"
        class="product-item"
      >
        <div class="product-image-wrapper">
          <A_Image :src="product.image" :alt="product.title" class="product-image" />
          <div class="product-overlay">
            <div class="plus-icon">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 0V12" stroke="#fff" stroke-width="1" />
                <path d="M0 6H12" stroke="#fff" stroke-width="1" />
              </svg>
            </div>
          </div>
        </div>

        <div class="product-info">
          <div class="product-details">
            <div class="product-text">
              <p class="product-name">{{ product.title }}</p>
              <p class="product-price">{{ product.price }}</p>
            </div>
            <button class="favorite-btn" @click.prevent.stop="toggleFavorite(product.id)">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 21L12 16L5 21V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21Z"
                  stroke="currentColor"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </NuxtLink>
    </div>

    <div v-else class="empty-state">
      <p>Ürün bulunamadı</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import A_Image from '../atoms/A_Image.vue'

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'TÜM ÜRÜNLER',
  },
})

const selectedView = ref(2)

const toggleFavorite = (id) => {
  console.log('Toggle favorite for product:', id)
}
</script>

<style scoped>
.products-grid-container {
  width: 100%;
  padding: 0 132px;
  margin-top: 80px;
  margin-bottom: 100px;
  font-family: 'Helvetica Now Text', Arial, sans-serif;
  color: #000;
}

.products-header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  margin-bottom: 40px;
  padding: 0;
}

.header-left {
  /* Empty space for balance */
}

.products-title {
  font-size: 13px;
  font-weight: 300;
  text-transform: none;
  letter-spacing: 0;
  text-align: center;
  margin: 0;
  font-family: 'Playfair Display', Georgia, serif;
}

.header-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
}

.view-label {
  font-size: 10px;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #000;
}

.view-selector {
  display: flex;
  gap: 12px;
  align-items: center;
}

.view-btn {
  background: none;
  border: none;
  color: #757575;
  font-size: 11px;
  font-weight: 300;
  cursor: pointer;
  transition: color 0.2s ease;
  padding: 0;
  font-family: 'Helvetica Now Text', Arial, sans-serif;
}

.view-btn:hover {
  color: #000;
}

.view-btn.active {
  color: #000;
  font-weight: 400;
}

.products-count {
  font-size: 10px;
  font-weight: 300;
  color: #666;
  text-transform: uppercase;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.product-item {
  cursor: pointer;
  transition: opacity 0.2s ease;
  text-decoration: none;
  color: inherit;
  display: block;
}

.product-item:hover {
  opacity: 0.95;
}

.product-image-wrapper {
  position: relative;
  width: 100%;
  margin-bottom: 12px;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.product-overlay {
  position: absolute;
  bottom: 8px;
  left: 8px;
  z-index: 2;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.product-item:hover .product-overlay {
  opacity: 1;
}

.plus-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #757575;
}

.product-info {
  font-size: 10px;
  line-height: 1.4;
  text-transform: uppercase;
  font-weight: 300;
  gap: 4px;
}

.product-details {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
}

.product-text {
  flex: 1;
}

.product-name {
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-price {
  color: #000;
}

.favorite-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #000;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  transition: opacity 0.2s ease;
  flex-shrink: 0;
}

.favorite-btn:hover {
  opacity: 0.6;
}

.favorite-btn svg {
  width: 16px;
  height: 16px;
}

.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #000;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.empty-state {
  text-align: center;
  padding: 100px 20px;
  font-size: 11px;
  font-weight: 300;
  text-transform: uppercase;
  color: #999;
}

@media screen and (max-width: 1024px) {
  .products-grid-container {
    padding: 0 48px;
    margin-top: 100px;
  }

  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 768px) {
  .products-grid-container {
    padding: 0 24px;
    margin-top: 80px;
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  .product-info {
    font-size: 9px;
  }
}
</style>
