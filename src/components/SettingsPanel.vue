<template>
  <div class="space-y-6">
    <h2 class="text-xl font-semibold text-gray-900 mb-6">Carousel Settings</h2>
    
    <!-- Tabs -->
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex space-x-8">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'py-2 px-1 border-b-2 font-medium text-sm',
            activeTab === tab.id
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          {{ tab.name }}
        </button>
      </nav>
    </div>

    <!-- Content Tab -->
    <ContentSettings v-if="activeTab === 'content'" />
    
    <!-- Style Tab -->
    <StyleSettings v-if="activeTab === 'style'" />
    
    <!-- Settings Tab -->
    <CarouselSettings v-if="activeTab === 'settings'" />

    <!-- Save Button -->
    <div class="pt-6 border-t">
      <!-- Added reset button alongside save -->
      <div class="flex space-x-4">
        <button
          @click="resetSettings"
          class="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
        >
          Reset to Defaults
        </button>
        <button
          @click="saveSettings"
          class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
        >
          Save Settings
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ContentSettings from './settings/ContentSettings.vue'
import StyleSettings from './settings/StyleSettings.vue'
import CarouselSettings from './settings/CarouselSettings.vue'
import { useCarouselStore } from '../stores/carousel'

const store = useCarouselStore()

const activeTab = ref('content')

const tabs = [
  { id: 'content', name: 'Content' },
  { id: 'style', name: 'Style' },
  { id: 'settings', name: 'Settings' }
]

const saveSettings = () => {
  // Settings are automatically saved via the store
  console.log('Settings saved!')
  // You could add a toast notification here
}

const resetSettings = () => {
  if (confirm('Are you sure you want to reset all settings to defaults? This cannot be undone.')) {
    store.resetToDefaults()
    console.log('Settings reset to defaults!')
  }
}
</script>
