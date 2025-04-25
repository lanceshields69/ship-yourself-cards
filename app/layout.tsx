import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "react"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ship Yourself Cards",
  description: "Field Notes for Designers Redesigning Their Careers",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16" },
      { url: "/favicon-32x32.png", sizes: "32x32" },
    ],
    apple: { url: "/apple-touch-icon.png" },
    shortcut: { url: "/favicon.ico" },
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Ship Yourself Cards",
    description: "Field Notes for Designers Redesigning Their Careers",
    url: "https://shipyourselfcards.com",
    siteName: "Ship Yourself Cards",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Social-image.jpg-KnsA6tp72rd8T5Sv6GxdBWAEihTU6Y.jpeg",
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
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Social-image.jpg-KnsA6tp72rd8T5Sv6GxdBWAEihTU6Y.jpeg",
    ], // Same as OpenGraph image
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
      <head>
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-H8JW9EH3HY" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H8JW9EH3HY');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Suspense>{children}</Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
