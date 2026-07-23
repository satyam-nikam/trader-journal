"use client";

import CommonTable from "@/components/common/Table";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import useUserStore from "@/store/UserStore";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";

type Strategies = {
  id: number;
  strategyName: string;
  strategyType: string;
  instrumentType: string;
  description: string;
  timeFrame: string[];
  entryConditions: string;
  indicatiorsUsed: string[];
};

const StrategiesData = [
  {
    id: 1001,
    strategyName: "Strategy 1",
    strategyType: "Scalping",
    instrumentType: "Options",
    description: "desc",
    timeFrame: ["3m", "5m", "1h"],
    entryConditions: "entry conditions",
    indicatiorsUsed: ["RSI", "MACD"],
  },
  {
    id: 1002,
    strategyName: "Strategy 2",
    strategyType: "Scalping",
    instrumentType: "Options",
    description: "desc",
    timeFrame: ["3m", "5m", "1h"],
    entryConditions: "entry conditions",
    indicatiorsUsed: ["RSI", "MACD"],
  },
  {
    id: 1003,
    strategyName: "Strategy 3",
    strategyType: "Scalping",
    instrumentType: "Options",
    description: "desc",
    timeFrame: ["3m", "5m", "1h"],
    entryConditions: "entry conditions",
    indicatiorsUsed: ["RSI", "MACD"],
  },
  {
    id: 1004,
    strategyName: "Strategy 4",
    strategyType: "Scalping",
    instrumentType: "Options",
    description: "desc",
    timeFrame: ["3m", "5m", "1h"],
    entryConditions: "entry conditions",
    indicatiorsUsed: ["RSI", "MACD"],
  },
];

export default function Strategies() {
  const router = useRouter();
  const { setSelectedStrategyID } = useUserStore();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const strategyColumns: ColumnDef<Strategies>[] = [
    {
      accessorKey: "strategyName",
      header: "Name",
    },
    {
      accessorKey: "strategyType",
      header: "Strategy Type",
      cell: ({ getValue }) => (
        <span className="font-semibold text-[#2c2c2c]">
          {getValue<string>()}
        </span>
      ),
    },
    {
      accessorKey: "instrumentType",
      header: "Instrument Type",
    },
    {
      accessorKey: "timeFrame",
      header: "Time Frame",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-4">
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100" aria-label="View strategy">
            <MdOutlineRemoveRedEye
              color="#0D4EAF"
              size={18}
              onClick={() => {
                setSelectedStrategyID(row.original.id);
              }}
            />
          </button>
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100" aria-label="Edit strategy">
            <BiSolidEditAlt
              size={20}
              onClick={() => {
                setSelectedStrategyID(row.original.id);
              }}
            />
          </button>
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100" aria-label="Delete strategy">
            <FaTrash
              color="#dc3545"
              size={18}
              onClick={() => {
                setSelectedStrategyID(row.original.id);
                setDeleteModalOpen(true);
              }}
            />
          </button>
        </div>
      ),
    },
  ];

  const onDelete = () => {
    setDeleteModalOpen(false);
  };

  return (
    <section className="space-y-5">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 shadow-sm shadow-black/5">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Strategies</h2>
          <p className="mt-1 text-sm text-slate-500">
            Review journal entries, sort performance, and select rows for bulk
            actions.
          </p>
        </div>

        <Button
          type="button"
          text="New Strategy"
          onClick={() => {
            setSelectedStrategyID(0);
            router.push("/strategies/id");
          }}
        />
      </div>

      <CommonTable
        data={StrategiesData}
        columns={strategyColumns}
        pageSize={5}
        enableSorting
        enablePagination
        enableRowSelection
      />

      {deleteModalOpen && (
        <ConfirmDeleteModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onDelete={onDelete}
        />
      )}
    </section>
  );
}
