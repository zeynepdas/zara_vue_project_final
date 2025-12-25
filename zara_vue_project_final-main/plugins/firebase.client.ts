import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

export default defineNuxtPlugin((nuxtApp) => {
  const firebaseConfig = {
    apiKey: 'AIzaSyBLFNC5CHR0SvS58Uw8o7S-cTG93Z9Fov0',
    authDomain: 'zara-60ae1.firebaseapp.com',
    projectId: 'zara-60ae1',
    storageBucket: 'zara-60ae1.firebasestorage.app',
    messagingSenderId: '834235337206',
    appId: '1:834235337206:web:abef750450135edeaadfd7',
    measurementId: 'G-42K2128L0C',
  }

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const auth = getAuth(app)
  const storage = getStorage(app)

  return {
    provide: {
      db,
      auth,
      storage,
    },
  }
})
