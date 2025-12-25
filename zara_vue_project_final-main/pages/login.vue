<template>
  <div class="login-page">
    <transition name="fade" mode="out-in">
      <O_LoginForm v-if="isLogin" @toggle="isLogin = false" />
      <O_SignUpForm v-else @toggle="isLogin = true" />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import O_LoginForm from '@/src/components/organisms/O_LoginForm.vue'
import O_SignUpForm from '@/src/components/organisms/O_SignUpForm.vue'

definePageMeta({
  layout: 'auth',
})

const isLogin = ref(true)
</script>

<style scoped lang="scss">
.login-page {
  width: 100%;
  min-height: 100vh;
  background-color: white;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
