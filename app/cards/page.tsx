"use client"

import { useState, useEffect } from "react"
import CardDeck from "@/components/card-deck"
import CategorySelector from "@/components/category-selector"
import Header from "@/components/header"
import { categoriesFromList } from "@/lib/data-from-list" // Import the exact data from the list
import type { Card, Category } from "@/lib/types"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import DynamicMetaTags from "@/components/dynamic-meta-tags"

export default function CardsPage() {
  // Use the exact data from the list
  const categories = categoriesFromList
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const [isShuffleMode, setIsShuffleMode] = useState(false)
  const [shuffledCards, setShuffledCards] = useState<Card[]>([])
  const [isShuffling, setIsShuffling] = useState(false)
  const [initialCardId, setInitialCardId] = useState<string | null>(null)

  const searchParams = useSearchParams()

  // Handle deep linking on component mount
  useEffect(() => {
    const categoryParam = searchParams.get("category")
    const cardIdParam = searchParams.get("cardId")

    if (categoryParam) {
      const foundCategory = categories.find((cat) => cat.id === categoryParam)
      if (foundCategory) {
        setSelectedCategory(foundCategory)
        setIsShuffleMode(false)

        if (cardIdParam) {
          setInitialCardId(cardIdParam)
        }
      }
    }
  }, [searchParams])

  // Function to get random cards from all categories
  const getRandomCards = () => {
    // Create an array of all cards from all categories
    const allCards = categories.flatMap((category) =>
      category.cards.map((card) => ({
        ...card,
        originalCategory: category.name,
        categoryColor: category.color,
      })),
    )

    // Shuffle the array
    const shuffled = [...allCards].sort(() => Math.random() - 0.5)

    // Take the first 8 cards (or however many we want to display)
    return shuffled.slice(0, 8)
  }

  // Handle shuffle button click
  const handleShuffle = () => {
    setIsShuffling(true)

    // Toggle shuffle mode
    const newShuffleMode = !isShuffleMode
    setIsShuffleMode(newShuffleMode)

    if (newShuffleMode) {
      // If turning on shuffle mode, get random cards
      setTimeout(() => {
        const randomCards = getRandomCards()
        setShuffledCards(randomCards)
        setIsShuffling(false)
      }, 300)
    } else {
      // If turning off shuffle mode, go back to selected category
      setTimeout(() => {
        setIsShuffling(false)
      }, 300)
    }
  }

  // Handle category selection
  const handleSelectCategory = (category: Category) => {
    setIsShuffleMode(false)
    setSelectedCategory(category)
    setInitialCardId(null) // Reset initial card ID when changing categories
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      <DynamicMetaTags />
      <Header />

      <div className="w-full max-w-6xl mx-auto px-4 py-6 md:py-8 flex flex-col h-[calc(100vh-64px)]">
        <div className="flex-grow flex items-center justify-center">
          {isShuffling ? (
            <div className="animate-pulse opacity-50 w-full">
              <CardDeck
                category={selectedCategory}
                isShuffleMode={false}
                shuffledCards={[]}
                categories={categories}
                onSelectCategory={handleSelectCategory}
              />
            </div>
          ) : (
            <motion.div
              key={`${selectedCategory.id}-${isShuffleMode ? "shuffle" : "normal"}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full"
            >
              <CardDeck
                category={selectedCategory}
                isShuffleMode={isShuffleMode}
                shuffledCards={shuffledCards}
                initialCardId={initialCardId}
                categories={categories}
                onSelectCategory={handleSelectCategory}
              />
            </motion.div>
          )}
        </div>

        <div className="mt-6 pb-4 w-full">
          <CategorySelector
            categories={categories}
            selectedCategory={isShuffleMode ? null : selectedCategory}
            onSelectCategory={handleSelectCategory}
            onShuffle={handleShuffle}
            isShuffleMode={isShuffleMode}
          />
        </div>
      </div>
    </main>
  )
}
