"use client"

import * as React from "react"
import { CaretSortIcon, ChevronDownIcon } from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Label } from "./ui/label"

// Define the StockData type
export type StockData = {
  symbol: string
  price: number
  volume: number
  orderBookDepth: number
  priceChange: number
}

// Define the columns
export const columns: ColumnDef<StockData>[] = [
  {
    accessorKey: "symbol",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Symbol
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue<string>("symbol")}</div>,
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const price = row.getValue<number>("price")
      const priceChange = row.original.priceChange
      const formattedPrice = price.toFixed(2)

      return (
        <div
          className={`text-right font-medium ${
            priceChange >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          ${formattedPrice}
        </div>
      )
    },
  },
  {
    accessorKey: "volume",
    header: () => <div className="text-right">Volume</div>,
    cell: ({ row }) => {
      const volume = row.getValue<number>("volume")
      return (
        <div className="text-right">{volume.toLocaleString("en-US")}</div>
      )
    },
  },
  {
    accessorKey: "orderBookDepth",
    header: () => <div className="text-right">Order Book Depth</div>,
    cell: ({ row }) => {
      const depth = row.getValue<number>("orderBookDepth")
      return (
        <div className="text-right">{depth.toLocaleString("en-US")}</div>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const stock = row.original
      return <BuyButton stock={stock} />
    },
  },
]

// Create the BuyButton component
type BuyButtonProps = {
  stock: StockData
}

const BuyButton: React.FC<BuyButtonProps> = ({ stock }) => {
  const [numStocks, setNumStocks] = React.useState<number>(0)
  const [numDays, setNumDays] = React.useState<number>(0)

  const handleConfirm = () => {
    // Handle the transaction confirmation logic
    console.log(
      `Buying ${numStocks} shares of ${stock.symbol} for ${numDays} days`
    )
    // Add your transaction logic here
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Buy</Button>
      </PopoverTrigger>
      <PopoverContent className="dark">
        <div className="flex flex-col space-y-2 p-2">
          <Label>Number of Stocks</Label>
          <Input
            placeholder="Number of Stocks"
            value={numStocks}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNumStocks(Number(e.target.value))
            }
          />
          <Label>Number of Days</Label>
          <Input
            placeholder="Number of Days"
            value={numDays}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNumDays(Number(e.target.value))
            }
          />
          <Button onClick={handleConfirm}>Confirm Transaction</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

type StockListProps = {
  data: StockData[]
}

export default function StockList({ data }: StockListProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: 6,
      },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  return (
    <div className="w-full dark">
      <div className="flex items-center py-4">
        {/* Update filter to search by symbol */}
        <Input
          placeholder="Filter symbols..."
          value={(table.getColumn("symbol")?.getFilterValue() as string) ?? ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            table.getColumn("symbol")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="dark">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value: boolean) =>
                      column.toggleVisibility(value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
