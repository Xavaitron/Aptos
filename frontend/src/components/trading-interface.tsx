'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Slider } from "@/components/ui/slider"
import { ArrowUpDown, ChevronDown } from "lucide-react"

export function TradingInterfaceComponent() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-4">
      <header className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-full"></div>
          <span className="text-xl font-bold">APTURES</span>
        </div>
        <Button variant="default" className="bg-emerald-500 hover:bg-emerald-600">Connect</Button>
      </header>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 space-y-4">
          <div className="flex space-x-2">
            <Select defaultValue="AXT">
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="AXT" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AXT">AXT</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="12Dec">
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="12 Dec" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12Dec">12 Dec</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <span>Market Price</span>
              <span className="font-bold">2005</span>
              <ArrowUpDown size={16} />
            </div>
          </div>

          <div className="text-amber-500">Risk Status: Not Much Data To Predict</div>

          <Tabs defaultValue="buy">
            <TabsList className="w-full">
              <TabsTrigger value="buy" className="w-1/2">Buy</TabsTrigger>
              <TabsTrigger value="sell" className="w-1/2">Sell</TabsTrigger>
            </TabsList>
          </Tabs>

          <Tabs defaultValue="market">
            <TabsList>
              <TabsTrigger value="market">Market</TabsTrigger>
              <TabsTrigger value="limit">Limit</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-2">
            <label>Amount:</label>
            <Input type="number" placeholder="1" />
          </div>

          <div className="space-y-2">
            <label>Price:</label>
            <Input type="number" placeholder="2005" />
          </div>

          <div className="space-y-2">
            <label>Leverage Value: 5</label>
            <Slider defaultValue={[5]} max={10} step={1} />
          </div>

          <div>Total Amount: 100</div>
          <div>Liquidation Price: 82</div>

          <Button className="w-full bg-orange-500 hover:bg-orange-600">Create Order</Button>
        </div>

        <div className="col-span-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bid</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { bid: 2015, quantity: 56, total: 112840 },
                { bid: 2815, quantity: 14, total: 39410 },
                { bid: 2415, quantity: 43, total: 103845 },
                { bid: 245, quantity: 20, total: 4900 },
                { bid: 1985, quantity: 40, total: 79400 },
                { bid: 2000, quantity: 50, total: 100000 },
              ].map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="text-red-500">{row.bid}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{row.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ask</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { ask: 2215, quantity: 133, total: 294595 },
                { ask: 2115, quantity: 14, total: 29610 },
                { ask: 2425, quantity: 164, total: 397700 },
                { ask: 1945, quantity: 30, total: 58350 },
                { ask: 1995, quantity: 12, total: 23940 },
                { ask: 2000, quantity: 100, total: 200000 },
              ].map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="text-green-500">{row.ask}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{row.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4 h-64 bg-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-2">Chart placeholder</div>
          </div>

          <div className="mt-4 flex space-x-4">
            <Button variant="outline" className="w-1/2">Candle Stick Graphics</Button>
            <Button variant="outline" className="w-1/2">Line Graphics</Button>
          </div>
        </div>
      </div>
    </div>
  )
}