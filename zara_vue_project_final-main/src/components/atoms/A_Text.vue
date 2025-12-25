<template>
  <component :is="tag" class="a-text">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'A_Text',
  props: {
    tag: {
      type: String,
      default: 'span', // Varsayılan olarak <span> kullan
    }
  }
}
</script>

<style scoped>
/* Opsiyonel: Temel metin stili */
.a-text {
  font-size: inherit;
  line-height: inherit;
  color: inherit;
}
</style>