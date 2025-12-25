<template>
  <div class="m-quantity-selector">
    <A_Button variant="secondary" size="small" @click="decrement" :disabled="value <= minQuantity">
      -
    </A_Button>
    
    <A_Text class="m-quantity-selector__value" size="medium">
      {{ value }}
    </A_Text>
    
    <A_Button variant="secondary" size="small" @click="increment" :disabled="value >= maxQuantity">
      +
    </A_Button>
  </div>
</template>

<script>
import A_Button from '@/components/atoms/A_Button.vue';
import A_Text from '@/components/atoms/A_Text.vue';

export default {
  name: 'M_QuantitySelector',
  components: { A_Button, A_Text },
  props: {
    value: {
      type: Number,
      default: 1
    },
    minQuantity: {
      type: Number,
      default: 1
    },
    maxQuantity: {
      type: Number,
      default: 99
    }
  },
  emits: ['update:value'],
  methods: {
    decrement() {
      if (this.value > this.minQuantity) {
        this.$emit('update:value', this.value - 1);
      }
    },
    increment() {
      if (this.value < this.maxQuantity) {
        this.$emit('update:value', this.value + 1);
      }
    }
  }
}
</script>

<style scoped>
.m-quantity-selector {
  display: flex;
  align-items: center;
  border: 1px solid #ccc; /* Basit bir çerçeve */
  width: fit-content;
}
.m-quantity-selector .a-button {
  width: 40px; 
  height: 40px; 
  padding: 0;
  border: none;
  font-weight: 400;
  text-transform: none;
}
.m-quantity-selector__value {
  padding: 0 15px;
  font-weight: 500;
  min-width: 30px;
  text-align: center;
}
</style>