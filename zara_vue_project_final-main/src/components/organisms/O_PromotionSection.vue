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
    
    <div class="category-dropdown" :class="{ 'is-visible': isMenuOpen }" @click.self="isMenuOpen = false">
        
        <ul class="dropdown-tabs">
            <li v-for="tab in tabs" :key="tab" :class="{ 'active': activeTab === tab }" @click="activeTab = tab">
                <a href="#" @click.prevent>{{ tab }}</a>
            </li>
        </ul>
        
        <div class="dropdown-content-grid">
            <div class="category-media-banner">
                <div class="media-placeholder-item">
                    <A_Image 
                        :src="currentMenuImage"
                        alt="Kategori Görseli" 
                        class="category-image"
                    />
                </div>
            </div>
            
            <ul class="category-list">
                <li 
                    v-for="(item, index) in currentCategories" 
                    :key="index"
                    :class="{ 'extra-gap-bottom': item.extraMargin }" 
                >
                    <a href="#" 
                       :class="{ 'highlight': item.isHighlight, 'is-open': item.isOpen }"
                       @click.prevent="toggleSub(item)"
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
import LogoSource from '../../assets/images/Logo.png';
import A_Link from '../atoms/A_Link.vue';
import A_Text from '../atoms/A_Text.vue';
import A_Icon from '../atoms/A_Icon.vue'; 
import A_InputText from '../atoms/A_InputText.vue';
import A_Image from '../atoms/A_Image.vue'; 

import MenuImageSource from '../../assets/images/zara1.jpg'; 
import ImgKadin from '../../assets/images/zara_1.jpg';  // Kadın görseli
import ImgErkek from '../../assets/images/urun_erkek.jpg'; // Erkek görseli (Yoksa zara1.jpg yapın)
import ImgCocuk from '../../assets/images/cocuk_banner.jpg'; // Çocuk görseli (Yoksa zara1.jpg yapın)
import ImgHome from '../../assets/images/home_design.png';   // Home görseli (Yoksa zara1.jpg yapın)

export default {
  name: 'O_Header',
  components: {
    A_Link, A_Text, A_Icon, A_InputText, A_Image
  },
  data() {
    return {
      logoSrc: LogoSource,
      isMenuOpen: false, 
      activeTab: 'KADIN',
      menuImages: {
        'KADIN': ImgKadin,
        'ERKEK': ImgErkek,    // Erkek sekmesine tıklayınca bu çıkar
        'ÇOCUK': ImgCocuk,    // Çocuk sekmesine tıklayınca bu çıkar
        'ZARA HOME': ImgHome,
        // Diğerleri için varsayılan olarak Kadın görselini veya başka bir şey atayabilirsiniz
        'ZARA SRPLS': ImgKadin,
        '50. YIL DÖNÜMÜ': ImgKadin,
        'BEAUTY': ImgKadin,
        'TRAVEL MODE': ImgKadin,
      }, 
      tabs: ['KADIN', 'ERKEK', 'ÇOCUK', 'ZARA HOME', 'ZARA SRPLS', '50. YIL DÖNÜMÜ', 'BEAUTY', 'TRAVEL MODE'],
      
      categories: {
        'KADIN': [
            { name: 'THE NEW' }, { name: '50. YIL DÖNÜMÜ' }, { name: 'THE ITEM' },
        ],
        // ... Diğer kategoriler aynı kalır ...
        'ERKEK': [ 
            { name: 'THE NEW' }, { name: '50. YIL DÖNÜMÜ' },{ name: 'SKI COLLECTION', badge: 'NEW', extraMargin: true },
            { name: 'TÜMÜNÜ GÖR'},{ name: 'ÇOK SATANLAR'},{ name: 'ATHLETICZ SPEED RUN' },
            { 
                name: 'ÖZEL FİYATLAR',
                isHighlight: true,
                extraMargin: true, 
                expandable: true, 
                isOpen: false,
                children: [
                    { name: 'PROMOSYONLAR',isRed: true},
                    { name: 'AVANTAJLI FİYATLAR' }
                ]
            }, 
        ],
        'ÇOCUK': [ { name: 'KIZ ÇOCUK' }, { name: 'ERKEK ÇOCUK' }, { name: 'BEBEK' } ],
        'ZARA HOME': [ { name: 'YENİ' }, { name: 'YATAK ODASI' } ],
        'ZARA SRPLS': [ { name: 'SRPLS KOLEKSİYON' }, { name: 'GİYİM' } ],
        '50. YIL DÖNÜMÜ': [ { name: '50. YIL ÜRÜNLERİ' }, { name: 'GÖMLEKLER' } ],
        'BEAUTY': [ { name: 'MAKYAJ MALZEMELERİ' }, { name: 'CİLT BAKIMI' } ],
        'TRAVEL MODE': [ { name: 'TÜM KOLEKSİYON' }, { name: 'VALİZLER' } ],
      }
    };
  },
  computed: {
    currentCategories() {
      return this.categories[this.activeTab] || [];
    },
    currentMenuImage() {
        // Eğer o sekme için resim tanımlıysa onu döndür, yoksa varsayılan (Kadın) döndür
        return this.menuImages[this.activeTab] || this.menuImages['KADIN'];
    }
  },
  methods: {
    toggleMenuState() {
      this.isMenuOpen = !this.isMenuOpen; 
    },
    // YENİ METOT: Alt menüyü açıp kapar
    toggleSub(item) {
        // Alt listesi olan öğeye tıklanmışsa, isOpen durumunu değiştir
        if (item.expandable) {
            item.isOpen = !item.isOpen;
        }
    }
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

/* HEADER GENEL DÜZEN */
.layout-header-std {
    position: sticky; 
    top: 0; 
    width: 100%; 
    z-index: 10;
    background-color: white; 
    padding: 0; 
    color: black; 
}

.o-header__main-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-05) var(--spacing-09); /* 20px 48px */
    position: relative; 
}

.o-header__left-group {
    display: flex;
    align-items: center;
    gap: var(--spacing-06); /* 24px */
}
.o-header__search-input {
    border: none;
    border-bottom: 1px solid black; 
    text-transform: uppercase;
    font-size: var(--header-text-size);
    width: 120px; 
    text-align: left;
    padding: 0; 
}

/* HAMBURGER İKONU */
.o-header__menu-icon {
  width: 60px;    /* senin boyutun */
  height: 30px;   /* senin boyutun */
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


/* Logo */
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

/* ------------------------------------------------ */
/* 2. KATEGORİ DROPDOWN */
/* ------------------------------------------------ */

.category-dropdown {
    position: absolute;
    top: 100%; 
    left: 0; 
    width: 50vw; 
    height: 600px; 
    background-color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 9;
    padding: 16px 48px 48px 48px;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
}

.category-dropdown.is-visible {
    opacity: 1;
    visibility: visible;
    display: grid;
    grid-template-columns: 250px 1fr; 
    gap: 40px; 
    overflow-y: auto; 
}

/* SOL SÜTUN: Dikey Tab Listesi */
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
    transition: color 0.2s;
}

.dropdown-tabs li.active a {
    text-decoration: none;
    font-weight: bold;
}

/* SAĞ SÜTUN: KATEGORİ DETAYI ALANI (Kaydırmalı) */
.dropdown-content-grid {
    padding-top: 32px;
    /* Burası kategorileri tutan alan */
    display: block; 
    overflow-y: auto; /* KRİTİK: Kategori listesi kendi içinde kayar */
    width: 100%;
}
.category-media-banner {
    width: 100%;
    margin-bottom: var(--spacing-lg); /* Kategori listesinden ayırır */
    padding-top: var(--spacing-md); /* Üstten biraz boşluk */
}
.highlight-media-area {
    padding-left: 40px;
    border-left: 1px solid #eee;
    text-align: left;
}
.media-placeholder-item {
    width: 80%;
    height: 250px; /* Görselden tahmin edilen yükseklik */
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    color: #757575;
}

.category-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.category-list li {
    /* KRİTİK: Temel aralık */
    margin-bottom: 12px; 
}

/* KRİTİK: EKSTRA BOŞLUKLAR */
.category-list li.extra-gap-bottom {
    margin-bottom: 24px; /* Ekstra 12px boşluk (Toplam 24px) */
}

.category-list a {
    font-size: var(--font-size-body-m); 
    font-weight: var(--font-weight-light); 
    text-transform: uppercase;
    display: block;
    color: black !important;
}
.category-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.badge {
    font-size: 9px;
    font-weight: bold;
    color: black;
    margin-left: 6px;
    margin-top: -2px;
}
.category-list a.highlight {
    color: red !important;
    font-weight: var(--font-weight-medium) !important;
}

.badge {
    font-size: 9px;
    font-weight: bold;
    color: black;
    margin-left: 6px;
    margin-top: -2px;
}

/* Alt Menü Açma/Kapama İkonu */
.submenu-icon {
    font-size: 14px;
    font-weight: 500;
    margin-left: 400px;
    transition: transform 0.3s;
    flex-shrink: 0;
}

/* Alt Liste Stili */
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
    font-size: var(--font-size-body-m);
    color: black;
    font-weight: 300;
}

/* KRİTİK: PROMOSYONLAR (KIRMIZI YAZI) */
.sub-list a.is-red-text {
    color: red !important;
    font-weight: var(--font-weight-medium);
}
</style>