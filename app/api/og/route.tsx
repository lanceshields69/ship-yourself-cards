import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    // Get the card details from the URL params
    const title = searchParams.get("title") || "Ship Yourself Cards"
    const subtitle = searchParams.get("subtitle") || "Field Notes for Designers Redesigning Their Careers"
    const category = searchParams.get("category") || ""
    const color = searchParams.get("color") || "#6E34C8"

    // Load the Inter font
    const interRegular = await fetch(
      new URL("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap", req.url),
    ).then((res) => res.arrayBuffer())

    return new ImageResponse(
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "40px",
          backgroundColor: "#ffffff",
          backgroundImage: "linear-gradient(to bottom right, #ffffff, #f5f5f5)",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          {category && (
            <div
              style={{
                fontSize: "24px",
                color,
                marginBottom: "16px",
              }}
            >
              {category}
            </div>
          )}
          <div
            style={{
              fontSize: "64px",
              fontWeight: 700,
              color,
              marginBottom: "16px",
              lineHeight: 1.1,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "32px",
              color,
              marginBottom: "24px",
            }}
          >
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: 500,
            }}
          >
            Ship Yourself Cards
          </div>
          <div
            style={{
              fontSize: "18px",
              color: "#666666",
            }}
          >
            lanceshields.design
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: interRegular,
            style: "normal",
            weight: 400,
          },
        ],
      },
    )
  } catch (e) {
    console.error(e)
    return new Response("Failed to generate image", { status: 500 })
  }
}
