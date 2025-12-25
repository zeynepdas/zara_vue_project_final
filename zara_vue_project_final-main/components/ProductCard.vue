<template>
  <div class="product-card">
    <div class="image-container">
      <img :src="product.image" :alt="product.title" loading="lazy" />
      <button class="quick-add" @click.stop="handleAddToCart">
        ADD +
      </button>
    </div>
    <div class="info">
      <div class="name">{{ product.title }}</div>
      <div class="price">${{ product.price }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProduct } from '~/types';

const props = defineProps<{
  product: IProduct
}>();

const cartStore = useCartStore();

const handleAddToCart = () => {
  cartStore.addToCart(props.product);
};
</script>

<style scoped lang="scss">
.product-card {
  cursor: pointer;
  
  .image-container {
      position: relative;
      width: 100%;
      aspect-ratio: 3/4;
      background: #f0f0f0;
      overflow: hidden;
      margin-bottom: 10px;
      
      img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
      }

      .quick-add {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: rgba(255,255,255,0.8);
          padding: 5px 10px;
          font-size: 10px;
          opacity: 0;
          transition: opacity 0.3s;
      }
  }

  &:hover {
      img { transform: scale(1.05); }
      .quick-add { opacity: 1; }
  }

  .info {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      
      .name {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 70%;
          text-transform: uppercase;
      }
  }
}
</style>
