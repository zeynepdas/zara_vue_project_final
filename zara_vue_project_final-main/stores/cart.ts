import { defineStore } from 'pinia'
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from 'firebase/firestore'
import type { ICartItem, IProduct } from '~/types'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as ICartItem[],
    loading: false,
  }),

  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) => {
      return state.items
        .reduce((sum, item) => {
          const priceStr = String(item.price)
            .replace(/[^\d.,]/g, '')
            .replace(/\./g, '')
            .replace(',', '.')
          const price = parseFloat(priceStr) || 0
          return sum + price * item.quantity
        }, 0)
        .toLocaleString('tr-TR', { minimumFractionDigits: 2 })
    },
  },

  actions: {
    // Note: In a real app, cart would be tied to user UID.
    // Here we will use a local array for guest + Firestore sync if logged in.

    addToCart(product: IProduct) {
      // Hem ID hem de BEDEN kontrolü yapmalıyız
      const existing = this.items.find(
        (i) => String(i.id) === String(product.id) && i.selectedSize === product.selectedSize,
      )
      if (existing) {
        existing.quantity++
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
    },

    removeFromCart(productId: string, size?: string) {
      const index = this.items.findIndex(
        (i) => String(i.id) === String(productId) && (!size || i.selectedSize === size),
      )
      if (index !== -1) {
        this.items.splice(index, 1)
      }
    },

    // EXAMPLE OF WRITING TO FIRESTORE (Requirement: Read/Write table)
    async checkout() {
      const authStore = useAuthStore()
      if (!authStore.user) {
        alert('Please login to checkout')
        return
      }

      this.loading = true
      try {
        const { $db } = useNuxtApp()
        // Write order to 'orders' collection
        await addDoc(collection($db, 'orders'), {
          userId: authStore.user.uid,
          items: this.items,
          total: this.totalPrice,
          date: new Date().toISOString(),
          status: 'pending',
        })

        this.items = [] // Clear cart
        alert('Order placed successfully!')
      } catch (e) {
        console.error('Checkout error', e)
        alert('Failed to place order')
      } finally {
        this.loading = false
      }
    },
  },
})
