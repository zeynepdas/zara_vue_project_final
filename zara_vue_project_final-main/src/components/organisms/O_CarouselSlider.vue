<template>
  <div class="slider-container">
    <div class="slider-wrapper" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div v-for="(slide, index) in slides" :key="index" class="slider-item">
        <div class="media-wrapper">
          <img
            v-if="slide.type === 'image'"
            :src="slide.src"
            :alt="slide.alt"
            class="media-content"
          />

          <div v-else-if="slide.type === 'video'" class="video-container">
            <video class="media-content" autoplay muted loop playsinline :src="slide.src">
              Tarayıcınız videoyu desteklemiyor.
            </video>
          </div>

          <div v-else-if="slide.type === 'embed'" class="embed-container">
            <div class="embed-content" v-html="slide.src"></div>
          </div>
        </div>
      </div>
    </div>

    <button class="slider-nav-btn slider-nav-btn--prev" @click="prevSlide">
      <svg
        class="slider-spot-universe-pagers-item__icon"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="inherit"
        stroke="inherit"
      >
        <path d="M12 4l-8 8 8 8 .677-.677-6.844-6.844H20v-.958H5.833l6.844-6.844L12 4z"></path>
      </svg>
    </button>

    <button class="slider-nav-btn slider-nav-btn--next" @click="nextSlide">
      <svg
        class="slider-spot-universe-pagers-item__icon"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="inherit"
        stroke="inherit"
      >
        <path
          d="M18.164 11.518H4v.958h14.17l-6.847 6.847L12 20l8-8-8-8-.677.677 6.841 6.841z"
        ></path>
      </svg>
    </button>

    <div class="slider-caption">
      <span class="caption-text">{{ currentSlideText }}</span>
    </div>
  </div>
</template>

<script>
// Slides are now passed via props

export default {
  name: 'O_CarouselSlider',
  props: {
    slides: {
      type: Array,
      required: true,
      default: () => [],
    },
    // Adding a unique ID prop might be helpful for multiple instances if needed,
    // but the component logic seems independent per instance already.
  },
  data() {
    return {
      currentIndex: 0,
    }
  },
  computed: {
    currentSlideText() {
      if (!this.slides || this.slides.length === 0 || !this.slides[this.currentIndex]) {
        return ''
      }
      return this.slides[this.currentIndex].text
    },
  },
  methods: {
    nextSlide() {
      if (this.currentIndex < this.slides.length - 1) {
        this.currentIndex++
      } else {
        this.currentIndex = 0
      }
    },
    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--
      } else {
        this.currentIndex = this.slides.length - 1
      }
    },
    processEmbeds() {
      // Instagram embeds need to be processed to render correctly
      if (window.instgrm) {
        window.instgrm.Embeds.process()
      } else {
        // Load script if not present
        const script = document.createElement('script')
        script.async = true
        script.src = 'https://www.instagram.com/embed.js'
        document.body.appendChild(script)
      }
    },
  },
  mounted() {
    this.processEmbeds()
  },
  watch: {
    currentIndex() {
      // Re-process when slide changes to ensure nested embeds are ready
      this.$nextTick(() => {
        this.processEmbeds()
      })
    },
    slides: {
      handler() {
        this.$nextTick(() => {
          this.processEmbeds()
        })
      },
      deep: true,
    },
  },
}
</script>

<style scoped>
.slider-container {
  position: relative;
  width: 100%;
  height: 100vh;
  padding-top: 0; /* Removed padding to start from the very top */
  overflow: hidden;
  background-color: white;
  font-family: 'Helvetica Now Text', 'Helvetica', 'Arial', 'sans-serif';
}

.slider-wrapper {
  display: flex;
  width: 100%;
  height: 100%; /* Full height */
  transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}

.slider-item {
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  position: relative;
}

.media-wrapper,
.video-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.media-content {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 40%; /* Position slightly above center */
  display: block;
}

.embed-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
  overflow-y: auto;
}

.embed-content {
  width: 100%;
  max-width: 540px;
  margin: 0 auto;
  padding: 20px;
}

.slider-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 10;
  padding: 20px;
  color: black;
  opacity: 0;
  transition: opacity 0.3s;
}

.slider-container:hover .slider-nav-btn {
  opacity: 1;
}

.slider-nav-btn--prev {
  left: 0px;
}
.slider-nav-btn--next {
  right: 0px;
}

.slider-spot-universe-pagers-item__icon {
  display: block;
  width: 32px;
  height: 32px;
}

.slider-caption {
  position: absolute;
  bottom: 48px;
  right: 48px;
  text-align: right;
  z-index: 5;
}

.caption-text {
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: black;
}

@media (max-width: 768px) {
  .slider-caption {
    right: 24px;
    bottom: 24px;
  }
  .slider-nav-btn {
    display: none;
  }
}
</style>
