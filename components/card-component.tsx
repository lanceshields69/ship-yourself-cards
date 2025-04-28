"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import type { Card as CardType } from "@/lib/types"
import { getCategoryIcon } from "@/components/icons"
import CardShareButton from "@/components/card-share-button-fixed"

interface CardComponentProps {
  card: CardType
  categoryColor: string
  isFlipped: boolean
  onFlip: () => void
}

export default function CardComponent({ card, categoryColor, isFlipped, onFlip }: CardComponentProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [prevFlipped, setPrevFlipped] = useState<boolean | null>(null)

  // Update previous flipped state
  useEffect(() => {
    setPrevFlipped(isFlipped)
  }, [isFlipped])

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

  // Get the "Go Deeper" link for mindset, super-ic, and networking cards
  const getGoDeeper = () => {
    // For mindset cards 1-10
    if (card.id.startsWith("mindset-")) {
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

    // For super-ic cards 1-5
    if (card.id.startsWith("super-ic-")) {
      const cardNumber = Number.parseInt(card.id.split("-")[2])
      if (cardNumber < 1 || cardNumber > 5) return null

      // Define the links for each super-ic card
      const links = [
        {
          title: 'Michael ("Ridd") Riddering: Building a portfolio page using v0',
          url: "https://www.dive.club/ideas/building-a-portfolio-page-using-v0",
        },
        {
          title: "Thiago Costa: Cultivating taste as a designer",
          url: "https://www.dive.club/deep-dives/thiago-costa",
        },
        {
          title: "Ethan Mollick: Speaking things into existence",
          url: "https://www.oneusefulthing.org/p/speaking-things-into-existence",
        },
        {
          title: "Nad Chishtie: Loveable - A new way to design and build with AI",
          url: "https://www.dive.club/deep-dives/nad-chishtie",
        },
        {
          title: "Ethan Mollick: 15 Times to use AI, and 5 Not to",
          url: "https://www.oneusefulthing.org/p/15-times-to-use-ai-and-5-not-to",
        },
      ]

      // Return the link for this card (array is 0-indexed, but card IDs start at 1)
      return links[cardNumber - 1]
    }

    // For networking cards 1-10
    if (card.id.startsWith("networking-")) {
      const cardNumber = Number.parseInt(card.id.split("-")[1])
      if (cardNumber < 1 || cardNumber > 10) return null

      // Define the links for each networking card
      const links = [
        {
          title: "Harvard Business Review: A Beginner's Guide to Networking",
          url: "https://hbr.org/2023/03/a-beginners-guide-to-networking",
        },
        {
          title: "Ladders: The 18 questions to ask in an informational interview",
          url: "https://www.theladders.com/career-advice/questions-to-ask-in-an-informational-interview",
        },
        {
          title: "Help Guide: Job Networking Tips",
          url: "https://www.helpguide.org/wellness/career/job-networking-tips",
        },
        {
          title: "Donna Serdula: The Absolute Best Way to Use LinkedIn",
          url: "https://www.letseatgrandma.com/career-warrior-podcast-355/",
        },
        {
          title: "Indeed: How To Network for a Job (Why It's Important and 7 Tips)",
          url: "https://www.indeed.com/career-advice/finding-a-job/how-to-network-for-a-job",
        },
        {
          title: "Angie Callen: How to Network Authentically in Your Job Search",
          url: "https://www.macslist.org/podcasts/networking/how-to-network-authentically-in-your-job-search-with-angie-callen",
        },
        {
          title: "Shortlister: 10 Networking Tips for 2025",
          url: "https://www.myshortlister.com/insights/networking-tips",
        },
        {
          title: "Jobscan: How to Find a Job in 2025: Tips and Tricks from the Experts",
          url: "https://www.jobscan.co/blog/how-to-find-a-job/",
        },
        {
          title: "Work It Daily: Identify Your Unique Value Add (UVA)",
          url: "https://youtu.be/3yuhTtQhbBs?si=6uaiI7oRJ4CqDRv1",
        },
        {
          title: "Tavoq: How To Get A New, Better-Paying Job In 2025",
          url: "https://tavoq.com/blog/fast-finding-new-job-strategies",
        },
      ]

      // Return the link for this card (array is 0-indexed, but card IDs start at 1)
      return links[cardNumber - 1]
    }

    // For interviewing cards 1-10
    if (card.id.startsWith("interviewing-")) {
      const cardNumber = Number.parseInt(card.id.split("-")[1])
      if (cardNumber < 1 || cardNumber > 10) return null

      // Define the links for each interviewing card
      const links = [
        {
          title: "Adobe Design: How to ace a design leader job interview",
          url: "https://adobe.design/stories/leading-design/how-to-ace-a-design-leader-job-interview",
        },
        {
          title: "Marlo Lyons: Use the STAR Interview Method to Land Your Next Job",
          url: "https://hbr.org/2025/02/use-the-star-interview-method-to-land-your-next-job",
        },
        {
          title: "4 resume tweaks that helped a teacher with no tech background land a job at Google",
          url: "https://www.msn.com/en-ie/money/careersandeducation/4-r%C3%A9sum%C3%A9-tweaks-that-helped-a-teacher-with-no-tech-background-land-a-job-at-google/ar-AA1D5Lrr",
        },
        {
          title: "Cass Thompson: How To Cheat in a Virtual Job Interview",
          url: "https://youtu.be/e0nAtHrMkvE?si=y4t4jUvvFdlJWf4R",
        },
        {
          title: "How to Present a UX Portfolio During a Job Interview",
          url: "https://designlab.com/blog/ux-portfolio-presentation",
        },
        {
          title: "Career Coach: How To Improve Your Interview Skills",
          url: "https://www.biospace.com/career-advice/career-coach-how-to-improve-your-interview-skills",
        },
        {
          title: "Aaron James: The complete guide to design interviews",
          url: "https://medium.com/design-bootcamp/the-complete-guide-to-mastering-design-interview-loops-2dc2e5fedc5b",
        },
        {
          title: "Aquent: Top 10 must-ask design interview questions",
          url: "https://aquenttalent.com/blog/top-10-must-ask-design-interview-questions",
        },
        {
          title: "Gregory Heller: A Strategic Game Plan for Job Interviews",
          url: "https://www.linkedin.com/pulse/strategic-game-plan-job-interviews-gregory-heller-igc3c/",
        },
        {
          title: "Kate Sargent: Interview Coaching and Tips",
          url: "https://podcasts.apple.com/us/podcast/interview-coaching-and-tips-with-kate-sargent/id1477653356?i=1000693353359",
        },
      ]

      // Return the link for this card (array is 0-indexed, but card IDs start at 1)
      return links[cardNumber - 1]
    }

    // For storytelling cards 1-10
    if (card.id.startsWith("storytelling-")) {
      const cardNumber = Number.parseInt(card.id.split("-")[1])
      if (cardNumber < 1 || cardNumber > 10) return null

      // Define the links for each storytelling card
      const links = [
        {
          title: "Chris Do: The Future of Personal Branding?",
          url: "https://www.brandisea.com/podcasts/the-future-of-personal-branding-inside-the-mind-of-chris-do/",
        },
        {
          title: "Podcast: Why the Most Powerful Personal Brands Are Built on Service, Not Self",
          url: "https://podcasts.apple.com/us/podcast/why-the-most-powerful-personal-brands-are-built-on/id1479643724?i=1000702163013",
        },
        {
          title: "TED Series: 5 Steps to Building a Personal Brand You Feel Good About",
          url: "https://youtu.be/ozMCb0wOnMU?si=grI6uzbvZaguqkAH",
        },
        {
          title: "Behind the Scenes of Kelly Wearstler's Content Empire",
          url: "https://www.architecturaldigest.com/story/behind-the-scenes-of-kelly-wearstler-content-empire",
        },
        {
          title: "Final Round AI: Comprehensive Interview Coaching and Preparation Guide",
          url: "https://www.finalroundai.com/blog/comprehensive-interview-coaching-and-preparation-guide",
        },
        {
          title: "Designlab: Storytelling and Personal Branding in UX",
          url: "https://youtu.be/mZaYxqaWzTk?si=rMa1B3zPqCAFQIUU",
        },
        {
          title: "HBR: A New Approach to Building Your Personal Brand",
          url: "https://hbr.org/2023/05/a-new-approach-to-building-your-personal-brand",
        },
        {
          title: "Creating a Personal Brand with Jacob Cass",
          url: "https://logogeek.uk/podcast/creating-a-personal-brand",
        },
        {
          title: "Alex Cattoni: 4 Types of Stories To Build Your Personal Brand",
          url: "https://youtu.be/8vCQTf8BVzA?si=p_Lhky4U4wHd7m7b",
        },
        {
          title: "Designlab: Just Show Up: The Importance of Networking Marketing and the Art of Facing Fear",
          url: "https://youtu.be/Il8dbXlLvio?si=Q_-ChsZaw41-gK0N",
        },
      ]

      // Return the link for this card (array is 0-indexed, but card IDs start at 1)
      return links[cardNumber - 1]
    }

    // Add the negotiation links section to the getGoDeeper function, right after the storytelling section

    // For negotiation cards 1-5
    if (card.id.startsWith("negotiation-")) {
      const cardNumber = Number.parseInt(card.id.split("-")[1])
      if (cardNumber < 1 || cardNumber > 5) return null

      // Define the links for each negotiation card
      const links = [
        {
          title: "Yale: Job Offers & Salary Negotiation",
          url: "https://ocs.yale.edu/job-offers-salary-negotiation/",
        },
        {
          title: "Work It Daily: 3 Salary Negotiation Tips For 2025",
          url: "https://www.youtube.com/live/alS5UMfwvF8?si=852BvLQbl-SFZzGU",
        },
        {
          title: "How to negotiate salary: a hands-on guide for your design career",
          url: "https://blog.readymag.com/how-to-negotiate-salary-guide-for-designers/",
        },
        {
          title: "Melody Koh: Negotiating Salary and Benefits as a Designer – An Unorthodox Guide",
          url: "https://blog.prototypr.io/negotiating-salary-and-benefits-as-a-designer-an-unorthodox-guide-74fd4f27312d",
        },
        {
          title: "Dribbble: New Design Job? Negotiate Your Salary Like A Pro",
          url: "https://dribbble.com/resources/career/negotiate-your-design-salary",
        },
      ]

      // Return the link for this card (array is 0-indexed, but card IDs start at 1)
      return links[cardNumber - 1]
    }

    // Add the wildcards links section to the getGoDeeper function, right after the negotiation section

    // For wildcards (Power-Ups) cards 1-5
    if (card.id.startsWith("wildcards-")) {
      const cardNumber = Number.parseInt(card.id.split("-")[1])
      if (cardNumber < 1 || cardNumber > 5) return null

      // Define the links for each wildcards card
      const links = [
        {
          title: "Forbes: 6 Simple Ways To Harness Serendipity In Your Career",
          url: "https://www.forbes.com/sites/toddnordstrom/2021/03/18/6-simple-ways-to-harness-serendipity-in-your-career/",
        },
        {
          title: "10 Ways to Supercharge Your Job Search for the Week Ahead",
          url: "https://www.linkedin.com/pulse/monday-momentum-10-ways-supercharge-your-job-search-garrison-56qhe/",
        },
        {
          title: "How to fight off feeling like a fraud during your job search",
          url: "https://www.linkedin.com/pulse/how-fight-off-feeling-like-fraud-during-your-job-search-andrew-seaman/",
        },
        {
          title: "Chase Jarvis: Create Before You Consume",
          url: "https://chasejarvis.com/blog/create-before-you-consume/",
        },
        {
          title: "Muse: 10 Small Wins to Celebrate During Your Job Search",
          url: "https://www.themuse.com/advice/celebrate-the-wins",
        },
      ]

      // Return the link for this card (array is 0-indexed, but card IDs start at 1)
      return links[cardNumber - 1]
    }

    return null
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

          {/* Add share button and flip text on the same line */}
          <div className="flex justify-between items-center mt-auto">
            <div className="flex items-center gap-1 cursor-pointer" style={{ color: categoryColor }}>
              <svg
                width="16"
                height="12"
                viewBox="0 0 26 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
              >
                <path
                  d="M8.55151 7.94571C8.2596 7.66285 7.80848 7.66285 7.54311 7.94571L5.20786 10.2086C5.15479 9.82285 5.10171 9.43714 5.10171 9.02571C5.10171 4.80857 8.63112 1.38857 12.9832 1.38857C14.2304 1.38857 15.4246 1.67143 16.5391 2.21143C16.8841 2.39143 17.3352 2.23714 17.4944 1.90286C17.6802 1.56857 17.521 1.13143 17.176 0.977142C15.8757 0.334285 14.4692 0 12.9832 0C7.86155 0 3.66872 4.03714 3.66872 9.02571C3.66872 9.48856 3.69526 9.95142 3.77487 10.4143L1.22733 7.94571C0.935425 7.66285 0.484298 7.66285 0.218929 7.94571C-0.0729764 8.22857 -0.0729764 8.66571 0.218929 8.92285L3.88102 12.4714C4.0137 12.6 4.19946 12.6771 4.38522 12.6771C4.57098 12.6771 4.75673 12.6 4.88942 12.4714L8.55151 8.92285C8.81688 8.63999 8.81688 8.20285 8.55151 7.94571Z"
                  fill="currentColor"
                />
                <path
                  d="M25.774 9.07712L22.1384 5.52855C21.8465 5.24569 21.3954 5.24569 21.13 5.52855L17.4679 9.07712C17.176 9.35997 17.176 9.79712 17.4679 10.0543C17.7598 10.3371 18.2109 10.3371 18.4763 10.0543L20.8116 7.7914C20.8646 8.17712 20.9177 8.56283 20.9177 8.97426C20.9177 13.1914 17.3883 16.6114 13.0363 16.6114C11.789 16.6114 10.5949 16.3285 9.48032 15.7885C9.13534 15.6085 8.68421 15.7628 8.52499 16.0971C8.33923 16.4314 8.49845 16.8685 8.84343 17.0228C10.1437 17.6657 11.5767 18 13.0628 18C18.1844 18 22.3772 13.9628 22.3772 8.97426C22.3772 8.5114 22.3507 8.04855 22.2711 7.58569L24.8186 10.0543C24.9513 10.1828 25.1371 10.26 25.3228 10.26C25.5086 10.26 25.6943 10.1828 25.827 10.0543C26.0659 9.79712 26.0659 9.35997 25.774 9.07712Z"
                  fill="currentColor"
                />
              </svg>
              <span className="text-sm font-normal">Click to flip</span>
            </div>
            <CardShareButton
              cardId={card.id}
              categoryId={getCategoryId()}
              categoryColor={categoryColor}
              cardTitle={card.title}
            />
          </div>
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

          {/* Go Deeper section - now works for mindset, super-ic, and networking cards */}
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
