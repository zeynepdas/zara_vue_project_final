<template>
  <footer class="o-footer">
    <div class="o-footer__top-strip">
      <div class="o-footer__social-links">
        <A_Link href="#" class="o-footer__social-link">TIKTOK</A_Link>
        <A_Link href="#" class="o-footer__social-link">INSTAGRAM</A_Link>
        <A_Link href="#" class="o-footer__social-link">FACEBOOK</A_Link>
        <A_Link href="#" class="o-footer__social-link">PINTEREST</A_Link>
        <A_Link href="#" class="o-footer__social-link">YOUTUBE</A_Link>
        <A_Link href="#" class="o-footer__social-link">SPOTIFY</A_Link>
      </div>
    </div>

    <div class="o-footer__main-grid">
      <div class="footer-links__wrapper footer-links__wrapper--help">
        <A_Text tag="h3" class="footer-links__title">YARDIM</A_Text>
        <ul class="footer-links__list">
          <li><A_Link href="#">ZARA HESABIM</A_Link></li>
          <li><A_Link href="#">ÜRÜNLER VE BEDENLER</A_Link></li>
          <li><A_Link href="#">HEDİYE SEÇENEKLERİ</A_Link></li>
          <li><A_Link href="#">GÖNDERİLER</A_Link></li>
          <li><A_Link href="#">ÖDEMELER VE FATURALAR</A_Link></li>
          <li><A_Link href="#">ALIŞVERİŞLERİM</A_Link></li>
          <li>
            <A_Link href="#"
              >DEĞİŞİM, İADE VE GERİ <br />
              ÖDEMELER</A_Link
            >
          </li>
          <li><A_Link href="#">ZARA DENEYİMLERİ</A_Link></li>
        </ul>
      </div>

      <div class="footer-links__wrapper footer-links__wrapper--follow">
        <A_Text tag="h3" class="footer-links__title">BİZİ TAKİP EDİN</A_Text>
        <ul class="footer-links__list">
          <li><A_Link href="#">BÜLTEN</A_Link></li>
          <li><A_Link href="#">TIKTOK</A_Link></li>
          <li><A_Link href="#">INSTAGRAM</A_Link></li>
          <li><A_Link href="#">FACEBOOK</A_Link></li>
          <li><A_Link href="#">PINTEREST</A_Link></li>
          <li><A_Link href="#">YOUTUBE</A_Link></li>
        </ul>
      </div>

      <div class="footer-links__wrapper footer-links__wrapper--company">
        <A_Text tag="h3" class="footer-links__title">ŞİRKET</A_Text>
        <ul class="footer-links__list">
          <li><A_Link href="#">HAKKIMIZDA</A_Link></li>
          <li><A_Link href="#">JOIN LIFE</A_Link></li>
          <li><A_Link href="#">OFİSLER</A_Link></li>
          <li><A_Link href="#">MAĞAZALAR</A_Link></li>
          <li><A_Link href="#">BİZİMLE ÇALIŞIN</A_Link></li>
          <li><A_Link href="/contact">İLETİŞİM</A_Link></li>
        </ul>
      </div>

      <div class="footer-links__wrapper footer-links__wrapper--policies">
        <A_Text tag="h3" class="footer-links__title">POLİTİKALAR</A_Text>
        <ul class="footer-links__list">
          <li><A_Link href="#">GİZLİLİK POLİTİKASI</A_Link></li>
          <li><A_Link href="#">SATIN ALMA KOŞULLARI</A_Link></li>
          <li><A_Link href="#">CAYMA HAKKI</A_Link></li>
          <li><A_Link href="#">HEDİYE KARTI KOŞULLARI</A_Link></li>
          <li><A_Link href="#">TANIMLAMA BİLGİSİ AYARLARI</A_Link></li>
        </ul>
      </div>
    </div>

    <div class="o-footer__bottom-strip">
      <div class="o-footer__info-left">
        <A_Text tag="span">ZARA / KADIN / ÇOK SATANLAR / TÜMÜNÜ GÖR</A_Text>
        <A_Text tag="span">Türkiye / Turkey</A_Text>
      </div>
      <div class="o-footer__info-right">
        <A_Link href="#" class="o-footer__language-select">TÜRKÇE | ENGLISH</A_Link>
        <A_Text tag="span" class="o-footer__copyright">© ALL RIGHTS RESERVED</A_Text>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Atomic bileşenleri import edin
import A_Link from '../atoms/A_Link.vue'
import A_Text from '../atoms/A_Text.vue'
</script>

<style scoped>
/* ------------------------------------ */
/* GENEL AYARLAR */
/* ------------------------------------ */
.o-footer {
  width: 100%;
  background-color: white;
  color: black;
  font-family: 'Helvetica Now Text', Arial, sans-serif;
  padding-left: 100px; /* 48px olan değeri artırdık */
  padding-right: 48px;
}

/* ------------------------------------ */
/* 1. ÜST SOSYAL MEDYA ÇİZGİSİ */
/* ------------------------------------ */

.o-footer__top-strip {
  border-bottom: none;
  padding: 48px 0;
  margin-bottom: 48px;
}

.o-footer__social-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
}

.o-footer__social-link {
  font-size: 10px;
  text-transform: uppercase;
  color: black;
  text-decoration: none;
  letter-spacing: 1px;
}

/* ------------------------------------ */
/* 2. ANA LİNK GRİD (4 Sütun) */
/* ------------------------------------ */

.o-footer__main-grid {
  display: grid;
  /* Sütun genişliklerini küçültüyoruz (150px yerine 120px gibi) */
  grid-template-columns: 200px repeat(3, 120px);

  /* Sütunlar arasındaki genel boşluğu azaltıyoruz (15px'ten 5px'e) */
  gap: 5px;

  padding-bottom: 200px;
  padding-top: 200px;
  justify-content: flex-start;
}

/* YARDIM sütunundan sonraki özel boşluğu da daraltmak isterseniz: */
.footer-links__wrapper--help {
  margin-right: 30px; /* 80px olan değeri 30px'e indirdik */
}

.footer-links__title {
  font-size: 11px;
  line-height: 16px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-weight: 400;
  margin-bottom: 12px;
}

.footer-links__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links__list li {
  margin-bottom: 8px;
}

.footer-links__list a {
  font-size: 9px; /* Reduced from 10px */
  text-decoration: none;
  color: black;
  display: block;
  white-space: nowrap; /* Prevent text from wrapping to next line */
}

/* ZARA DENEYİMLERİ linkine büyük boşluk ekleme */
.footer-links__list li:last-child {
  margin-bottom: 50px;
}

/* ------------------------------------ */
/* 3. ALT BİLGİ ÇİZGİSİ */
/* ------------------------------------ */

.o-footer__bottom-strip {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 10px 0;
  border-bottom: none;
  font-size: 10px;
  text-transform: uppercase;
}

/* Alt kısımdaki soldaki metinler */
.o-footer__info-left {
  display: flex;
  flex-direction: column;
}

.o-footer__info-left span {
  display: block;
  margin-bottom: 5px;
  margin-top: 20px;
  text-transform: uppercase;
  font-size: 10px;
  color: black;
}

.o-footer__info-right {
  display: flex;
  align-items: center;
}

.o-footer__country-select {
  color: black;
  text-decoration: none;
  margin-right: 10px;
}

.o-footer__copyright {
  color: black;
  text-decoration: none;
}

/* ============================================================ */
/* HOVER (ÜZERİNE GELME) DÜZELTMELERİ - KESİN ÇÖZÜM */
/* ============================================================ */

/* Tüm linklerin üzerine gelindiğinde rengini siyah tut */
.footer-links__list a:hover,
.o-footer__social-link:hover,
.o-footer__country-select:hover {
  color: black !important; /* Mavi olmayacak, siyah kalacak */
  text-decoration: none !important; /* Alt çizgi çıkmayacak */
  background-color: transparent !important;
  cursor: pointer;
}
</style>
