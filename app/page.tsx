"use client"

import Link from "next/link"
import LogoIcon from "@/components/logo-icon"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  // Trigger animation after component mounts
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-purple-700 text-mint p-4 md:p-8">
      <div className="max-w-2xl mx-auto w-full flex flex-col pt-5">
        {/* Logo with animation */}
        <div className="mb-6 md:mb-8 overflow-hidden">
          <motion.div
            initial={{ y: -150, opacity: 0, rotate: -5 }}
            animate={isLoaded ? { y: 0, opacity: 1, rotate: 0 } : { y: -150, opacity: 0, rotate: -5 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2,
            }}
          >
            <LogoIcon color="#A5F3C9" width={120} height={120} />
          </motion.div>
        </div>
        <div className="space-y-6 md:space-y-8">
          <div className="text-left">
            <p className="text-xl mb-2">Welcome to</p>
            <h1 className="text-5xl md:text-6xl font-bold mb-2">Ship Yourself Cards</h1>
            <p className="text-xl md:text-2xl">Field Notes for Designers Redesigning Their Careers</p>
          </div>

          <div className="space-y-6 py-6 text-left">
            <p className="text-sm">
              You've got the skills.
              <br />
              Now design your next move.
            </p>

            <p className="text-sm">
              Explore practical, tactical cards to build momentum,
              <br className="hidden md:block" /> {/* Line break after "momentum," only on desktop */}
              tell your story, and launch what's next.
            </p>
          </div>

          <div className="text-left">
            <Link
              href="/cards"
              className="inline-flex items-center justify-center rounded-md border-2 border-mint px-8 py-3 text-xl font-medium hover:bg-mint/10 transition-colors"
            >
              Explore the Cards
            </Link>
          </div>
        </div>
        <div className="mt-14 md:mt-18 text-sm text-left">
          <p>Created by Lance Shields</p>
          <p>
            <a
              href="https://www.lanceshields.design"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              lanceshields.design
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
