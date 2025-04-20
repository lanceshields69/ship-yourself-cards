import type { ReactNode } from "react"

export interface Card {
  id: string
  category: string
  title: string
  subtitle: string
  backgroundColor: string
  icon?: ReactNode
  bulletPoints: string[]
  quote?: string
  quoteAuthor?: string
}

export interface Category {
  id: string
  name: string
  color: string
  cards: Card[]
}
