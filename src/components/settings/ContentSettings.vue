<template>
  <div class="space-y-6">
    <h3 class="text-lg font-medium text-gray-900">Content Settings</h3>
    
    <!-- Slides -->
    <div class="space-y-4">
      <div class="flex justify-between items-center">
        <label class="text-sm font-medium text-gray-700">Slides</label>
        <button
          @click="addSlide"
          class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
        >
          Add Slide
        </button>
      </div>
      
      <!-- Made slides accordion-style with collapsible content -->
      <div v-for="(slide, index) in store.slides" :key="index" class="border rounded-lg">
        <div 
          @click="toggleSlide(index)"
          class="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
        >
          <h4 class="font-medium text-gray-900">Slide {{ index + 1 }}</h4>
          <div class="flex items-center space-x-2">
            <button
              @click.stop="removeSlide(index)"
              class="text-red-600 hover:text-red-700 text-sm"
            >
              Remove
            </button>
            <svg 
              :class="[
                'w-5 h-5 transition-transform',
                expandedSlides.includes(index) ? 'rotate-180' : ''
              ]"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        <div v-if="expandedSlides.includes(index)" class="p-4 pt-0 space-y-4 border-t">
          <!-- Product Image URL -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Product Image URL</label>
            <input
              v-model="slide.image"
              type="url"
              placeholder="https://example.com/product-image.jpg"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p class="text-xs text-gray-500 mt-1">Main product or content image (no opacity applied)</p>
          </div>
          
          <!-- Background Image URL -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Background Image URL (Optional)</label>
            <input
              v-model="slide.backgroundImage"
              type="url"
              placeholder="https://example.com/backdrop-image.jpg"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p class="text-xs text-gray-500 mt-1">Backdrop image behind the entire slide content</p>
          </div>
          
          <!-- Background Color Overlay -->
          <div v-if="slide.backgroundImage">
            <label class="block text-sm font-medium text-gray-700 mb-1">Background Color Overlay</label>
            <div class="flex items-center space-x-4">
              <input
                v-model="slide.backgroundColor"
                type="color"
                class="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <div class="flex-1">
                <label class="block text-xs text-gray-600 mb-1">Color Opacity</label>
                <input
                  v-model="slide.backgroundColorOpacity"
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  class="w-full"
                />
                <span class="text-sm text-gray-500">{{ slide.backgroundColorOpacity || 0.5 }}</span>
              </div>
            </div>
            <p class="text-xs text-gray-500 mt-1">Color overlay on top of background image</p>
          </div>
          
          <!-- Headline -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Headline</label>
            <input
              v-model="slide.headline"
              type="text"
              placeholder="Enter headline"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              v-model="slide.description"
              rows="3"
              placeholder="Enter description"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </div>
          
          <!-- Button -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
              <input
                v-model="slide.buttonText"
                type="text"
                placeholder="Learn More"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Button URL</label>
              <input
                v-model="slide.buttonUrl"
                type="url"
                placeholder="https://example.com"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Layout Options -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Layout</label>
      <div class="grid grid-cols-2 gap-4">
        <label class="flex items-center">
          <input
            v-model="store.layout"
            type="radio"
            value="image-left"
            class="mr-2"
          />
          <span class="text-sm">Image Left, Content Right</span>
        </label>
        <label class="flex items-center">
          <input
            v-model="store.layout"
            type="radio"
            value="image-right"
            class="mr-2"
          />
          <span class="text-sm">Image Right, Content Left</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCarouselStore } from '../../stores/carousel'

const store = useCarouselStore()

const expandedSlides = ref<number[]>([0]) // First slide expanded by default

const toggleSlide = (index: number) => {
  const expandedIndex = expandedSlides.value.indexOf(index)
  if (expandedIndex > -1) {
    expandedSlides.value.splice(expandedIndex, 1)
  } else {
    expandedSlides.value.push(index)
  }
}

const addSlide = () => {
  store.addSlide()
  // Expand the newly added slide
  const newIndex = store.slides.length - 1
  if (!expandedSlides.value.includes(newIndex)) {
    expandedSlides.value.push(newIndex)
  }
}

const removeSlide = (index: number) => {
  store.removeSlide(index)
  // Remove from expanded slides if it was expanded
  const expandedIndex = expandedSlides.value.indexOf(index)
  if (expandedIndex > -1) {
    expandedSlides.value.splice(expandedIndex, 1)
  }
  // Adjust indices for remaining expanded slides
  expandedSlides.value = expandedSlides.value.map(i => i > index ? i - 1 : i)
}
</script>
