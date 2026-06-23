"use client";

import { useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import CreateRuleModal from "./CreateRuleModal";

const Rules = [
  {
    id: 1,
    ruleNumber: "RULE-01",
    rule: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    id: 2,
    ruleNumber: "RULE-02",
    rule: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    id: 3,
    ruleNumber: "RULE-03",
    rule: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
];

export default function RuleBook() {

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRule, setSelectedRule] = useState({});
  return (
    <>
      <div className="flex justify-end items-center mb-5">
        <button className="cursor-pointer rounded-lg bg-[#2c2c2c] px-4 py-2 text-[#ffffff]" onClick={()=>setModalOpen(true)}>
          New Rule
        </button>
      </div>
      <div className="space-y-5">
        {Rules.map((rule) => (
          <div
            key={rule.id}
            className="flex justify-between items-center border border-amber-500 px-3 py-2 rounded-lg bg-amber-200"
          >
            <div className="flex gap-4">
              <h2 className="font-bold pr-10 border-r border-amber-500">
                {rule.ruleNumber}
              </h2>
              <p className="px-10">{rule.rule}</p>
            </div>

            <div className="flex gap-2 items-center px-4">
              <BiSolidEditAlt
  size={20}
  onClick={() => {
    setModalOpen(true);
    setSelectedRule(rule);
  }}
/>
              <FaTrash color="#dc3545" size={18} />
            </div>
          </div>
        ))}
      </div>

        {modalOpen && (
            <CreateRuleModal isOpen={modalOpen} onClose={()=>setModalOpen(false)} rule={selectedRule} />
        )}
    </>
  );
}
