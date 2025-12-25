<template>
  <div class="the-item-page">
    <div class="the-item-layout" v-if="!loading">
      <section v-for="(item, index) in items" :key="index" class="the-item-block">
        <!-- Middle Text Section (Show after first photo) -->
        <div v-if="index === 1" class="item-text-section">
          <h2 class="middle-title">THE ITEM</h2>
          <p class="middle-subtitle">
            A signature piece for a uniquely curated wardrobe - one new item every week.
          </p>
        </div>

        <div class="image-container">
          <img
            :src="item.imageUrl"
            :alt="'The Item Editorial ' + (index + 1)"
            class="full-width-img"
          />

          <div class="overlay-content">
            <h2 :class="['item-big-text', { 'primary-color': index === 0 }]">THE ITEM</h2>
            <div :class="['product-meta', { 'primary-color': index === 0 }]">
              <span class="product-name">{{ item.name }}</span>
              <span class="product-model">{{ item.model }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { collection, getDocs, query } from 'firebase/firestore'

interface TheItem {
  imageUrl: string
  name: string
  model: string
}

const items = ref<TheItem[]>([])
const loading = ref(true)

const fetchTheItemData = async () => {
  loading.value = true
  const { $db } = useNuxtApp()

  try {
    const q = query(collection($db, 'kadin-the-item'))
    const querySnapshot = await getDocs(q)

    const fetched: TheItem[] = []
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      fetched.push({
        imageUrl: data.imageUrl || data.image || '',
        name: (data.name || '').toUpperCase(),
        model: (data.model || '').toUpperCase(),
      })
    })

    if (fetched.length === 0) {
      // Fallback
      items.value = [
        {
          imageUrl:
            'https://static.zara.net/assets/public/982f/f587/7caf4624838d/46222ed3073f/02731256600-e1/02731256600-e1.jpg?ts=1756204044552&w=1400',
          name: 'THE CHAIN DETAIL SLIPDRESS',
          model: 'AWAR ODHIANG',
        },
        {
          imageUrl:
            'https://static.zara.net/assets/public/2560/9726/49c84e1b827e/a4632867e0e7/02731273800-e1/02731273800-e1.jpg?ts=1756204056586&w=1400',
          name: 'THE SNAKE BRACELET VELVET DRESS',
          model: 'BETSY GAGHAN',
        },
      ]
    } else {
      items.value = fetched
    }
  } catch (error) {
    console.error('Error fetching The Item data:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchTheItemData()
})
</script>

<style scoped>
.the-item-page {
  background: white;
  min-height: 100vh;
  font-family: 'Helvetica Now Text', Arial, sans-serif;
  color: black;
  margin-top: -80px;
}

.the-item-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px; /* Gap between photos as requested */
  padding: 0 132px; /* Equal gap on right and left */
  box-sizing: border-box;
}

.the-item-block {
  width: 100%;
  max-width: 1400px; /* Ensure it stays within a reasonable bound on ultra-wide screens */
  margin: 0 auto;
}

.image-container {
  width: 100%;
  position: relative;
}

.full-width-img {
  width: 100%;
  height: auto;
  display: block;
}

.item-text-section {
  text-align: center;
  padding: 140px 24px;
  background: white;
}

.middle-title {
  font-size: 24px;
  font-weight: 400;
  letter-spacing: 3px;
  margin-bottom: 18px;
  text-transform: uppercase;
}

.middle-subtitle {
  font-size: 16px;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.4;
  font-weight: 300;
}

.overlay-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  pointer-events: none;
}

.item-big-text {
  font-size: clamp(60px, 14vw, 220px);
  font-weight: 800;
  color: white;
  margin: 0;
  line-height: 0.8;
  letter-spacing: -3px;
}

.item-big-text.primary-color {
  color: #a38c6b;
}

.product-meta {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: white;
}

.product-meta.primary-color {
  color: #a38c6b;
}

.product-name {
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.8px;
}

.product-model {
  font-size: 11px;
  font-weight: 300;
  opacity: 0.8;
}

.loading-container {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner {
  width: 30px;
  height: 30px;
  border: 1px solid #eee;
  border-top: 1px solid #000;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .item-big-text {
    font-size: 80px;
  }
  .item-text-section {
    padding: 80px 24px;
  }
}
</style>
