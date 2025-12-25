<template>
  <div class="m-phone-input-group">
    <M_TextInputWithLabel
      id="phoneCode"
      label="ALAN KODU"
      type="tel"
      :modelValue="codeValue"
      @update:modelValue="$emit('update:codeValue', $event)"
      placeholder="+90"
      class="m-phone-input-group__code-input"
    />
    
    <M_TextInputWithLabel
      id="phoneNumber"
      label="TELEFON"
      type="tel"
      :modelValue="numberValue"
      @update:modelValue="$emit('update:numberValue', $event)"
      class="m-phone-input-group__number-input"
    />
  </div>
</template>

<script>
// Bağımlı Molekül
import M_TextInputWithLabel from '@/components/molecules/M_TextInputWithLabel.vue';

export default {
  name: 'M_PhoneInputGroup',
  components: {
    M_TextInputWithLabel
  },
  props: {
    // Alan kodu için v-model karşılığı
    codeValue: {
      type: [String, Number],
      default: '+90' // Varsayılan değer
    },
    // Telefon numarası için v-model karşılığı
    numberValue: {
      type: [String, Number],
      default: ''
    }
  },
  emits: ['update:codeValue', 'update:numberValue']
}
</script>

<style scoped>
.m-phone-input-group {
  display: flex;
  gap: 20px; /* İki input arasında boşluk */
}
/* Atom ve Molekül genişliklerini burada ayarlıyoruz */
.m-phone-input-group__code-input {
  flex-basis: 30%; /* Alan kodunu dar tut */
}
.m-phone-input-group__number-input {
  flex-basis: 70%; /* Numarayı geniş tut */
}
</style>