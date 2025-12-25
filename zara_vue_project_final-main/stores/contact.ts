import { defineStore } from 'pinia'
import { collection, addDoc } from 'firebase/firestore'
import type { IMessage } from '~/types'

export const useContactStore = defineStore('contact', {
  state: () => ({
    loading: false,
    success: false,
    error: null as string | null,
  }),

  actions: {
    async sendMessage(message: IMessage) {
      this.loading = true
      this.success = false
      this.error = null

      try {
        if (import.meta.client) {
          const { $db } = useNuxtApp()
          await addDoc(collection($db, 'messages'), {
            email: message.email,
            subject: message.subject,
            message: message.message,
            createdAt: new Date().toISOString(),
          })
          this.success = true
        }
      } catch (err: any) {
        console.error('Error sending message', err)
        this.error = 'Failed to send message. Please try again.'
      } finally {
        this.loading = false
      }
    },

    reset() {
      this.success = false
      this.error = null
    },
  },
})
