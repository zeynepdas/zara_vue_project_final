<template>
  <div class="contact-page">
    <div class="contact-view__container">
      <h1 class="contact-title">MÜŞTERİ HİZMETLERİ</h1>

      <div class="contact-methods">
        <!-- CANLI DESTEK -->
        <div class="contact-item">
          <div class="contact-item__header">
            <svg
              class="contact-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                stroke="currentColor"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <h2 class="contact-item__title">CANLI DESTEK</h2>
          </div>
          <div class="contact-item__content">
            <p>Pzt-Cum: 8:30-00:00</p>
            <p>Cmt: 10:00-22:00</p>
            <A_Link href="#" class="item-action-link">Sohbeti aç</A_Link>
          </div>
        </div>

        <!-- WHATSAPP -->
        <div class="contact-item">
          <div class="contact-item__header">
            <svg
              class="contact-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
              ></path>
            </svg>
            <h2 class="contact-item__title">WHATSAPP</h2>
          </div>
          <div class="contact-item__content">
            <p>Pzt-Cum: 08:30-00:00, Cmt: 10:00-22:00</p>

            <div class="info-banner">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="info-icon">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span
                >+90 444 59 52. Servisin kullanımı ile peşinen gizlilik politikası kullanım
                koşullarını kabul etmiş sayılırsınız</span
              >
            </div>
          </div>
        </div>

        <!-- FACEBOOK -->
        <div class="contact-item">
          <div class="contact-item__header">
            <svg
              class="contact-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
            <h2 class="contact-item__title">FACEBOOK</h2>
          </div>
          <div class="contact-item__content">
            <A_Link href="#" class="social-handle">ZARACare</A_Link>
          </div>
        </div>

        <!-- X -->
        <div class="contact-item">
          <div class="contact-item__header">
            <svg
              class="contact-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
            >
              <path
                d="M4 4l11.733 16h4.267l-11.733 -16zM4 20l6.768 -6.768M13.232 10.768l6.768 -6.768"
              />
            </svg>
            <h2 class="contact-item__title">X</h2>
          </div>
          <div class="contact-item__content">
            <A_Link href="#" class="social-handle">@Zara_care</A_Link>
          </div>
        </div>

        <!-- INSTAGRAM -->
        <div class="contact-item">
          <div class="contact-item__header">
            <svg
              class="contact-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <h2 class="contact-item__title">INSTAGRAM</h2>
          </div>
          <div class="contact-item__content">
            <A_Link href="#" class="social-handle">@zaracare</A_Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import A_Link from '~/src/components/atoms/A_Link.vue'

definePageMeta({
  layout: 'default',
})
</script>

<style scoped>
.contact-page {
  width: 100%;
  background: #fff;
  min-height: 80vh;
  padding: 100px 0 120px;
  font-family: 'Helvetica Now Text', 'Helvetica', 'Arial', 'sans-serif';
  color: #000;
}

.contact-view__container {
  padding-left: 20px; /* Reduced left padding as requested */
  max-width: 1200px;
  margin-left: 0;
}

.contact-title {
  font-size: 11px;
  font-weight: 500;
  margin-bottom: 60px;
  letter-spacing: 0.05rem;
  text-transform: uppercase;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 32px; /* Reduced from 48px */
}

.contact-item {
  display: flex;
  flex-direction: column;
  gap: 8px; /* Reduced from 16px */
}

.contact-item__header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.contact-icon {
  flex-shrink: 0;
  color: #000;
}

.contact-item__title {
  font-size: 11px;
  font-weight: 550;
  letter-spacing: 0.03rem;
}

.contact-item__content {
  padding-left: 32px;
  display: flex;
  flex-direction: column;
  gap: 2px; /* Reduced from 6px for tighter line spacing */
}

.contact-item__content p {
  font-size: 11px;
  font-weight: 300;
  line-height: 1.2;
}

.item-action-link {
  font-size: 11px;
  text-decoration: underline;
  margin-top: 4px; /* Reduced from 10px */
  font-weight: 400;
}

.social-handle {
  font-size: 11px;
  font-weight: 300;
  color: #000;
}

.info-banner {
  background-color: #fff1e0;
  padding: 10px 16px; /* Reduced from 14x20 */
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px; /* Reduced from 12px */
  max-width: 800px;
}

.info-icon {
  flex-shrink: 0;
}

.info-banner span {
  font-size: 11px;
  line-height: 1.3;
  font-weight: 300;
}

@media (min-width: 768px) {
  .contact-view__container {
    padding-left: var(--spacing-09); /* Approx 48px on desktop */
  }
}
</style>
