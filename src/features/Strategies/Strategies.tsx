"use client";

import CommonTable from "@/components/common/Table";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import useUserStore from "@/store/UserStore";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { useDeleteStrategy, useGetAllStrategies } from "@/hooks/useStrategy";
import { useToast } from "@/components/common/ToastProvider";
import Spinner from "@/components/common/Spinner";

type Strategies = {
  id: number;
  name: string;
  strategyType: string;
  instrumentType: string;
  description: string;
  timeFrame: string[];
  entryConditions: string[];
  indicatorsUsed: string[];
};

export default function Strategies() {
  const router = useRouter();
  const { UserID, selectedStrategyID, setSelectedStrategyID } = useUserStore();
  const { showToast } = useToast();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { mutate: deleteStrategyMutate, isPending: isDeleting } = useDeleteStrategy();
  const { data, isPending: isLoadingStrategies, refetch } = useGetAllStrategies({ userId: UserID });
  const strategies = (data?.strategies ?? []) as Strategies[];
  const loading = isLoadingStrategies || isDeleting;

  useEffect(() => {
    if (!isLoadingStrategies && data?.success === false && data?.message) {
      showToast("warning", data.message);
    }
  }, [data, isLoadingStrategies, showToast]);

  const strategyColumns: ColumnDef<Strategies>[] = [
    {
      accessorKey: "name",
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
      cell: ({ getValue }) => {
        const values = Array.isArray(getValue<string[]>()) ? getValue<string[]>() : [];
        return <span>{values.join(", ")}</span>;
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-4">
          {/* <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100" aria-label="View strategy">
            <MdOutlineRemoveRedEye
              color="#0D4EAF"
              size={18}
              onClick={() => {
                setSelectedStrategyID(row.original.id);
              }}
            />
          </button> */}
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100" aria-label="Edit strategy">
            <BiSolidEditAlt
              size={20}
              onClick={() => {
                setSelectedStrategyID(row.original.id);
                // router.push(`/strategies/id/${row.original.id}`);
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
    if (!selectedStrategyID) {
      setDeleteModalOpen(false);
      return;
    }

    deleteStrategyMutate(selectedStrategyID, {
      onSuccess: (response: any) => {
        showToast("success", response?.message || "Strategy deleted successfully");
        setDeleteModalOpen(false);
        setSelectedStrategyID(0);
        refetch();
      },
      onError: (error: any) => {
        const message = error?.message || "Unable to delete strategy";
        showToast("error", message);
      },
    });
  };

  return (
    <section className="space-y-5">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 shadow-sm shadow-black/5">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Strategies</h2>
          <p className="mt-1 text-sm text-slate-500">
            Review journal entries, sort performance, and select rows for bulk actions.
          </p>
        </div>

        <Button
          type="button"
          text="New Strategy"
          onClick={() => {
            setSelectedStrategyID(0);
            router.push("/strategies/id/0");
          }}
        />
      </div>

      {loading && <Spinner />}

      {isLoadingStrategies ? (
        <div className="rounded-3xl border border-slate-200 bg-white/80 px-6 py-10 text-center text-sm text-slate-500">
          Loading strategies...
        </div>
      ) : strategies.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/70 px-6 py-10 text-center text-sm text-slate-500">
          No strategies yet. Create your first trading setup to get started.
        </div>
      ) : (
        <CommonTable
          data={strategies}
          columns={strategyColumns}
          pageSize={5}
          enableSorting
          enablePagination
          enableRowSelection
        />
      )}

      {deleteModalOpen && (
        <ConfirmDeleteModal
          isOpen={deleteModalOpen}
          onClose={() => {
            setDeleteModalOpen(false);
            setSelectedStrategyID(0);
          }}
          onDelete={onDelete}
        />
      )}
    </section>
  );
}
