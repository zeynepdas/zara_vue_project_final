<template>
  <div class="layout-zara">
    <O_Header />
    <main>
      <slot />
    </main>
    <O_Footer v-if="route.path !== '/cart'" />
  </div>
</template>

<script setup lang="ts">
import O_Header from '@/src/components/organisms/O_Header.vue'
import O_Footer from '@/src/components/organisms/O_Footer.vue'

const route = useRoute()
const authStore = useAuthStore()

onMounted(() => {
  authStore.initAuth()
})
</script>

<style scoped>
.layout-zara {
  min-height: 100vh;
}
</style>
