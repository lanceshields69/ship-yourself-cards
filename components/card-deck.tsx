"use client"
import { useState, useEffect, useRef } from "react"
import CardComponent from "@/components/card-component"
import type { Category, Card } from "@/lib/types"
import { useMediaQuery } from "@/hooks/use-media-query"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"
// import ShareButton from "@/components/share-button"

interface CardDeckProps {
  category: Category
  isShuffleMode: boolean
  shuffledCards: Card[]
  initialCardId?: string | null
}

export default function CardDeck({ category, isShuffleMode, shuffledCards, initialCardId = null }: CardDeckProps) {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCards, setVisibleCards] = useState<Card[]>([])
  const [flippedCardIndex, setFlippedCardIndex] = useState<number | null>(null)
  const [animationDirection, setAnimationDirection] = useState<"left" | "right" | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [hoveredArrow, setHoveredArrow] = useState<"left" | "right" | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Card width + gap for desktop animation calculations
  const CARD_WIDTH = 366
  const CARD_GAP = 16
  const CARD_TOTAL_WIDTH = CARD_WIDTH + CARD_GAP

  // Get the cards to display based on mode
  const cardsToDisplay = isShuffleMode ? shuffledCards : category.cards

  // Handle deep linking to a specific card
  useEffect(() => {
    if (initialCardId && !isShuffleMode) {
      const cardIndex = cardsToDisplay.findIndex((card) => card.id === initialCardId)
      if (cardIndex !== -1) {
        setCurrentIndex(cardIndex)
      }
    }
  }, [initialCardId, cardsToDisplay, isShuffleMode])

  useEffect(() => {
    // Reset current index when category changes or shuffle mode changes
    // Only reset if not handling a deep link
    if (!initialCardId) {
      setCurrentIndex(0)
    }
    setFlippedCardIndex(null)
  }, [category, isShuffleMode, shuffledCards, initialCardId])

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

  // Arrow colors - normal and hover (25% lighter)
  const arrowColor = "#454545"
  const arrowHoverColor = "#6A6A6A" // 25% lighter than #454545

  // SVG arrow components
  const LeftArrow = () => (
    <svg width="24" height="27" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.77527e-07 13.5L23.25 26.9234L23.25 0.0766057L6.77527e-07 13.5Z"
        fill={hoveredArrow === "left" ? arrowHoverColor : arrowColor}
        style={{ transition: "fill 0.2s ease" }}
      />
    </svg>
  )

  const RightArrow = () => (
    <svg width="24" height="27" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24 13.5L0.750001 26.9234L0.750002 0.0766057L24 13.5Z"
        fill={hoveredArrow === "right" ? arrowHoverColor : arrowColor}
        style={{ transition: "fill 0.2s ease" }}
      />
    </svg>
  )

  // Get share title based on current mode and category
  // const getShareTitle = () => {
  //   if (isShuffleMode) {
  //     return "Check out my shuffled Ship Yourself Cards"
  //   } else {
  //     return `Check out the ${category.name} cards from Ship Yourself`
  //   }
  // }

  return (
    <div className="w-full relative">
      <div className="flex justify-center items-center">
        {/* Card display area */}
        <div className={`relative ${isMobile ? "w-[345px] h-[500px]" : "w-full flex justify-center"}`}>
          {isMobile ? (
            // Mobile: Stacked card view with animation and swipe functionality
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentIndex}-${category.id}-${isShuffleMode ? "shuffle" : "normal"}`}
                className="relative w-full h-full"
                initial={{
                  opacity: 0,
                  x: animationDirection === "left" ? 50 : animationDirection === "right" ? -50 : 30,
                }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: animationDirection === "left" ? -50 : animationDirection === "right" ? 50 : 0 }}
                transition={{ duration: 0.3 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={(e, info: PanInfo) => {
                  if (!isAnimating) {
                    if (info.offset.x < -80 && canGoNext) {
                      nextCard()
                    } else if (info.offset.x > 80 && canGoPrev) {
                      prevCard()
                    }
                  }
                }}
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
            <motion.div
              key={`${category.id}-${isShuffleMode ? "shuffle" : "normal"}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="overflow-visible pt-[30px]"
              style={{
                width: "1200px",
                marginBottom: "20px",
                marginLeft: "-12px",
                paddingBottom: "10px",
              }}
              ref={carouselRef}
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
            </motion.div>
          )}
        </div>
      </div>

      {/* Navigation arrows below the card */}
      <div className="flex justify-center mt-6 gap-8 items-center">
        <div
          className={`cursor-pointer ${!canGoPrev ? "opacity-30 cursor-not-allowed" : ""}`}
          onClick={canGoPrev ? prevCard : undefined}
          onMouseEnter={() => canGoPrev && setHoveredArrow("left")}
          onMouseLeave={() => setHoveredArrow(null)}
        >
          <LeftArrow />
        </div>

        <div
          className={`cursor-pointer ${!canGoNext ? "opacity-30 cursor-not-allowed" : ""}`}
          onClick={canGoNext ? nextCard : undefined}
          onMouseEnter={() => canGoNext && setHoveredArrow("right")}
          onMouseLeave={() => setHoveredArrow(null)}
        >
          <RightArrow />
        </div>
      </div>
    </div>
  )
}
