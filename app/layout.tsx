import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ship Yourself Cards",
  description: "Field Notes for Designers Redesigning Their Careers",
  icons: {
    icon: "/favicon-shipyourself.png",
    apple: "/favicon-shipyourself.png",
  },
  openGraph: {
    title: "Ship Yourself Cards",
    description: "Field Notes for Designers Redesigning Their Careers",
    url: "https://shipyourselfcards.com",
    siteName: "Ship Yourself Cards",
    images: [
      {
        url: "/images/og-image.png", // You would need to create this image
        width: 1200,
        height: 630,
        alt: "Ship Yourself Cards - Field Notes for Designers Redesigning Their Careers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ship Yourself Cards",
    description: "Field Notes for Designers Redesigning Their Careers",
    images: ["/images/og-image.png"], // Same as OpenGraph image
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
