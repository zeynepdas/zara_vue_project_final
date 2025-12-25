<template>
  <div class="help-page zds-theme">
    <!-- Hero Section -->
    <header class="help-view__header" :style="{ '--layout-header-height': '149px' }">
      <section
        class="help-hero"
        :style="{ backgroundImage: `url(${contentStore.helpHeroImage})` }"
      >
        <div class="hero-content">
          <h1 class="hero-title">YARDIM</h1>
          <div class="search-container">
            <input
              type="text"
              placeholder="SİZE NASIL YARDIMCI OLABİLİRİZ?"
              class="help-search-input"
            />
          </div>
        </div>
      </section>
    </header>

    <!-- Content Section -->
    <main class="help-view__content">
      <!-- SIK SORULAN SORULAR -->
      <div class="help-column faq-column">
        <h2 class="column-title">SIK SORULAN SORULAR</h2>
        <ul class="help-list">
          <li v-for="link in faqs" :key="link">
            <A_Link href="#">{{ link }}</A_Link>
          </li>
        </ul>
      </div>

      <!-- TÜM YARDIM KONULARI -->
      <div class="help-column topics-column">
        <h2 class="column-title">TÜM YARDIM KONULARI</h2>

        <div class="topic-grid">
          <div v-for="group in topicGroups" :key="group.title" class="topic-group">
            <h3 class="topic-heading">{{ group.title }}</h3>
            <ul class="help-list">
              <li v-for="item in group.items" :key="item">
                <A_Link href="#">{{ item }}</A_Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer Contact -->
    <footer class="help-footer">
      <div class="footer-contact-box">
        <svg class="message-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
            stroke="black"
            stroke-width="0.8"
          />
        </svg>
        <div class="footer-text-group">
          <p class="footer-msg">ARADIĞINIZI BULAMIYOR MUSUNUZ?</p>
          <A_Link href="/contact" class="contact-link">Bizimle iletişime geçin</A_Link>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import A_Link from '~/src/components/atoms/A_Link.vue'
import { useContentStore } from '~/stores/content'

const contentStore = useContentStore()

onMounted(() => {
  contentStore.fetchHelpContent()
})

const faqs = [
  '50 Creators',
  'SİPARİŞİMİ NASIL İADE EDEBİLİRİM?',
  'ONLINE SİPARİŞİMİN DURUMU',
  'İADE GERİ ÖDEMESİ',
  'MAĞAZA ALIŞVERİŞ FİŞİNİ BUL',
  'ÜRÜN STOK DURUMU',
  'FİYAT POLİTİKASI',
]

const topicGroups = [
  {
    title: 'ZARA HESABIM',
    items: ['KAYDOLMA VE OTURUM AÇMA', 'PROFİL YÖNETİMİ', 'FAVORİLERİM'],
  },
  {
    title: 'ÜRÜNLER VE BEDENLER',
    items: [
      '50 Creators',
      'ÜRÜN STOK DURUMU',
      'BEDENİMİ BUL',
      'KİŞİSELLEŞTİRİLMİŞ ÜRÜNLER',
      'MALZEMELER VE BAKIM',
      'ÜRÜNLERİMİZİN GARANTİSİ',
      'FİYAT POLİTİKASI',
      'GERİ ÇEKİLEN ÜRÜNLER',
    ],
  },
  {
    title: 'HEDİYE SEÇENEKLERİ',
    items: ['HEDİYE KARTI'],
  },
  {
    title: 'GÖNDERİLER',
    items: [
      'GÖNDERİ YÖNTEMLERİ, SÜRELERİ VE ÜCRETLERİ',
      'BİRDEN FAZLA GÖNDERİYE BÖLÜNEN SİPARİŞLER',
      'HANGİ ADRESE GÖNDEREBİLİRİM?',
    ],
  },
  {
    title: 'ÖDEMELER VE FATURALAR',
    items: ['ÖDEME YÖNTEMLERİ', 'ÖDEME GÜVENLİĞİ', 'FATURALAR', 'HEDİYE KARTIYLA ÖDEME'],
  },
  {
    title: 'ALIŞVERİŞLERİM',
    items: [
      'ONLINE ALIŞVERİŞ',
      'ONLINE SİPARİŞİMİN DURUMU',
      'ONLINE SİPARİŞ DÜZENLEME, ADRES DEĞİŞİKLİĞİ VE İPTAL ETME',
      'SİPARİŞİMLE İLGİLİ SORUNLAR',
      'MAĞAZA ALIŞVERİŞ FİŞİNİ BUL',
      'MAĞAZALARIMIZDAKİ CİHAZLARDAN ONLINE ALIŞVERİŞ',
    ],
  },
  {
    title: 'DEĞİŞİM, İADE VE GERİ ÖDEMELER',
    items: [
      'SİPARİŞİMİ NASIL İADE EDEBİLİRİM?',
      'ÜRÜNLERİMİ NASIL DEĞİŞTİREBİLİRİM?',
      'İADE GERİ ÖDEMESİ',
      'HEDİYE KARTIYLA ÖDENEN ALIŞVERİŞLERİN GERİ ÖDEMESİ',
      'ÖZEL İADE KOŞULLARI',
      'İADE İÇİN GEREKEN BELGELER',
    ],
  },
  {
    title: 'ZARA DENEYİMLERİ',
    items: [
      'KULLANILMIŞ GİYSİ BAĞIŞI PROGRAMIMIZ',
      'UYGULAMADA MAĞAZA TURU',
      'BÜLTEN',
      'TRAVEL MODE',
    ],
  },
]

definePageMeta({
  layout: 'default',
})
</script>

<style scoped>
/* ZARA DESIGN SYSTEM TOKENS (Adapted from provided snippet) */
.zds-theme {
  /* Spacing */
  --spacing-00: 0.125rem;
  --spacing-01: 0.25rem;
  --spacing-02: 0.5rem;
  --spacing-03: 0.75rem;
  --spacing-04: 1rem;
  --spacing-05: 1.25rem;
  --spacing-06: 1.5rem;
  --spacing-07: 2rem;
  --spacing-08: 2.5rem;
  --spacing-09: 3rem;
  --spacing-10: 3.5rem;
  --spacing-11: 4rem;
  --spacing-12: 4.5rem;
  --spacing-13: 5rem;
  --spacing-14: 6rem;
  --spacing-15: 7rem;
  --spacing-16: 7.5rem;

  /* Layout */
  --layout-header-height: 149px; /* Fallback or dynamic */
  --layout-content-vertical-padding: var(--spacing-05);
  --layout-lateral-margin: var(--spacing-05);

  /* Fonts */
  --font-family-main: 'Helvetica Now Text', 'Helvetica', 'Arial', sans-serif;
  --font-size-body-s: 0.625rem;
  --line-height-body-s: 1rem;
  --font-size-body-m: 0.6875rem;
  --line-height-body-m: 1.125rem;
  --font-size-body-l: 0.8125rem;
  --line-height-body-l: 1.25rem;

  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;

  --letter-spacing-body-l: 0;
  --font-stretch-body-l: normal;

  /* Colors */
  --color-basic-black: #000;
  --color-basic-white: #fff;
  --color-content-high: var(--color-basic-black);
  --color-content-mid: #757575;
  --color-background-base: var(--color-basic-white);
  --color-surface-low-alt: #e5e5e5;

  /* Applied Base Styles */
  font-family: var(--font-family-main);
  background-color: var(--color-background-base);
  color: var(--color-content-high);
  font-size: var(--font-size-body-l);
  line-height: var(--line-height-body-l);
  font-weight: var(--font-weight-light);
}

.help-page {
  min-height: 100vh;
  width: 100%;
}

/* Header & Hero */
.help-hero {
  position: relative;
  width: 100%;
  height: 800px; /* Further increased vertical size */
  background-size: cover;
  background-position: top center; /* Changed from center to top to show upper part of photo */
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 350px; /* Adjusted text position for larger height */
  margin-bottom: 120px;
}

.help-hero::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(1px);
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  width: 100%;
  max-width: 600px;
}

.hero-title {
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.1rem;
  margin-bottom: 48px;
  text-transform: uppercase;
}

/* SEARCH BOX (Styled per snippet concepts) */
.search-container {
  width: 100%;
  border-bottom: 1px solid var(--color-basic-black);
  padding-bottom: 4px;
}

.help-search-input {
  width: 100%;
  border: none;
  background: transparent;
  font-family: var(--font-family-main);
  font-size: 10px;
  text-transform: uppercase;
  text-align: center;
  outline: none;
  letter-spacing: 0.05rem;
  color: var(--color-content-high);
}

/* Content Grid - EXACTLY as requested */
.help-view__content {
  display: grid;
  height: auto;
  column-gap: var(--spacing-04);
  row-gap: var(--spacing-06);
  grid-template-columns: 0 repeat(2, 1fr) 0;
  grid-template-rows: auto auto;
  padding-bottom: 40px;

  /* Variables re-asserted for grid context if needed */
  --layout-lateral-margin: var(--spacing-05);
}

@media screen and (min-width: 48rem) {
  .help-view__content {
    column-gap: var(--spacing-12);
    grid-template-columns: 0 repeat(4, 1fr) 0;
    row-gap: var(--spacing-10);
    --layout-lateral-margin: var(--spacing-09);
  }
}

/* Column Placement */
.help-column {
  /* Default placement logic matching snippet's responsive patterns */
}

.faq-column {
  grid-column: 2 / span 2; /* Small screens: span full width (2 cols) */
}

.topics-column {
  grid-column: 2 / span 2; /* Small screens */
}

@media screen and (min-width: 48rem) {
  .faq-column {
    grid-column: 2 / span 1; /* Desktop: 1 col */
  }

  .topics-column {
    grid-column: 3 / span 3; /* Desktop: 3 cols wide */
  }
}

.column-title {
  font-size: 0.9375rem; /* ~15px, roughly title-m */
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-09);
  letter-spacing: 0;
  text-transform: uppercase;
}

/* Topic Grid */
.topic-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-09) var(--spacing-06);
}

@media screen and (max-width: 64rem) {
  .topic-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 48rem) {
  .topic-grid {
    grid-template-columns: 1fr;
  }
}

.topic-group {
  margin-bottom: var(--spacing-04);
}

.topic-heading {
  font-size: var(--font-size-label-m);
  font-weight: 600;
  margin-bottom: var(--spacing-06);
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

/* Help List Links */
.help-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.help-list li {
  margin-bottom: var(--spacing-02);
}

.help-list li :deep(a) {
  font-family: var(--font-family-main);
  font-size: var(--font-size-body-m); /* 11px equivalent */
  color: var(--color-content-high);
  text-decoration: none;
  text-transform: uppercase;
  font-weight: var(--font-weight-light);
  line-height: var(--line-height-body-m);
}

.help-list li :deep(a:hover) {
  text-decoration: underline;
}

/* Footer & Icons */
.help-footer {
  padding: 40px 0 80px;
  display: flex;
  justify-content: center;
}

.footer-contact-box {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-06);
}

.footer-text-group {
  display: flex;
  flex-direction: column;
}

.footer-msg {
  font-size: var(--font-size-body-m);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-01);
  text-transform: uppercase;
}

.contact-link {
  font-size: var(--font-size-body-m);
  text-decoration: underline;
  color: var(--color-content-high);
  font-weight: var(--font-weight-light);
  text-transform: uppercase;
}
</style>
