"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { categories } from "@/lib/data"
import type { Card } from "@/lib/types"

export default function DynamicMetaTags() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Only run on the cards page
    if (pathname !== "/cards") return

    const categoryId = searchParams.get("category")
    const cardId = searchParams.get("cardId")

    if (!categoryId) return

    // Find the category and card
    const category = categories.find((cat) => cat.id === categoryId)
    if (!category) return

    let card: Card | undefined

    if (cardId) {
      card = category.cards.find((c) => c.id === cardId)
    } else {
      // Default to first card if no specific card is selected
      card = category.cards[0]
    }

    if (!card) return

    // Update meta tags
    updateMetaTags(card, category.name, category.color)

    // Cleanup function
    return () => {
      // Reset meta tags when component unmounts
      resetMetaTags()
    }
  }, [pathname, searchParams])

  const updateMetaTags = (card: Card, categoryName: string, categoryColor: string) => {
    // Update title
    document.title = `${card.title} | Ship Yourself Cards`

    // Update Open Graph meta tags
    updateOrCreateMetaTag("og:title", `${card.title} | Ship Yourself Cards`)
    updateOrCreateMetaTag("og:description", `${card.subtitle} - ${categoryName} card from Ship Yourself Cards`)
    updateOrCreateMetaTag("og:type", "website")
    updateOrCreateMetaTag(
      "og:image",
      `${window.location.origin}/api/og?title=${encodeURIComponent(card.title)}&subtitle=${encodeURIComponent(card.subtitle)}&category=${encodeURIComponent(categoryName)}&color=${encodeURIComponent(categoryColor)}`,
    )
    updateOrCreateMetaTag("og:url", window.location.href)

    // Update Twitter meta tags
    updateOrCreateMetaTag("twitter:card", "summary_large_image")
    updateOrCreateMetaTag("twitter:title", `${card.title} | Ship Yourself Cards`)
    updateOrCreateMetaTag("twitter:description", `${card.subtitle} - ${categoryName} card from Ship Yourself Cards`)
    updateOrCreateMetaTag(
      "twitter:image",
      `${window.location.origin}/api/og?title=${encodeURIComponent(card.title)}&subtitle=${encodeURIComponent(card.subtitle)}&category=${encodeURIComponent(categoryName)}&color=${encodeURIComponent(categoryColor)}`,
    )
  }

  const updateOrCreateMetaTag = (property: string, content: string) => {
    let metaTag = document.querySelector(`meta[property="${property}"]`)

    if (metaTag) {
      // Update existing tag
      metaTag.setAttribute("content", content)
    } else {
      // Create new tag
      metaTag = document.createElement("meta")
      metaTag.setAttribute("property", property)
      metaTag.setAttribute("content", content)
      document.head.appendChild(metaTag)
    }
  }

  const resetMetaTags = () => {
    // Reset to default meta tags
    document.title = "Ship Yourself Cards"
    updateOrCreateMetaTag("og:title", "Ship Yourself Cards")
    updateOrCreateMetaTag("og:description", "Field Notes for Designers Redesigning Their Careers")
    updateOrCreateMetaTag("og:image", `${window.location.origin}/images/og-image.png`)
    updateOrCreateMetaTag("og:url", window.location.href)
    updateOrCreateMetaTag("twitter:title", "Ship Yourself Cards")
    updateOrCreateMetaTag("twitter:description", "Field Notes for Designers Redesigning Their Careers")
    updateOrCreateMetaTag("twitter:image", `${window.location.origin}/images/og-image.png`)
  }

  // This component doesn't render anything
  return null
}
