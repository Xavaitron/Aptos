import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Import the StockData type
import { StockData } from "@/components/stock-list"

type OrderBookLevel = {
  bidQuantity: number | string
  bidPrice: number | string
  askPrice: number | string
  askQuantity: number | string
}

// Update the OrderBook component to accept a stock prop
type OrderBookProps = {
  stock: StockData
}

export function OrderBook({ stock }: OrderBookProps) {
  // Generate bids and asks based on the selected stock
  const bids = generateBids(stock)
  const asks = generateAsks(stock)

  const maxLevels = Math.max(bids.length, asks.length)
  const orderBookLevels: OrderBookLevel[] = []

  for (let i = 0; i < maxLevels; i++) {
    orderBookLevels.push({
      bidQuantity: bids[i]?.quantity ?? "",
      bidPrice: bids[i]?.price ?? "",
      askPrice: asks[i]?.price ?? "",
      askQuantity: asks[i]?.quantity ?? "",
    })
  }

  return (
    <Table>
      <TableCaption>Order Book for {stock.symbol}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Bid Quantity</TableHead>
          <TableHead>Bid Price</TableHead>
          <TableHead>Ask Price</TableHead>
          <TableHead>Ask Quantity</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orderBookLevels.map((level, index) => (
          <TableRow key={index}>
            <TableCell>{level.bidQuantity}</TableCell>
            <TableCell>{level.bidPrice}</TableCell>
            <TableCell>{level.askPrice}</TableCell>
            <TableCell>{level.askQuantity}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

// Mock functions to generate bids and asks based on the selected stock
function generateBids(stock: StockData) {
  // Replace this with actual data fetching logic
  const basePrice = stock.price
  return [
    { price: (basePrice - 0.05).toFixed(2), quantity: 10 },
    { price: (basePrice - 0.10).toFixed(2), quantity: 7 },
    { price: (basePrice - 0.15).toFixed(2), quantity: 12 },
    { price: (basePrice - 0.20).toFixed(2), quantity: 15 },
  ]
}

function generateAsks(stock: StockData) {
  // Replace this with actual data fetching logic
  const basePrice = stock.price
  return [
    { price: (basePrice + 0.05).toFixed(2), quantity: 8 },
    { price: (basePrice + 0.10).toFixed(2), quantity: 12 },
    { price: (basePrice + 0.15).toFixed(2), quantity: 9 },
    { price: (basePrice + 0.20).toFixed(2), quantity: 14 },
  ]
}
