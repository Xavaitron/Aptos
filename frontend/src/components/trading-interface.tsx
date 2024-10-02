import * as React from "react"
import { Button } from "@/components/ui/button"
import StockList from "./ui/stock-list"
import { StockData } from "./ui/stock-list"

export function TradingInterfaceComponent() {
  const data: StockData[] = [
    {
      symbol: "AAPL",
      price: 150.12,
      volume: 100000,
      orderBookDepth: 50,
      priceChange: +1.25,
    },
    {
      symbol: "GOOGL",
      price: 2750.55,
      volume: 50000,
      orderBookDepth: 30,
      priceChange: -15.35,
    },
    {
      symbol: "MSFT",
      price: 299.8,
      volume: 80000,
      orderBookDepth: 40,
      priceChange: +2.1,
    },
    {
      symbol: "AMZN",
      price: 3400.5,
      volume: 60000,
      orderBookDepth: 25,
      priceChange: -10.2,
    },
    {
      symbol: "TSLA",
      price: 720.22,
      volume: 120000,
      orderBookDepth: 60,
      priceChange: +5.5,
    },
    {
      symbol: "FB",
      price: 355.12,
      volume: 90000,
      orderBookDepth: 35,
      priceChange: -2.75,
    },
    {
      symbol: "NFLX",
      price: 540.65,
      volume: 45000,
      orderBookDepth: 20,
      priceChange: +3.65,
    },
    {
      symbol: "NVDA",
      price: 220.15,
      volume: 70000,
      orderBookDepth: 45,
      priceChange: -1.15,
    },
    {
      symbol: "INTC",
      price: 54.22,
      volume: 110000,
      orderBookDepth: 55,
      priceChange: +0.75,
    },
    {
      symbol: "AMD",
      price: 95.8,
      volume: 85000,
      orderBookDepth: 38,
      priceChange: -0.45,
    },
    {
      symbol: "IBM",
      price: 140.5,
      volume: 65000,
      orderBookDepth: 28,
      priceChange: +1.3,
    },
    {
      symbol: "ORCL",
      price: 88.33,
      volume: 40000,
      orderBookDepth: 18,
      priceChange: +0.85,
    },
  ]
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4">
      <header className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-full"></div>
          <span className="text-xl font-bold">APTOS</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" className="">Connect</Button>
          <Button variant="default" className="w-[150px]">Connect</Button>
        </div>
      </header>

      <main className="flex flex-col justify-between items-center lg:flex-row">
        <div className="w-full md:w-1/2 mx-2">
          <StockList data={data} />
        </div>
        <div className="w-full md:w-1/2 m-4 bg-blue-500">Hello</div>
      </main>
    </div>
  )
}