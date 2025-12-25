<template>
  <div class="profile-page">
    <div class="profile-container">
      <!-- Left Sidebar Navigation -->
      <aside class="profile-sidebar">
        <nav class="profile-nav">
          <ul class="nav-list">
            <li class="nav-item">SİPARİŞLER</li>
            <li class="nav-item">İADELER</li>
            <li class="nav-item">BİLDİRİM [2] <span class="status-dot"></span></li>
            <li class="nav-item">ÖDEME YÖNTEMLERİ</li>
            <li class="nav-item active">PROFİL</li>
            <li class="nav-item">AYARLAR</li>

            <li class="nav-divider"></li>

            <li class="nav-item wishlist-item">
              FAVORİLER
              <svg
                class="wishlist-icon"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 21L12 16L5 21V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </li>
            <li class="nav-item">YARDIM</li>
            <li class="nav-item app-download">UYGULAMAYI İNDİR</li>
          </ul>
        </nav>
      </aside>

      <!-- Main Content Area -->
      <main class="profile-content">
        <section class="user-details">
          <div class="name-section">
            <h1 v-if="!isEditingName" class="user-full-name">{{ userFullName }}</h1>
            <div v-else class="edit-name-container">
              <input v-model="editNameModel" class="name-input" />
              <div class="edit-actions">
                <button @click="saveName" class="save-btn">KAYDET</button>
                <button @click="cancelEditing" class="cancel-btn">İPTAL</button>
              </div>
            </div>

            <button v-if="!isEditingName" @click="startEditing" class="edit-icon-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
          </div>

          <div class="detail-group">
            <label class="detail-label">ADRESLER</label>
          </div>

          <div class="detail-group">
            <label class="detail-label">ÖLÇÜMLERİM</label>
          </div>

          <div class="detail-group">
            <label class="detail-label">E-POSTA ADRESİ</label>
            <p class="detail-value">{{ userEmail }}</p>
          </div>

          <div class="detail-group">
            <label class="detail-label">TELEFON</label>
            <p class="detail-value">{{ userPhone }}</p>
          </div>

          <div class="detail-group">
            <label class="detail-label">PAROLA</label>
            <p class="detail-value password-mask">••••••••</p>
          </div>

          <button class="logout-button" @click="handleLogout">OTURUMU SONLANDIR</button>

          <footer class="profile-footer">
            <a href="#" class="delete-account-link">HESABINIZI SİLİN</a>
          </footer>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const userEmail = computed(() => authStore.user?.email || 'zeynepdas@gmail.com')
// Mocking phone as requested/shown in image
const isEditingName = ref(false)
const editNameModel = ref('')

const userFullName = computed(() => {
  if (authStore.user?.displayName) return authStore.user.displayName.toUpperCase()
  return 'ZEYNEP DAŞ' // Fallback
})

const startEditing = () => {
  editNameModel.value = authStore.user?.displayName || 'ZEYNEP DAŞ'
  isEditingName.value = true
}

const cancelEditing = () => {
  isEditingName.value = false
}

const saveName = async () => {
  if (!editNameModel.value.trim()) return
  try {
    await authStore.updateUserProfile(editNameModel.value)
    isEditingName.value = false
  } catch (e) {
    alert('İsim güncellenirken bir hata oluştu')
  }
}


const handleLogout = async () => {
  await authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background-color: #fff;
  padding-top: 80px;
  font-family: 'Helvetica Now Text', Arial, sans-serif;
  color: #000;
}

.profile-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px; /* Reduced to move sidebar further left */
  display: flex;
  gap: 160px; /* Large gap between sidebar and content */
}

/* Sidebar Styling */
.profile-sidebar {
  width: 250px;
  flex-shrink: 0;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.nav-item {
  font-size: 10px;
  letter-spacing: 0.8px;
  font-weight: 300;
  cursor: pointer;
  text-transform: uppercase;
  color: #000;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: opacity 0.2s;
}

.nav-item:hover {
  opacity: 0.6;
}

.nav-item.active {
  font-weight: 500;
}

.nav-divider {
  height: 40px;
}

.status-dot {
  width: 5px;
  height: 5px;
  background-color: #0087ff;
  border-radius: 50%;
  margin-top: -8px;
}

.wishlist-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.app-download {
  margin-top: 20px;
}

/* Main Content Styling */
.profile-content {
  flex-grow: 1;
  padding-top: 4px;
}

.user-full-name {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 0;
  letter-spacing: 0.5px;
}

.name-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 60px;
  min-height: 30px;
}

.edit-icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #999;
  padding: 4px;
}
.edit-icon-btn:hover {
  color: #000;
}

.edit-name-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.name-input {
  font-size: 15px;
  padding: 4px 8px;
  border: 1px solid #ddd;
  font-family: inherit;
  width: 200px;
}

.edit-actions {
  display: flex;
  gap: 8px;
}

.save-btn, .cancel-btn {
  font-size: 10px;
  padding: 4px 8px;
  cursor: pointer;
  text-transform: uppercase;
  border: 1px solid #000;
  background: #fff;
}
.save-btn {
  background: #000;
  color: #fff;
}

.detail-group {
  margin-bottom: 35px;
}

.detail-label {
  display: block;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
  color: #000;
}

.detail-value {
  font-size: 11px;
  font-weight: 300;
  color: #000;
}

.password-mask {
  letter-spacing: 2px;
}

.logout-button {
  margin-top: 40px;
  background: none;
  border: 1px solid #000;
  padding: 10px 40px;
  font-size: 11px;
  font-weight: 400;
  cursor: pointer;
  text-transform: uppercase;
  transition: background 0.2s;
}

.logout-button:hover {
  background-color: #f9f9f9;
}

.profile-footer {
  margin-top: 100px;
  margin-bottom: 150px;
}

.delete-account-link {
  font-size: 10px;
  font-weight: 300;
  color: #000;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-bottom 0.2s;
}

.delete-account-link:hover {
  border-bottom: 1px solid #000;
}

@media (max-width: 1024px) {
  .profile-container {
    padding: 0 48px;
    gap: 80px;
  }
}

@media (max-width: 768px) {
  .profile-container {
    flex-direction: column;
    padding: 0 24px;
    gap: 60px;
  }
}
</style>
