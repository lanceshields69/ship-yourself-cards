import Link from "next/link"
import LogoIcon from "@/components/logo-icon"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-purple-700 text-mint p-4 md:p-8">
      <div className="max-w-2xl mx-auto w-full flex flex-col pt-5">
        {/* Increased max-width from max-w-xl to max-w-2xl */}
        {/* Logo with reduced bottom margin */}
        <div className="mb-6 md:mb-8">
          <LogoIcon color="#A5F3C9" width={120} height={120} />
        </div>
        <div className="space-y-6 md:space-y-8">
          <div className="text-left">
            <p className="text-xl mb-2">Welcome to</p>
            <h1 className="text-5xl md:text-6xl font-bold mb-2">Ship Yourself Cards</h1>
            <p className="text-xl md:text-2xl">Field Notes for Designers Redesigning Their Careers</p>
          </div>

          <div className="space-y-6 py-6 text-left">
            <p className="text-xl">
              You've got the skills.
              <br />
              Now design your next move.
            </p>

            <p className="text-xl">
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
        <div className="mt-20 md:mt-24 text-lg opacity-80 text-left">
          <p>Created by Lance Shields</p>
          <p>lanceshields.design</p>
        </div>
      </div>
    </main>
  )
}
