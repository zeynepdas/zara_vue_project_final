<template>
  <div class="product-detail-flex-flow">
    <!-- 1. ANA GÖRSEL (SOL ÜST) -->
    <div v-if="product.images && product.images.length > 0" class="flow-item media-item">
      <A_Image :src="product.images[0]" :alt="product.title" class="product-image" />
    </div>
    <div v-else class="flow-item media-item">
      <A_Image :src="product.image" :alt="product.title" class="product-image" />
    </div>

    <!-- 2. BİLGİ ALANI (SAĞ TARAFTA SABİT) -->
    <div class="flow-item info-item-sticky">
      <div class="product-detail-view__info-wrapper">
        <div class="product-detail-info__header">
          <div class="product-detail-info__title-group">
            <div class="product-detail-info__header-tag">
              <A_Text tag="span">NEW</A_Text>
            </div>
            <div class="product-detail-info__header-name">
              <A_Text tag="span">{{ product.title }}</A_Text>
            </div>
          </div>
          <svg
            @click="toggleWishlist"
            class="wishlist-icon--productDetail"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.5 6h11v12L12 14.487 6.5 18V6zm.658.646V16.81L12 13.716l4.842 3.093V6.646H7.158z"
              fill="black"
            ></path>
          </svg>
        </div>

        <div class="product-detail-info__price">
          <span class="money-amount__main">
            <A_Text tag="span">{{ product.price }}</A_Text>
          </span>
        </div>

        <div class="product-detail-color-selector">
          <p class="product-color-extended-name">
            <A_Text tag="span">KOYU KAHVERENGİ | 8372/321/{{ product.id }}</A_Text>
          </p>
          <ul class="product-detail-color-selector__colors">
            <li class="color-sample color-sample--selected"></li>
            <li class="color-sample"></li>
          </ul>
        </div>

        <div class="product-detail-cart-buttons">
          <!-- Beden seçici kapalıyken EKLE butonu gözükür -->
          <button
            v-if="!isSizeSelectorOpen"
            class="zds-button zds-button--secondary"
            @click="handleAddToCart"
          >
            EKLE
          </button>

          <!-- EKLE'ye basınca beden seçici açılır -->
          <div v-else class="size-selector-box">
            <ul class="size-list">
              <li
                v-for="size in availableSizes"
                :key="size.val"
                class="size-item"
                @click="selectSizeAndAdd(size.val)"
              >
                <span class="size-val">{{ size.val }}</span>
                <span class="size-status">{{ size.status }}</span>
              </li>
            </ul>
            <div class="size-guide-footer">BEDENİM XS</div>
          </div>
        </div>

        <p class="product-detail-description">
          <A_Text tag="p">
            {{ product.description }}
          </A_Text>
        </p>

        <ul class="product-detail-actions">
          <li><A_Link href="#">ÜRÜN BOYUTLARI</A_Link></li>
          <li><A_Link href="#">MALZEMELER VE BAKIM</A_Link></li>
          <li><A_Link href="#">MAĞAZADAKİ STOK DURUMU</A_Link></li>
          <li><A_Link href="#">KARGO, DEĞİŞİM VE İADELER</A_Link></li>
        </ul>
      </div>
    </div>

    <!-- 3. DİĞER GÖRSELLER (AKTIKÇA GELENLER) -->
    <template v-if="product.images && product.images.length > 1">
      <div
        v-for="(img, index) in product.images.slice(1)"
        :key="index"
        class="flow-item media-item"
      >
        <A_Image :src="img" :alt="product.title" class="product-image" />
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import A_Text from '../atoms/A_Text.vue'
import A_Link from '../atoms/A_Link.vue'
import A_Image from '../atoms/A_Image.vue'
import { useCartStore } from '~/stores/cart'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const cartStore = useCartStore()
const isSizeSelectorOpen = ref(false)

const availableSizes = [
  { val: 'XXS', status: '' },
  { val: 'XS', status: '' },
  { val: 'S', status: '' },
  { val: 'M', status: '' },
  { val: 'L', status: 'Az sayıda ürün' },
  { val: 'XL', status: '' },
]

const selectSizeAndAdd = (size) => {
  const productWithSize = { ...props.product, selectedSize: size }
  cartStore.addToCart(productWithSize)
  alert(`${size} beden sepete eklendi!`)
  isSizeSelectorOpen.value = false
}

const handleAddToCart = () => {
  isSizeSelectorOpen.value = true
}

const toggleWishlist = () => {
  console.log('Wishlist ikonuna tıklandı!')
}
</script>

<style scoped>
/* DEĞİŞKENLER VE LAYOUT */
.product-detail-flex-flow {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 48px;
  padding: 0;
  box-sizing: border-box;
  background: #fff;
}

/* Akıştaki her bir öğenin temel stili */
.flow-item {
  width: 50%;
  box-sizing: border-box;
  margin-bottom: 48px; /* Fotoğraflar arası dikey boşluk */
}

/* TEK numaralı öğeler (1, 3, 5...) -> SOL Taraf Padingleri */
.flow-item:nth-child(odd) {
  padding-left: 24px; /* Orijinal zara gutter'ına yakın değer */
  padding-right: 48px;
}

/* ÇİFT numaralı öğeler (2, 4, 6...) -> SAĞ Taraf Padingleri */
.flow-item:nth-child(even) {
  padding-left: 48px;
  padding-right: 24px;
}

.product-image {
  width: 100%;
  height: auto;
  display: block;
}

/* BİLGİ PANELİ STICKY AYARI */
.info-item-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Sola hizalı bilgi wrapper */
}

.product-detail-view__info-wrapper {
  padding-left: 48px;
  padding-right: 80px; /* Çok geniş olmaması için sağdan boşluk */
  font-family: 'Helvetica Now Text', Arial, sans-serif;
  color: #000;
  width: 100%;
}

/* 1. BAŞLIK VE İKON */
.product-detail-info__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 12px;
}

.product-detail-info__title-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1;
}

.product-detail-info__header-tag span {
  font-size: 10px;
  text-transform: uppercase;
  font-weight: 300;
  margin-bottom: 8px;
  display: block;
}

.product-detail-info__header-name span {
  font-size: 18px;
  line-height: 28px;
  font-weight: 300;
  text-transform: uppercase;
}

.wishlist-icon--productDetail {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  cursor: pointer;
  fill: black;
  margin-left: 10px;
}

/* 2. FİYAT */
.product-detail-info__price {
  margin-bottom: 20px;
  border-bottom: 1px solid #000;
  padding-bottom: 28px;
  width: 100%;
}

.money-amount__main span {
  font-size: 13px;
  font-weight: 400;
}

/* 3. RENK / KOD */
.product-detail-color-selector {
  margin-bottom: 30px;
}

.product-color-extended-name span {
  font-size: 11px;
  margin-bottom: 20px;
  display: block;
  text-transform: uppercase;
}

.product-detail-color-selector__colors {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 8px;
}

.color-sample {
  width: 14px;
  height: 14px;
  cursor: pointer;
  border: none;
}

.color-sample--selected {
  outline: 1px solid #000;
  outline-offset: 2px;
}

.product-detail-color-selector__colors li:nth-child(1) {
  background-color: #443128;
}
.product-detail-color-selector__colors li:nth-child(2) {
  background-color: #b0a496;
}

/* 4. SEPET BUTONU VE BEDEN SEÇİCİ */
.product-detail-cart-buttons {
  margin-bottom: 48px;
}

.zds-button {
  width: 100%;
  padding: 12px 16px;
  font-size: 11px;
  text-transform: uppercase;
  border: 1px solid black;
  background-color: white;
  cursor: pointer;
  text-align: center;
}

.size-selector-box {
  width: 100%;
  border: 1px solid #000;
  background: white;
}

.size-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.size-item {
  display: flex;
  justify-content: space-between;
  padding: 14px 16px;
  cursor: pointer;
  font-size: 11px;
}

.size-item:hover {
  background: #f5f5f5;
}

.size-status {
  opacity: 0.8;
  font-size: 10px;
}

.size-guide-footer {
  padding: 14px 16px;
  font-size: 11px;
  text-transform: uppercase;
  border-top: 1px solid #000;
}

/* 5. AÇIKLAMA */
.product-detail-description p {
  font-size: 13px;
  line-height: 1.5;
  margin-bottom: 30px;
}

/* 6. LİNKLER */
.product-detail-actions {
  list-style: none;
  padding: 0;
}

.product-detail-actions li a {
  font-size: 12px;
  text-decoration: none;
  color: #000;
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  text-transform: uppercase;
}

.product-detail-actions li a:hover {
  opacity: 0.7;
}

/* MOBİL UYUMLULUK */
@media screen and (max-width: 1024px) {
  .flow-item {
    width: 100%;
    padding: 0 24px !important;
  }
  .info-item-sticky {
    position: static;
    height: auto;
    padding: 40px 24px;
  }
}
</style>
