"use client"

import { useEffect, useState } from "react"
import { fetchCardData, convertToCardFormat } from "@/lib/csv-parser"

export default function LoadCSVData() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCSVData() {
      try {
        setIsLoading(true)
        const csvData = await fetchCardData()
        const formattedData = convertToCardFormat(csvData)

        // Log the data to console for verification
        console.log("CSV Data loaded successfully:", formattedData)

        // Here you would update your application state with the loaded data
        // For example, using a global state management solution or context

        setIsLoading(false)
      } catch (err) {
        console.error("Failed to load CSV data:", err)
        setError("Failed to load card data. Please try again later.")
        setIsLoading(false)
      }
    }

    loadCSVData()
  }, [])

  if (isLoading) {
    return <div className="text-center p-4">Loading card data from CSV...</div>
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>
  }

  return null // This component doesn't render anything visible once data is loaded
}
