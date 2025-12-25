<template>
  <div class="o-cart-page">
    <!-- Header Tabs -->
    <div class="cart-header">
      <div class="cart-header__tabs">
        <div
          class="cart-tab"
          :class="{ active: currentTab === 'cart' }"
          @click="currentTab = 'cart'"
        >
          SEPET ({{ totalItems }})
        </div>

        <div
          class="cart-tab wishlist-tab"
          :class="{ active: currentTab === 'wishlist' }"
          @click="currentTab = 'wishlist'"
        >
          <span>FAVORİLER</span>
          <svg
            class="wishlist-icon-header"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 21L12 16L5 21V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21Z"
              stroke="currentColor"
              stroke-width="1.2"
            />
          </svg>
        </div>
      </div>
    </div>

    <!-- Tab Content -->
    <div class="tab-content">
      <!-- SEPET CONTENT -->
      <template v-if="currentTab === 'cart'">
        <!-- Empty Cart -->
        <div v-if="cartItems.length === 0" class="empty-state-container">
          <div class="empty-state-content">
            <div class="shopping-bag-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11"
                  stroke="black"
                  stroke-width="0.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5 9H19L20 21H4L5 9Z"
                  stroke="black"
                  stroke-width="0.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <A_Text tag="h2" class="empty-title">SEPETİNİZ BOŞ</A_Text>
            <A_Text tag="p" class="empty-subtitle">Eklediğiniz ürünler burada gösterilir</A_Text>
          </div>
        </div>

        <!-- Cart Items -->
        <div v-else class="shop-cart-grid-items">
          <div v-for="item in cartItems" :key="item.id + item.selectedSize" class="cart-item">
            <div class="cart-item__media">
              <A_Image :src="item.image" :alt="item.title" class="cart-item__image" />
              <button
                class="remove-item-btn"
                @click="removeItemCompletely(item.id, item.selectedSize)"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12" stroke-width="1.2" />
                </svg>
              </button>
            </div>

            <div class="cart-item__info">
              <div class="item-status">AZ SAYIDA ÜRÜN</div>
              <div class="item-title">{{ item.title }}</div>

              <div class="item-attributes">
                <span class="attr-val">{{ item.selectedSize }}</span>
                <span class="attr-separator">|</span>
                <span class="attr-val">VİSKİ</span>

                <div class="item-wishlist-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      d="M19 21L12 16L5 21V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21Z"
                      stroke-width="1.2"
                    />
                  </svg>
                </div>
              </div>

              <div class="item-price">{{ item.price }}</div>

              <div class="quantity-selector">
                <button class="qty-btn" @click="decrementQty(item)">-</button>
                <span class="qty-val">{{ item.quantity }}</span>
                <button class="qty-btn" @click="addToCart(item)">+</button>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- FAVORILER CONTENT -->
      <template v-else-if="currentTab === 'wishlist'">
        <!-- Wishlist Empty State matching Zara screenshot for guest -->
        <div v-if="wishlistItems.length === 0" class="empty-state-container wishlist-empty">
          <div class="empty-state-content">
            <A_Text tag="p" class="wishlist-login-msg">
              Favori listelerinizdeki ürünleri görmek ve listelerinize daha fazla ürün kaydetmek
              için oturum açmalısınız.
            </A_Text>

            <div class="wishlist-actions">
              <A_Link href="/login" class="zds-button-outline">GİRİŞ YAP</A_Link>
              <div class="signup-prompt">
                <A_Text tag="span">Hesabınız yok mu?</A_Text>
                <A_Link href="/login" class="signup-link">KAYDOLUN</A_Link>
              </div>
            </div>
          </div>
        </div>

        <!-- Wishlist Items (if any were added) -->
        <div v-else class="shop-cart-grid-items">
          <!-- Wishlist items would go here -->
        </div>
      </template>
    </div>

    <!-- Related Products -->
    <O_RelatedProducts />

    <!-- Footer remains fixed but content is empty-ish -->
    <div class="cart-footer-sticky" v-if="cartItems.length > 0">
      <div class="footer-legal">
        Devam ederek
        <A_Link href="#" class="legal-underline">Satın Alma Koşullarını</A_Link> okuduğumu ve kabul
        ettiğimi, Zara
        <A_Link href="#" class="legal-underline">Gizlilik ve Çerez Politikasını</A_Link> anladığımı
        beyan ederim
      </div>

      <div class="footer-summary">
        <div class="total-section">
          <span class="total-label">TOPLAM</span>
          <span class="total-amount">{{ totalPrice }}</span>
          <div class="tax-note">* KDV dahil</div>
        </div>
        <button class="checkout-button" @click="handleCheckout" :disabled="loading">
          {{ loading ? 'İŞLENİYOR...' : 'SİPARİŞİ TAMAMLA' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import A_Image from '@/src/components/atoms/A_Image.vue'
import A_Link from '@/src/components/atoms/A_Link.vue'
import O_RelatedProducts from '@/src/components/organisms/O_RelatedProducts.vue'
import { useCartStore } from '@/stores/cart'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'CartPage',
  components: { A_Image, A_Link, O_RelatedProducts },
  data() {
    return {
      currentTab: 'cart', // 'cart' or 'wishlist'
      wishlistItems: [],
    }
  },
  computed: {
    ...mapState(useCartStore, ['totalItems', 'loading']),
    ...mapState(useCartStore, {
      cartItems: 'items',
      totalPrice: 'totalPrice',
    }),
  },
  methods: {
    ...mapActions(useCartStore, ['addToCart', 'removeFromCart', 'checkout']),
    decrementQty(item) {
      this.removeFromCart(item.id, item.selectedSize)
    },
    removeItemCompletely(id, size) {
      this.removeFromCart(id, size)
    },
    async handleCheckout() {
      await this.checkout()
    },
  },
}
</script>

<style scoped>
.o-cart-page {
  width: 100%;
  min-height: 100vh;
  padding-top: 140px;
  background-color: #fff;
  color: #000;
  font-family: 'Helvetica Now Text', Arial, sans-serif;
}

/* HEADER (SEPET / FAVORİLER) */
.cart-header {
  padding: 0 48px;
  margin-bottom: 48px;
}

.cart-header__tabs {
  display: flex;
  gap: 24px;
}

.cart-tab {
  font-size: 11px;
  letter-spacing: 0.5px;
  color: #949494;
  cursor: pointer;
  text-transform: uppercase;
}

.cart-tab.active {
  color: #000;
}

.wishlist-tab {
  display: flex;
  align-items: center;
  gap: 4px;
}

.shop-cart-grid-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 32px;
  padding: 0 48px 160px 48px;
}

.cart-item {
  display: flex;
  flex-direction: column;
}

.cart-item__media {
  position: relative;
  width: 100%;
  aspect-ratio: 2/3;
  margin-bottom: 20px;
  background: #f4f4f4;
}

.cart-item__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-item-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #000;
}

.cart-item__info {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  line-height: 1.6;
}

.item-status {
  font-size: 10px;
  font-weight: 300;
  margin-bottom: 4px;
}

.item-title {
  font-weight: 400;
}

.item-attributes {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 4px 0;
  font-weight: 300;
}

.item-wishlist-btn {
  margin-left: auto;
  cursor: pointer;
}

.item-price {
  margin-top: 4px;
  font-weight: 400;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
  font-weight: 300;
}

.qty-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  padding: 0;
}

.cart-footer-sticky {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  padding: 24px 48px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  z-index: 100;
}

.footer-legal {
  max-width: 400px;
  font-size: 10px;
  line-height: 1.4;
  font-weight: 300;
}

.legal-underline {
  text-decoration: underline;
  color: inherit;
}

.footer-summary {
  display: flex;
  align-items: flex-end;
  gap: 48px;
}

.total-section {
  text-align: left;
}

.total-label {
  font-size: 11px;
  font-weight: 500;
  margin-right: 24px;
}

.total-amount {
  font-size: 13px;
  font-weight: 500;
}

.tax-note {
  font-size: 9px;
  font-weight: 300;
  margin-top: 4px;
}

.checkout-button {
  background: #000;
  color: #fff;
  border: none;
  padding: 14px 64px;
  font-size: 12px;
  text-transform: uppercase;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .cart-footer-sticky {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    padding: 20px;
  }
  .footer-summary {
    width: 100%;
    justify-content: space-between;
  }
}

/* EMPTY STATE STYLES */
.empty-state-container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: 40vh;
  padding-top: 2rem;
  padding-left: 48px;
}

.empty-state-content {
  text-align: left;
}

.shopping-bag-icon {
  margin-bottom: 2.5rem;
  display: block;
}

.empty-title {
  display: block;
  font-size: 11px;
  font-weight: 500;
  margin-bottom: 0.5rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.empty-subtitle {
  display: block;
  font-size: 11px;
  font-weight: 300;
  color: #000;
  letter-spacing: 0.2px;
}

/* WISHLIST EMPTY STATE */
.wishlist-empty {
  padding-top: 1rem;
}

.wishlist-login-msg {
  font-size: 11px;
  font-weight: 300;
  max-width: 400px;
  line-height: 1.4;
  margin-bottom: 30px;
  color: #000;
}

.wishlist-actions {
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: flex-start;
}

.zds-button-outline {
  display: inline-block;
  padding: 10px 30px;
  border: 1px solid #000;
  font-size: 11px;
  color: #000;
  text-decoration: none;
  min-width: 150px;
  text-align: center;
  transition: background 0.2s;
}

.zds-button-outline:hover {
  background-color: #f7f7f7;
}

.signup-prompt {
  display: flex;
  gap: 8px;
  font-size: 10px;
  color: #000;
}

.signup-link {
  text-decoration: none;
  font-weight: 500;
}

.signup-link:hover {
  text-decoration: underline;
}
</style>
