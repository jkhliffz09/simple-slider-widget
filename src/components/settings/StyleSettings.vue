<template>
  <div class="space-y-6">
    <h3 class="text-lg font-medium text-gray-900">Style Settings</h3>
    
    <!-- Background -->
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
        <input
          v-model="store.style.backgroundColor"
          type="color"
          class="w-full h-10 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Opacity</label>
        <input
          v-model="store.style.opacity"
          type="range"
          min="0"
          max="1"
          step="0.1"
          class="w-full"
        />
        <span class="text-sm text-gray-500">{{ store.style.opacity }}</span>
      </div>
    </div>
    
    <!-- Typography -->
    <div class="space-y-4">
      <h4 class="font-medium text-gray-900">Typography</h4>
      
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Font Family</label>
          <select
            v-model="store.style.fontFamily"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Inter">Inter</option>
            <option value="Georgia">Georgia</option>
            <option value="Monaco">Monaco</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Text Alignment</label>
          <select
            v-model="store.style.textAlign"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>
      </div>
      
      <!-- Font Styles -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Font Styles</label>
        <div class="flex space-x-4">
          <label class="flex items-center">
            <input
              v-model="store.style.fontWeight"
              type="checkbox"
              true-value="bold"
              false-value="normal"
              class="mr-2"
            />
            <span class="text-sm">Bold</span>
          </label>
          <label class="flex items-center">
            <input
              v-model="store.style.fontStyle"
              type="checkbox"
              true-value="italic"
              false-value="normal"
              class="mr-2"
            />
            <span class="text-sm">Italic</span>
          </label>
        </div>
      </div>
    </div>
    
    <!-- Button Style -->
    <div class="space-y-4">
      <h4 class="font-medium text-gray-900">Button Style</h4>
      
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Button Color</label>
          <input
            v-model="store.style.buttonColor"
            type="color"
            class="w-full h-10 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Button Style</label>
          <select
            v-model="store.style.buttonStyle"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="solid">Solid</option>
            <option value="outline">Outline</option>
            <option value="ghost">Ghost</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- Image Options -->
    <div class="space-y-4">
      <h4 class="font-medium text-gray-900">Image Options</h4>
      
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Image Fit</label>
          <select
            v-model="store.style.imageFit"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="cover">Cover</option>
            <option value="contain">Contain</option>
            <option value="fill">Fill</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Border Radius</label>
          <input
            v-model="store.style.borderRadius"
            type="range"
            min="0"
            max="20"
            class="w-full"
          />
          <span class="text-sm text-gray-500">{{ store.style.borderRadius }}px</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCarouselStore } from '../../stores/carousel'

const store = useCarouselStore()
</script>
