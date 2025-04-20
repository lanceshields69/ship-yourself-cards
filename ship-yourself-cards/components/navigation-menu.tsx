"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Mail, Linkedin, FileText, User } from "lucide-react"

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
      icon: <FileText className="h-5 w-5" />,
      isExternal: true,
    },
    {
      title: "About Me",
      href: "https://www.lanceshields.design/about",
      icon: <User className="h-5 w-5" />,
      isExternal: true,
    },
    {
      title: "Me on LinkedIn",
      href: "https://www.linkedin.com/in/lanceshields/",
      icon: <Linkedin className="h-5 w-5" />,
      isExternal: true,
    },
    {
      title: "My Substack",
      href: "https://designamplified.substack.com/",
      icon: <FileText className="h-5 w-5" />,
      isExternal: true,
    },
    {
      title: "Hire Me",
      href: "mailto:lance@lanceshields.design",
      icon: <Mail className="h-5 w-5" />,
      isExternal: false,
      isEmail: true,
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
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Menu</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100" aria-label="Close menu">
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex-1 overflow-auto py-4">
              <ul className="space-y-2 px-4">
                {menuLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      target={link.isExternal ? "_blank" : undefined}
                      rel={link.isExternal ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 transition-colors"
                      onClick={() => {
                        // Close menu for non-external links except email links
                        if (!link.isExternal && !link.isEmail) onClose()
                      }}
                    >
                      {link.icon}
                      <span>{link.title}</span>
                      {link.isExternal && <ExternalLink className="h-4 w-4 ml-auto opacity-70" />}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="p-4 border-t text-sm text-gray-500">
              <p>© 2024 Lance Shields</p>
              <p>Field Notes for Designers Redesigning Their Careers</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
