<script setup>
import { defineAsyncComponent, ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 1. İsim Eşleştirme Haritası
const ORGANISM_NAME_MAP = {
  'O_Header.vue': '1. Header',
  'O_Footer.vue': '2. Footer',
  'O_LoginForm.vue': '3. Giriş Yap (Login)',
  'O_SignUpForm.vue': '4. Kayıt Ol (Sign Up)',
  'O_ProductDetails.vue': '5. Ürün Sayfası',
  'O_CartPage.vue': '6. Sepet',
  'O_CarouselSlider.vue': '7. Slider (Carousel)',
  'O_HomeView.vue': '7a. Ana Sayfa (Çift Slider)',
  'O_RelatedProductsSlider.vue': '8. Slider (Benzer Ürünler)',
  'O_SideMenu.vue': '9. Yan Menü',
  'O_PromotionSection.vue': '10. Kategori Kampanyaları',
}

// 2. Dinamik Yükleme (Yol kontrolü önemlidir: './components/organisms/*.vue')
const modules = import.meta.glob('./components/organisms/*.vue')

const organismsList = Object.entries(modules)
  .map(([path, moduleFn]) => {
    const fileName = path.split('/').pop()
    if (!fileName.startsWith('O_') || !ORGANISM_NAME_MAP[fileName]) {
      return null
    }
    return {
      name: ORGANISM_NAME_MAP[fileName],
      // Router parametresi olarak kullanılacak sade dosya adı
      componentName: fileName.replace('.vue', ''),
      component: defineAsyncComponent(moduleFn),
    }
  })
  .filter((item) => item !== null)
  .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))

// Reaktif Durumlar
const selectedComponent = ref(null)
const selectedComponentName = ref('')

// Fonksiyon: Rota parametresine göre bileşeni bul ve yükle
function loadSelectedComponent(nameFromRoute) {
  const foundOrganism = organismsList.find((org) => org.componentName === nameFromRoute)

  if (foundOrganism) {
    selectedComponent.value = foundOrganism.component
    selectedComponentName.value = foundOrganism.componentName
  } else {
    selectedComponent.value = null
    selectedComponentName.value = `Hata: Bileşen bulunamadı (${nameFromRoute})`
  }
}

// 3. Rota Parametresini İzle (URL değiştiğinde çalışır)
watch(
  () => route.params.componentName,
  (newName) => {
    if (newName) {
      loadSelectedComponent(newName)
    } else if (organismsList.length > 0) {
      // URL'de parametre yoksa, listenin ilk bileşenine yönlendir (Örn: /O_Header)
      router.replace({
        name: 'styleguide',
        params: { componentName: organismsList[0].componentName },
      })
    }
  },
  // Sayfa ilk yüklendiğinde de watch'ı çalıştır
  { immediate: true },
)

// 4. Sayfa Yüklendiğinde İlk Bileşeni Seçme (Gerekirse)
onMounted(() => {
  // Eğer URL parametresi yoksa, watch bunu halledecektir.
  // Bu kısım genellikle watch ile birlikte çalışarak ilk yüklemede varsayılanı sağlar.
  if (!route.params.componentName && organismsList.length > 0) {
    router.replace({
      name: 'styleguide',
      params: { componentName: organismsList[0].componentName },
    })
  }
})
</script>

<template>
  <div class="styleguide-layout">
    <aside class="sidebar">
      <h3>ORGANISMS</h3>
      <ul>
        <router-link
          v-for="organism in organismsList"
          :key="organism.name"
          :to="{ name: 'styleguide', params: { componentName: organism.componentName } }"
          custom
          v-slot="{ href, navigate, isActive }"
        >
          <li :class="{ active: isActive }" @click="navigate">
            {{ organism.name }}
          </li>
        </router-link>
      </ul>
    </aside>

    <main class="preview-area">
      <div class="component-box">
        <component :is="selectedComponent" v-if="selectedComponent" />
        <p v-else>Lütfen soldan bir organizma seçin.</p>
      </div>
    </main>
  </div>
</template>

<style>
/* Sidebar genişliğini 320px olarak tanımlıyoruz */
:root {
  --sidebar-width: 320px;
}

/* Genel düzen stili */
body {
  margin: 0;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background-color: #f7f7f7;
}

.styleguide-layout {
  display: flex;
  min-height: 100vh;
}

/* SABİT VE BÜYÜK SIDEBAR STİLİ */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--sidebar-width);
  height: 100vh;
  flex-shrink: 0;
  background-color: #ffffff;
  border-right: 1px solid #eee;
  overflow-y: auto;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
  z-index: 10;
}

.sidebar h3 {
  padding: 30px 40px 15px;
  font-size: 16px;
  color: #555;
  text-transform: uppercase;
  border-bottom: 1px solid #eee;
  margin: 0;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Menü Öğesi Stili */
.sidebar li {
  display: block;
  padding: 15px 40px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.1s ease;
  line-height: 1.2;
  color: #333;
}

.sidebar li:hover {
  background-color: #f0f0f0;
}

.sidebar li.active {
  font-weight: 600;
  color: #000;
  background-color: #e5e5e5;
  border-left: 5px solid black;
  padding-left: 0;
}

/* ÖNİZLEME ALANI STİLİ - DİKKAT BURAYI DÜZELTİYORUZ */
.preview-area {
  flex-grow: 1;
  /* Sidebar genişliği kadar soldan boşluk bırakır */
  margin-left: 0;
  /* Yatay padding'i kaldırıyoruz, böylece Header tam genişliği kullanabilir */
  padding-left: 0;
  padding-right: 0;
  /* Üstten padding'i azaltıp Header'ın en üste oturmasını sağlıyoruz */
  padding-top: 0;
  padding-bottom: 0; /* Alttan biraz padding bırakılabilir */
  overflow-x: hidden; /* Yatay kaydırmayı engelle */

  /* Yeni Dikey Alan Kontrolü */
  min-height: 100vh; /* Ekran yüksekliğinin tamamı veya daha fazlası */
  padding-top: 0; /* Header'dan sonra başlaması için biraz boşluk */
}

/* COMPONENT-BOX STİLİ - DİKKAT BURAYI DÜZELTİYORUZ */
.component-box {
  margin-top: 0; /* Üstten boşluğu kaldırın */
  padding: 0; /* İç dolguyu sıfırlayın */
  background-color: #ffffff; /* Arka plan rengini kaldırın */
  border: none; /* Kenarlığı kaldırın */
  min-height: 1050px; /* Yüksekliği içeriğe bırakın */
  width: 1500px; /* İçeriğin tam genişlik almasını sağlayın */
}

/* Sadece önizleme başlığı ve çizgisi için padding ekleyelim */
.preview-area h2 {
  margin-top: 0;
  font-size: 24px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 0;
  margin-bottom: 25px;
  padding-left: 0; /* Başlığı sola hizala */
  padding-right: 1px;
  padding-top: 1px;
}
.preview-area hr {
  display: none; /* Artık buna ihtiyacımız yok, h2'deki border yeterli */
}
</style>
