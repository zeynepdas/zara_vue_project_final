import { defineStore } from 'pinia'
import { collection, getDocs } from 'firebase/firestore'
import type { ICategory } from '~/types'

export const useCategoryStore = defineStore('categories', {
  state: () => ({
    categories: [] as ICategory[],
    loading: false,
  }),

  actions: {
    async fetchCategories() {
      if (this.categories.length > 0) return // Cache

      this.loading = true
      try {
        if (import.meta.client) {
          const { $db } = useNuxtApp()

          const querySnapshot = await getDocs(collection($db, 'categories'))
          const fetched: ICategory[] = []
          querySnapshot.forEach((doc) => {
            fetched.push({ id: doc.id, ...doc.data() } as ICategory)
          })


          this.categories = fetched
        }
      } catch (err) {
        console.error('Error fetching categories', err)
      } finally {
        this.loading = false
      }
    },
  },
})
