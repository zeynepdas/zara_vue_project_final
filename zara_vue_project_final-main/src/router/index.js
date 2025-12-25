// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // Ana yolu kullanıyoruz ve dinamik parametreyi (componentName) App.vue'ya gönderiyoruz
      path: '/:componentName?', 
      name: 'styleguide',
      component: App, // !!! App.vue'yu component olarak kullanıyoruz
    }
    // NOT: Diğer rotaları bu projede kullanmak istiyorsanız, bu rotayı değiştirmemiz gerekir.
  ]
})

export default router