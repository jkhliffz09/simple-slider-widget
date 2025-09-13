<template>
  <div class="space-y-6">
    <h3 class="text-lg font-medium text-gray-900">Carousel Settings</h3>
    
    <!-- Autoplay -->
    <div class="flex items-center justify-between">
      <div>
        <label class="text-sm font-medium text-gray-700">Autoplay</label>
        <p class="text-sm text-gray-500">Automatically advance slides</p>
      </div>
      <label class="relative inline-flex items-center cursor-pointer">
        <input
          v-model="store.settings.autoplay"
          type="checkbox"
          class="sr-only peer"
        />
        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
    </div>
    
    <!-- Transition Speed -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Transition Speed</label>
      <input
        v-model="store.settings.transitionSpeed"
        type="range"
        min="300"
        max="2000"
        step="100"
        class="w-full"
      />
      <div class="flex justify-between text-sm text-gray-500">
        <span>Fast (300ms)</span>
        <span>{{ store.settings.transitionSpeed }}ms</span>
        <span>Slow (2000ms)</span>
      </div>
    </div>
    
    <!-- Autoplay Interval -->
    <div v-if="store.settings.autoplay">
      <label class="block text-sm font-medium text-gray-700 mb-2">Autoplay Interval</label>
      <input
        v-model="store.settings.autoplayInterval"
        type="range"
        min="2000"
        max="10000"
        step="500"
        class="w-full"
      />
      <div class="flex justify-between text-sm text-gray-500">
        <span>2s</span>
        <span>{{ store.settings.autoplayInterval / 1000 }}s</span>
        <span>10s</span>
      </div>
    </div>
    
    <!-- Show Arrows -->
    <div class="flex items-center justify-between">
      <div>
        <label class="text-sm font-medium text-gray-700">Show Navigation Arrows</label>
        <p class="text-sm text-gray-500">Display previous/next arrows</p>
      </div>
      <label class="relative inline-flex items-center cursor-pointer">
        <input
          v-model="store.settings.showArrows"
          type="checkbox"
          class="sr-only peer"
        />
        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
    </div>
    
    <!-- Show Navigation Dots -->
    <div class="flex items-center justify-between">
      <div>
        <label class="text-sm font-medium text-gray-700">Show Navigation Dots</label>
        <p class="text-sm text-gray-500">Display dot indicators</p>
      </div>
      <label class="relative inline-flex items-center cursor-pointer">
        <input
          v-model="store.settings.showDots"
          type="checkbox"
          class="sr-only peer"
        />
        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
    </div>
    
    <!-- Infinite Loop -->
    <div class="flex items-center justify-between">
      <div>
        <label class="text-sm font-medium text-gray-700">Infinite Loop</label>
        <p class="text-sm text-gray-500">Loop back to first slide after last</p>
      </div>
      <label class="relative inline-flex items-center cursor-pointer">
        <input
          v-model="store.settings.infinite"
          type="checkbox"
          class="sr-only peer"
        />
        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCarouselStore } from '../../stores/carousel'

const store = useCarouselStore()
</script>
