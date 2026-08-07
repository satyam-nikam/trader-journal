"use client";

import Button from "@/components/common/Button";
import DatePicker from "@/components/common/DatePicker";
import Field from "@/components/common/Field";
import ImageUpload from "@/components/common/ImageUpload";
import MultiSelect from "@/components/common/MultiSelect";
import Select from "@/components/common/Select";
import Spinner from "@/components/common/Spinner";
import { useToast } from "@/components/common/ToastProvider";
import { useGetAllRules } from "@/hooks/useRules";
import { useGetAllStrategies } from "@/hooks/useStrategy";
import { useGetTradeById, useSaveTrade, useUpdateTrade } from "@/hooks/useTrade";
import useUserStore from "@/store/UserStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaChartLine, FaRocket, FaShieldAlt } from "react-icons/fa";

interface TradeFormValues {
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
  rulesFollowed: string[];
  notes: string;
  tradeImg: string;
}

interface RuleItem {
  id: number;
  ruleNumber: string;
  rule: string;
  category: string;
  status: string;
}

const tradeTypeOptions = [
  { value: "intraday", label: "Intraday" },
  { value: "Expiry", label: "Expiry" },
  { value: "swing", label: "Swing" },
  { value: "longterm", label: "Long Term" },
];

const positionOptions = [
  { value: "long", label: "Long" },
  { value: "short", label: "Short" },
];

const tradeStatusOptions = [
  { value: "open", label: "Open" },
  { value: "closed", label: "Closed" },
];

const resultOptions = [
  { value: "win", label: "Win" },
  { value: "loss", label: "Loss" },
  { value: "breakeven", label: "Breakeven" },
  { value: "pending", label: "Pending" },
];

const instrumentTypeOptions = [
  { value: "equity", label: "Equity" },
  { value: "futures", label: "Futures" },
  { value: "options", label: "Options" },
  { value: "forex", label: "Forex" },
  { value: "crypto", label: "Crypto" },
];

export default function CreateUpdateTrade() {
  const router = useRouter();
  const { showToast } = useToast();
  const { UserID, selectedTradeID } = useUserStore();
  const { data: Rules, isPending: isLoadingRules } = useGetAllRules({ userId: UserID, });
  const { data: Strategies, isPending: isLoadingStrategies } = useGetAllStrategies({ userId: UserID });
  const { mutate: saveTradeMutate, isPending: isSaving } = useSaveTrade();
    const { mutate: updateTradeMutate, isPending: isUpdating } = useUpdateTrade();
  const { data: tradeData, isPending: isLoadingTradeData } = useGetTradeById({ tradeId: selectedTradeID, userId: UserID });
  const loading = isLoadingRules || isLoadingStrategies || isLoadingTradeData;

  const ruleOptions =
    Rules?.rules?.map((rule: RuleItem) => ({
      value: rule.id,
      label: rule.rule,
    })) ?? [];

  const strategyOptions =
    Strategies?.strategies?.map((strategy: any) => ({
      value: strategy.id,
      label: strategy.name,
    })) ?? [];

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TradeFormValues>({
    defaultValues: {
      entryDate: "",
      fromDate: "",
      toDate: "",
      tradeType: "",
      instrumentType: "",
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

  useEffect(() => {
    if(selectedTradeID > 0 && tradeData) {
      reset({
        entryDate: tradeData.entryDate,
        fromDate: tradeData.fromDate,
        toDate: tradeData.toDate,
        tradeType: tradeData.tradeType,
        instrumentType: tradeData.instrumentType,
        position: tradeData.position,
        capitalUsed: tradeData.capitalUsed,
        entryPrice: tradeData.entryPrice,
        exitPrice: tradeData.exitPrice,
        qty: tradeData.qty,
        riskReward: tradeData.riskReward,
        totalPnl: tradeData.totalPnl,
        tradeStatus: tradeData.tradeStatus,
        result: tradeData.result,
        strategy: tradeData.strategy,
        rulesFollowed: tradeData.rulesFollowed,
        notes: tradeData.notes,
        tradeImg: tradeData.tradeImg
      })
    } else{
      reset({
        entryDate: "",
        fromDate: "",
        toDate: "",
        tradeType: "",
        instrumentType: "",
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
        tradeImg: ""
      })
    }
  }, [tradeData, reset, selectedTradeID])

  function onSubmit(data: TradeFormValues) {
    console.log(data);

    const payload = {
      entryDate: data.entryDate,
      fromDate: data.fromDate,
      toDate: data.toDate,
      tradeType: data.tradeType,
      instrumentType: data.instrumentType,
      position: data.position,
      capitalUsed: data.capitalUsed,
      entryPrice: data.entryPrice,
      exitPrice: data.exitPrice,
      qty: data.qty,
      riskReward: data.riskReward,
      totalPnl: data.totalPnl,
      tradeStatus: data.tradeStatus,
      result: data.result,
      strategy: data.strategy,
      rulesFollowed: data.rulesFollowed,
      notes: data.notes,
      tradeImg: data.tradeImg
    };

    if (selectedTradeID > 0) {
      updateTradeMutate(
        { id: selectedTradeID, ...payload },
        {
          onSuccess: (response: any) => {
            showToast("success", response?.message || "Trade updated successfully");
            // refetch();
            router.push("/trades");
          },
          onError: (error: any) => {
            const message = error?.message || "Unable to update trade";
            showToast("error", message);
          },
        },
      );
      return;
    }

    saveTradeMutate({ userId: UserID, ...payload }, {
      onSuccess: (response: any) => {
        showToast("success", response?.message || "Trade saved successfully");
        // refetch();
        router.push("/trades");
      },
      onError: (error: any) => {
        const message = error?.message || "Unable to save trade";
        showToast("error", message);
      },
    });
  }

  return (
    <div className="mx-auto max-w-6xl py-2">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_-24px_rgba(15,23,42,0.18)]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-linear-to-r from-slate-900 via-slate-800 to-slate-700 px-6 py-6 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-blue-200">
              <FaChartLine size={20} />
            </div>
            <div>
              <h2 className="text-[18px] font-semibold leading-tight">
                Capture a new trade
              </h2>
              <p className="mt-1 text-sm text-slate-300">
                Record the setup, execution, and outcome in one polished form.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm text-slate-100">
            <FaRocket size={14} />
            <span>Trade journal</span>
          </div>
        </div>

        <form
          className="flex flex-col gap-5 px-6 py-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {loading && <Spinner />}
          <div className="rounded-2xl border border-slate-300 bg-slate-50/70 p-4">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <FaShieldAlt className="text-blue-500" />
              <span>Trade details</span>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Controller
                name="entryDate"
                control={control}
                rules={{ required: "Entry date is required" }}
                render={({ field }) => (
                  <DatePicker
                    label="Date of entry"
                    htmlFor="entryDate"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.entryDate?.message}
                  />
                )}
              />

              <Controller
                name="fromDate"
                control={control}
                rules={{ required: "From date is required" }}
                render={({ field }) => (
                  <DatePicker
                    label="From"
                    htmlFor="fromDate"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.fromDate?.message}
                  />
                )}
              />

              <Controller
                name="toDate"
                control={control}
                rules={{ required: "To date is required" }}
                render={({ field }) => (
                  <DatePicker
                    label="To"
                    htmlFor="toDate"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.toDate?.message}
                  />
                )}
              />

              <Controller
                name="tradeType"
                control={control}
                rules={{ required: "Trade type is required" }}
                render={({ field }) => (
                  <Field
                    label="Trade type"
                    htmlFor="tradeType"
                    error={errors.tradeType?.message}
                  >
                    <Select
                      id="tradeType"
                      options={tradeTypeOptions}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select trade type"
                    />
                  </Field>
                )}
              />

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

              <Controller
                name="position"
                control={control}
                rules={{ required: "Position is required" }}
                render={({ field }) => (
                  <Field
                    label="Position"
                    htmlFor="position"
                    error={errors.position?.message}
                  >
                    <Select
                      id="position"
                      options={positionOptions}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select position"
                    />
                  </Field>
                )}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-300 bg-white p-4">
            <div className="mb-4 text-sm font-semibold text-slate-700">
              Execution & risk
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <Controller
                name="capitalUsed"
                control={control}
                rules={{ required: "Capital used is required" }}
                render={({ field }) => (
                  <Field
                    label="Capital used"
                    htmlFor="capitalUsed"
                    error={errors.capitalUsed?.message}
                  >
                    <input
                      {...field}
                      id="capitalUsed"
                      type="number"
                      min="0"
                      step="0.01"
                      className="form-input"
                      value={field.value ?? 0}
                      onChange={(event) =>
                        field.onChange(Number(event.target.value))
                      }
                    />
                  </Field>
                )}
              />

              <Controller
                name="entryPrice"
                control={control}
                rules={{ required: "Entry price is required" }}
                render={({ field }) => (
                  <Field
                    label="Entry price"
                    htmlFor="entryPrice"
                    error={errors.entryPrice?.message}
                  >
                    <input
                      {...field}
                      id="entryPrice"
                      type="number"
                      min="0"
                      step="0.01"
                      className="form-input"
                      value={field.value ?? 0}
                      onChange={(event) =>
                        field.onChange(Number(event.target.value))
                      }
                    />
                  </Field>
                )}
              />

              <Controller
                name="exitPrice"
                control={control}
                rules={{ required: "Exit price is required" }}
                render={({ field }) => (
                  <Field
                    label="Exit price"
                    htmlFor="exitPrice"
                    error={errors.exitPrice?.message}
                  >
                    <input
                      {...field}
                      id="exitPrice"
                      type="number"
                      min="0"
                      step="0.01"
                      className="form-input"
                      value={field.value ?? 0}
                      onChange={(event) =>
                        field.onChange(Number(event.target.value))
                      }
                    />
                  </Field>
                )}
              />

              <Controller
                name="qty"
                control={control}
                rules={{ required: "Quantity is required" }}
                render={({ field }) => (
                  <Field
                    label="Quantity"
                    htmlFor="qty"
                    error={errors.qty?.message}
                  >
                    <input
                      {...field}
                      id="qty"
                      type="number"
                      min="0"
                      step="1"
                      className="form-input"
                      value={field.value ?? 0}
                      onChange={(event) =>
                        field.onChange(Number(event.target.value))
                      }
                    />
                  </Field>
                )}
              />
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <Controller
                name="riskReward"
                control={control}
                render={({ field }) => (
                  <Field label="Risk/reward" htmlFor="riskReward">
                    <input
                      {...field}
                      id="riskReward"
                      type="number"
                      min="0"
                      step="0.01"
                      className="form-input"
                      value={field.value ?? 0}
                      onChange={(event) =>
                        field.onChange(Number(event.target.value))
                      }
                    />
                  </Field>
                )}
              />

              <Controller
                name="totalPnl"
                control={control}
                render={({ field }) => (
                  <Field label="Total P&L" htmlFor="totalPnl">
                    <input
                      {...field}
                      id="totalPnl"
                      type="number"
                      min="0"
                      step="0.01"
                      className="form-input"
                      value={field.value ?? 0}
                      onChange={(event) =>
                        field.onChange(Number(event.target.value))
                      }
                    />
                  </Field>
                )}
              />

              <Controller
                name="result"
                control={control}
                rules={{ required: "Result is required" }}
                render={({ field }) => (
                  <Field
                    label="Result"
                    htmlFor="result"
                    error={errors.result?.message}
                  >
                    <Select
                      id="result"
                      options={resultOptions}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select result"
                    />
                  </Field>
                )}
              />

              <Controller
                name="tradeStatus"
                control={control}
                rules={{ required: "Trade status is required" }}
                render={({ field }) => (
                  <Field
                    label="Trade status"
                    htmlFor="tradeStatus"
                    error={errors.tradeStatus?.message}
                  >
                    <Select
                      id="tradeStatus"
                      options={tradeStatusOptions}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select status"
                    />
                  </Field>
                )}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-300 bg-slate-50/70 p-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <Controller
                name="strategy"
                control={control}
                rules={{ required: "Strategy is required" }}
                render={({ field }) => (
                  <Field
                    label="Strategy Used"
                    htmlFor="strategy"
                    error={errors.strategy?.message}
                  >
                    <Select
                      id="strategy"
                      options={strategyOptions}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select strategy"
                    />
                  </Field>
                )}
              />

              <Controller
                name="rulesFollowed"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <MultiSelect
                      label="Rules followed"
                      options={ruleOptions}
                      value={field.value ?? []}
                      onChange={field.onChange}
                      placeholder="Select rules"
                    />
                  </div>
                )}
              />
            </div>

            <div className="grid gap-4 lg:grid-cols-2 mt-4">
              <Controller
                name="tradeImg"
                control={control}
                render={({ field }) => (
                  <ImageUpload
                    label="Trade image"
                    name="tradeImg"
                    value={field.value ?? null}
                    onChange={(file) => field.onChange(file)}
                    error={errors.tradeImg?.message}
                  />
                )}
              />

              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <Field label="Notes" htmlFor="notes">
                    <textarea
                      {...field}
                      id="notes"
                      rows={4}
                      maxLength={500}
                      placeholder="Add setup notes, execution details, or lessons learned."
                      className="form-input min-h-28 resize-y leading-relaxed"
                    />
                  </Field>
                )}
              />
            </div>
            <div className="mt-2 flex flex-wrap justify-center gap-2 border-t border-slate-300 pt-4">
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
              <Button type="submit" text="Save trade" disabled={isSubmitting} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
