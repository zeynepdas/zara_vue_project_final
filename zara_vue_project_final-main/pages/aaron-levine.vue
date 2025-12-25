<template>
  <div class="aaron-levine-page">
    <div class="editorial-container" v-if="!loading">
      <section v-for="(img, index) in images" :key="index" class="editorial-section">
        <img
          :src="img"
          :alt="'Aaron Levine x Zara Editorial ' + (index + 1)"
          class="full-screen-img"
        />
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
import { collection, getDocs, query, orderBy } from 'firebase/firestore'

const images = ref<string[]>([])
const loading = ref(true)

const fetchEditorialImages = async () => {
  loading.value = true
  const { $db } = useNuxtApp()

  try {
    // Fetch from 'erkek-aaron-levine-x-zara' collection
    const q = query(collection($db, 'erkek-aaron-levine-x-zara'))
    const querySnapshot = await getDocs(q)

    const fetched: string[] = []
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      if (data.imageUrl) fetched.push(data.imageUrl)
    })

    if (fetched.length === 0) {
      // Fallback to the generated images if Firebase is empty
      images.value = [
        'https://static.zara.net/assets/public/795a/8835/778e47408ea3/24a87799564c/04457410800-e1/04457410800-e1.jpg?ts=1731510444552&w=1400',
        'https://static.zara.net/assets/public/98bf/0023/468b44618e00/cf9201108eb8/04457405800-e1/04457405800-e1.jpg?ts=1731510468595&w=1400',
        'https://static.zara.net/assets/public/7e2f/b49d/a8b548f0a37e/ca2493393b3f/09007323800-e1/09007323800-e1.jpg?ts=1756204062564&w=1400',
      ]
    } else {
      images.value = fetched
    }
  } catch (error) {
    console.error('Error fetching Aaron Levine images:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchEditorialImages()
})
</script>

<style scoped>
.aaron-levine-page {
  background: #fff;
  min-height: 100vh;
  padding-top: 20px; /* Top padding */
}

.editorial-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2px; /* Gap between photos as requested */
}

.editorial-section {
  width: 100%;
  overflow: hidden;
}

.full-screen-img {
  width: 100%;
  height: auto;
  display: block;
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
  .editorial-section {
    height: auto;
    min-height: 60vh;
  }
}
</style>
