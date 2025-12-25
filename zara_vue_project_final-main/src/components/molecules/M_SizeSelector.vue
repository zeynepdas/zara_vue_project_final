<template>
  <div class="m-size-selector">
    <A_Text size="small" class="m-size-selector__title">BEDEN:</A_Text>
    
    <div class="m-size-selector__options">
      <A_Button 
        v-for="size in availableSizes" 
        :key="size" 
        variant="ghost" 
        :class="{ 'is-selected': size === selectedSize }"
        @click="selectSize(size)"
      >
        {{ size }}
      </A_Button>
    </div>
  </div>
</template>

<script>
import A_Button from '@/components/atoms/A_Button.vue';
import A_Text from '@/components/atoms/A_Text.vue';

export default {
  name: 'M_SizeSelector',
  components: { A_Button, A_Text },
  props: {
    availableSizes: {
      type: Array,
      default: () => ['XS', 'S', 'M', 'L', 'XL']
    },
    selectedSize: {
      type: String,
      default: null,
    },
  },
  emits: ['update:selectedSize'],
  methods: {
    selectSize(size) {
      this.$emit('update:selectedSize', size);
    }
  }
}
</script>

<style scoped>
.m-size-selector {
  border: 1px solid #eee;
  padding: 15px;
  width: 100%;
}
.m-size-selector__title {
  font-weight: 600;
  margin-bottom: 10px;
  text-transform: uppercase;
  color: #333;
}
.m-size-selector__options {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
/* A_Button'ı Molekül içinde özelleştirme */
.m-size-selector__options .a-button {
  width: auto; 
  min-width: 40px; 
}
.m-size-selector__options .is-selected {
  /* Seçili butona özel stil: Altı çizili ve daha belirgin */
  font-weight: 700;
  text-decoration: underline;
  color: black;
}
</style>