<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <h1 class="text-2xl font-bold text-gray-900">Image Carousel Builder</h1>
          <div class="flex items-center space-x-4">
            <!-- Added export/import functionality -->
            <button
              @click="exportSettings"
              class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Export Settings
            </button>
            <input
              ref="fileInput"
              type="file"
              accept=".json"
              @change="importSettings"
              class="hidden"
            />
            <button
              @click="$refs.fileInput.click()"
              class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Import Settings
            </button>
            <button
              @click="toggleView"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              {{ showSettings ? 'Preview Only' : 'Show Settings' }}
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Updated layout to be responsive and handle different view modes -->
      <div :class="showSettings ? 'grid grid-cols-1 lg:grid-cols-2 gap-8' : 'max-w-4xl mx-auto'">
        <!-- Settings Panel -->
        <div v-if="showSettings" class="bg-white rounded-lg shadow-sm border p-6">
          <SettingsPanel />
        </div>
        
        <!-- Preview Panel -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <CarouselPreview />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SettingsPanel from './components/SettingsPanel.vue'
import CarouselPreview from './components/CarouselPreview.vue'
import { useCarouselStore } from './stores/carousel'

const store = useCarouselStore()
const showSettings = ref(true)
const fileInput = ref<HTMLInputElement | null>(null)

const toggleView = () => {
  showSettings.value = !showSettings.value
}

const exportSettings = () => {
  const settings = store.exportSettings()
  const dataStr = JSON.stringify(settings, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  
  const link = document.createElement('a')
  link.href = URL.createObjectURL(dataBlob)
  link.download = 'carousel-settings.json'
  link.click()
  
  URL.revokeObjectURL(link.href)
}

const importSettings = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const settings = JSON.parse(e.target?.result as string)
      store.importSettings(settings)
      console.log('Settings imported successfully!')
    } catch (error) {
      console.error('Error importing settings:', error)
      alert('Error importing settings. Please check the file format.')
    }
  }
  reader.readAsText(file)
}
</script>
