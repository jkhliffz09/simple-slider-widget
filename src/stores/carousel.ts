import { defineStore } from "pinia"
import type { CarouselState, Slide } from "../types/carousel"

export const useCarouselStore = defineStore("carousel", {
  state: (): CarouselState => ({
    slides: [
      {
        image: "/beautiful-landscape.png",
        backgroundImage: "",
        backgroundColor: "#000000",
        backgroundColorOpacity: 0.5,
        headline: "Welcome to Our Amazing Product",
        description:
          "Discover the features that make our product stand out from the competition. Built with modern technology and user experience in mind.",
        buttonText: "Learn More",
        buttonUrl: "#",
      },
      {
        image: "/modern-office.png",
        backgroundImage: "",
        backgroundColor: "#000000",
        backgroundColorOpacity: 0.5,
        headline: "Built for Professionals",
        description:
          "Our solution is designed specifically for professionals who demand excellence and reliability in their daily workflow.",
        buttonText: "Get Started",
        buttonUrl: "#",
      },
      {
        image: "/team-collaboration.png",
        backgroundImage: "",
        backgroundColor: "#000000",
        backgroundColorOpacity: 0.5,
        headline: "Collaborate with Your Team",
        description: "Work together seamlessly with powerful collaboration tools that keep everyone on the same page.",
        buttonText: "Try Now",
        buttonUrl: "#",
      },
    ],
    layout: "image-left",
    style: {
      backgroundColor: "#ffffff",
      opacity: 1,
      fontFamily: "Inter",
      fontWeight: "normal",
      fontStyle: "normal",
      textAlign: "left",
      buttonColor: "#3b82f6",
      buttonStyle: "solid",
      imageFit: "cover",
      borderRadius: 8,
    },
    settings: {
      autoplay: true,
      transitionSpeed: 500,
      autoplayInterval: 4000,
      showArrows: true,
      showDots: true,
      infinite: true,
    },
  }),

  actions: {
    addSlide() {
      const newSlide: Slide = {
        image: "/new-slide-image.jpg",
        backgroundImage: "",
        backgroundColor: "#000000",
        backgroundColorOpacity: 0.5,
        headline: "New Slide",
        description: "Add your description here",
        buttonText: "Click Here",
        buttonUrl: "#",
      }
      this.slides.push(newSlide)
    },

    removeSlide(index: number) {
      if (this.slides.length > 1) {
        this.slides.splice(index, 1)
      }
    },

    updateSlide(index: number, slide: Partial<Slide>) {
      if (this.slides[index]) {
        this.slides[index] = { ...this.slides[index], ...slide }
      }
    },

    updateStyle(styleUpdates: Partial<typeof this.style>) {
      this.style = { ...this.style, ...styleUpdates }
    },

    updateSettings(settingsUpdates: Partial<typeof this.settings>) {
      this.settings = { ...this.settings, ...settingsUpdates }
    },

    setLayout(layout: "image-left" | "image-right") {
      this.layout = layout
    },

    resetToDefaults() {
      // Reset to initial state
      this.$reset()
    },

    exportSettings() {
      return {
        slides: this.slides,
        layout: this.layout,
        style: this.style,
        settings: this.settings,
      }
    },

    importSettings(data: Partial<CarouselState>) {
      if (data.slides) this.slides = data.slides
      if (data.layout) this.layout = data.layout
      if (data.style) this.style = { ...this.style, ...data.style }
      if (data.settings) this.settings = { ...this.settings, ...data.settings }
    },
  },

  getters: {
    totalSlides: (state) => state.slides.length,
    hasMultipleSlides: (state) => state.slides.length > 1,
    isAutoplayEnabled: (state) => state.settings.autoplay && state.slides.length > 1,
  },
})
