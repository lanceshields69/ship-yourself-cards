"use client"
import { useState, useEffect } from "react"
import CardComponent from "@/components/card-component"
import type { Category, Card } from "@/lib/types"
import { useMediaQuery } from "@/hooks/use-media-query"
import { motion, AnimatePresence } from "framer-motion"

interface CardDeckProps {
  category: Category
  isShuffleMode: boolean
  shuffledCards: Card[]
}

export default function CardDeck({ category, isShuffleMode, shuffledCards }: CardDeckProps) {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCards, setVisibleCards] = useState<Card[]>([])
  const [flippedCardIndex, setFlippedCardIndex] = useState<number | null>(null)
  const [animationDirection, setAnimationDirection] = useState<"left" | "right" | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  // Card width + gap for desktop animation calculations
  const CARD_WIDTH = 366
  const CARD_GAP = 16
  const CARD_TOTAL_WIDTH = CARD_WIDTH + CARD_GAP

  // Get the cards to display based on mode
  const cardsToDisplay = isShuffleMode ? shuffledCards : category.cards

  useEffect(() => {
    // Reset current index when category changes or shuffle mode changes
    setCurrentIndex(0)
    setFlippedCardIndex(null)
  }, [category, isShuffleMode, shuffledCards])

  useEffect(() => {
    if (isMobile) {
      // On mobile, show current card and hint of next cards
      setVisibleCards([cardsToDisplay[currentIndex]])
    } else {
      // For desktop, we need to load more cards for the carousel effect
      // We load 5 cards (or as many as available) to ensure smooth transitions
      const startIdx = Math.max(0, currentIndex - 1)
      const endIdx = Math.min(startIdx + 5, cardsToDisplay.length)
      setVisibleCards(cardsToDisplay.slice(startIdx, endIdx))
    }
  }, [category, currentIndex, isMobile, isShuffleMode, shuffledCards, cardsToDisplay])

  const nextCard = () => {
    if (currentIndex < cardsToDisplay.length - 1 && !isAnimating) {
      setIsAnimating(true)
      setAnimationDirection("left")
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1)
        setFlippedCardIndex(null)
        setIsAnimating(false)
      }, 500) // Longer duration for smoother animation
    }
  }

  const prevCard = () => {
    if (currentIndex > 0 && !isAnimating) {
      setIsAnimating(true)
      setAnimationDirection("right")
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1)
        setFlippedCardIndex(null)
        setIsAnimating(false)
      }, 500) // Longer duration for smoother animation
    }
  }

  const handleCardFlip = (index: number) => {
    if (flippedCardIndex === index) {
      setFlippedCardIndex(null)
    } else {
      setFlippedCardIndex(index)
    }
  }

  // Calculate if we can navigate
  const canGoNext = currentIndex < cardsToDisplay.length - (isMobile ? 1 : 3)
  const canGoPrev = currentIndex > 0

  // SVG arrow components
  const LeftArrow = () => (
    <svg width="24" height="27" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.77527e-07 13.5L23.25 26.9234L23.25 0.0766057L6.77527e-07 13.5Z" fill="#454545" />
    </svg>
  )

  const RightArrow = () => (
    <svg width="24" height="27" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 13.5L0.750001 26.9234L0.750002 0.0766057L24 13.5Z" fill="#454545" />
    </svg>
  )

  return (
    <div className="w-full relative">
      <div className="flex justify-center items-center">
        {/* Desktop navigation arrows positioned outside the cards */}
        {!isMobile && (
          <div
            className={`absolute left-[-70px] cursor-pointer ${!canGoPrev ? "opacity-30 cursor-not-allowed" : ""}`}
            onClick={canGoPrev ? prevCard : undefined}
          >
            <LeftArrow />
          </div>
        )}

        {/* Card display area */}
        <div className={`relative ${isMobile ? "w-[345px] h-[500px]" : "w-full flex justify-center"}`}>
          {isMobile ? (
            // Mobile: Stacked card view with animation
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="relative w-full h-full"
                initial={{
                  opacity: 0,
                  x: animationDirection === "left" ? 50 : animationDirection === "right" ? -50 : 0,
                }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: animationDirection === "left" ? -50 : animationDirection === "right" ? 50 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Stacked background cards for visual effect */}
                {visibleCards.length > 0 && (
                  <>
                    <div
                      className="absolute top-2 left-2 w-full h-full rounded-3xl shadow-sm"
                      style={{ backgroundColor: visibleCards[0].backgroundColor }}
                    ></div>
                    <div
                      className="absolute top-1 left-1 w-full h-full rounded-3xl shadow-sm"
                      style={{ backgroundColor: visibleCards[0].backgroundColor }}
                    ></div>
                  </>
                )}

                {/* Current card */}
                {visibleCards.length > 0 && (
                  <CardComponent
                    card={visibleCards[0]}
                    categoryColor={
                      isShuffleMode && "categoryColor" in visibleCards[0]
                        ? (visibleCards[0] as any).categoryColor
                        : category.color
                    }
                    isFlipped={flippedCardIndex === 0}
                    onFlip={() => handleCardFlip(0)}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          ) : (
            // Desktop: Carousel-style animation with smooth sliding
            <div
              className="overflow-hidden pt-[30px]"
              style={{
                width: "1200px",
                marginBottom: "30px",
                marginLeft: "-12px",
              }}
            >
              <motion.div
                className="flex"
                initial={false}
                animate={{
                  x: -1 * (currentIndex * CARD_TOTAL_WIDTH),
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              >
                {cardsToDisplay.map((card, idx) => (
                  <div
                    key={card.id + (isShuffleMode ? "-shuffled-" + idx : "")}
                    className="flex-shrink-0"
                    style={{
                      width: CARD_WIDTH,
                      marginRight: CARD_GAP,
                    }}
                  >
                    <CardComponent
                      card={card}
                      categoryColor={
                        isShuffleMode && "categoryColor" in card ? (card as any).categoryColor : category.color
                      }
                      isFlipped={flippedCardIndex === idx}
                      onFlip={() => handleCardFlip(idx)}
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          )}
        </div>

        {/* Desktop right arrow */}
        {!isMobile && (
          <div
            className={`absolute right-[-50px] cursor-pointer ${!canGoNext ? "opacity-30 cursor-not-allowed" : ""}`}
            onClick={canGoNext ? nextCard : undefined}
          >
            <RightArrow />
          </div>
        )}
      </div>

      {/* Mobile navigation arrows below the card */}
      {isMobile && (
        <div className="flex justify-center mt-6 gap-8">
          <div
            className={`cursor-pointer ${!canGoPrev ? "opacity-30 cursor-not-allowed" : ""}`}
            onClick={canGoPrev ? prevCard : undefined}
          >
            <LeftArrow />
          </div>
          <div
            className={`cursor-pointer ${!canGoNext ? "opacity-30 cursor-not-allowed" : ""}`}
            onClick={canGoNext ? nextCard : undefined}
          >
            <RightArrow />
          </div>
        </div>
      )}
    </div>
  )
}
