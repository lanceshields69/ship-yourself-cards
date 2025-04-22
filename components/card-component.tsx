"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { Card as CardType } from "@/lib/types"
import { getCategoryIcon } from "@/components/icons"
// Update the import for CardShareButton
import CardShareButton from "@/components/card-share-button-fixed"

interface CardComponentProps {
  card: CardType
  categoryColor: string
  isFlipped: boolean
  onFlip: () => void
}

export default function CardComponent({ card, categoryColor, isFlipped, onFlip }: CardComponentProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Extract the category ID from the card's category name
  const getCategoryId = () => {
    if (card.category.toLowerCase().includes("mindset")) return "mindset"
    if (card.category.toLowerCase().includes("networking")) return "networking"
    if (card.category.toLowerCase().includes("super ic")) return "super-ic"
    if (card.category.toLowerCase().includes("interview")) return "interviewing"
    if (card.category.toLowerCase().includes("storytelling")) return "storytelling"
    if (card.category.toLowerCase().includes("negotiation")) return "negotiation"
    if (card.category.toLowerCase().includes("power-ups") || card.category.toLowerCase().includes("wild cards"))
      return "wildcards"
    return "wildcards"
  }

  // Get the appropriate icon based on the category
  const getIcon = () => {
    const categoryId = getCategoryId()
    return getCategoryIcon(categoryId, categoryColor, 56)
  }

  // Get the "Go Deeper" link for mindset cards
  const getGoDeeper = () => {
    // Only show for mindset cards 1-10
    if (!card.id.startsWith("mindset-")) return null

    const cardNumber = Number.parseInt(card.id.split("-")[1])
    if (cardNumber < 1 || cardNumber > 10) return null

    // Define the links for each mindset card
    const links = [
      {
        title: "James Clear: Motivation: The Scientific Guide on How to Get and Stay Motivated",
        url: "https://jamesclear.com/motivation",
      },
      {
        title: "Ryan Holiday: The Obstacle Is The Way",
        url: "https://dailystoic.com/obstacle-is-the-way-summary/",
      },
      {
        title: "Harvard Business Review: How Resilience Works",
        url: "https://hbr.org/2002/05/how-resilience-works",
      },
      {
        title: "James Clear: Forget About Goals, Focus on Systems Instead",
        url: "https://jamesclear.com/goals-systems",
      },
      {
        title: "The Muse: How to Banish Imposter Syndrome and Embrace Everything You Deserve",
        url: "https://www.themuse.com/advice/how-to-banish-imposter-syndrome-and-embrace-everything-you-deserve",
      },
      {
        title: "Developing a Growth Mindset with Carol Dweck",
        url: "https://youtu.be/hiiEeMN7vbQ?si=GU2Ae0f_fRyWwQE5",
      },
      {
        title: "BetterUp: The Power of Big Picture Thinking",
        url: "https://www.betterup.com/blog/big-picture-thinking",
      },
      {
        title: "UX Planet: How My Layoff Led to My Career Growth",
        url: "https://uxplanet.org/how-my-layoff-led-to-my-career-growth-my-journey-of-building-resilience-cba62fd2789b",
      },
      {
        title: "Harvard Business Review: Manage Your Energy, Not Your Time",
        url: "https://hbr.org/2007/10/manage-your-energy-not-your-time",
      },
      {
        title: "LinkedIn: How can you build resilience when job searching?",
        url: "https://www.linkedin.com/advice/0/how-can-you-build-resilience-when-job-searching-aedwf",
      },
    ]

    // Return the link for this card (array is 0-indexed, but card IDs start at 1)
    return links[cardNumber - 1]
  }

  // Get the go deeper link for this card
  const goDeeperLink = getGoDeeper()

  return (
    <motion.div
      className="relative w-full h-[500px] perspective"
      whileHover={{
        y: -10,
        transition: { duration: 0.2 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        filter: isFlipped ? "drop-shadow(0 10px 15px rgba(0, 0, 0, 0.2))" : "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))",
        transition: "filter 0.5s ease-in-out",
      }}
    >
      <motion.div
        className="w-full h-full relative preserve-3d cursor-pointer"
        onClick={onFlip}
        animate={{
          rotateY: isFlipped ? 180 : 0,
          translateY: isFlipped ? -20 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1], // Custom spring-like easing
          // Add a subtle bounce at the end of the animation
          type: "spring",
          stiffness: 120,
          damping: 15,
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <div
          className="absolute w-full h-full rounded-3xl p-8 flex flex-col backface-hidden shadow-md transition-all duration-300"
          style={{
            backgroundColor: card.backgroundColor,
            filter: isHovered && !isFlipped ? "brightness(1.05)" : "brightness(1)",
          }}
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

          {/* Add share button to the front of the card */}
          <CardShareButton
            cardId={card.id}
            categoryId={getCategoryId()}
            categoryColor={categoryColor}
            cardTitle={card.title}
          />
        </div>

        {/* Back of card */}
        <div
          className="absolute w-full h-full rounded-3xl p-8 flex flex-col backface-hidden rotateY-180 shadow-md overflow-hidden transition-all duration-300"
          style={{
            backgroundColor: card.backgroundColor,
            filter: isHovered && isFlipped ? "brightness(1.05)" : "brightness(1)",
          }}
        >
          <h3 className="text-base font-medium mb-6" style={{ color: categoryColor }}>
            {card.title}
          </h3>

          <ul className="space-y-2.5 mb-auto">
            {card.bulletPoints.map((point, index) => (
              <li key={index} className="flex items-start" style={{ color: categoryColor }}>
                <span
                  className="mr-3 mt-1.5 h-2.5 w-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: categoryColor }}
                ></span>
                <span className="text-[20px] leading-tight">{point}</span>
              </li>
            ))}
          </ul>

          {/* Go Deeper section - now works for all mindset cards 1-10 */}
          {goDeeperLink && (
            <div className="mt-6">
              <h4 className="text-base font-medium mb-1" style={{ color: categoryColor }}>
                Go Deeper
              </h4>
              <a
                href={goDeeperLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline hover:opacity-80 transition-opacity"
                style={{ color: categoryColor }}
              >
                {goDeeperLink.title} →
              </a>
            </div>
          )}

          {card.quote && (
            <div className="mt-6">
              <h4 className="text-base font-medium mb-1" style={{ color: categoryColor }}>
                Words of Wisdom
              </h4>
              <p className="text-sm italic" style={{ color: categoryColor }}>
                "{card.quote}" {card.quoteAuthor && `— ${card.quoteAuthor}`}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
