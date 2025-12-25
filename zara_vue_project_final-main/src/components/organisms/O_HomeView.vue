<template>
  <div class="o-home-view">
    <!-- First Slider Screen -->
    <section class="home-slider-section">
      <O_CarouselSlider :slides="topSlides" />
    </section>

    <!-- Second Slider Screen below the first one -->
    <section class="home-slider-section">
      <O_CarouselSlider :slides="bottomSlides" />
    </section>
  </div>
</template>

<script>
import O_CarouselSlider from './O_CarouselSlider.vue'

// Images & Videos for the sliders
import Img2 from '../../assets/images/home_design.png'
import Img3 from '../../assets/images/zara-foto3.png'
import ImgSlider from '../../assets/images/slider_foto.jpg'
import ImgCocuk from '../../assets/images/cocuk_banner.jpg'
import ImgErkek from '../../assets/images/urun_erkek.jpg'
import Vid1 from '../../assets/videos/skivideo.mp4'

export default {
  name: 'O_HomeView',
  components: {
    O_CarouselSlider,
  },
  data() {
    return {
      topSlides: [
        {
          type: 'video',
          src: Vid1,
          alt: 'Video 1',
          text: 'THE SKI COLLECTION',
        },
        {
          type: 'image',
          src: Img2,
          alt: 'Image 2',
          text: 'HOME COLLECTION',
        },
        {
          type: 'image',
          src: Img3,
          alt: 'Image 3',
          text: 'WOMAN NEW COLLECTION',
        },
      ],
      bottomSlides: [
        {
          type: 'image',
          src: ImgSlider,
          alt: 'Slider Image',
          text: 'NEW ARRIVALS',
        },
        {
          type: 'image',
          src: ImgCocuk,
          alt: 'Kids Collection',
          text: 'KIDS COLLECTION',
        },
        {
          type: 'image',
          src: ImgErkek,
          alt: 'Men Collection',
          text: 'MEN COLLECTION',
        },
      ],
    }
  },
}
</script>

<style scoped>
.o-home-view {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.home-slider-section {
  width: 100%;
  height: 100vh;
}
</style>
