"use client"

import { useState, useRef, useEffect } from "react"

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
          <path d="M0.637779 4.89317L8.97111 9.25792C9.25111 9.40417 9.61333 9.4735 9.97778 9.4735C10.3422 9.4735 10.7044 9.40417 10.9844 9.25792L19.3178 4.89317C19.8611 4.60825 20.3744 3.5 19.3778 3.5H0.578891C-0.417776 3.5 0.0955573 4.60825 0.637779 4.89317ZM19.57 7.27975L10.9844 11.6423C10.6067 11.8352 10.3422 11.8579 9.97778 11.8579C9.61333 11.8579 9.34889 11.8352 8.97111 11.6423C8.59333 11.4495 1.04556 7.59175 0.428891 7.27867C-0.0044426 7.05767 1.79562e-06 7.31658 1.79562e-06 7.51592V15.4167C1.79562e-06 15.8717" />
        </svg>
      ),
      url: `mailto:?subject=${encodeURIComponent(cardTitle)}&body=${encodeURIComponent(shareText + "%0D%0A%0D%0A" + cardUrl)}`,
    },
  ]

  return (
    <div ref={shareRef} className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        className="absolute bottom-3 right-3 p-2 rounded-full hover:bg-black/5 transition-colors flex items-center gap-1"
        aria-label="Share this card"
        style={{ color: categoryColor }}
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

      {isOpen && (
        <div className="absolute right-0 bottom-14 bg-white rounded-md shadow-md z-10 w-48">
          <ul className="py-2">
            {shareLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  {link.icon}
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  copyToClipboard()
                }}
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors w-full text-left"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.5 3.33325H4.16667C3.72464 3.33325 3.33333 3.72458 3.33333 4.16659V15.8333C3.33333 16.2754 3.72464 16.6666 4.16667 16.6666H15.8333C16.2754 16.6666 16.6667 16.2754 16.6667 15.8333V12.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.5 3.33325H15.8333C16.2754 3.33325 16.6667 3.72458 16.6667 4.16659V7.49992"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.5 12.5L16.6667 3.33325"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Copy link
              </button>
            </li>
          </ul>
        </div>
      )}

      {copied && (
        <div className="absolute right-0 bottom-14 bg-green-500 text-white py-2 px-4 rounded-md text-sm z-20">
          Copied to clipboard!
        </div>
      )}
    </div>
  )
}
