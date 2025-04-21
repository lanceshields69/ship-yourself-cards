// This file will handle fetching and parsing the CSV data

export async function fetchCardData() {
  try {
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ship_yourself_cards_complete_FINAL-o1b9pgTz0DHIzvkGnXL50ghhX8qErC.csv",
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.status}`)
    }

    const csvText = await response.text()
    return parseCSV(csvText)
  } catch (error) {
    console.error("Error fetching CSV data:", error)
    throw error
  }
}

function parseCSV(csvText: string) {
  // Split by lines and filter out empty lines
  const lines = csvText.split("\n").filter((line) => line.trim())

  // Extract headers from the first line
  const headers = lines[0].split(",").map((header) => header.trim())

  // Parse each data row
  const data = []
  for (let i = 1; i < lines.length; i++) {
    // Handle CSV parsing with potential quoted fields containing commas
    const row: Record<string, string> = {}
    const currentLine = lines[i]
    const fields: string[] = []
    let inQuotes = false
    let currentField = ""

    for (let j = 0; j < currentLine.length; j++) {
      const char = currentLine[j]

      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === "," && !inQuotes) {
        fields.push(currentField)
        currentField = ""
      } else {
        currentField += char
      }
    }

    // Add the last field
    fields.push(currentField)

    // Map fields to headers
    headers.forEach((header, index) => {
      if (index < fields.length) {
        // Remove quotes if present
        let value = fields[index]
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.substring(1, value.length - 1)
        }
        row[header] = value
      }
    })

    data.push(row)
  }

  return data
}

// Function to convert CSV data to our app's card format
export function convertToCardFormat(csvData: any[]) {
  // Group by category
  const categoriesMap: Record<string, any[]> = {}

  csvData.forEach((row) => {
    const category = row.Category
    if (!categoriesMap[category]) {
      categoriesMap[category] = []
    }

    // Parse tactical moves (bullet points)
    const tacticalMoves = row["Tactical Moves"]
      ? row["Tactical Moves"]
          .split("-")
          .filter((item: string) => item.trim())
          .map((item: string) => item.trim())
      : []

    const card = {
      id: `${category.toLowerCase().replace(/\s+/g, "-")}-${categoriesMap[category].length + 1}`,
      category: category,
      title: row["Card Title"],
      subtitle: row["Card Subtitle"],
      backgroundColor: row["Background Color"] || "#FFFFFF",
      bulletPoints: tacticalMoves,
      quote: row["Words of Wisdom"],
      quoteAuthor: row["Quote Attribution"],
    }

    categoriesMap[category].push(card)
  })

  return categoriesMap
}
