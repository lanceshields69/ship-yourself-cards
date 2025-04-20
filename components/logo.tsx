import Image from "next/image"

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Image src="/images/logo-icon.png" alt="Ship Yourself Cards Logo" width={100} height={100} className={className} />
  )
}
