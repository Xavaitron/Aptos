"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Import the StockData type
import { StockData } from "@/components/stock-list"

export const description = "An interactive line chart"

// Update the Chart component to accept a stock prop
type ChartProps = {
  stock: StockData
}

export function Chart({ stock }: ChartProps) {
  // Generate chart data based on the selected stock
  const chartData = generateChartData(stock)

  const chartConfig = {
    views: {
      label: "Price",
    },
    stockPrice: {
      label: stock.symbol,
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

  return (
    <Card className="dark">
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Line
              dataKey="price"
              type="monotone"
              stroke={`var(--color-stockPrice)`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

// Mock function to generate chart data based on the selected stock
function generateChartData(stock: StockData) {
  // Replace this with actual data fetching logic
  // For demonstration, we'll create random data points

  const data = []
  const currentDate = new Date()
  for (let i = 0; i < 30; i++) {
    const date = new Date(currentDate)
    date.setDate(currentDate.getDate() - i)
    data.push({
      date: date.toISOString().split('T')[0],
      price: (stock.price + Math.random() * 5000 - 5).toFixed(2),
    })
  }
  // Reverse the data array to have the oldest date first
  return data.reverse()
}
