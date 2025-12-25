<template>
  <div class="o-cart-page">
    <div class="cart-header">
      <div class="cart-header__tabs">
        <A_Text tag="span" class="cart-tab active">SEPET [{{ cartItems.length }}]</A_Text>

        <div class="cart-tab wishlist-tab">
          <span>FAVORİLER</span>
          <svg
            class="wishlist-icon-header"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 21L12 16L5 21V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>

    <div v-if="cartItems.length > 0" class="shop-cart-grid-items">
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <div class="cart-item__media">
          <A_Image :src="item.image" :alt="item.name" class="cart-item__image" />
        </div>

        <div class="cart-item__info">
          <div class="info-header-row">
            <div class="info-left-group">
              <A_Text tag="span" class="product-name">{{ item.name }}</A_Text>
            </div>

            <div class="info-center-group">
              <A_Text tag="span" class="attribute-text">{{ item.size }}</A_Text>
              <span class="separator">|</span>
              <A_Text tag="span" class="attribute-text">{{ item.color }}</A_Text>
            </div>

            <div class="cart-item__wishlist">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
          </div>

          <div class="info-bottom-row">
            <A_Text tag="span" class="product-price">{{ item.price }} TL</A_Text>
            <div class="quantity-control">
              <button class="qty-btn" @click="item.quantity > 1 ? item.quantity-- : null">-</button>
              <span class="qty-value">{{ item.quantity }}</span>
              <button class="qty-btn" @click="item.quantity++">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="cart-empty-state">
      <A_Text tag="h2" class="empty-title">SEPETİNİZ BOŞ</A_Text>
      <A_Text tag="p" class="empty-subtitle">Eklediğiniz ürünler burada gösterilir</A_Text>
    </div>

    <div class="cart-footer-sticky" v-if="cartItems.length > 0">
      <div class="cart-footer__content">
        <div class="cart-footer__legal-text">
          <A_Text tag="p">
            Devam ederek
            <A_Link href="#" class="legal-link">Satın Alma Koşullarını</A_Link> okuduğumu ve kabul
            ettiğimi, Zara
            <A_Link href="#" class="legal-link">Gizlilik ve Çerez Politikasını</A_Link> anladığımı
            beyan ederim
          </A_Text>
        </div>
        <div class="cart-footer__actions">
          <div class="cart-totals">
            <div class="total-row">
              <A_Text tag="span" class="total-label">TOPLAM</A_Text>
              <A_Text tag="span" class="total-price">{{ totalPrice }} TL</A_Text>
            </div>
            <A_Text tag="span" class="tax-info">* KDV dahil</A_Text>
          </div>
          <div class="cart-buttons">
            <A_Button class="continue-button">DEVAM ET</A_Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import A_Text from '../atoms/A_Text.vue'
import A_Button from '../atoms/A_Button.vue'
import A_Image from '../atoms/A_Image.vue'
import A_Link from '../atoms/A_Link.vue'

import ProductImage1 from '../../assets/images/urun_foto6.jpg'

export default {
  name: 'O_CartPage',
  components: { A_Text, A_Button, A_Image, A_Link },
  data() {
    return {
      // Test etmek için diziyi boşaltabilirsiniz: cartItems: []
      cartItems: [
        {
          id: 1,
          name: 'KISA ÇİFT YÜZLÜ CEKET',
          price: '3.690,00',
          reference: 'REF. | 4341/700',
          color: 'KOYU KAHVERENGİ',
          size: 'M',
          quantity: 1,
          image: ProductImage1,
        },
      ],
    }
  },
  computed: {
    totalPrice() {
      const total = this.cartItems.reduce((acc, item) => {
        return acc + parseFloat(item.price.replace('.', '').replace(',', '.')) * item.quantity
      }, 0)
      return total.toLocaleString('tr-TR', { minimumFractionDigits: 2 })
    },
  },
}
</script>

<style scoped>
.o-cart-page {
  width: 100%;
  padding-top: 48px;
  padding-bottom: 150px;
  font-family: 'Helvetica Now Text', Arial, sans-serif;
  color: #000;
}

/* HEADER */
.cart-header {
  margin-top: 48px;
  margin-bottom: 32px;
  padding: 0 132px;
}

.cart-header__tabs {
  display: flex;
  gap: 32px;
  align-items: center;
}

@media screen and (max-width: 1024px) {
  .cart-header,
  .cart-empty-state,
  .shop-cart-grid-items {
    padding-left: 48px !important;
    padding-right: 48px !important;
  }
}

.cart-tab {
  font-size: 13px;
  font-weight: 300;
  color: #757575;
  cursor: pointer;
  text-transform: uppercase;
}

.cart-tab.active {
  color: #000;
  font-weight: 500;
}

.wishlist-tab {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* BOŞ DURUM STİLİ (İstediğin sağa kaydırma burada) */
.cart-empty-state {
  padding: 0 132px;
  margin-top: 40px;
}

.empty-title {
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 12px;
  display: block;
}

.empty-subtitle {
  font-size: 11px;
  color: #757575;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* ÜRÜN IZGARASI */
.shop-cart-grid-items {
  display: grid;
  gap: 20px;
  padding: 0 132px;
}

@media screen and (min-width: 768px) {
  .shop-cart-grid-items {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
}

.cart-item {
  display: flex;
  flex-direction: column;
}

.cart-item__media {
  width: 100%;
  margin-bottom: 12px;
}

.cart-item__image {
  width: 100%;
  height: auto;
  display: block;
}

.cart-item__info {
  font-size: 11px;
  line-height: 1.4;
  color: #000;
  text-transform: uppercase;
}

.info-header-row {
  display: grid;
  grid-template-columns: 1fr auto 20px;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 8px;
}

.info-center-group {
  display: flex;
  gap: 4px;
  white-space: nowrap;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
}

.qty-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

/* FOOTER */
.cart-footer-sticky {
  position: fixed;
  bottom: 0;
  left: 320px; /* Sidebar payı */
  right: 0;
  background-color: white;
  padding: 24px 48px;
  z-index: 100;
  border-top: 1px solid #f2f2f2; /* İsteğe bağlı çok ince çizgi */
}

.cart-footer__content {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.cart-footer__legal-text {
  max-width: 50%;
  font-size: 10px;
  line-height: 1.4;
}

.legal-link {
  text-decoration: underline;
  color: #000;
}

.cart-footer__actions {
  display: flex;
  align-items: center;
  gap: 48px;
}

.total-row {
  display: flex;
  gap: 16px;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
}

.continue-button {
  background-color: black;
  color: white;
  border: none;
  padding: 12px 64px;
  font-size: 13px;
  text-transform: uppercase;
  cursor: pointer;
}

/* Mobil için sidebar payını kaldır */
@media screen and (max-width: 1024px) {
  .cart-footer-sticky {
    left: 0;
  }
}
</style>
