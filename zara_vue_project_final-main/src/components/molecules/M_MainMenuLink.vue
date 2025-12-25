<template>
  <A_Link :to="to" class="m-main-menu-link">
    <slot></slot>
  </A_Link>
</template>

<script>
import A_Link from '@/components/atoms/A_Link.vue';

export default {
  name: 'M_MainMenuLink',
  components: { A_Link },
  props: {
    to: {
      type: [String, Object],
      required: true,
    },
  },
}
</script>

<style scoped>
/* A_Link atomuna ekstra menü stili ekliyoruz */
.m-main-menu-link {
  padding: 0 10px;
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 0.5px;
}
.m-main-menu-link:hover {
  text-decoration: underline;
  opacity: 1; /* Zara'da hover'da altı çizili veya renk değişimi olabilir */
}
</style>