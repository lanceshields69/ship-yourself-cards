"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import LogoIcon from "@/components/logo-icon"
import NavigationMenu from "@/components/navigation-menu"

export default function Header() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Use black logo on card viewing page, mint logo on home page
  const logoColor = isHomePage ? "#A5F3C9" : "#000000"

  return (
    <>
      <header className="w-full border-b">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <LogoIcon color={logoColor} width={30} height={30} />
            <span className="font-semibold">Ship Yourself Cards</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </header>

      <NavigationMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
