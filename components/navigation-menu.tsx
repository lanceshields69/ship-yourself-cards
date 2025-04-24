"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import Image from "next/image"

interface NavigationMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function NavigationMenu({ isOpen, onClose }: NavigationMenuProps) {
  // Close menu when ESC key is pressed
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)

    // Prevent scrolling when menu is open
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      window.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  const menuLinks = [
    {
      title: "Ship Yourself Article",
      href: "https://www.linkedin.com/pulse/ship-yourself-how-designers-creating-new-careers-lance-shields-60mec/?trackingId=tn7EQJ%2F%2BT7MPeyd6eiXWoQ%3D%3D",
      icon: "/images/ship-yourself-article.svg",
    },
    {
      title: "Making of App",
      href: "https://www.lanceshields.design/research",
      icon: "/images/making.svg",
    },
    {
      title: "About me",
      href: "https://www.lanceshields.design/about",
      icon: "/images/about-me.svg",
    },
    {
      title: "Me on Linkedin",
      href: "https://www.linkedin.com/in/lanceshields/",
      icon: "/images/me-on-linkedin.svg",
    },
    {
      title: "My substack",
      href: "https://designamplified.substack.com/",
      icon: "/images/my-substack.svg",
    },
    {
      title: "Hire me",
      href: "mailto:lance@lanceshields.design",
      icon: "/images/hire-me.svg",
    },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />

          {/* Menu panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full sm:w-80 bg-white z-50 shadow-lg flex flex-col"
          >
            <div className="flex justify-end p-4">
              <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100" aria-label="Close menu">
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex-1 overflow-auto py-8">
              <ul className="space-y-6 px-8">
                {menuLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      target={link.title !== "Hire me" ? "_blank" : undefined}
                      rel={link.title !== "Hire me" ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4 text-[#6E34C8] hover:opacity-80 transition-opacity"
                    >
                      <Image src={link.icon || "/placeholder.svg"} alt="" width={30} height={30} />
                      <span className="text-lg font-medium">{link.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
