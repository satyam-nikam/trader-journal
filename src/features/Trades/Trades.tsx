"use client";

import CommonTable from "@/components/common/Table";
import { ColumnDef } from "@tanstack/react-table";

type Trade = {
  id: string;
  date: string;
  symbol: string;
  setup: string;
  side: "Long" | "Short";
  entry: number;
  exit: number;
  quantity: number;
  pnl: number;
  rMultiple: number;
  status: "Win" | "Loss" | "Breakeven";
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

const trades: Trade[] = [
  {
    id: "TRD-1001",
    date: "2026-06-12",
    symbol: "AAPL",
    setup: "Opening range breakout",
    side: "Long",
    entry: 203.4,
    exit: 208.15,
    quantity: 50,
    pnl: 237.5,
    rMultiple: 1.8,
    status: "Win",
  },
  {
    id: "TRD-1002",
    date: "2026-06-11",
    symbol: "TSLA",
    setup: "VWAP rejection",
    side: "Short",
    entry: 189.2,
    exit: 192.1,
    quantity: 30,
    pnl: -87,
    rMultiple: -0.9,
    status: "Loss",
  },
  {
    id: "TRD-1003",
    date: "2026-06-10",
    symbol: "NVDA",
    setup: "Pullback continuation",
    side: "Long",
    entry: 145.8,
    exit: 151.4,
    quantity: 40,
    pnl: 224,
    rMultiple: 2.1,
    status: "Win",
  },
  {
    id: "TRD-1004",
    date: "2026-06-09",
    symbol: "MSFT",
    setup: "Support bounce",
    side: "Long",
    entry: 472.25,
    exit: 472.8,
    quantity: 20,
    pnl: 11,
    rMultiple: 0.1,
    status: "Breakeven",
  },
  {
    id: "TRD-1005",
    date: "2026-06-08",
    symbol: "AMD",
    setup: "Gap fill",
    side: "Short",
    entry: 128.75,
    exit: 126.3,
    quantity: 70,
    pnl: 171.5,
    rMultiple: 1.3,
    status: "Win",
  },
  {
    id: "TRD-1006",
    date: "2026-06-05",
    symbol: "META",
    setup: "Trend day continuation",
    side: "Long",
    entry: 637.1,
    exit: 632.6,
    quantity: 15,
    pnl: -67.5,
    rMultiple: -0.7,
    status: "Loss",
  },
  {
    id: "TRD-1007",
    date: "2026-06-04",
    symbol: "AMZN",
    setup: "Flag breakout",
    side: "Long",
    entry: 184.5,
    exit: 187.9,
    quantity: 45,
    pnl: 153,
    rMultiple: 1.5,
    status: "Win",
  },
];

const tradeColumns: ColumnDef<Trade>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }) =>
      new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(getValue<string>())),
  },
  {
    accessorKey: "symbol",
    header: "Symbol",
    cell: ({ getValue }) => (
      <span className="font-semibold text-[#2c2c2c]">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "setup",
    header: "Setup",
  },
  {
    accessorKey: "side",
    header: "Side",
    cell: ({ getValue }) => {
      const side = getValue<Trade["side"]>();

      return (
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            side === "Long"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-rose-50 text-rose-700"
          }`}
        >
          {side}
        </span>
      );
    },
  },
  {
    accessorKey: "entry",
    header: "Entry",
    cell: ({ getValue }) => currencyFormatter.format(getValue<number>()),
  },
  {
    accessorKey: "exit",
    header: "Exit",
    cell: ({ getValue }) => currencyFormatter.format(getValue<number>()),
  },
  {
    accessorKey: "quantity",
    header: "Qty",
  },
  {
    accessorKey: "pnl",
    header: "P&L",
    cell: ({ getValue }) => {
      const pnl = getValue<number>();

      return (
        <span
          className={`font-semibold ${
            pnl >= 0 ? "text-emerald-700" : "text-rose-700"
          }`}
        >
          {currencyFormatter.format(pnl)}
        </span>
      );
    },
  },
  {
    accessorKey: "rMultiple",
    header: "R",
    cell: ({ getValue }) => `${numberFormatter.format(getValue<number>())}R`,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<Trade["status"]>();
      const styles = {
        Win: "bg-emerald-100 text-emerald-800",
        Loss: "bg-rose-100 text-rose-800",
        Breakeven: "bg-gray-100 text-gray-700",
      };

      return (
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
        >
          {status}
        </span>
      );
    },
  },
];

export default function Trades() {
  return (
    <section className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-[#2c2c2c]">Trades</h1>
        <p className="mt-1 text-sm text-gray-500">
          Review journal entries, sort performance, and select rows for bulk
          actions.
        </p>
      </div>

      <CommonTable
        data={trades}
        columns={tradeColumns}
        pageSize={5}
        enableSorting
        enablePagination
        enableRowSelection
      />
    </section>
  );
}
