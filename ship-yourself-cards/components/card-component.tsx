"use client"

import { motion } from "framer-motion"
import type { Card as CardType } from "@/lib/types"
import { getCategoryIcon } from "@/components/icons"

interface CardComponentProps {
  card: CardType
  categoryColor: string
  isFlipped: boolean
  onFlip: () => void
}

export default function CardComponent({ card, categoryColor, isFlipped, onFlip }: CardComponentProps) {
  // Get the appropriate icon based on the category
  const getIcon = () => {
    // Extract the category ID from the card's category name
    const categoryId = card.category.toLowerCase().includes("mindset")
      ? "mindset"
      : card.category.toLowerCase().includes("networking")
        ? "networking"
        : card.category.toLowerCase().includes("super ic")
          ? "super-ic"
          : card.category.toLowerCase().includes("interview")
            ? "interviewing"
            : card.category.toLowerCase().includes("storytelling")
              ? "storytelling"
              : card.category.toLowerCase().includes("negotiation")
                ? "negotiation"
                : card.category.toLowerCase().includes("power-ups") ||
                    card.category.toLowerCase().includes("wild cards")
                  ? "wildcards"
                  : "wildcards"

    return getCategoryIcon(categoryId, categoryColor, 56)
  }

  return (
    <div className="relative w-full h-[500px] perspective">
      <motion.div
        className="w-full h-full relative preserve-3d cursor-pointer"
        onClick={onFlip}
        animate={{
          rotateY: isFlipped ? 180 : 0,
          translateY: isFlipped ? -20 : 0,
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <div
          className="absolute w-full h-full rounded-3xl p-8 flex flex-col backface-hidden shadow-md"
          style={{ backgroundColor: card.backgroundColor }}
        >
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium" style={{ color: categoryColor }}>
              {card.category}
            </h3>
            <div className="mt-1">{getIcon()}</div>
          </div>

          <div className="flex-grow flex flex-col justify-center">
            <h2
              className="text-4xl md:text-[46px] font-normal mb-4 break-words leading-tight md:leading-[51px]"
              style={{ color: categoryColor }}
            >
              {card.title}
            </h2>
            <p className="text-2xl" style={{ color: categoryColor }}>
              {card.subtitle}
            </p>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute w-full h-full rounded-3xl p-8 flex flex-col backface-hidden rotateY-180 shadow-md overflow-hidden"
          style={{ backgroundColor: card.backgroundColor }}
        >
          <h3 className="text-xl font-medium mb-6" style={{ color: categoryColor }}>
            {card.title}
          </h3>

          <ul className="space-y-6 mb-auto">
            {card.bulletPoints.map((point, index) => (
              <li key={index} className="flex items-start" style={{ color: categoryColor }}>
                <span
                  className="mr-3 mt-1.5 h-2.5 w-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: categoryColor }}
                ></span>
                <span className="text-lg leading-tight">{point}</span>
              </li>
            ))}
          </ul>

          {card.quote && (
            <div className="mt-6">
              <h4 className="text-base font-medium mb-1" style={{ color: categoryColor }}>
                Words of Wisdom
              </h4>
              <p className="text-sm italic" style={{ color: categoryColor }}>
                "{card.quote}"
              </p>
              {card.quoteAuthor && (
                <p className="text-sm mt-1" style={{ color: categoryColor }}>
                  — {card.quoteAuthor}
                </p>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
