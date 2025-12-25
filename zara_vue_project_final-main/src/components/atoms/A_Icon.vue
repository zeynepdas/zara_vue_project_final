<template>
  <span class="a-icon">
    <A_Image v-if="iconSrc" :src="iconSrc" :alt="name + ' icon'" class="a-icon__img" />
    <slot></slot>
  </span>
</template>

<script>
// KRİTİK DÜZELTME: JPG yerine PNG uzantıları kullanılıyor
import A_Image from './A_Image.vue';
import GoogleIcon from '../../assets/images/google.png'; // PNG olarak düzeltildi
import AppleIcon from '../../assets/images/apple.png';   // PNG olarak düzeltildi

export default {
  name: 'A_Icon',
  components: {
    A_Image
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    iconSrc() {
      // name prop'una göre doğru görselin import edilmiş yolunu döndürür
      if (this.name === 'google') {
        return GoogleIcon;
      } else if (this.name === 'apple') {
        return AppleIcon;
      } 
      return null;
    }
  }
};
</script>

<style scoped>
.a-icon {
  display: inline-flex; 
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  cursor: default;
  color: black;
}

/* KRİTİK DÜZELTME: img etiketinin kendisini küçük boyutta tutar */
.a-icon__img {
    width: 18px;  /* Görselin genişliğini sabitler */
    height: 18px; /* Görselin yüksekliğini sabitler */
    object-fit: contain; /* Görselin oranını korur ve belirtilen alana sığdırır */
    flex-shrink: 0; /* İçinde bulunduğu flex kapsayıcısında küçülmesini engeller */
}
</style>