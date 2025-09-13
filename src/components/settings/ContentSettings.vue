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
      
      <div v-for="(slide, index) in store.slides" :key="index" class="border rounded-lg p-4 space-y-4">
        <div class="flex justify-between items-center">
          <h4 class="font-medium text-gray-900">Slide {{ index + 1 }}</h4>
          <button
            @click="removeSlide(index)"
            class="text-red-600 hover:text-red-700 text-sm"
          >
            Remove
          </button>
        </div>
        
        <!-- Image URL -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            v-model="slide.image"
            type="url"
            placeholder="https://example.com/image.jpg"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
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
import { useCarouselStore } from '../../stores/carousel'

const store = useCarouselStore()

const addSlide = () => {
  store.addSlide()
}

const removeSlide = (index: number) => {
  store.removeSlide(index)
}
</script>
