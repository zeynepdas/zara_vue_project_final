<template>
  <header class="o-header layout-header-std">
    <div class="o-header__main-row">
      <div class="o-header__left-group">
        <div
          class="o-header__menu-icon"
          @click="toggleMenuState"
          :class="{ 'is-active': isMenuOpen }"
        >
          <span class="icon-line"></span>
          <span class="icon-line"></span>
          <span class="icon-line"></span>
        </div>
        <div class="logo-wrapper">
          <A_Image :src="logoSrc" alt="Zara Logo" class="o-header__logo-img" />
        </div>
      </div>

      <div class="o-header__right-group">
        <div class="o-header__search-area">
          <A_InputText placeholder="ARA" class="o-header__search-input" />
        </div>
        <A_Link href="/login" class="o-header__nav-link">GİRİŞ YAP</A_Link>
        <A_Link href="/help" class="o-header__nav-link">YARDIM</A_Link>
        <div class="o-header__cart">
          <A_Link href="/cart" class="o-header__nav-link">SEPET [0]</A_Link>
        </div>
      </div>
    </div>

    <div
      class="category-dropdown"
      :class="{ 'is-visible': isMenuOpen }"
      @click.self="isMenuOpen = false"
    >
      <ul class="dropdown-tabs">
        <li
          v-for="tab in tabs"
          :key="tab"
          :class="{ active: activeTab === tab }"
          @click="activeTab = tab"
        >
          <a href="#" @click.prevent>{{ tab }}</a>
        </li>
      </ul>

      <div class="dropdown-content-grid">
        <div class="category-media-banner">
          <div class="media-placeholder-item">
            <A_Image :src="currentMenuImage" class="category-image" alt="Kategori Görseli" />
          </div>
        </div>

        <div class="category-list-container">
          <template v-for="(item, index) in currentCategories" :key="index">
            <div
              class="category-item-row"
              :class="{ 'extra-gap-bottom': item.extraMargin, highlight: item.isHighlight }"
              @click="toggleSub(item)"
            >
              <span class="category-name">{{ item.name }}</span>
              <span v-if="item.badge" class="badge">{{ item.badge }}</span>
              <span v-if="item.expandable" class="submenu-icon">{{ item.isOpen ? '-' : '+' }}</span>
            </div>

            <ul v-if="item.expandable && item.isOpen" class="sub-list">
              <li v-for="(sub, i) in item.children" :key="i" @click.stop="toggleSub(sub)">
                <!-- Sub items might also need navigation logic if we wanted -->
                <span :class="{ 'is-red-text': sub.isRed }">{{ sub.name }}</span>
              </li>
            </ul>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'

import LogoSource from '../../assets/images/Logo.png'
import A_Link from '../atoms/A_Link.vue'
import A_InputText from '../atoms/A_InputText.vue'
import A_Image from '../atoms/A_Image.vue'

// Images
import ImgKadin from '../../assets/images/zara_1.jpg'
import ImgErkek from '../../assets/images/urun_erkek.jpg'
import ImgCocuk from '../../assets/images/cocuk_banner.jpg'
import ImgHome from '../../assets/images/home_design.png'

const router = useRouter()

// State
const logoSrc = LogoSource
const isMenuOpen = ref(false)
const activeTab = ref('KADIN')

// Data
// Data
const menuImages = {
  KADIN: ImgKadin,
  ERKEK: ImgErkek,
  ÇOCUK: ImgCocuk,
  'ZARA HOME': ImgHome,
  'ZARA SRPLS': ImgKadin,
  '50. YIL DÖNÜMÜ': ImgKadin,
  BEAUTY: ImgKadin,
  'TRAVEL MODE': ImgKadin,
}

const tabs = [
  'KADIN',
  'ERKEK',
  'ÇOCUK',
  'ZARA HOME',
  'ZARA SRPLS',
  '50. YIL DÖNÜMÜ',
  'BEAUTY',
  'TRAVEL MODE',
]

const categories = reactive({
  KADIN: [
    { name: 'THE NEW' },
    { name: '50. YIL DÖNÜMÜ' },
    { name: 'THE ITEM' },
    { name: 'SKI COLLECTION', badge: 'NEW', extraMargin: true },
    { name: 'ÇOK SATANLAR' },
    { name: 'PARTİ' },
    { name: 'KAHVERENGİ DOKUNUŞ' },
    { name: 'ELBİSE' },
    { name: 'WARM EDIT', badge: 'NEW' },
    { name: 'KABAN' },
    { name: 'ŞİŞME MONT' },
    { name: 'CEKET' },
    { name: 'BLAZER' },
    { name: 'KAZAK | HIRKA' },
    { name: 'PANTOLON' },
    { name: 'JEAN' },
    { name: 'TOP' },
    { name: 'GÖMLEK' },
    { name: 'TİŞÖRT' },
    { name: 'BODY' },
    { name: 'TRİKO' },
    { name: 'TAKIM' },
    { name: 'ETEK | ŞORT' },
    { name: 'SWEATSHIRT | EŞOFMAN ALTI' },
    { name: 'DERİ | SÜET' },
    { name: 'AYAKKABI' },
    { name: 'ÇANTA' },
    { name: 'AKSESUAR | TAKI' },
    { name: 'LENCERIA' },
    { name: 'PARFÜM' },
    { name: 'MAKYAJ' },
    { name: 'ZARA HAIR', badge: 'NEW' },
    { name: 'ÖZEL FİYATLAR', isHighlight: true },
    { name: 'EV YILBAŞI', badge: 'NEW', extraMargin: true },
    { name: 'TRF COVERS' },
    { name: 'ÖZEL KOLEKSİYONLAR', extraMargin: true },
    { name: 'TRAVEL MODE' },
  ],
  ERKEK: [
    { name: 'THE NEW' },
    { name: '50. YIL DÖNÜMÜ' },
    { name: 'SKI COLLECTION', badge: 'NEW', extraMargin: true },
    { name: 'TÜMÜNÜ GÖR' },
    { name: 'ÇOK SATANLAR' },
    { name: 'ATHLETICZ SPEED RUN' },
    { name: '10K RACE' },
    { name: 'HEDİYE', badge: 'NEW' },
    { name: 'KIŞ GARDIROBU' },
    { name: 'CEKET | MONT' },
    { name: 'ŞİŞME MONT | YELEK' },
    { name: 'KABAN | TRENÇKOT' },
    { name: 'TRİKO KAZAK' },
    { name: 'HIRKA' },
    { name: 'TİŞÖRT' },
    { name: 'SWEATSHIRT' },
    { name: 'POLO T-SHIRT' },
    { name: 'GÖMLEK' },
    { name: 'PANTOLON' },
    { name: 'JEAN' },
    { name: 'EŞOFMAN TAKIMI' },
    { name: 'İKİLİ TAKIMLAR' },
    { name: 'TAKIM ELBİSE' },
    { name: 'BLAZER' },
    { name: 'DERİ | SÜET' },
    { name: 'BOT' },
    { name: 'AYAKKABI' },
    { name: 'ÇANTA | SIRT ÇANTASI' },
    { name: 'İÇ ÇAMAŞIRI | ÇORAP' },
    { name: 'AKSESUAR' },
    { name: 'PARFÜM' },
    { name: 'MAKYAJ' },
    {
      name: 'ÖZEL FİYATLAR',
      isHighlight: true,
      expandable: true,
      isOpen: false,
      extraMargin: true,
      children: [{ name: 'PROMOSYONLAR', isRed: true }, { name: 'AVANTAJLI FİYATLAR' }],
    },
    { name: 'ZARA HOME' },
    { name: 'EVDE YILBAŞI', badge: 'NEW', extraMargin: true },
    { name: 'ZARA ATHLETICZ / 26 1 18 1' },
    { name: 'SPORTSWEAR' },
    { name: 'ZARA ORIGINS' },
    { name: 'WAYS TO WEAR' },
  ],
  ÇOCUK: [
    { name: 'KIZ ÇOCUK 6 - 14 YAŞ' },
    { name: 'ERKEK ÇOCUK 6 - 14 YAŞ' },
    { name: 'KIZ ÇOCUK 1½ - 6 YAŞ' },
    { name: 'ERKEK ÇOCUK 1½ - 6 YAŞ' },
    { name: 'BEBEK 0 - 18 AY' },
    { name: 'PRE-TEEN' },
    { name: 'AKSESUAR | AYAKKABI | 0-14 YAŞ' },
    { name: 'ZARA HOME ÇOCUK' },
  ],
  'ZARA HOME': [
    { name: 'EV YILBAŞI', badge: 'NEW' },
    { name: 'THE NEW', extraMargin: true },
    { name: 'MOBİLYA' },
    { name: 'NEVRESİM TAKIMI' },
    { name: 'AYNA' },
    { name: 'HALI' },
    { name: 'AYDINLATMA' },
    { name: 'DEKORATİF AKSESUAR' },
    { name: 'SEPET' },
    { name: 'KOLTUK ÖRTÜSÜ | BATTANİYE' },
    { name: 'KIRLENT | İÇ YASTIK' },
    { name: 'PERDE | STOR' },
    { name: 'YEMEK ODASI' },
    { name: 'MUTFAK' },
    { name: 'ÇAMAŞIR | TEMİZLİK' },
    { name: 'BANYO' },
    { name: 'GİYİNME ODASI' },
    { name: 'EV KIYAFETİ' },
    { name: 'HOME SHOES' },
    { name: 'ÇANTA | AKSESUAR' },
    { name: 'EV PARFÜMÜ' },
    { name: 'ÇUBUKLU ODA KOKUSU | MUM', extraMargin: true },
    { name: 'EVCİL HAYVAN' },
    { name: 'ZARA HOME KIDS' },
    { name: 'ZARA HOME YENİDOĞAN' },
  ],
  'ZARA SRPLS': [{ name: 'KADIN ' }, { name: 'ERKEK' }, { name: 'ÇOCUK' }],
  '50. YIL DÖNÜMÜ': [],
  BEAUTY: [{ name: 'MAKYAJ MALZEMELERİ' }, { name: 'CİLT BAKIMI' }],
  'TRAVEL MODE': [{ name: 'TÜM KOLEKSİYON' }, { name: 'VALİZLER' }],
})

// Computed
// @ts-ignore
const currentCategories = computed(() => categories[activeTab.value] || [])
const currentMenuImage = computed(() => {
  // @ts-ignore
  return menuImages[activeTab.value] || menuImages['KADIN'] || ''
})

// Methods
const toggleMenuState = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// @ts-ignore
const slugify = (text) => {
  let str = text.toLowerCase()
  str = str
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ş/g, 's')
    .replace(/ü/g, 'u')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')

  return str
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

// @ts-ignore
const toggleSub = (item) => {
  if (item.expandable) {
    item.isOpen = !item.isOpen
  } else {
    // Navigate
    const slug = slugify(item.name)
    console.log('Navigating to:', slug) // Debug
    isMenuOpen.value = false
    router.push(`/category/${slug}`)
  }
}
</script>

<style scoped>
:root {
  --spacing-05: 1.25rem;
  --spacing-06: 1.5rem;
  --spacing-09: 3rem;
  --font-size-body-m: 0.6875rem;
  --font-size-body-l: 0.8125rem;
  --font-weight-light: 300;
  --font-weight-medium: 500;
}

.layout-header-std {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000; /* Increased z-index */
  background-color: white;
  padding: 0;
  color: black;
}

/* RESTORED CSS */
.o-header__main-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-05) var(--spacing-09);
  position: relative;
}

.o-header__left-group {
  display: flex;
  align-items: center;
  gap: var(--spacing-06);
}

.o-header__menu-icon {
  width: 60px; /* senin boyutun */
  height: 30px; /* senin boyutun */
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-line {
  position: absolute;
  width: 100%;
  height: 3px;
  background: black;
  border-radius: 2px;
  transition: 0.3s ease;
}

/* Çizgileri tam konumla */
.icon-line:nth-child(1) {
  top: 0;
}
.icon-line:nth-child(2) {
  top: 50%;
  transform: translateY(-50%);
}
.icon-line:nth-child(3) {
  bottom: 0;
}

/* MENÜ AÇILINCA */
.o-header__menu-icon.is-active .icon-line:nth-child(1) {
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}

.o-header__menu-icon.is-active .icon-line:nth-child(2) {
  opacity: 0;
}

.o-header__menu-icon.is-active .icon-line:nth-child(3) {
  bottom: 50%;
  transform: translateY(50%) rotate(-45deg);
}
.o-header__logo-img {
  height: 100px;
  width: auto;
  display: block;
}

.o-header__right-group {
  display: flex;
  align-items: center;
  gap: var(--spacing-06);
  font-size: var(--font-size-body-m);
  text-transform: uppercase;
}

.o-header__search-input {
  border: none;
  border-bottom: 1px solid black;
  text-align: left;
  padding: 0;
  width: 120px;
}
.o-header__nav-link {
  text-decoration: none;
  color: black;
  font-size: var(--font-size-body-m);
  text-transform: uppercase;
}

/* DROPDOWN */
.category-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 50vw;
  height: 600px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1001; /* Higher than header */
  padding: 16px 48px 48px 48px;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
  overflow-y: auto; /* Enable scrolling */
}

.category-dropdown.is-visible {
  opacity: 1;
  visibility: visible;
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 40px;
}

.dropdown-tabs {
  list-style: none;
  padding: 0;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-right: 1px solid #eee;
  padding-right: 20px;
}
.dropdown-tabs li a {
  font-size: var(--font-size-body-l);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  text-decoration: none;
  color: black;
  display: block;
}
.dropdown-tabs li.active a {
  text-decoration: none;
  font-weight: bold;
}

.dropdown-content-grid {
  padding-top: 32px;
  display: block;
  overflow-y: auto;
  width: 100%;
}

/* GÖRSEL STİLLERİ */
.category-media-banner {
  width: 100%;
  margin-bottom: var(--spacing-lg);
  padding-top: var(--spacing-md);
}
.media-placeholder-item {
  width: 80%;
  height: 250px;
  /* Arka plan rengi kaldırıldı, görsel tam kaplasın */
  display: flex;
  justify-content: center;
  align-items: center;
}
.category-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Category List Styles */
.category-list-container {
  padding: 0;
  margin: 0;
}

.category-item-row {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 2px 0;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: var(--font-size-body-m);
  font-weight: var(--font-weight-light);
  text-transform: uppercase;
  color: black;
  transition: opacity 0.2s;
}

.category-item-row:hover {
  opacity: 0.7;
}

.category-item-row.highlight {
  color: red !important;
  font-weight: var(--font-weight-medium) !important;
}

.category-item-row.extra-gap-bottom {
  margin-bottom: 24px;
}
.badge {
  font-size: 9px;
  font-weight: bold;
  color: black;
  margin-left: 6px;
  margin-top: -2px;
}
.submenu-icon {
  font-size: 14px;
  font-weight: 500;
  margin-left: auto; /* En sağa itmek için */
  flex-shrink: 0;
}

/* ALT LİSTE */
/* ALT LİSTE */
.sub-list {
  margin-top: 8px;
  margin-left: 12px;
  list-style: none;
  padding-left: 0;
}
.sub-list li {
  margin-bottom: 8px;
  cursor: pointer;
}
.sub-list span {
  font-size: var(--font-size-body-m);
  color: black;
  font-weight: 300;
}
.sub-list span.is-red-text {
  color: red !important;
  font-weight: var(--font-weight-medium);
}

/* GÖRSEL ALANI */
.highlight-media-area {
  padding-left: 40px;
  border-left: 1px solid #eee;
  text-align: left;
}
.media-placeholder-item {
  width: 100%;
  height: 250px;
  margin-bottom: 16px;
}
.highlight-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.media-description p {
  font-size: 11px;
  color: #757575;
}
</style>
