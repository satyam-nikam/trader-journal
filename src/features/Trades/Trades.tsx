"use client";

import Button from "@/components/common/Button";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import Spinner from "@/components/common/Spinner";
import CommonTable from "@/components/common/Table";
import { useToast } from "@/components/common/ToastProvider";
import { useDeleteTrade, useGetAllTrades } from "@/hooks/useTrade";
import useUserStore from "@/store/UserStore";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";

type Trade = {
  id: number;
  entryDate: string;
  fromDate: string;
  toDate: string;
  tradeType: string;
  instrumentType: string;
  position: string;
  capitalUsed: number;
  entryPrice: number;
  exitPrice: number;
  qty: number;
  riskReward: number;
  totalPnl: number;
  tradeStatus: string;
  result: string;
  strategy: string;
  rulesFollowed: [number, number];
  notes: string;
  tradeImg: string;
  userId: number;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

export default function Trades() {
  const { UserID, selectedTradeID, setSelectedTradeID } = useUserStore();
  const router = useRouter();
  const { showToast } = useToast();
  const { mutate: deleteTradeMutate, isPending: isDeleting } = useDeleteTrade();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const {
    data: tradesData,
    isLoading,
    isError,
    refetch,
  } = useGetAllTrades({ userId: UserID });
  const loading = isLoading || isDeleting;

  const tradeColumns: ColumnDef<Trade>[] = [
    {
      accessorKey: "entryDate",
      header: "Entry Date",
      cell: ({ row }) =>
        <span className="font-semibold text-[#2c2c2c]">
          {row.original.entryDate}
        </span>
    },
    {
      accessorKey: "fromDate",
      header: "From",
      cell: ({ row }) =>
        <span className="font-semibold text-[#2c2c2c]">
          {row.original.fromDate}
        </span>
    },
    {
      accessorKey: "toDate",
      header: "To",
      cell: ({ row }) =>
        <span className="font-semibold text-[#2c2c2c]">
          {row.original.toDate}
        </span>
    },
    {
      accessorKey: "position",
      header: "Position",
      cell: ({ row }) => {
        const side = row.original.position;

        return (
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
              side == "long"
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
      accessorKey: "totalPnl",
      header: "Total P&L",
      cell: ({ row }) => {
        const pnl = row.original.totalPnl;

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
      accessorKey: "result",
      header: "Result",
      cell: ({ row }) => {
        const styles = {
          win: "bg-emerald-100 text-emerald-800",
          loss: "bg-rose-100 text-rose-800",
          breakeven: "bg-gray-100 text-gray-700",
        } as const;
        const result = row.original.result as keyof typeof styles;

        return (
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles[result]}`}
          >
            {result.toLocaleUpperCase()}
          </span>
        );
      },
    },
    {
      accessorKey: "tradeStatus",
      header: "Trade Status",
      cell: ({ row }) => {
        const status = row.original.tradeStatus;

        return (
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
              status == "open"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-rose-50 text-rose-700"
            }`}
          >
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-4">
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100"
            aria-label="Edit trade"
          >
            <BiSolidEditAlt
              size={20}
              onClick={() => {
                setSelectedTradeID(row.original.id);
              }}
            />
          </button>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100"
            aria-label="Delete trade"
          >
            <FaTrash
              color="#dc3545"
              size={18}
              onClick={() => {
                setSelectedTradeID(row.original.id);
                setDeleteModalOpen(true);
              }}
            />
          </button>
        </div>
      ),
    },
  ];

  const onDelete = () => {
    if (selectedTradeID === 0) {
      setDeleteModalOpen(false);
      return;
    }

    deleteTradeMutate(selectedTradeID, {
      onSuccess: (response: any) => {
        showToast("success", response?.message || "Trade deleted successfully");
        setDeleteModalOpen(false);
        setSelectedTradeID(0);
        refetch();
      },
      onError: (error: any) => {
        const message = error?.message || "Unable to delete trade";
        showToast("error", message);
      },
    });
  };

  return (
    <section className="space-y-5">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 shadow-sm shadow-black/5">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Trades</h2>
          <p className="mt-1 text-sm text-slate-500">
            Review journal entries, sort performance, and select rows for bulk
            actions.
          </p>
        </div>

        <Button
          type="button"
          text="New Trade"
          onClick={() => {
            setSelectedTradeID(0);
            router.push("/trades/id");
          }}
        />
      </div>

      {loading && <Spinner />}

      <CommonTable
        data={tradesData?.trades || []}
        columns={tradeColumns}
        pageSize={10}
        enableSorting
        enablePagination
        enableRowSelection
      />

      {deleteModalOpen && (
        <ConfirmDeleteModal
          isOpen={deleteModalOpen}
          onClose={() => {
            setDeleteModalOpen(false);
            setSelectedTradeID(0);
          }}
          onDelete={onDelete}
        />
      )}
    </section>
  );
}
