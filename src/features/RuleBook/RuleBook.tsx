"use client";

import { useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { FaBookOpen, FaTrash } from "react-icons/fa";
import Button from "@/components/common/Button";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import CreateUpdateRuleModal from "./CreateUpdateRuleModal";

const Rules = [
  {
    id: 101,
    ruleNumber: "RULE-01",
    rule: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    category: "Risk Management",
    status: "Active",
  },
  {
    id: 102,
    ruleNumber: "RULE-02",
    rule: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    category: "Trade Setup",
    status: "Priority",
  },
  {
    id: 103,
    ruleNumber: "RULE-03",
    rule: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    category: "Execution",
    status: "Review",
  },
];

export default function RuleBook() {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<Record<string, unknown>>({});

  const onDelete = () => {
    console.log(selectedRule);
  };

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 shadow-sm shadow-black/5">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Rulebook</h2>
          <p className="mt-1 text-sm text-slate-500">
            Keep your trading principles structured, clear, and easy to revisit.
          </p>
        </div>

        <Button
          type="button"
          text="New Rule"
          onClick={() => {
            setModalOpen(true);
            setSelectedRule({});
          }}
        />
      </div>

      {Rules.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/70 px-6 py-10 text-center text-sm text-slate-500">
          No rules yet. Create your first trading principle to get started.
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {Rules.map((rule) => (
          <div
            key={rule.id}
            className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-black/5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <FaBookOpen size={16} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {rule.ruleNumber}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {rule.rule}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(true);
                    setSelectedRule(rule);
                  }}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                  aria-label="Edit rule"
                >
                  <BiSolidEditAlt size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDeleteModalOpen(true);
                    setSelectedRule(rule);
                  }}
                  className="rounded-xl border border-red-100 bg-red-50 p-2 text-red-500 transition-colors hover:border-red-200 hover:bg-red-100"
                  aria-label="Delete rule"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-sm text-slate-500">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                  {rule.category}
                </span>
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                  {rule.status}
                </span>
              </div>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                Trading principle
              </span>
            </div>
          </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <CreateUpdateRuleModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          rule={selectedRule}
        />
      )}

      {deleteModalOpen && (
        <ConfirmDeleteModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onDelete={onDelete}
        />
      )}
    </>
  );
}
