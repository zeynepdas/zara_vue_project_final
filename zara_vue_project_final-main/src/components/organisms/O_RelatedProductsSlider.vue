<template>
  <div class="related-products-container">
    <div class="related-title">ŞUNLARI DA BEĞENEBİLİRSİNİZ</div>

    <div class="related-products-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <div class="product-card__image-wrapper">
          <A_Image :src="product.image" :alt="product.name" class="product-image" />

          <div class="plus-icon-wrapper">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 0V12" stroke="#757575" stroke-width="1" />
              <path d="M0 6H12" stroke="#757575" stroke-width="1" />
            </svg>
          </div>
        </div>

        <div class="product-card__info">
          <div class="product-name">
            <A_Text tag="span">{{ product.name }}</A_Text>
          </div>
          <div class="product-price">
            <A_Text tag="span">{{ product.price }}</A_Text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import A_Text from '../atoms/A_Text.vue'
import A_Image from '../atoms/A_Image.vue'

// Görselleri import ediyoruz
import Img1 from '../../assets/images/sepet_alti.jpg'
import Img2 from '../../assets/images/sepet_alti1.jpg'
import Img3 from '../../assets/images/sepet_alti2.jpg'
import Img4 from '../../assets/images/sepet_alti3.jpg'
import Img5 from '../../assets/images/sepet_alti4.jpg'

export default {
  name: 'O_RelatedProductsSlider',
  components: {
    A_Text,
    A_Image,
  },
  data() {
    return {
      products: [
        { id: 1, name: 'TOZ ALLIK - HIGHLY-LICIOUS', price: '1.090,00 TL', image: Img1 },
        { id: 2, name: 'LİKİT AYDINLATICI - TEMPTING GLOW', price: '790,00 TL', image: Img4 },
        { id: 3, name: 'ASİMETRİK YAKA TOP', price: '990,00 TL', image: Img5 },
        { id: 4, name: 'LIMITED EDITION ÇİFT YÜZLÜ CEKET', price: '9.990,00 TL', image: Img2 },
        { id: 5, name: 'UZUN ÇAPRAZ ASKILI ÇANTA', price: '1.490,00 TL', image: Img3 },
      ],
    }
  },
}
</script>

<style scoped>
.related-products-container {
  width: 100%;
  padding: 0 48px;
  margin-top: 100px;
  margin-bottom: 100px;

  /* KRİTİK: Ana font ailesini ve ince yapıyı burada tanımlıyoruz */
  font-family: 'Helvetica Now Text', Arial, sans-serif;
  font-weight: 300; /* Genel incelik */
  color: #000;
}

/* BAŞLIK STİLİ */
.related-title {
  font-size: 13px;

  /* KRİTİK DÜZELTME: Kalınlık kaldırıldı, diğer başlıklarla eşitlendi */
  font-weight: 300 !important; /* İnce font */
  margin-top: 48px;
  text-transform: uppercase;
  margin-bottom: 30px;
  letter-spacing: 0.5px;
}

/* GRID YAPISI (5 SÜTUN) */
.related-products-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
}

/* ÜRÜN KARTI */
.product-card {
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

/* Görsel Alanı */
.product-card__image-wrapper {
  position: relative;
  width: 100%;
  margin-bottom: 12px;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.02);
}
/* src/components/organisms/O_ProductDetail.vue <style scoped> bloğu içinde */

/* Ana Görsel Kapsayıcısı (relative olmalı) */
.product-detail-view__main-media {
  position: relative; /* İkonu içinde konumlandırmak için */
  margin-bottom: var(--spacing-lg);
  cursor: zoom-in;
}

/* Artı İkonu Stili */
.plus-icon-wrapper {
  position: absolute;
  bottom: 8px; /* Alt kenardan boşluk */
  left: 8px; /* Sol kenardan boşluk */
  z-index: 2; /* Görselin üstünde kalsın */

  /* İsteğe bağlı: Varsayılan olarak gizli mi olsun yoksa hep mi görünsün? */
  /* display: none; -> Eğer hover ile görünmesini isterseniz açın */
  display: block; /* Hep görünür */

  /* İkon rengi */
  color: #757575;
}
/* Wishlist İkonu */
.wishlist-icon-wrapper {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: transparent;
  color: #000;
  display: none;
}

.product-card:hover .wishlist-icon-wrapper {
  display: block;
}

/* BİLGİ ALANI */
.product-card__info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  /* Font boyutu ve satır yüksekliği diğer sayfalarla eşitlendi */
  font-size: 11px;
  line-height: 1.4;
  gap: 4px;
}

.product-name {
  text-transform: uppercase;
  width: 100%;

  /* KRİTİK: Ürün ismi de ince olsun */
  font-weight: 300 !important;
}

.product-price {
  text-align: left;
  white-space: nowrap;

  /* KRİTİK: Fiyat da ince olsun (veya normal) */
  font-weight: 300 !important;
}

/* MOBİL UYUMLULUK */
@media screen and (max-width: 768px) {
  .related-products-grid {
    display: flex;
    overflow-x: auto;
    gap: 16px;
    padding-bottom: 20px;
  }
  .product-card {
    min-width: 200px;
  }
}
</style>
