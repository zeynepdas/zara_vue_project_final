<template>
  <div class="related-products-container">
    <div class="related-title">ŞUNLARI DA BEĞENEBİLİRSİNİZ</div>

    <div class="related-products-grid">
      <NuxtLink
        v-for="product in products"
        :key="product.id"
        :to="`/product/${product.id}`"
        class="product-card"
      >
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
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs, query, limit } from 'firebase/firestore'
import { useNuxtApp } from '#app'
import A_Text from '../atoms/A_Text.vue'
import A_Image from '../atoms/A_Image.vue'

const products = ref([])
const loading = ref(true)

onMounted(async () => {
  await loadProducts()
})

const loadProducts = async () => {
  const { $db } = useNuxtApp()

  try {
    const q = query(collection($db, 'relatedProducts'), limit(10))
    const querySnapshot = await getDocs(q)

    const fetchedProducts = []
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      fetchedProducts.push({
        id: data.id || doc.id,
        name: data.name,
        price: data.price,
        image: data.imageUrl || data.image,
      })
    })

    if (fetchedProducts.length === 0) {
      console.warn('Firestore relatedProducts empty, using fallback data.')
      // Senin attığın 10 ürünlük orijinal liste buraya eklendi:
      fetchedProducts.push(
        {
          id: 1,
          name: 'TRF YÜKSEK BEL KISA KESİM ÇAN PAÇA JEAN',
          price: '1.090,00 TL',
          image:
            'https://static.zara.net/assets/public/afa5/4a68/18584cae9215/4c1f32057d45/04060217700-e1/04060217700-e1.jpg?ts=1755774853449&w=421',
        },
        {
          id: 2,
          name: 'YUMUŞAK TRİKO KAZAK',
          price: '1.790,00 TL',
          image:
            'https://static.zara.net/assets/public/1878/8adc/46484af986e6/31a0f7452c4a/02142161644-060-e1/02142161644-060-e1.jpg?ts=1761561416820&w=421',
        },
        {
          id: 3,
          name: 'TOPUKLU KUMAŞ BİLEKLİ BOT',
          price: '2.490,00 TL',
          image:
            'https://static.zara.net/assets/public/9046/9ee6/f19a4324afa4/20afb0a93687/12106611700-e1/12106611700-e1.jpg?ts=1757950812504&w=421',
        },
        {
          id: 4,
          name: 'LIMITED EDITION ÇİFT YÜZLÜ CEKET',
          price: '2.990,00 TL',
          image:
            'https://static.zara.net/assets/public/1d62/0b2e/dade44f3990b/ce1cfb849482/08372321716-e1/08372321716-e1.jpg?ts=1759836104627&w=421',
        },
        {
          id: 5,
          name: 'METALİK İPLİKLİ PALAZZO PANTOLON',
          price: '1.990,00 TL',
          image:
            'https://static.zara.net/assets/public/7fcf/e9a3/c28544a490c9/cdc250c05a35/02180505312-e1/02180505312-e1.jpg?ts=1753708874210&w=421',
        },
        {
          id: 6,
          name: 'KRUVAZE KISA KABAN',
          price: '9.990,00 TL',
          image:
            'https://static.zara.net/assets/public/dbdf/b050/cc7c4ad195a9/3d2654433de5/03046297700-e1/03046297700-e1.jpg?ts=1758036732381&w=421',
        },
        {
          id: 7,
          name: 'UZUN ÇAPRAZ ASKILI ÇANTA',
          price: '1.490,00 TL',
          image:
            'https://static.zara.net/assets/public/2d97/9708/4eb94d07a880/3587998ce56b/16044710800-e1/16044710800-e1.jpg?ts=1764938545219&w=421',
        },
        {
          id: 8,
          name: 'RED ZARA TEMPTATION VANILLE EXTRAIT DE PARFUM 50 ML',
          price: '890,00 TL',
          image:
            'https://static.zara.net/assets/public/3ebc/cdde/a9d445f79de9/91d13b36904f/20110603999-e1/20110603999-e1.jpg?ts=1728899199144&w=501',
        },
        {
          id: 9,
          name: 'KONTRAST ŞİŞME MONT',
          price: '2.290,00 TL',
          image:
            'https://static.zara.net/assets/public/2081/cd54/61614867b759/376823d449fa/08073331800-e1/08073331800-e1.jpg?ts=1762960949396&w=421',
        },
        {
          id: 10,
          name: 'ORCHID + WONDER ROSE EDT 2 X 90 ML',
          price: '1.090,00 TL',
          image:
            'https://static.zara.net/assets/public/8944/7df7/44714e47af63/ad2319236d26/20120925999-000-e1/20120925999-000-e1.jpg?ts=1750934575876&w=501',
        },
      )
    }

    products.value = fetchedProducts
    products.value.sort((a, b) => Number(a.id) - Number(b.id))
  } catch (error) {
    console.error('Error loading related products:', error)
    // Hata durumunda da 10 ürünlük listeyi göster:
    products.value = [
      {
        id: 1,
        name: 'TRF YÜKSEK BEL JEAN',
        price: '1.090,00 TL',
        image:
          'https://static.zara.net/assets/public/afa5/4a68/18584cae9215/4c1f32057d45/04060217700-e1/04060217700-e1.jpg?ts=1755774853449&w=421',
      },
      {
        id: 2,
        name: 'YUMUŞAK TRİKO KAZAK',
        price: '1.790,00 TL',
        image:
          'https://static.zara.net/assets/public/1878/8adc/46484af986e6/31a0f7452c4a/02142161644-060-e1/02142161644-060-e1.jpg?ts=1761561416820&w=421',
      },
      {
        id: 3,
        name: 'TOPUKLU KUMAŞ BOT',
        price: '2.490,00 TL',
        image:
          'https://static.zara.net/assets/public/9046/9ee6/f19a4324afa4/20afb0a93687/12106611700-e1/12106611700-e1.jpg?ts=1757950812504&w=421',
      },
      {
        id: 4,
        name: 'LIMITED EDITION CEKET',
        price: '2.990,00 TL',
        image:
          'https://static.zara.net/assets/public/1d62/0b2e/dade44f3990b/ce1cfb849482/08372321716-e1/08372321716-e1.jpg?ts=1759836104627&w=421',
      },
      {
        id: 5,
        name: 'METALİK PANTOLON',
        price: '1.990,00 TL',
        image:
          'https://static.zara.net/assets/public/7fcf/e9a3/c28544a490c9/cdc250c05a35/02180505312-e1/02180505312-e1.jpg?ts=1753708874210&w=421',
      },
      {
        id: 6,
        name: 'KRUVAZE KISA KABAN',
        price: '9.990,00 TL',
        image:
          'https://static.zara.net/assets/public/dbdf/b050/cc7c4ad195a9/3d2654433de5/03046297700-e1/03046297700-e1.jpg?ts=1758036732381&w=421',
      },
      {
        id: 7,
        name: 'UZUN ASKILI ÇANTA',
        price: '1.490,00 TL',
        image:
          'https://static.zara.net/assets/public/2d97/9708/4eb94d07a880/3587998ce56b/16044710800-e1/16044710800-e1.jpg?ts=1764938545219&w=421',
      },
      {
        id: 8,
        name: 'ZARA TEMPTATION PARFÜM',
        price: '890,00 TL',
        image:
          'https://static.zara.net/assets/public/3ebc/cdde/a9d445f79de9/91d13b36904f/20110603999-e1/20110603999-e1.jpg?ts=1728899199144&w=501',
      },
      {
        id: 9,
        name: 'KONTRAST ŞİŞME MONT',
        price: '2.290,00 TL',
        image:
          'https://static.zara.net/assets/public/2081/cd54/61614867b759/376823d449fa/08073331800-e1/08073331800-e1.jpg?ts=1762960949396&w=421',
      },
      {
        id: 10,
        name: 'ORCHID PARFÜM SETİ',
        price: '1.090,00 TL',
        image:
          'https://static.zara.net/assets/public/8944/7df7/44714e47af63/ad2319236d26/20120925999-000-e1/20120925999-000-e1.jpg?ts=1750934575876&w=501',
      },
    ]
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.related-products-container {
  width: 100%;
  padding: 0 132px;
  margin-top: 80px;
  margin-bottom: 100px;
  font-family: 'Helvetica Now Text', Arial, sans-serif;
  color: #000;
}

.related-title {
  font-size: 11px;
  font-weight: 300;
  text-transform: uppercase;
  margin-bottom: 30px;
  letter-spacing: 0.5px;
}

.related-products-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}

.product-card {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}

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

.plus-icon-wrapper {
  position: absolute;
  bottom: 8px;
  left: 8px;
  z-index: 2;
  color: #757575;
}

.product-card__info {
  display: flex;
  flex-direction: column;
  font-size: 10px;
  line-height: 1.4;
  text-transform: uppercase;
  font-weight: 300;
  gap: 4px;
}

@media screen and (max-width: 1024px) {
  .related-products-container {
    padding: 0 48px;
  }
}

@media screen and (max-width: 768px) {
  .related-products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
