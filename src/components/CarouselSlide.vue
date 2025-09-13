<template>
  <div 
    :class="[
      'min-h-[400px] flex items-center relative',
      layout === 'image-left' ? 'flex-row' : 'flex-row-reverse'
    ]"
    :style="getSlideBackgroundStyle()"
  >
    <!-- Background Image (full opacity) -->
    <div 
      v-if="slide.backgroundImage"
      class="absolute inset-0 bg-cover bg-center"
      :style="{
        backgroundImage: `url(${slide.backgroundImage})`
      }"
    ></div>
    
    <!-- Background Color Overlay (with opacity) -->
    <div 
      v-if="slide.backgroundImage && slide.backgroundColor"
      class="absolute inset-0"
      :style="{
        backgroundColor: slide.backgroundColor,
        opacity: slide.backgroundColorOpacity || 0.5
      }"
    ></div>
    
    <!-- Image Section -->
    <div class="w-1/2 h-full relative z-10">
      <img
        :src="slide.image || '/placeholder.svg?height=400&width=600'"
        :alt="slide.headline"
        :class="[
          'w-full h-full',
          `object-${store.style.imageFit}`
        ]"
        :style="{ 
          borderRadius: `${store.style.borderRadius}px`,
          opacity: 1 // Product image always full opacity
        }"
      />
    </div>
    
    <!-- Content Section -->
    <div 
      class="w-1/2 p-8 flex flex-col justify-center relative z-10"
      :style="{ 
        fontFamily: store.style.fontFamily,
        textAlign: store.style.textAlign
      }"
    >
      <!-- Headline -->
      <h3 
        class="text-3xl mb-4"
        :style="{ 
          fontWeight: store.style.fontWeight,
          fontStyle: store.style.fontStyle
        }"
      >
        {{ slide.headline || 'Sample Headline' }}
      </h3>
      
      <!-- Description -->
      <p 
        class="text-lg text-gray-600 mb-6 leading-relaxed"
        :style="{ 
          fontStyle: store.style.fontStyle
        }"
      >
        {{ slide.description || 'This is a sample description for the carousel slide. Add your content in the settings panel.' }}
      </p>
      
      <!-- Button -->
      <div v-if="slide.buttonText">
        <a
          :href="slide.buttonUrl || '#'"
          :class="[
            'inline-block px-6 py-3 rounded-lg font-medium transition-all',
            getButtonClasses()
          ]"
          :style="getButtonStyles()"
        >
          {{ slide.buttonText }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCarouselStore } from '../stores/carousel'
import type { Slide } from '../types/carousel'

interface Props {
  slide: Slide
  layout: string
}

const props = defineProps<Props>()
const store = useCarouselStore()

const getSlideBackgroundStyle = computed(() => {
  return {
    backgroundColor: store.style.backgroundColor
  }
})

const getButtonClasses = computed(() => {
  const baseClasses = 'hover:opacity-90'
  
  switch (store.style.buttonStyle) {
    case 'outline':
      return `${baseClasses} border-2 bg-transparent`
    case 'ghost':
      return `${baseClasses} bg-transparent hover:bg-gray-100`
    default: // solid
      return `${baseClasses}`
  }
})

const getButtonStyles = computed(() => {
  const color = store.style.buttonColor
  
  switch (store.style.buttonStyle) {
    case 'outline':
      return {
        borderColor: color,
        color: color
      }
    case 'ghost':
      return {
        color: color
      }
    default: // solid
      return {
        backgroundColor: color,
        color: '#ffffff'
      }
  }
})
</script>
