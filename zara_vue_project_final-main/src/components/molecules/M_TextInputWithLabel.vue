<template>
  <div class="m-social-media-group">
    <A_Link v-for="item in socialLinks" :key="item.name" :to="item.url" target="_blank" class="m-social-media-group__link">
      <A_Icon :name="item.icon" size="medium"/>
    </A_Link>
  </div>
</template>

<script>
import A_Link from '@/components/atoms/A_Link.vue';
import A_Icon from '@/components/atoms/A_Icon.vue';

export default {
  name: 'M_SocialMediaIconGroup',
  components: { A_Link, A_Icon },
  data() {
    return {
      // Bu veriler Organizmada da tutulabilir, biz basitlik için burada tutuyoruz.
      socialLinks: [
        { name: 'Instagram', icon: 'instagram', url: '/instagram' },
        { name: 'Youtube', icon: 'youtube', url: '/youtube' },
        { name: 'Facebook', icon: 'facebook', url: '/facebook' },
      ]
    };
  }
}
</script>

<style scoped>
.m-social-media-group {
  display: flex;
  gap: 15px;
  padding: 10px 0;
  width: fit-content;
}
.m-social-media-group__link .a-icon {
  color: black;
  /* Icon atomunun boyutunu molekül içinde override edebilirsiniz */
}
</style>