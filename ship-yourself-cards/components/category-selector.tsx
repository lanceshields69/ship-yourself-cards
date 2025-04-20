"use client"

import { useRef, useEffect } from "react"
import type { Category } from "@/lib/types"
import { useMediaQuery } from "@/hooks/use-media-query"
import Image from "next/image"

interface CategorySelectorProps {
  categories: Category[]
  selectedCategory: Category | null
  onSelectCategory: (category: Category) => void
  onShuffle: () => void
  isShuffleMode: boolean
}

export default function CategorySelector({
  categories,
  selectedCategory,
  onSelectCategory,
  onShuffle,
  isShuffleMode,
}: CategorySelectorProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Format category name to have a line break
  const formatCategoryName = (name: string) => {
    // For categories with "+" or specific patterns
    if (name.includes("+")) {
      return name.replace("+", "\n+")
    }

    // For other categories, try to find a good breaking point
    const words = name.split(" ")
    if (words.length === 1) return name

    if (name === "Networking Moves") {
      return "Networking\nMoves"
    }

    if (name === "Interview Gameplans") {
      return "Interview\nGameplans"
    }

    if (name === "Being a Super IC") {
      return "Being a\nSuper IC"
    }

    if (name === "Offer + Negotiation") {
      return "Offer +\nNegotiation"
    }

    if (name === "Power-Ups") {
      return "Power-\nUps"
    }

    // Default split at the middle
    const middle = Math.floor(words.length / 2)
    return words.slice(0, middle).join(" ") + "\n" + words.slice(middle).join(" ")
  }

  // Enable drag scrolling on mobile
  useEffect(() => {
    if (!isMobile || !scrollRef.current) return

    let isDown = false
    let startX: number
    let scrollLeft: number

    const slider = scrollRef.current

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true
      slider.classList.add("active")
      startX = e.pageX - slider.offsetLeft
      scrollLeft = slider.scrollLeft
    }

    const handleMouseLeave = () => {
      isDown = false
      slider.classList.remove("active")
    }

    const handleMouseUp = () => {
      isDown = false
      slider.classList.remove("active")
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - slider.offsetLeft
      const walk = (x - startX) * 2 // Scroll speed
      slider.scrollLeft = scrollLeft - walk
    }

    // Touch events
    const handleTouchStart = (e: TouchEvent) => {
      isDown = true
      slider.classList.add("active")
      startX = e.touches[0].pageX - slider.offsetLeft
      scrollLeft = slider.scrollLeft
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDown) return
      const x = e.touches[0].pageX - slider.offsetLeft
      const walk = (x - startX) * 2
      slider.scrollLeft = scrollLeft - walk
    }

    slider.addEventListener("mousedown", handleMouseDown)
    slider.addEventListener("mouseleave", handleMouseLeave)
    slider.addEventListener("mouseup", handleMouseUp)
    slider.addEventListener("mousemove", handleMouseMove)

    slider.addEventListener("touchstart", handleTouchStart)
    slider.addEventListener("touchend", handleMouseUp)
    slider.addEventListener("touchmove", handleTouchMove)

    return () => {
      slider.removeEventListener("mousedown", handleMouseDown)
      slider.removeEventListener("mouseleave", handleMouseLeave)
      slider.removeEventListener("mouseup", handleMouseUp)
      slider.removeEventListener("mousemove", handleMouseMove)

      slider.removeEventListener("touchstart", handleTouchStart)
      slider.removeEventListener("touchend", handleMouseUp)
      slider.removeEventListener("touchmove", handleTouchMove)
    }
  }, [isMobile])

  return (
    <div
      ref={scrollRef}
      className={`
        w-full overflow-x-auto scrollbar-hide
        ${isMobile ? "flex" : "flex justify-center"}
      `}
    >
      <div className={`flex gap-2 pb-2 ${isMobile ? "" : "flex-wrap justify-center"}`}>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category)}
            className={`
              px-6 py-3 text-sm whitespace-pre-line rounded border min-w-[110px]
              ${selectedCategory?.id === category.id && !isShuffleMode ? "bg-gray-100 border-gray-300" : "bg-white border-gray-200"}
            `}
          >
            {formatCategoryName(category.name)}
          </button>
        ))}

        {/* Shuffle button */}
        <button
          onClick={onShuffle}
          className={`
            px-6 py-3 text-sm whitespace-pre-line rounded border min-w-[110px] flex flex-col items-center justify-center
            ${isShuffleMode ? "bg-gray-100 border-gray-300" : "bg-white border-gray-200"}
          `}
        >
          <Image src="/images/shuffle-icon.svg" alt="Shuffle" width={19} height={16} className="mb-1" />
          Shuffle
        </button>
      </div>
    </div>
  )
}
