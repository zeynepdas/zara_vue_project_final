<template>
  <NuxtLink :to="href" class="a-link" :class="customClass">
    <slot></slot>
  </NuxtLink>
</template>

<script>
// Bu atom bir linki temsil ettiği için gerekli prop'ları tanımlayalım
export default {
  name: 'A_Link',
  props: {
    href: {
      type: String,
      required: true,
    },
    customClass: {
      type: [String, Object, Array],
      default: '',
    },
    // ... Diğer prop'lar (target, rel, vb.)
  },
}
</script>

<style scoped>
/* Genel link stili */
.a-link {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.a-link:hover {
  text-decoration: underline;
}
</style>
