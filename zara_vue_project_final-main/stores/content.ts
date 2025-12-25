import { defineStore } from 'pinia'
import { doc, getDoc } from 'firebase/firestore'

export const useContentStore = defineStore('content', {
  state: () => ({
    // Default starting image (can be overwritten by Firestore)
    helpHeroImage: '',
    categoryImages: {} as Record<string, string>,
    sliderVideoUrl: '', // Homepage slider video
    sliderImage2: '', // Second slide image
    sliderMedia: {
      topSlides: [] as any[],
      bottomSlides: [] as any[],
      thirdSlides: [] as any[]
    },
    loading: false
  }),

  actions: {
    async fetchHelpContent() {
      this.loading = true
      try {
        if (import.meta.client) {
          const { $db } = useNuxtApp()
          const docRef = doc($db, 'site_content', 'help_page')
          const docSnap = await getDoc(docRef)

          if (docSnap.exists()) {
            const data = docSnap.data()
            if (data.heroImage) {
              this.helpHeroImage = data.heroImage
            }
          }
        }
      } catch (err) {
        console.error('Error fetching help content', err)
      } finally {
        this.loading = false
      }
    },

    async fetchCategoryImages() {
      try {
        if (import.meta.client) {
          const { $db } = useNuxtApp()
          // Changed collection to 'ui_menus' as requested to distinguish from site_content
          const docRef = doc($db, 'ui_menus', 'images')
          const docSnap = await getDoc(docRef)

          if (docSnap.exists()) {
            const data = docSnap.data()
            // Map the fields to our state
            this.categoryImages = data as Record<string, string>
          }
        }
      } catch (err) {
        console.error('Error fetching category images', err)
      }
    },

    async fetchHomeSliderVideo() {
      try {
        if (import.meta.client) {
          const { $db } = useNuxtApp()
          // New collection for homepage media
          const docRef = doc($db, 'homepage_media', 'slider')
          const docSnap = await getDoc(docRef)

          console.log('Fetching slider video...', docSnap.exists())

          if (docSnap.exists()) {
            const data = docSnap.data()
            console.log('Slider data:', data)
            if (data.videoUrl) {
              this.sliderVideoUrl = data.videoUrl
              console.log('Video URL set to:', data.videoUrl)
            } else {
              console.warn('No videoUrl field found in slider document')
            }
            if (data.image2Url) {
              this.sliderImage2 = data.image2Url
              console.log('Image 2 URL set to:', data.image2Url)
            }
          } else {
            console.warn('No slider document found in homepage_media collection')
          }
        }
      } catch (err) {
        console.error('Error fetching home slider video', err)
      }
    },

    async fetchSliderMedia() {
      try {
        if (import.meta.client) {
          const { $db } = useNuxtApp()
          // Fetch slider content from 'slider_content' collection
          const docRef = doc($db, 'slider_content', 'slides')
          const docSnap = await getDoc(docRef)

          if (docSnap.exists()) {
            const data = docSnap.data()
            console.log('Slider media fetched:', data)

            // Expected structure: { topSlides: [...], bottomSlides: [...], thirdSlides: [...] }
            if (data.topSlides) this.sliderMedia.topSlides = data.topSlides
            if (data.bottomSlides) this.sliderMedia.bottomSlides = data.bottomSlides
            if (data.thirdSlides) this.sliderMedia.thirdSlides = data.thirdSlides
          }
        }
      } catch (err) {
        console.error('Error fetching slider media', err)
      }
    }
  }
})
