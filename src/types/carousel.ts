export interface Slide {
  image: string
  headline: string
  description: string
  buttonText: string
  buttonUrl: string
}

export interface CarouselStyle {
  backgroundColor: string
  opacity: number
  fontFamily: string
  fontWeight: string
  fontStyle: string
  textAlign: string
  buttonColor: string
  buttonStyle: "solid" | "outline" | "ghost"
  imageFit: "cover" | "contain" | "fill"
  borderRadius: number
}

export interface CarouselSettings {
  autoplay: boolean
  transitionSpeed: number
  autoplayInterval: number
  showArrows: boolean
  showDots: boolean
  infinite: boolean
}

export interface CarouselState {
  slides: Slide[]
  layout: "image-left" | "image-right"
  style: CarouselStyle
  settings: CarouselSettings
}
