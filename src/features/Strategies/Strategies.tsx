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
          <button>
            <MdOutlineRemoveRedEye
              color="#0D4EAF"
              size={18}
              onClick={() => {
                setSelectedStrategyID(row.original.id);
              }}
              className="cursor-pointer"
            />
          </button>
          <button>
            <BiSolidEditAlt
              size={20}
              onClick={() => {
                setSelectedStrategyID(row.original.id);
              }}
              className="cursor-pointer"
            />
          </button>
          <button>
            <FaTrash
              color="#dc3545"
              size={18}
              onClick={() => {
                setSelectedStrategyID(row.original.id);
                setDeleteModalOpen(true);
              }}
              className="cursor-pointer"
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
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="page-title">Strategies</h1>
          <p className="mt-1 text-sm text-gray-500">
            Review journal entries, sort performance, and select rows for bulk
            actions.
          </p>
        </div>

        <div className="flex justify-end items-end">
          <Button
            type="button"
            text="New Strategy"
            onClick={() => {
              setSelectedStrategyID(0);
              router.push("/strategies/id");
            }}
          />
        </div>
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
