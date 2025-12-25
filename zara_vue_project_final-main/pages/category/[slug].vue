<template>
  <div class="category-page">
    <O_ProductsGrid
      :products="mappedProducts"
      :loading="loading"
      :title="categoryTitle"
      @product-click="goToProduct"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { collection, getDocs, query, limit } from 'firebase/firestore'
import { useNuxtApp } from '#app'
import O_ProductsGrid from '~/src/components/organisms/O_ProductsGrid.vue'

const route = useRoute()
const router = useRouter()

const slug = computed(() => String(route.params.slug))
const loading = ref(true)
const products = ref([])

const categoryTitle = computed(() => {
  // Extract only the last part (e.g., "the-new" from "kadin-the-new")
  const parts = slug.value.split('-')
  const lastTwoParts = parts.slice(-2) // Get last 2 words: ["the", "new"]
  return lastTwoParts.map((word) => word.toUpperCase()).join(' ')
})

const mappedProducts = computed(() => {
  console.log('Raw products:', products.value)
  const mapped = products.value.slice(0, 12).map((product) => ({
    id: product.id,
    title: product.name || product.title || 'Ürün',
    price: product.price || '0 TL',
    image: product.imageUrl || product.image || 'https://placehold.co/400x600',
  }))
  console.log('Mapped products:', mapped)
  return mapped
})

const fetchCategoryProducts = async () => {
  loading.value = true
  const { $db } = useNuxtApp()

  try {
    console.log('Fetching from collection:', slug.value)

    // Fetch from collection named after the slug (e.g., 'kadin-the-new')
    const q = query(collection($db, slug.value), limit(12))
    const querySnapshot = await getDocs(q)

    console.log('Query snapshot size:', querySnapshot.size)

    const fetchedProducts = []
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      console.log('Product data:', data)
      fetchedProducts.push({
        id: doc.id,
        ...data,
      })
    })

    console.log('Total fetched products:', fetchedProducts.length)

    // Eğer veri geldiyse kullan, gelmediyse fallback datayı göster
    if (fetchedProducts.length > 0) {
      products.value = fetchedProducts
    } else {
      console.log('No products in Firestore, using uploaded products fallback...')
      products.value = [
        {
          id: '2',
          name: 'LİKİT AYDINLATICI - TEMPTING GLOW',
          price: '790,00 TL',
          imageUrl: '/images/sepet_alti3.jpg',
        },
        {
          id: '3',
          name: 'ASİMETRİK YAKA TOP',
          price: '990,00 TL',
          imageUrl: '/images/sepet_alti4.jpg',
        },
        {
          id: '4',
          name: 'LIMITED EDITION ÇİFT YÜZLÜ CEKET',
          price: '9.990,00 TL',
          imageUrl: '/images/sepet_alti1.jpg',
        },
        {
          id: '5',
          name: 'METALİK İPLİKLİ PALAZZO PANTOLON',
          price: '1.490,00 TL',
          imageUrl: '/images/sepet_alti2.jpg',
        },
        {
          id: '6',
          name: 'ÇİFT YÜZLÜ SUNİ SÜET CEKET',
          price: '3.690,00 TL',
          imageUrl: '/images/sepet_alti.jpg',
        },
        {
          id: '7',
          name: 'SUNİ DERİ TRABİLLA CEKET',
          price: '2.990,00 TL',
          imageUrl: '/images/sepet_alti3.jpg',
        },
        {
          id: '8',
          name: 'SÜET GÖRÜNÜMLÜ BOMBER CEKET',
          price: '2.990,00 TL',
          imageUrl: '/images/sepet_alti4.jpg',
        },
        {
          id: '9',
          name: 'ÇİFT TARAFLI ZW KOLEKSİYONU CEKET',
          price: '4.990,00 TL',
          imageUrl: '/images/sepet_alti1.jpg',
        },
        {
          id: '10',
          name: 'ÇİFT TARAFLI ZW KOLEKSİYONU CEKET',
          price: '4.990,00 TL',
          imageUrl: '/images/sepet_alti2.jpg',
        },
        {
          id: '11',
          name: 'SÜET GÖRÜNÜMLÜ BOMBER CEKET',
          price: '2.990,00 TL',
          imageUrl: '/images/sepet_alti.jpg',
        },
        {
          id: '12',
          name: 'ÇİFT YÜZLÜ SUNİ KÜRK ÇİFT TARAFLI CEKET',
          price: '3.690,00 TL',
          imageUrl: '/images/sepet_alti3.jpg',
        },
        {
          id: '13',
          name: 'ÇİFT BEL BANTLI WIDE LEG PANTOLON',
          price: '1.790,00 TL',
          imageUrl: '/images/sepet_alti4.jpg',
        },
        {
          id: '14',
          name: 'KRUVAZE KISA KABAN',
          price: '2.490,00 TL',
          imageUrl: '/images/sepet_alti1.jpg',
        },
        {
          id: '15',
          name: 'KISA SU GEÇİRMEZ RÜZGAR GEÇİRMEZ ŞİŞME ANORAK',
          price: '2.490,00 TL',
          imageUrl: '/images/sepet_alti2.jpg',
        },
      ]
    }
  } catch (error) {
    console.error(`Error fetching products from ${slug.value}:`, error)
    // Hata durumunda da fallback datayı göster (En azından sayfa boş kalmaz)
    products.value = [
      {
        id: '2',
        name: 'LİKİT AYDINLATICI',
        price: '790,00 TL',
        imageUrl: '/images/sepet_alti3.jpg',
      },
      {
        id: '6',
        name: 'ÇİFT YÜZLÜ CEKET',
        price: '3.690,00 TL',
        imageUrl: '/images/sepet_alti.jpg',
      },
    ]
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCategoryProducts()
})

watch(slug, () => {
  fetchCategoryProducts()
})

const goToProduct = (id) => {
  console.log('Navigating to product:', id)
  router.push(`/product/${id}`)
}
</script>

<style scoped>
.category-page {
  min-height: 100vh;
  background: white;
}
</style>
