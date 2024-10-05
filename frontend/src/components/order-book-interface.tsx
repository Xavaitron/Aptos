import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type OrderBookLevel = {
  bidQuantity: number | string
  bidPrice: number | string
  askPrice: number | string
  askQuantity: number | string
}

const bids = [
  { price: 99.95, quantity: 10 },
  { price: 99.9, quantity: 7 },
  { price: 99.85, quantity: 12 },
  { price: 99.8, quantity: 15 },
]

const asks = [
  { price: 100.05, quantity: 8 },
  { price: 100.1, quantity: 12 },
  { price: 100.15, quantity: 9 },
  { price: 100.2, quantity: 14 },
]

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

export function OrderBook() {
  return (
    <Table>
      <TableCaption>Order Book for Futures Contract XYZ</TableCaption>
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
