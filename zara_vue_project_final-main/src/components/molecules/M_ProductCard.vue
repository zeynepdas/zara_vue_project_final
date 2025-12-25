<template>
  <div class="m-product-card" @click="$emit('viewProduct', product.id)">
    <A_Image :src="product.imageUrl" :alt="product.name" class="m-product-card__image"/>
    
    <div class="m-product-card__info">
      <A_Text size="medium" class="m-product-card__name">{{ product.name }}</A_Text>
      
      <A_Price :value="product.price" size="medium" :isSale="product.isSale" />
    </div>
  </div>
</template>

<script>
import A_Image from '@/components/atoms/A_Image.vue';
import A_Text from '@/components/atoms/A_Text.vue';
import A_Price from '@/components/atoms/A_Price.vue';

export default {
  name: 'M_ProductCard',
  components: { A_Image, A_Text, A_Price },
  props: {
    product: {
      type: Object,
      required: true,
      default: () => ({ name: '', imageUrl: '', price: 0, id: null, isSale: false })
    },
  },
  emits: ['viewProduct'],
}
</script>

<style scoped>
.m-product-card {
  cursor: pointer;
  width: 100%;
}
.m-product-card__image {
  height: 350px; 
  margin-bottom: 10px;
}
.m-product-card__info {
  text-align: left;
}
.m-product-card__name {
  text-transform: uppercase;
  font-weight: 500;
  line-height: 1.2;
}
</style>