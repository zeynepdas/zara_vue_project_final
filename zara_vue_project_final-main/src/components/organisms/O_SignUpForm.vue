<template>
  <div class="o-login-form-container">
    <div class="o-login-form__left">
      <div class="o-login-form__logo-wrapper">
        <A_Image :src="logoSrc" alt="ZARA Logo" class="a-logo-small" />
      </div>

      <A_Text tag="h2" class="o-login-form__heading">KİŞİSEL BİLGİLER</A_Text>

      <form @submit.prevent="handleSignup" class="o-login-form__form">
        <div class="form-field">
          <A_InputText placeholder="E-POSTA ADRESİ" class="a-input-login" />
        </div>

        <div class="form-field">
          <A_InputText type="password" placeholder="PAROLA" class="a-input-login" />
        </div>

        <div class="form-field">
          <A_InputText placeholder="ADI" class="a-input-login" />
        </div>

        <div class="form-field">
          <A_InputText placeholder="SOYADI" class="a-input-login" />
        </div>

        <div class="form-field form-field--phone-group">
          <div class="phone-labels-row">
            <A_Text tag="span" class="phone-label">ALAN KODU</A_Text>
            <div></div>
          </div>
          <div class="phone-inputs-row">
            <A_InputText placeholder="+90" class="a-input-phone-code" />
            <A_InputText placeholder="TELEFON" class="a-input-phone-number" />
          </div>
          <div class="phone-info-row">
            <A_Text tag="p" class="phone-info"
              >Telefonunuzu doğrulamak için size SMS göndereceğiz</A_Text
            >
          </div>
        </div>

        <div class="form-checkbox-group">
          <label class="a-checkbox-label">
            <input type="checkbox" class="a-checkbox-input" />
            <span class="a-checkbox-text"
              >E-posta adresime Zara ile ilgili haberlerin gelmesini istiyorum</span
            >
          </label>
          <label class="a-checkbox-label">
            <input type="checkbox" class="a-checkbox-input" />
            <span class="a-checkbox-text">
              <a href="#" class="privacy-link">Gizlilik beyanını</a> kabul ediyorum.
            </span>
          </label>
        </div>

        <div class="form-button-group">
          <A_Button type="submit" class="a-button-primary">HESAP OLUŞTUR</A_Button>
        </div>
      </form>

      <div class="o-login-form__spacer"></div>
    </div>

    <div class="o-login-form__right" :style="{ backgroundImage: 'url(' + bgSrc + ')' }"></div>
  </div>
</template>

<script>
// Görsel Yolları
import LogoSource from '../../assets/images/Logo.png'
import BackgroundImageSource from '../../assets/images/login_foto.jpg'

// Atom Importları
import A_Text from '../atoms/A_Text.vue'
import A_InputText from '../atoms/A_InputText.vue'
import A_Link from '../atoms/A_Link.vue'
import A_Button from '../atoms/A_Button.vue'
import A_Image from '../atoms/A_Image.vue'
import A_Icon from '../atoms/A_Icon.vue'

export default {
  name: 'O_SignUpForm',
  components: {
    A_Text,
    A_InputText,
    A_Link,
    A_Button,
    A_Image,
    A_Icon,
  },
  data() {
    return {
      logoSrc: LogoSource,
      bgSrc: BackgroundImageSource,
    }
  },
  methods: {
    handleSignup() {
      console.log('Hesap oluşturuluyor...')
    },
    toggleSideMenu() {
      console.log('Menü açıldı!')
    },
  },
}
</script>

<style scoped>
/* --- TEMEL DEĞİŞKENLER --- */
:root {
  --spacing-xxs: 4px;
  --spacing-xs: 8px;
  --spacing-sm: 12px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 48px;

  --font-size-label: 10px;
  --font-size-body: 11px;
  --font-size-heading: 15px;

  --color-content-mid: #757575;
}

/* --- ANA LAYOUT --- */
.o-login-form-container {
  display: flex;
  min-height: 100vh;
  width: 100%;
  color: #000;
  font-family: 'Helvetica Now Text', Arial, sans-serif;
  font-weight: 300;
  background-color: white;
  justify-content: flex-start;
}

.o-login-form__left {
  width: 550px;
  padding: 0 48px;
  padding-top: 48px;
  flex-shrink: 0;
  text-align: left;
  background-color: white;
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.o-login-form__right {
  flex-grow: 1;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  z-index: 1;
}

/* --- LOGO VE BAŞLIK --- */

.o-login-form__logo-wrapper {
  margin-bottom: 24px;
}

.a-logo-small {
  height: 84px;
  width: auto;
  display: block;
}

.o-login-form__heading {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 32px;
  text-transform: uppercase;
  border-bottom: none;
}

/* --- FORM ALANLARI --- */

.o-login-form__form {
  width: 100%;
}

.form-field {
  margin-bottom: 24px;
  position: relative;
}

.a-input-login {
  width: 100%;
  border: none !important;
  border-bottom: 1px solid black !important;
  padding: 0 0 4px;
  font-size: 13px;
  text-transform: uppercase;
  font-weight: 300;
  background: transparent;
  border-radius: 0;
}
.a-input-login::placeholder {
  color: #000;
  opacity: 1;
}

/* TELEFON GRUBU */
.form-field--phone-group {
  margin-bottom: 24px;
}

.phone-labels-row {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 16px;
  margin-bottom: 8px;
}

.phone-label {
  font-size: 10px;
  color: #757575;
  text-transform: uppercase;
}

.phone-inputs-row {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 16px;
}

.a-input-phone-code,
.a-input-phone-number {
  width: 100%;
  border: none !important;
  border-bottom: 1px solid black !important;
  padding: 0 0 4px;
  font-size: 13px;
  font-weight: 300;
  text-transform: uppercase;
}

.phone-info-row {
  margin-top: 8px;
}
.phone-info {
  font-size: 11px;
  color: #000;
}

/* --- ONAY KUTULARI --- */

.form-checkbox-group {
  margin-top: 32px;
  margin-bottom: 32px;
}

.a-checkbox-label {
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
  cursor: pointer;
}

.a-checkbox-input {
  width: 14px;
  height: 14px;
  margin-right: 10px;
  margin-top: 2px;
  flex-shrink: 0;
  cursor: pointer;
  accent-color: black;
}

.a-checkbox-text {
  font-size: 11px;
  font-weight: 300;
  color: #757575;
  line-height: 1.4;
}

.privacy-link {
  color: #757575;
  text-decoration: underline;
  cursor: pointer;
}
.privacy-link:hover {
  color: #000;
}

/* --- BUTON --- */

.form-button-group {
  margin-top: 32px;
}

.a-button-primary {
  width: auto;
  border: 1px solid black;
  padding: 12px 32px;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 500;
  background-color: white;
  color: black;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-block;
}

.a-button-primary:hover {
  background-color: #f5f5f5;
}

.o-login-form__spacer {
  flex-grow: 1;
}

@media (max-width: 1024px) {
  .o-login-form__right {
    display: none;
  }
  .o-login-form__left {
    width: 100%;
  }
}
</style>
