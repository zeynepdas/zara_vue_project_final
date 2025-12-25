<template>
  <div class="product-page">
    <div class="header-spacer"></div>

    <div v-if="loading" class="loading">Loading...</div>

    <div v-else-if="product">
      <O_ProductDetails :product="product" />
    </div>

    <div v-else class="not-found">Product not found</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { doc, getDoc } from 'firebase/firestore'
import { useNuxtApp } from '#app'
import { useProductStore } from '~/stores/products'
import O_ProductDetails from '~/src/components/organisms/O_ProductDetails.vue'
import type { IProduct } from '~/types'

interface ProductWithImages extends IProduct {
  images?: string[]
}

const route = useRoute()
const productStore = useProductStore()
const productId = route.params.id as string
const loading = ref(true)
const product = ref<ProductWithImages | null>(null)

const fetchProduct = async () => {
  loading.value = true

  // 1. Pinia Store kontrolü (Eğer fotoğraflar (images) yoksa Firebase'e gitmeye zorlayalım)
  const existingProduct = productStore.products.find((p) => String(p.id) === String(productId)) as ProductWithImages | undefined
  if (existingProduct && existingProduct.images && existingProduct.images.length > 0) {
    console.log('Product found in store with images:', existingProduct)
    product.value = existingProduct
    loading.value = false
    return
  }

  // 2. Store'da yoksa Firebase'den çekelim
  try {
    const { $db } = useNuxtApp()

    // The instruction seems to have intended to add a query for related products,
    // but the provided snippet was malformed and not directly used in this product detail fetch logic.
    // If it was meant for a related products section, it would be in a different component or function.
    // For now, I'm keeping the original logic of fetching a single product by ID.

    // Aramak istediğimiz olası koleksiyonlar
    const collections = [
      'zara-collection',
      'products',
      'kadin-the-new',
      'erkek-the-new',
      'cocuk-the-new',
      'relatedProducts',
      'the-new',
      'the-item',
      'homepage-slides',
      'categories',
    ]

    console.log('Searching for ID:', productId, 'in collections:', collections)

    for (const colName of collections) {
      try {
        const docRef = doc($db, colName, productId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data()
          console.log(`Product found in collection: ${colName}`, data)

          // Görselleri dizi (array) formatına garanti altına alalım
          let productImages: string[] = []
          if (Array.isArray(data.images) && data.images.length > 0) {
            productImages = [...data.images]
          } else if (data.image || data.imageUrl) {
            productImages = [data.image || data.imageUrl]
          }

          // Kullanıcının istediği özel fotoyu en başa ekleyelim
          productImages.unshift('/images/urun_fotoson.jpg')

          product.value = {
            id: docSnap.id,
            title: data.name || data.title || 'LIMITED EDITION CEKET',
            price: data.price || '3.690,00 TL',
            images: productImages,
            image: productImages[0],
            description:
              data.description || 'Zara Collection Özel Parça. Dik yakalı ve uzun kollu ceket.',
            category: data.category || '',
          }
          break
        }
      } catch (err) {
        console.warn(`Collection ${colName} search error:`, err)
      }
    }

    // 3. Hala bulunamadıysa ve ID bilinen bir ürünse manuel fallback yapalım (Kullanıcı deneyimi için)
    if (!product.value) {
      console.log('Product not found, checking fallback list...')

      const fallbackProducts: ProductWithImages[] = [
        {
          id: '1',
          title: '%100 DERİ BOMBER CEKET',
          price: '6.290,00 TL',
          images: [
            '/images/urun_fotoson.jpg',
            'https://static.zara.net/photos///2024/I/0/1/p/0706/252/800/2/w/850/0706252800_6_1_1.jpg?ts=1724234567890',
          ],
          description:
            'Dik yakalı ve uzun kollu deri ceket. Önden metal fermuar kapamalı. Yan cepli.',
          category: 'jackets',
          image: '/images/urun_fotoson.jpg',
        },
        {
          id: '2',
          title: 'LİKİT AYDINLATICI - TEMPTING GLOW',
          price: '790,00 TL',
          images: ['/images/urun_fotoson.jpg', '/images/sepet_alti3.jpg'],
          description:
            'Cilde anında ışıltı veren likit aydınlatıcı. Hafif yapısıyla doğal bir parlaklık sağlar.',
          category: 'beauty',
          image: '/images/urun_fotoson.jpg',
        },
        {
          id: '3',
          title: 'ASİMETRİK YAKA TOP',
          price: '990,00 TL',
          images: ['/images/urun_fotoson.jpg', '/images/sepet_alti4.jpg'],
          description: 'Zarif asimetrik yaka detaylı, vücuda oturan şık üst.',
          category: 'tops',
          image: '/images/urun_fotoson.jpg',
        },
        {
          id: '4',
          title: 'LIMITED EDITION ÇİFT YÜZLÜ CEKET',
          price: '9.990,00 TL',
          images: ['/images/urun_fotoson.jpg', '/images/sepet_alti1.jpg'],
          description: 'Özel koleksiyon çift yüzlü ceket. Hem şık hem de sıcak tutan tasarım.',
          category: 'jackets',
          image: '/images/urun_fotoson.jpg',
        },
        {
          id: '5',
          title: 'METALİK İPLİKLİ PALAZZO PANTOLON',
          price: '1.490,00 TL',
          images: ['/images/urun_fotoson.jpg', '/images/sepet_alti2.jpg'],
          description: 'Metalik iplik detaylı, geniş paça dökümlü palazzo pantolon.',
          category: 'pants',
          image: '/images/urun_fotoson.jpg',
        },
        {
          id: '6',
          title: 'ÇİFT YÜZLÜ SUNİ SÜET CEKET',
          price: '3.690,00 TL',
          images: ['/images/urun_fotoson.jpg', '/images/sepet_alti.jpg'],
          description: 'Yumuşak dokulu suni süet dış yüzey, içi kürklü detaylı ceket.',
          category: 'jackets',
          image: '/images/urun_fotoson.jpg',
        },
        {
          id: '7',
          title: 'SUNİ DERİ TRABİLLA CEKET',
          price: '2.990,00 TL',
          images: ['/images/urun_fotoson.jpg', '/images/urun_foto8.jpg'],
          description: 'Modern tasarımlı suni deri ceket.',
          category: 'jackets',
          image: '/images/urun_fotoson.jpg',
        },
        {
          id: '8',
          title: 'SÜET GÖRÜNÜMLÜ BOMBER CEKET',
          price: '2.990,00 TL',
          images: ['/images/urun_fotoson.jpg', '/images/urun_foto1.jpg'],
          description: 'Retro tarzda süet görünümlü spor bomber ceket.',
          category: 'jackets',
          image: '/images/urun_fotoson.jpg',
        },
        {
          id: '11',
          title: 'SÜET GÖRÜNÜMLÜ BOMBER CEKET',
          price: '2.990,00 TL',
          images: ['/images/urun_fotoson.jpg', '/images/urun_foto1.jpg'],
          description: 'Klasik bomber kesimli süet görünümlü ceket.',
          category: 'jackets',
          image: '/images/urun_fotoson.jpg',
        },
        {
          id: '12',
          title: 'ÇİFT YÜZLÜ SUNİ KÜRK ÇİFT TARAFLI CEKET',
          price: '3.690,00 TL',
          images: ['/images/urun_fotoson.jpg', '/images/sepet_alti3.jpg'],
          description: 'Rahat ve lüks görünümlü suni kürk ceket.',
          category: 'jackets',
          image: '/images/urun_fotoson.jpg',
        },
      ]

      const foundFallback = fallbackProducts.find(
        (p) => String(p.id) === String(productId) || (p.title && p.title.includes(productId)),
      )
      if (foundFallback) {
        product.value = {
          ...foundFallback,
          image: foundFallback.images![0],
        }
      }
    }
  } catch (error) {
    console.error('Error fetching product from Firebase:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProduct()
})
</script>

<style scoped>
.product-page {
  background: white;
  min-height: 100vh;
}
.header-spacer {
  height: 80px;
}
.loading,
.not-found {
  text-align: center;
  padding: 100px;
  font-size: 1.5rem;
}
</style>
