"use client"

import { useState, useRef, useEffect } from "react"
import { Copy, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface CardShareButtonProps {
  cardId: string
  categoryId: string
  categoryColor: string
  cardTitle: string
}

export default function CardShareButton({ cardId, categoryId, categoryColor, cardTitle }: CardShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const shareRef = useRef<HTMLDivElement>(null)

  // Generate deep link URL to this specific card
  const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
  const cardUrl = `${baseUrl}/cards?category=${categoryId}&cardId=${cardId}`

  // Get category-specific share text
  const getCategoryShareText = () => {
    switch (categoryId) {
      case "mindset":
        return "Resilience isn't luck — it's momentum built one small move at a time. 🚀 Grabbing mindset shifts from Ship Yourself Cards!"
      case "networking":
        return "Your next opportunity is hiding in a conversation you're one message away from starting. 🌐 Loving these networking prompts from Ship Yourself Cards."
      case "super-ic":
        return "Leading and building? That's the new design superpower. 💥 Ship Yourself Cards nails what modern designers need to thrive."
      case "interviewing":
        return "Interviews aren't exams — they're collaborations. 🎯 Prepping smarter (and calmer) with Ship Yourself Cards."
      case "storytelling":
        return "Your career story isn't a resume — it's a design project. 📖 Designing mine with new momentum thanks to Ship Yourself Cards."
      case "negotiation":
        return "Negotiating isn't just about salary — it's about designing your future. 📈 Smart strategies I'm picking up from Ship Yourself Cards."
      case "wildcards":
        return "Tiny moves. Big shifts. ✨ Drawing a wild card from Ship Yourself Cards to power up today's momentum!"
      default:
        return `Check out "${cardTitle}" from Ship Yourself Cards!`
    }
  }

  const shareText = getCategoryShareText()

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [copied])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(cardUrl)
      setCopied(true)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const shareLinks = [
    {
      name: "LinkedIn",
      icon: (
        <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_linkedin_card)">
            <path
              d="M0 2.20707C0 1.56733 0.225232 1.03955 0.675676 0.623737C1.12612 0.207906 1.71172 0 2.43243 0C3.14029 0 3.71299 0.204701 4.15058 0.614141C4.60102 1.03636 4.82625 1.58652 4.82625 2.26465C4.82625 2.87879 4.60747 3.39056 4.16988 3.8C3.71944 4.22222 3.12741 4.43333 2.39382 4.43333H2.37452C1.66666 4.43333 1.09396 4.22222 0.656371 3.8C0.218784 3.37778 0 2.84679 0 2.20707ZM0.250965 19V6.1798H4.53668V19H0.250965ZM6.9112 19H11.1969V11.8414C11.1969 11.3936 11.2484 11.0481 11.3514 10.8051C11.5315 10.37 11.805 10.0022 12.1718 9.70152C12.5386 9.40084 12.9987 9.2505 13.5521 9.2505C14.9936 9.2505 15.7143 10.2165 15.7143 12.1485V19H20V11.6495C20 9.75589 19.5496 8.3197 18.6486 7.34091C17.7477 6.36212 16.5573 5.87273 15.0772 5.87273C13.417 5.87273 12.1236 6.58283 11.1969 8.00303V8.04141H11.1776L11.1969 8.00303V6.1798H6.9112C6.93693 6.58922 6.94981 7.86228 6.94981 9.99899C6.94981 12.1357 6.93693 15.136 6.9112 19Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_linkedin_card">
              <rect width="20" height="19" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(cardUrl)}&summary=${encodeURIComponent(shareText)}`,
    },
    {
      name: "Email",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0.637779 4.89317L8.97111 9.25792C9.25111 9.40417 9.61333 9.4735 9.97778 9.4735C10.3422 9.4735 10.7044 9.40417 10.9844 9.25792L19.3178 4.89317C19.8611 4.60825 20.3744 3.5 19.3778 3.5H0.578891C-0.417776 3.5 0.0955573 4.60825 0.637779 4.89317ZM19.57 7.27975L10.9844 11.6423C10.6067 11.8352 10.3422 11.8579 9.97778 11.8579C9.61333 11.8579 9.34889 11.8352 8.97111 11.6423C8.59333 11.4495 1.04556 7.59175 0.428891 7.27867C-0.0044426 7.05767 1.79562e-06 7.31658 1.79562e-06 7.51592V15.4167C1.79562e-06 15.8717 0.628891 16.5 1.11111 16.5H18.8889C19.3711 16.5 20 15.8717 20 15.4167V7.517C20 7.31767 20.0044 7.05875 19.57 7.27975Z"
            fill="black"
          />
        </svg>
      ),
      url: `mailto:?subject=${encodeURIComponent(`Ship Yourself Card: ${cardTitle}`)}&body=${encodeURIComponent(`${shareText}\n\n${cardUrl}`)}`,
    },
    {
      name: "X",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15.7512 1H18.818L12.1179 8.62463L20 19H13.8284L8.99459 12.7074L3.46359 19H0.394936L7.56132 10.8446L0 1H6.32827L10.6976 6.75171L15.7512 1ZM14.6748 17.1723H16.3742L5.40491 2.73169H3.58133L14.6748 17.1723Z"
            fill="black"
          />
        </svg>
      ),
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(cardUrl)}&text=${encodeURIComponent(shareText)}`,
    },
    {
      name: "Facebook",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_facebook_card)">
            <path
              d="M13.3149 3.32003H15.1949V0.14003C14.2847 0.045377 13.3701 -0.00135428 12.4549 2.98641e-05C9.73493 2.98641e-05 7.87493 1.66003 7.87493 4.70003V7.32003H4.80493V10.88H7.87493V20H11.5549V10.88H14.6149L15.0749 7.32003H11.5549V5.05003C11.5549 4.00003 11.8349 3.32003 13.3149 3.32003Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_facebook_card">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(cardUrl)}&quote=${encodeURIComponent(shareText)}`,
    },
    {
      name: "WhatsApp",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_whatsapp_card)">
            <path
              d="M10.1813 0C4.75915 0 0.363125 4.36165 0.363125 9.7425C0.363125 11.5831 0.877946 13.3046 1.77201 14.7732L0 20L5.43589 18.2731C6.8425 19.0448 8.46022 19.485 10.1813 19.485C15.6042 19.485 20 15.1227 20 9.7425C20 4.36165 15.6042 0 10.1813 0ZM15.0636 13.4424C14.8326 14.015 13.7879 14.5376 13.327 14.5617C12.8666 14.5861 12.8534 14.9186 10.3431 13.828C7.83304 12.7372 6.3229 10.085 6.20384 9.9142C6.08469 9.74402 5.23152 8.52817 5.27754 7.3046C5.32388 6.0808 5.99393 5.50344 6.23308 5.2633C6.47196 5.02281 6.74585 4.97973 6.91308 4.97701C7.11076 4.97379 7.23879 4.97112 7.38509 4.97652C7.53125 4.98205 7.7508 4.94594 7.94089 5.45147C8.13089 5.95696 8.58567 7.19938 8.64384 7.32598C8.70196 7.45272 8.73795 7.59946 8.64839 7.76219C8.55857 7.92527 8.51259 8.02714 8.38228 8.16768C8.25125 8.30821 8.10665 8.48205 7.98978 8.58951C7.85942 8.70848 7.72326 8.83826 7.86031 9.09259C7.99728 9.34674 8.46982 10.1799 9.18973 10.8665C10.115 11.7492 10.9129 12.0419 11.1584 12.1753C11.4046 12.3094 11.5515 12.2945 11.7042 12.1338C11.8562 11.9732 12.3577 11.4309 12.5344 11.1888C12.7109 10.946 12.8764 10.9936 13.1032 11.0848C13.3299 11.1764 14.5388 11.8239 14.785 11.9576C15.031 12.0911 15.1954 12.1598 15.2542 12.2657C15.313 12.3719 15.2945 12.8697 15.0636 13.4424Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_whatsapp_card">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${cardUrl}`)}`,
    },
    {
      name: "Reddit",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 10.2786C20 9.05234 19.0111 8.05625 17.7951 8.05625C17.216 8.05625 16.6949 8.2776 16.2984 8.64505C14.8552 7.63568 12.9087 6.97161 10.735 6.84766L11.7105 3.60703L14.6993 4.20469C14.8018 5.20964 15.6437 5.99323 16.6726 5.99323H16.6904C17.7862 5.99323 18.6726 5.09896 18.6726 3.99661C18.6726 2.89427 17.7817 2 16.686 2H16.6771H16.6726C15.9065 2 15.2472 2.43385 14.9131 3.07578L10.9176 2.27891L9.54566 6.8388L9.4343 6.84323C7.19376 6.94062 5.1804 7.61354 3.70156 8.64505C3.30958 8.2776 2.78396 8.05625 2.2049 8.05625C0.988864 8.05625 0 9.05234 0 10.2786C0 11.1464 0.489978 11.8945 1.20713 12.262C1.17149 12.4789 1.15367 12.6958 1.15367 12.9172C1.15813 16.2729 5.11804 19 10 19C14.882 19 18.8419 16.2729 18.8419 12.9128C18.8419 12.6914 18.8241 12.4745 18.7929 12.2576C19.51 11.8901 20 11.1419 20 10.2786ZM1.52784 11.1685C1.23385 10.9693 1.04232 10.6328 1.04232 10.2477C1.04232 9.63672 1.53675 9.13646 2.14254 9.13646C2.39198 9.13646 2.62361 9.22057 2.81069 9.36224C2.20935 9.88906 1.76392 10.5 1.52784 11.1685ZM15.9376 3.99661C15.9376 3.58932 16.2673 3.25286 16.6726 3.25286C17.078 3.25286 17.4076 3.5849 17.4076 3.99661C17.4076 4.40391 17.078 4.74036 16.6726 4.74036C16.2673 4.74036 15.9376 4.40833 15.9376 3.99661ZM5.65702 11.9344C5.65702 11.1552 6.28953 10.5266 7.0735 10.5266C7.85746 10.5266 8.48998 11.1552 8.48998 11.9344C8.48998 12.7135 7.85746 13.3422 7.0735 13.3422C6.28953 13.3422 5.65702 12.7135 5.65702 11.9344ZM10 16.875C7.87973 16.8661 6.6147 15.6133 6.56125 15.5602L7.12249 15.0112C7.1314 15.0201 8.17817 16.0826 10 16.0914C11.7951 16.0826 12.8597 15.0201 12.8731 15.0112L13.4343 15.5602C13.3808 15.6133 12.1203 16.8661 10 16.875ZM12.9532 13.3422C12.1693 13.3422 11.5367 12.7135 11.5367 11.9344C11.5367 11.1552 12.1693 10.5266 12.9532 10.5266C13.7372 10.5266 14.3697 11.1552 14.3697 11.9344C14.3697 12.7135 13.7327 13.3422 12.9532 13.3422ZM18.4811 11.1862C18.2405 10.5089 17.7862 9.88464 17.1759 9.35339C17.363 9.20729 17.5991 9.12318 17.853 9.12318C18.4722 9.12318 18.971 9.62786 18.971 10.2521C18.9755 10.6417 18.7795 10.9826 18.4811 11.1862Z"
            fill="black"
          />
        </svg>
      ),
      url: `https://www.reddit.com/submit?url=${encodeURIComponent(cardUrl)}&title=${encodeURIComponent(shareText)}`,
    },
  ]

  return (
    <div className="relative" ref={shareRef}>
      <button
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        className="flex items-center gap-1 hover:opacity-80 transition-opacity"
        style={{ color: categoryColor }}
        aria-label="Share this card"
      >
        <span className="text-sm font-normal">Share</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14.5 12L19 7.5L14.5 3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.9999 18H1.75C1.55109 18 1.36032 17.921 1.21967 17.7803C1.07902 17.6397 1 17.4489 1 17.25V6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.03345 14.25C5.53295 12.318 6.66009 10.6067 8.2378 9.38497C9.81552 8.1632 11.7544 7.50015 13.7499 7.5H18.9998"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 bottom-12 w-72 rounded-lg bg-white shadow-lg z-50 border"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Share this card</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsOpen(false)
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-3 mb-4">
                {shareLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex flex-col items-center justify-center w-[calc(33%-0.5rem)] p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 mb-1 flex items-center justify-center">{link.icon}</div>
                    <span className="text-xs">{link.name}</span>
                  </a>
                ))}
              </div>

              <div className="flex items-center gap-2 border rounded-md p-2">
                <div className="flex-1 truncate text-sm text-gray-500">
                  {cardUrl.length > 30 ? `${cardUrl.substring(0, 30)}...` : cardUrl}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    copyToClipboard()
                  }}
                  className="flex items-center gap-1 h-8"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span className="text-xs">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span className="text-xs">Copy</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
