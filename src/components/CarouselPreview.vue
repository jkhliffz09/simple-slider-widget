<template>
  <div class="space-y-4">
    <h2 class="text-xl font-semibold text-gray-900">Preview</h2>
    
    <div 
      class="relative overflow-hidden rounded-lg"
      :style="{ 
        backgroundColor: store.style.backgroundColor,
        opacity: store.style.opacity 
      }"
    >
      <!-- Carousel Container -->
      <div 
        class="flex transition-transform duration-500 ease-in-out"
        :style="{ 
          transform: `translateX(-${currentSlide * 100}%)`,
          transitionDuration: `${store.settings.transitionSpeed}ms`
        }"
      >
        <div
          v-for="(slide, index) in store.slides"
          :key="index"
          class="w-full flex-shrink-0"
        >
          <CarouselSlide :slide="slide" :layout="store.layout" />
        </div>
      </div>
      
      <!-- Navigation Arrows -->
      <template v-if="store.settings.showArrows && store.slides.length > 1">
        <button
          @click="previousSlide"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          @click="nextSlide"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </template>
      
      <!-- Navigation Dots -->
      <div 
        v-if="store.settings.showDots && store.slides.length > 1"
        class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"
      >
        <button
          v-for="(slide, index) in store.slides"
          :key="index"
          @click="goToSlide(index)"
          :class="[
            'w-3 h-3 rounded-full transition-all',
            currentSlide === index 
              ? 'bg-white' 
              : 'bg-white/50 hover:bg-white/75'
          ]"
        />
      </div>
    </div>
    
    <!-- Carousel Info -->
    <!-- Removed carousel info section in preview mode -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import CarouselSlide from './CarouselSlide.vue'
import { useCarouselStore } from '../stores/carousel'

const store = useCarouselStore()
const currentSlide = ref(0)
let autoplayTimer: number | null = null

const nextSlide = () => {
  if (store.settings.infinite) {
    currentSlide.value = (currentSlide.value + 1) % store.slides.length
  } else {
    currentSlide.value = Math.min(currentSlide.value + 1, store.slides.length - 1)
  }
}

const previousSlide = () => {
  if (store.settings.infinite) {
    currentSlide.value = currentSlide.value === 0 ? store.slides.length - 1 : currentSlide.value - 1
  } else {
    currentSlide.value = Math.max(currentSlide.value - 1, 0)
  }
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}

const startAutoplay = () => {
  if (store.settings.autoplay && store.slides.length > 1) {
    autoplayTimer = window.setInterval(() => {
      nextSlide()
    }, store.settings.autoplayInterval)
  }
}

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

// Watch for autoplay settings changes
watch(
  () => [store.settings.autoplay, store.settings.autoplayInterval],
  () => {
    stopAutoplay()
    startAutoplay()
  }
)

// Reset to first slide when slides change
watch(
  () => store.slides.length,
  () => {
    currentSlide.value = 0
  }
)

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    previousSlide()
  } else if (event.key === 'ArrowRight') {
    event.preventDefault()
    nextSlide()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  startAutoplay()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  stopAutoplay()
})
</script>
