<template>
  <div class="zara-home">
    <!-- First Slider -->
    <div class="slider-section">
      <O_CarouselSlider :slides="topSlides" />
    </div>

    <!-- Second Slider -->
    <div class="slider-section">
      <O_CarouselSlider :slides="bottomSlides" />
    </div>

    <!-- Third Slider (before footer) -->
    <div class="slider-section third-slider">
      <O_CarouselSlider :slides="thirdSlides" />
    </div>

    <!-- Accessibility Icon Placeholder -->
    <div class="a11y-icon">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="black">
        <circle cx="12" cy="12" r="10" stroke="none" />
        <path d="M12 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm4 5h-2v5h2v2H8v-2h2V9H8V7h8v2z" fill="white" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import O_CarouselSlider from '@/src/components/organisms/O_CarouselSlider.vue'
import { useContentStore } from '@/stores/content'
import { computed, onMounted } from 'vue'
import sliderFoto from '@/src/assets/images/slider_foto.jpg'
import sliderFoto2 from '@/src/assets/images/slider_foto2.png'
import sliderFoto3 from '@/src/assets/images/slider_foto3.jpg'
import sliderVideo1 from '@/src/assets/videos/skivideo.mp4'
import sliderVideo2 from '@/src/assets/videos/2slider.mp4'
import sliderVideo3 from '@/src/assets/videos/3slider.mp4'

const contentStore = useContentStore()

onMounted(() => {
  // Fetch the first slider video from Firebase
  contentStore.fetchHomeSliderVideo()
})

// First slide uses Firebase video if available, otherwise local video
const topSlides = computed(() => [
  {
    type: 'video',
    src: contentStore.sliderVideoUrl || sliderVideo1, // Firebase video or fallback
    text: 'SEASONAL SELECTION',
  },
  {
    type: 'image',
    src: contentStore.sliderImage2 || sliderFoto, // Firebase image or fallback
    text: 'NEW ARRIVALS / WOMAN',
  },
  {
    type: 'image',
    src: 'https://static.zara.net/photos///assets/public/a10f/894c/bea3447ea17d/1ecd67bedb4a//svg-portrait-ipad-f9d130bc-aaef-47d9-acda-be2ad48b3889-tr-tr-tr.svg?ts=1766054409250',
    text: 'AARON LEVINE X ZARA',
  },
])

const bottomSlides = [
  {
    type: 'video',
    src: sliderVideo2,
    text: 'ZARA / NEW COLLECTION',
  },
  {
    type: 'image',
    src: sliderFoto2,
    text: 'ZARA HOME / NEW COLLECTION',
  },
  {
    type: 'image',
    src: sliderFoto3,
    text: 'WEEKLY SELECTION',
  },
  {
    type: 'image',
    src: 'https://static.zara.net/photos///assets/public/edb2/5957/66ad495b990e/aaf6b42e49bf//svg-portrait-fit-39ea4434-32de-4d10-b653-97fed13a7c42-default.svg?ts=1764762891500',
    text: 'NEW ARRIVALS / MAN',
  },
]

const thirdSlides = [
  {
    type: 'video',
    src: sliderVideo3,
    text: 'KIDS / WINTER TALES',
  },
]
</script>

<style scoped lang="scss">
.zara-home {
  width: 100vw;
  background: white;
  display: flex;
  flex-direction: column;
}

.slider-section {
  width: 100%;
  height: 100vh;
  margin-bottom: 24px; /* Added gap between sliders */
}

/* Ensure no extra gap at the very bottom if needed, or keep for footer */
.slider-section:last-of-type {
  margin-bottom: 0;
}

.a11y-icon {
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  z-index: 2000;
}
</style>
