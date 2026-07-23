"use client";

import { Controller, useForm } from "react-hook-form";
import MultiSelect from "@/components/common/MultiSelect";
import Select from "@/components/common/Select";
import Field from "@/components/common/Field";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { FaChartLine, FaPlus, FaRocket } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

interface StrategyFormValues {
  name: string;
  strategyType: string;
  instrumentType: string;
  description: string;
  timeFrame: string[];
  entryConditions: string[];
  indicatorsUsed: string;
}

const strategyTypeOptions = [
  { value: "trend_following", label: "Trend following" },
  { value: "mean_reversion", label: "Mean reversion" },
  { value: "breakout", label: "Breakout" },
  { value: "scalping", label: "Scalping" },
];

const instrumentTypeOptions = [
  { value: "equity", label: "Equity" },
  { value: "futures", label: "Futures" },
  { value: "options", label: "Options" },
  { value: "forex", label: "Forex" },
  { value: "crypto", label: "Crypto" },
];

const timeFrameOptions = [
  { value: "1m", label: "1 minute" },
  { value: "5m", label: "5 minutes" },
  { value: "15m", label: "15 minutes" },
  { value: "1h", label: "1 hour" },
  { value: "4h", label: "4 hours" },
  { value: "1d", label: "Daily" },
  { value: "1w", label: "Weekly" },
];

export default function CreateUpdateStrategy() {
  const router = useRouter();
  const [conditionInput, setConditionInput] = useState("");

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<StrategyFormValues>({
    defaultValues: {
      name: "",
      strategyType: "",
      instrumentType: "",
      description: "",
      timeFrame: [],
      entryConditions: [],
      indicatorsUsed: "",
    },
  });

  const description = watch("description") ?? "";
  const indicatorsUsed = watch("indicatorsUsed") ?? "";
  const rawEntryConditions = watch("entryConditions");
  const entryConditions = Array.isArray(rawEntryConditions)
    ? rawEntryConditions
    : [];

  function handleAddCondition() {
    const trimmed = conditionInput.trim();
    if (!trimmed) return;
    setValue("entryConditions", [...entryConditions, trimmed]);
    setConditionInput("");
  }

  function onSubmit(data: StrategyFormValues) {
    console.log(data);
  }

  return (
    <div className="mx-auto max-w-4xl py-2">
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm shadow-black/5">
        {/* ── Header ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-linear-to-r from-slate-900 via-slate-800 to-slate-700 px-6 py-6 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-blue-200">
              <FaChartLine size={20} />
            </div>
            <div>
              <h2 className="text-[18px] font-semibold leading-tight">
                Define a new strategy
              </h2>
              <p className="mt-1 text-sm text-slate-300">
                Set up the details for your trading strategy.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm text-slate-100">
            <FaRocket size={14} />
            <span>Trade journal</span>
          </div>
        </div>

        <form
          className="flex flex-col gap-4 px-6 py-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-2 gap-3">
            {/* Strategy name */}
            <Controller
              name="name"
              control={control}
              rules={{ required: "Strategy name is required" }}
              render={({ field }) => (
                <Field
                  label="Strategy name"
                  htmlFor="name"
                  error={errors.name?.message}
                >
                  <input
                    {...field}
                    id="name"
                    type="text"
                    placeholder="e.g. Breakout momentum v2"
                    className={`form-input ${errors.name ? "form-input-error" : ""}`}
                  />
                </Field>
              )}
            />

            <Controller
              name="strategyType"
              control={control}
              render={({ field }) => (
                <Field label="Strategy type" htmlFor="strategyType">
                  <Select
                    id="strategyType"
                    label=""
                    options={strategyTypeOptions}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select type…"
                  />
                </Field>
              )}
            />
          </div>

          {/* Strategy type + Instrument type */}
          <div className="grid grid-cols-2 gap-3">
            <Controller
              name="instrumentType"
              control={control}
              render={({ field }) => (
                <Field label="Instrument type" htmlFor="instrumentType">
                  <Select
                    id="instrumentType"
                    label=""
                    options={instrumentTypeOptions}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select instrument…"
                  />
                </Field>
              )}
            />

            {/* Time frames */}
            <Controller
              name="timeFrame"
              control={control}
              render={({ field }) => (
                <div className="relative">
                  <MultiSelect
                    label="Time frames"
                    options={timeFrameOptions}
                    value={field.value ?? []}
                    onChange={field.onChange}
                    placeholder="Choose time frames"
                  />
                </div>
              )}
            />
          </div>

          {/* Indicators Used */}
          <Controller
            name="indicatorsUsed"
            control={control}
            rules={{ required: "Indicators Used is required" }}
            render={({ field }) => (
              <Field label="Indicatiors Used" htmlFor="indicatorsUsed">
                <textarea
                  {...field}
                  id="indicatorsUsed"
                  rows={3}
                  maxLength={300}
                  placeholder="e.g. Bollinger Bands, MACD"
                  className={`form-input resize-y leading-relaxed`}
                />
                <span className="text-right text-[11px] text-gray-300">
                  {indicatorsUsed.length}/300
                </span>
              </Field>
            )}
          />

          {/* Description */}
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Field label="Description" htmlFor="description">
                <textarea
                  {...field}
                  id="description"
                  rows={3}
                  maxLength={300}
                  placeholder="Briefly describe what this strategy does and when it performs best…"
                  className={`form-input resize-y leading-relaxed`}
                />
                <span className="text-right text-[11px] text-gray-300">
                  {description.length}/300
                </span>
              </Field>
            )}
          />

          {/* Entry conditions */}
          <Field label="Entry conditions" htmlFor="entryConditions">
            <div className="relative">
              <input
                id="entryConditions"
                type="text"
                value={conditionInput}
                onChange={(e) => setConditionInput(e.target.value)}
                placeholder="e.g. RSI crosses above 30 or price above 20-day EMA or volume > 1.5× average…"
                className={`form-input resize-y leading-relaxed`}
              />

              <div
                className="absolute cursor-pointer right-0 rounded-r-lg top-1/2 -translate-y-1/2 text-slate-800 h-10 w-10 bg-[#2c2c2c] p-3"
                onClick={handleAddCondition}
              >
                <FaPlus color="white" size={14} />
              </div>
            </div>

            {entryConditions.length > 0 && (
              <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5">
                {entryConditions.map((condition, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between gap-2 rounded-xl border border-slate-400 bg-green-200 px-3 py-1.5 text-sm text-[#2c2c2c]"
                  >
                    <span className="truncate">{condition}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setValue(
                          "entryConditions",
                          entryConditions.filter((_, idx) => idx !== i),
                        )
                      }
                      className="shrink-0 text-slate-800 transition-colors hover:text-red-400"
                    >
                      <IoMdClose size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </Field>

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
  );
}
