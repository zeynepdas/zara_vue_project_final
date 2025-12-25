<template>
  <div class="o-login-form-container">
    <div class="o-login-form__left">
      <div class="o-login-form__logo-wrapper">
        <A_Image :src="logoSrc" alt="ZARA Logo" class="a-logo-small" />
      </div>

      <A_Text tag="h2" class="o-login-form__heading">OTURUM AÇ</A_Text>

      <form @submit.prevent="handleLogin" class="o-login-form__form">
        <div class="form-field">
          <A_InputText v-model="email" placeholder="E-POSTA" class="a-input-login" />
        </div>

        <div class="form-field form-field--password">
          <A_InputText
            v-model="password"
            type="password"
            placeholder="PAROLA"
            class="a-input-login"
          />
          <A_Link href="#" class="a-link-forgot">Şifrenizi mi unuttunuz?</A_Link>
        </div>

        <div v-if="authStore.error" class="login-error-msg">
          {{ authStore.error }}
        </div>

        <div class="form-button-group">
          <A_Button type="submit" class="a-button-primary" :disabled="authStore.loading">
            {{ authStore.loading ? 'GİRİŞ YAPILIYOR...' : 'OTURUM AÇ' }}
          </A_Button>
          <A_Button type="button" class="a-button-secondary" @click="navigateToSignup"
            >KAYDOL</A_Button
          >
        </div>
      </form>

      <div class="o-login-form__social">
        <A_Text tag="h3" class="social-heading">BUNUNLA ERİŞİM SAĞLA</A_Text>
        <A_Text tag="p" class="social-text">
          Sosyal medya giriş bilgilerimle giriş yaparak, hesabımı aşağıdaki koşullara uygun olarak
          bağlamayı kabul ediyorum
          <A_Link href="#" class="a-link-policy">Gizlilik Politikası</A_Link>.
        </A_Text>

        <A_Button class="a-button-social">
          <A_Icon name="google" class="a-button-social-icon" /> GOOGLE İLE DEVAM ET
        </A_Button>
        <A_Button class="a-button-social">
          <A_Icon name="apple" class="a-button-social-icon" /> APPLE İLE DEVAM ET
        </A_Button>
      </div>

      <A_Link href="#" class="a-link-help">YARDIM</A_Link>
    </div>

    <div class="o-login-form__right" :style="{ backgroundImage: 'url(' + bgSrc + ')' }"></div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import A_Text from '../atoms/A_Text.vue'
import A_InputText from '../atoms/A_InputText.vue'
import A_Link from '../atoms/A_Link.vue'
import A_Button from '../atoms/A_Button.vue'
import A_Image from '../atoms/A_Image.vue'
import A_Icon from '../atoms/A_Icon.vue'

// Görsel Yolları
import LogoSource from '../../assets/images/Logo.png'
import BackgroundImageSource from '../../assets/images/login_foto.jpg'

export default {
  name: 'O_LoginForm',
  components: {
    A_Text,
    A_InputText,
    A_Link,
    A_Button,
    A_Image,
    A_Icon,
  },
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },
  data() {
    return {
      logoSrc: LogoSource,
      bgSrc: BackgroundImageSource,
      email: '',
      password: '',
    }
  },
  methods: {
    async handleLogin() {
      try {
        await this.authStore.login(this.email, this.password)
        console.log('Giriş başarılı!')
        this.$router.push('/')
      } catch (err) {
        console.error('Giriş hatası:', err)
      }
    },
    navigateToSignup() {
      this.$emit('toggle')
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

  /* Font Boyutları (Görsellerden alınan piksel değerleri) */
  --font-size-label: 11px;
  --font-size-body: 13px;
  --font-size-heading: 15px;
}

/* --- ANA LAYOUT --- */
.o-login-form-container {
  display: flex;
  min-height: 100vh;
  width: 100%;
  color: #000; /* --color-basic-black */
  font-family: 'Helvetica Now Text', Arial, sans-serif;
  font-weight: 300;
}

.o-login-form__left {
  /* Sol sütun genişliği (Görsel 0c1a81.jpg referans alınarak genişletildi) */
  width: 550px;

  /* Kenar Boşlukları */
  padding: 0 48px; /* --spacing-xl */
  padding-top: 48px; /* Logo üst boşluğu */

  flex-shrink: 0;
  text-align: left;
  background-color: white;
  position: relative;
  z-index: 10;

  /* Yardım linkini en alta itmek için Flex Column */
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
  /* Logo alt boşluğu */
  margin-bottom: 24px;
}

.a-logo-small {
  /* Logo Yüksekliği */
  height: 84px; /* Görsel 964f1b.png referansı */
  width: auto;
  display: block;
}

.o-login-form__heading {
  /* OTURUM AÇ Başlığı (Görsel 964f3a.png) */
  font-size: 15px;
  font-weight: 500; /* Biraz daha belirgin */
  margin-bottom: 16px; /* Başlık altı boşluk */
  margin-top: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: none !important;
}

/* --- FORM ALANLARI (INPUTLAR) --- */

.form-field {
  /* Inputlar arası boşluk (Görsel 0ad807.png) */
  margin-bottom: 32px; /* Geniş boşluk */
  position: relative;
}

/* Özel Şifre Alanı Boşluğu */
.form-field--password {
  /* Şifre inputu ile altındaki link/butonlar arası boşluk */
  margin-bottom: 24px;
}

/* INPUT STİLİ (Görsel 964f42.png, 964f5f.png) */
.a-input-login {
  width: 100%;
  /* Çerçeveleri kaldır, sadece alt çizgi */
  border: none !important;
  border-bottom: 1px solid #000 !important;

  /* Metin ile çizgi arası boşluk */
  padding: 0 0 4px;

  font-size: 13px;
  font-weight: 300;
  color: #000;
  border-radius: 0; /* Köşeleri keskinleştir */
  background: transparent;
}
.a-input-login:not([type='password']) {
  text-transform: none; /* Removed uppercase for email */
}
.a-input-login::placeholder {
  color: #000; /* Placeholder rengi siyah */
  opacity: 1;
}

/* Şifremi Unuttum Linki (Görsel 964f7c.png) */
.a-link-forgot {
  display: block;
  text-align: left; /* Sola hizalı */
  margin-top: 8px;

  font-size: 11px;
  text-decoration: none;
  color: #000;
  font-weight: 300;
}
.a-link-forgot:hover {
  text-decoration: underline;
}

/* --- BUTONLAR (Görsel 965227.png) --- */

.form-button-group {
  margin-top: 24px;
  margin-bottom: 48px;
}

.a-button-primary,
.a-button-secondary {
  width: 100%;
  border: 1px solid #000;
  /* Buton Padding: 4px dikey, 12px yatay */
  padding: 4px 12px;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 500; /* Biraz kalın */
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px; /* Sabit yükseklik */
}

.a-button-primary {
  background-color: #000;
  color: #fff;
  margin-bottom: 12px; /* İki buton arası boşluk */
}

.a-button-secondary {
  background-color: #fff;
  color: #000;
  margin-bottom: 0;
}

/* --- SOSYAL MEDYA VE YARDIM --- */

.o-login-form__social {
  /* Üstten ayırıcı yok, sadece boşluk (Görsel 96529e.png) */
  margin-top: 72px;
}

.social-heading {
  /* BUNUNLA ERİŞİM SAĞLA (Görsel 0adbc6.png) */
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 8px;
}

.social-text {
  font-size: 11px;
  color: #000;
  line-height: 1.4;
  margin-bottom: 24px;
}
.a-link-policy {
  text-decoration: underline;
  color: #000;
}

.a-button-social {
  width: 100%;
  background-color: #fff;
  color: #000;
  border: 1px solid #000;
  padding: 4px 12px;
  margin-bottom: 8px;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  cursor: pointer;
}

.a-button-social-icon {
  width: 14px; /* İkon boyutu */
  height: 14px;
  margin-right: 8px; /* Metin ile ikon arası */
  object-fit: contain;
}

.login-error-msg {
  color: #d93025;
  font-size: 11px;
  margin-bottom: 24px;
  font-weight: 300;
}

/* YARDIM Linki (En Altta) */
.a-link-help {
  display: block;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 500;

  /* En alta itmek için margin-top: auto */
  margin-top: auto;

  /* Alt kenardan boşluk (Görsel 9652a6.png) */
  margin-bottom: 56px;

  color: #757575; /* Gri ton */
  text-decoration: none;
}
.a-link-help:hover {
  color: #000;
}

/* Responsive adjustment */
@media (max-width: 1024px) {
  .o-login-form__right {
    display: none;
  }
  .o-login-form__left {
    width: 100%;
  }
}
</style>
