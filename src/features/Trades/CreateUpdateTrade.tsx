"use client";

import Button from "@/components/common/Button";
import Field from "@/components/common/Field";
import MultiSelect from "@/components/common/MultiSelect";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { FaChartLine } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

interface TradeFormValues {
  entryDate: string;
  fromDate: string;
  toDate: string;
  tradeType: string;
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
  rulesFollowed: string[];
  notes: string;
  tradeImg: string;
}

export default function CreateUpdateTrade () {
    const router = useRouter();

    const {
        control,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors, isSubmitting },
      } = useForm<TradeFormValues>({
        defaultValues: {
          entryDate: "",
          fromDate: "",
          toDate: "",
          tradeType: "",
          position: "",
          capitalUsed: 0,
          entryPrice: 0,
          exitPrice: 0,
          qty: 0,
          riskReward: 0,
          totalPnl: 0,
          tradeStatus: "",
          result: "",
          strategy: "",
          rulesFollowed: [],
          notes: "",
          tradeImg: "",
        },
      });

      function onSubmit(data: TradeFormValues) {
    console.log(data);
  }

    return (
        <div className="mx-auto max-w-200 py-6">
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm shadow-black/5">
        {/* ── Header ── */}
        <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-5 bg-gray-200">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] bg-blue-50 text-blue-500">
            <FaChartLine size={20} />
          </div>
          <div>
            <h2 className="text-[16px] font-semibold leading-tight text-gray-900">
              Add a New trade 
            </h2>
            <p className="mt-0.5 text-[13px] text-slate-500">
              Add details of your trade for future analysis
            </p>
          </div>
        </div>

        <form
          className="flex flex-col gap-4 px-6 py-5"
          onSubmit={handleSubmit(onSubmit)}
        >
            <Controller
              name="entryDate"
              control={control}
              rules={{ required: "Strategy name is required" }}
              render={({ field }) => (
                <Field
                  label="Date of entry"
                  htmlFor="entryDate"
                >
                  <input
                    {...field}
                    id="name"
                    type="text"
                    placeholder="e.g. Breakout momentum v2"
                    className="form-input"
                  />
                </Field>
              )}
            />

          <div className="mt-1 flex justify-center gap-2 border-t border-slate-200 pt-4">
            <Button
              type="button"
              btnType="danger"
              text="Cancel"
              onClick={router.back}
            />
            <Button
              type="button"
              btnType="secondary"
              text="Clear All"
              onClick={() => reset()}
            />
            <Button
              type="submit"
              text="Save strategy"
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
    )
}