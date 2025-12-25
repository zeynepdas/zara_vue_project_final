<template>
  <header class="o-header layout-header-std" :class="{ 'is-home': isHomePage }">
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
          <router-link to="/">
            <A_Image :src="logoSrc" alt="Zara Logo" class="o-header__logo-img" />
          </router-link>
        </div>
      </div>

      <div class="o-header__right-group">
        <div class="o-header__search-area">
          <A_InputText placeholder="ARA" class="o-header__search-input" />
        </div>
        <template v-if="!isCartPage">
          <A_Link v-if="!user" href="/login" class="o-header__nav-link">GİRİŞ YAP</A_Link>
          <router-link v-else to="/profile" class="o-header__user-info-link">
            <div class="o-header__user-info">
              <span class="o-header__user-name">{{ userName }}</span>
              <span class="user-status-dot"></span>
            </div>
          </router-link>
        </template>
        <A_Link v-if="!isCartPage" href="/help" class="o-header__nav-link">YARDIM</A_Link>
        <div v-if="!isCartPage" class="o-header__cart">
          <A_Link href="/cart" class="o-header__nav-link">SEPET [{{ totalItems }}]</A_Link>
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
          <a
            href="#"
            @click.prevent
          >
            {{ tab }}
          </a>
        </li>
      </ul>

      <div class="dropdown-content-grid">
        <div class="category-media-banner">
          <div class="media-placeholder-item">
            <A_Image :src="currentMenuImage" class="category-image" alt="Kategori Görseli" />
          </div>
        </div>

        <ul class="category-list">
          <li
            v-for="(item, index) in currentCategories"
            :key="index"
            :class="{ 'extra-gap-bottom': item.extraMargin }"
          >
            <a
              href="#"
              :class="{
                highlight: item.isHighlight,
                'is-open': item.isOpen,
                'anniversary-link': item.name === '50. YIL DÖNÜMÜ',
              }"
              @click.prevent="handleCategoryClick(item)"
            >
              {{ item.name }}
              <span v-if="item.badge" class="badge">{{ item.badge }}</span>
              <span v-if="item.expandable" class="submenu-icon">{{ item.isOpen ? '-' : '+' }}</span>
            </a>

            <ul v-if="item.expandable && item.isOpen" class="sub-list">
              <li v-for="(sub, i) in item.children" :key="i">
                <a href="#" :class="{ 'is-red-text': sub.isRed }">{{ sub.name }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useContentStore } from '@/stores/content' // Import Content Store
import { mapState, mapActions } from 'pinia'
import LogoSource from '../../assets/images/Logo.png'
import A_Link from '../atoms/A_Link.vue'
// import A_Text from '../atoms/A_Text.vue' // Not used in template but imported in user snippet
// import A_Icon from '../atoms/A_Icon.vue' // Not used in template
import A_InputText from '../atoms/A_InputText.vue'
import A_Image from '../atoms/A_Image.vue'

// Görselinizi buraya import edin
import ImgKadin from '../../assets/images/zara_1.jpg' // Kadın görseli
import ImgErkek from '../../assets/images/urun_erkek.jpg' // Erkek görseli
import ImgCocuk from '../../assets/images/cocuk_banner.jpg' // Çocuk görseli
import ImgHome from '../../assets/images/slider_foto2.png' // Home görseli

export default {
  name: 'O_Header',
  components: {
    A_Link,
    A_InputText,
    A_Image,
  },
  data() {
    return {
      logoSrc: LogoSource,
      isMenuOpen: false,
      activeTab: 'KADIN',
      anniversaryColor: '#ff0000',
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ff00ff', '#ff8800', '#00cccc'],
      colorIndex: 0,
      colorTimer: null,
      // Local fallback images
      menuImages: {
        KADIN: ImgKadin,
        ERKEK: ImgErkek,
        ÇOCUK: ImgCocuk,
        'ZARA HOME': ImgHome,
        'ZARA SRPLS': ImgKadin,
        '50. YIL DÖNÜMÜ': ImgKadin,
        BEAUTY: ImgKadin,
        'TRAVEL MODE': ImgKadin,
      },
      tabs: [
        'KADIN',
        'ERKEK',
        'ÇOCUK',
        'ZARA HOME',
        'ZARA SRPLS',
        '50. YIL DÖNÜMÜ',
        'BEAUTY',
        'TRAVEL MODE',
      ],

      categories: {
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
          { name: 'AARON LEVINE X ZARA', badge: 'NEW', extraMargin: true },
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
      },
    }
  },
  computed: {
    currentCategories() {
      return this.categories[this.activeTab] || []
    },
    currentMenuImage() {
      // Priority 1: Firestore Image
      if (this.categoryImages && this.categoryImages[this.activeTab]) {
        return this.categoryImages[this.activeTab]
      }
      // Priority 2: Local Fallback
      return this.menuImages[this.activeTab] || this.menuImages['KADIN']
    },
    isCartPage() {
      return this.$route.path === '/cart'
    },
    isHomePage() {
      // Treat Help page as "home-like" for transparent header effect
      return this.$route.path === '/' || this.$route.path === '/help'
    },
    ...mapState(useAuthStore, ['user']),
    ...mapState(useContentStore, ['categoryImages']), // Map content state
    ...mapState(useCartStore, ['totalItems']),
    userName() {
      if (!this.user) return ''
      if (this.user.displayName) return this.user.displayName.split(' ')[0].toUpperCase()

      const emailName = this.user.email?.split('@')[0] || ''
      // "zeynepdas" gibi bitişik isimleri ayırmak veya sadece ilk kısmı almak için:
      if (emailName.toLowerCase().startsWith('zeynep')) return 'ZEYNEP'

      return emailName.toUpperCase()
    },
  },
  methods: {
    ...mapActions(useContentStore, ['fetchCategoryImages']), // Map content action
    toggleMenuState() {
      this.isMenuOpen = !this.isMenuOpen
    },
    toggleSub(item) {
      if (item.expandable) {
        item.isOpen = !item.isOpen
      }
    },
    handleCategoryClick(item) {
      // If it's "AARON LEVINE X ZARA", navigate to collaboration special page
      if (item.name === 'AARON LEVINE X ZARA') {
        this.$router.push('/aaron-levine')
        this.isMenuOpen = false
        return
      }

      // If it's "THE ITEM", navigate to special page
      if (item.name === 'THE ITEM') {
        this.$router.push('/the-item')
        this.isMenuOpen = false
        return
      }

      // If it's "THE NEW", navigate to category-specific page
      if (item.name === 'THE NEW') {
        // Create slug based on active tab and item name
        const categoryPrefix = this.activeTab.toLowerCase()
        const slug = `${categoryPrefix}-the-new`
        this.$router.push(`/category/${slug}`)
        this.isMenuOpen = false
      } else if (item.expandable) {
        // If it's expandable, toggle the submenu
        this.toggleSub(item)
      } else {
        // For other items, navigate to their category page
        const categoryPrefix = this.activeTab.toLowerCase()
        const itemSlug = item.name
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[ıİ]/g, 'i')
          .replace(/[şŞ]/g, 's')
          .replace(/[ğĞ]/g, 'g')
          .replace(/[üÜ]/g, 'u')
          .replace(/[öÖ]/g, 'o')
          .replace(/[çÇ]/g, 'c')
        const slug = `${categoryPrefix}-${itemSlug}`
        this.$router.push(`/category/${slug}`)
        this.isMenuOpen = false
      }
    },
  },
  mounted() {
    this.fetchCategoryImages() // Fetch images on mount
    this.colorTimer = setInterval(() => {
      this.colorIndex = (this.colorIndex + 1) % this.colors.length
      this.anniversaryColor = this.colors[this.colorIndex]
    }, 1000)
  },
  beforeUnmount() {
    if (this.colorTimer) clearInterval(this.colorTimer)
  },
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
  z-index: 1000;
  background-color: white;
  padding: 0;
  color: black;
  transition: background-color 0.3s ease;
}

/* Homepage transparent header */
.layout-header-std.is-home {
  background-color: transparent;
  position: absolute;
}

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
  width: 60px;
  height: 30px;
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
}

.icon-line {
  position: absolute;
  width: 100%;
  height: 1px;
  background: var(--color-basic-black);
  transition: 0.3s ease;
}

.icon-line:nth-child(1) {
  top: 0;
}
.icon-line:nth-child(2) {
  top: 10px; /* Increased spacing */
}
.icon-line:nth-child(3) {
  bottom: 5px; /* Adjusted to balance */
}

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
  transition: none !important; /* Force disable any transition */
}

.o-header__right-group {
  display: flex;
  align-items: center;
  gap: var(--spacing-06);
  font-size: var(--font-size-body-m);
  text-transform: uppercase;
}

.o-header__search-input {
  border: none !important;
  border-bottom: 1px solid var(--color-basic-black) !important;
  text-align: left;
  padding: 0 0 4px 0 !important;
  width: 180px; /* Reduced from 250px */
  background: transparent !important;
  font-size: 11px;
  font-weight: 300;
  letter-spacing: 0.8px;
  caret-color: black;
}

/* Adjusting placeholder specifically if possible, otherwise use standard A_InputText */
.o-header__search-input ::placeholder {
  color: black;
  opacity: 1;
  font-size: 11px;
  font-weight: 300;
}

.o-header__nav-link {
  text-decoration: none;
  color: var(--color-basic-black);
  font-size: 11px;
  font-weight: 300;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}

.o-header__user-info-link {
  text-decoration: none;
  color: inherit;
}

.o-header__user-info {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.o-header__user-name {
  font-size: 11px;
  font-weight: 300;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: black;
}

.user-status-dot {
  width: 5px;
  height: 5px;
  background-color: #0087ff; /* Blue dot from image */
  border-radius: 50%;
  margin-bottom: 6px; /* Position it slightly above baseline as in image */
}

/* DROPDOWN */
/* DROPDOWN */
.category-dropdown {
  position: fixed; /* Fixed to cover screen */
  top: 140px; /* Adjust based on header height */
  left: 0;
  width: 50vw;
  height: calc(100vh - 140px);
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 999;
  padding: 0 48px 48px 48px; /* Removed top padding to be 'bitişik' */
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
  overflow-y: auto;
}

.category-dropdown.is-visible {
  opacity: 1;
  visibility: visible;
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 40px;
}

.dropdown-tabs {
  list-style: none;
  padding: 0;
  margin-top: 10px; /* Reduced margin to bring closer to header */
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-right: 1px solid #eee;
  padding-right: 20px;
}
.dropdown-tabs li a {
  font-size: 0.8125rem;
  font-weight: 500;
  text-transform: uppercase;
  text-decoration: none;
  color: black;
  display: block;
}
.dropdown-tabs li.active a {
  font-weight: bold;
}

.dropdown-content-grid {
  padding-top: 10px; /* Aligned with tabs */
  display: block;
  width: 100%;
}

.category-media-banner {
  width: 100%;
  margin-bottom: 1rem; /* Reduced from 2rem */
}
.media-placeholder-item {
  width: 100%;
  height: 250px; /* Reduced from 400px for compactness */
  display: flex;
  justify-content: center;
  align-items: center;
}
.category-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center; /* Explicitly align top-center for All categories (Woman, Man, Child) */
  display: block;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.category-list li {
  margin-bottom: 8px; /* Reduced from 12px */
}
.category-list li.extra-gap-bottom {
  margin-bottom: 16px; /* Reduced from 24px */
}
.category-list a {
  font-size: 0.6875rem;
  font-weight: 300;
  text-transform: uppercase;
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  align-items: center;
  color: black !important;
  text-decoration: none;
}
.category-list a.highlight {
  color: red !important;
  font-weight: 500 !important;
}
.badge {
  font-size: 9px;
  font-weight: bold;
  color: black;
  margin-left: 6px;
}
.submenu-icon {
  font-size: 14px;
  font-weight: 500;
  margin-left: auto;
  flex-shrink: 0;
}

.sub-list {
  margin-top: 8px;
  margin-left: 12px;
  list-style: none;
  padding-left: 0;
}
.sub-list li {
  margin-bottom: 8px;
}
.sub-list a {
  font-size: 0.6875rem;
  color: black;
  font-weight: 300;
}
.sub-list a.is-red-text {
  color: red !important;
  font-weight: 500;
}

@media (max-width: 768px) {
  .category-dropdown {
    width: 100vw;
    top: 100px;
    height: calc(100vh - 100px);
  }
  .o-header__main-row {
    padding: 1rem 1.5rem;
  }
}
</style>
