import { defineStore } from 'pinia'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  type User,
} from 'firebase/auth'
import type { IUser } from '~/types'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as IUser | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    initAuth() {
      const { $auth } = useNuxtApp()
      onAuthStateChanged($auth, (firebaseUser: User | null) => {
        if (firebaseUser) {
          this.user = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
          }
        } else {
          this.user = null
        }
      })
    },

    async register(email: string, pass: string) {
      this.loading = true
      this.error = null
      try {
        const { $auth } = useNuxtApp()
        await createUserWithEmailAndPassword($auth, email, pass)
        // User state will update via onAuthStateChanged
      } catch (err: any) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async login(email: string, pass: string) {
      this.loading = true
      this.error = null
      try {
        const { $auth } = useNuxtApp()
        await signInWithEmailAndPassword($auth, email, pass)
      } catch (err: any) {
        if (err.code === 'auth/invalid-credential') {
          this.error = 'E-posta veya şifre hatalı.'
        } else if (err.code === 'auth/user-not-found') {
          this.error = 'Bu e-posta adresi kayıtlı değil.'
        } else if (err.code === 'auth/wrong-password') {
          this.error = 'Şifre hatalı.'
        } else if (err.code === 'auth/too-many-requests') {
          this.error = 'Çok fazla deneme yapıldı. Lütfen sonra tekrar deneyin.'
        } else {
          this.error = 'Giriş yapılırken bir hata oluştu.'
        }
        throw err
      } finally {
        this.loading = false
      }
    },

    async logout() {
      const { $auth } = useNuxtApp()
      await signOut($auth)
      this.user = null
    },

    async updateUserProfile(name: string) {
      if (!this.user) return

      this.loading = true
      try {
        const { $auth } = useNuxtApp()
        if ($auth.currentUser) {
          await updateProfile($auth.currentUser, {
            displayName: name,
          })
          // Update local state manually to reflect changes immediately
          this.user.displayName = name
        }
      } catch (err: any) {
        console.error('Update profile error', err)
        throw err
      } finally {
        this.loading = false
      }
    },
  },
})
