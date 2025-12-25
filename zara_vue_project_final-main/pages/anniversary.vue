<template>
  <div class="anniversary-page">
    <!-- Anniversary Sub-Header -->
    <div class="anniversary-sub-header">
      <nav class="sub-nav">
        <ul>
          <li>50 CREATORS</li>
          <li>DENEYİM</li>
          <li>HEDİYE MAĞAZASI</li>
          <li>FİLM</li>
          <li>KOLEKSİYON</li>
          <li>ZARA'NIN TARİHÇESİ</li>
          <li>İLK MAĞAZAMIZ</li>
        </ul>
      </nav>
      <nav class="sub-nav-secondary">
        <ul>
          <li>KOLEKSİYON</li>
          <li>POP-UP</li>
          <li>THE PROCESS</li>
          <li>TALKS</li>
          <li>GIFT GUIDE</li>
        </ul>
      </nav>
    </div>

    <!-- Main Content Grid -->
    <div class="anniversary-container">
      <div class="collage-section">
        <img
          src="/_nuxt/C:/Users/ASUS/.gemini/antigravity/brain/8bbc4fa8-b5a4-4560-bac7-ab86b513972a/zara_anniversary_collage_1766331882048.png"
          alt="Anniversary Collage"
          class="main-collage"
        />
      </div>

      <aside class="anniversary-sidebar">
        <div class="search-creator">
          <span class="search-label">SEARCH BY CREATOR</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>

        <div class="anniversary-text-content">
          <h1 class="anniversary-title">THE ANNIVERSARY EST 1975</h1>
          <p class="description">
            ZARA'NIN 50. YILI ONURUNA, GÜNÜMÜZÜN EN ÖNEMLİ 50 YARATICI İSMİ BU ÖZEL ANI TAÇLANDIRMAK
            İÇİN SINIRLI SAYIDA BİRER PARÇA TASARLADI. SİZ OLMASANIZ BURADA OLMAZDIK. BU KUTLAMANIN
            BİR PARÇASI OLDUĞUNUZ İÇİN TEŞEKKÜR EDERİZ.
          </p>
          <p class="description">
            BU BENZERSİZ KREASYONU SATIN ALARAK ANLAMLI BİR AMACA DA KATKI SAĞLIYORSUNUZ. SINIRLI
            SAYIDA ÜRETİLEN BU KOLEKSİYONDAN ELDE EDİLEN TÜM GELİR WOMEN'S EARTH ALLIANCE'A
            BAĞIŞLANACAKTIR; BU KAR AMACI GÜTMEYEN KURULUŞ, KADINLARIN LİDERLİĞİNİ GÜÇLENDİREREK
            ÇEVREMİZİN KORUNMASINA ADANMIŞTIR.
          </p>
        </div>
      </aside>
    </div>

    <!-- Accessibility Icon Floating -->
    <div class="floating-accessibility">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 8v8"></path>
        <path d="M8 12h8"></path>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
// Anniversary page logic
</script>

<style scoped>
.anniversary-page {
  background: #fff;
  min-height: 100vh;
  padding-bottom: 100px;
  font-family: 'Helvetica Now Text', Arial, sans-serif;
  color: #000;
}

.anniversary-sub-header {
  padding: 20px 48px;
  border-bottom: 1px solid #f0f0f0;
}

.sub-nav ul,
.sub-nav-secondary ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 20px;
}

.sub-nav {
  margin-bottom: 12px;
}

.sub-nav li {
  font-size: 10px;
  letter-spacing: 0.5px;
  font-weight: 300;
  cursor: pointer;
}

.sub-nav-secondary li {
  font-size: 9px;
  letter-spacing: 0.4px;
  font-weight: 300;
  color: #666;
  cursor: pointer;
}

.anniversary-container {
  display: grid;
  grid-template-columns: 1fr 300px;
  padding: 40px 48px;
  gap: 60px;
}

.main-collage {
  width: 100%;
  height: auto;
  display: block;
}

.anniversary-sidebar {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.search-creator {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #000;
  padding-bottom: 8px;
  cursor: pointer;
}

.search-label {
  font-size: 11px;
  letter-spacing: 0.5px;
  font-weight: 400;
}

.anniversary-title {
  font-family: 'Playfair Display', serif;
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 24px;
  line-height: 1.2;
}

.description {
  font-size: 11px;
  line-height: 1.6;
  font-weight: 300;
  margin-bottom: 24px;
  text-align: justify;
}

.floating-accessibility {
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 40px;
  height: 40px;
  background: #fff;
  border: 1px solid #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
}

@media (max-width: 1024px) {
  .anniversary-container {
    grid-template-columns: 1fr;
  }
  .anniversary-sidebar {
    order: -1;
  }
}
</style>
