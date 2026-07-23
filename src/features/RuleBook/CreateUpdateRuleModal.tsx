import Button from "@/components/common/Button";
import Field from "@/components/common/Field";
import Modal from "@/components/common/Modal";
import Select from "@/components/common/Select";
import { Controller, useForm } from "react-hook-form";
import { FaBookOpen } from "react-icons/fa";

interface RuleFormValues {
  ruleNumber: string;
  rule: string;
  category: string;
  status: string;
  isRequired: boolean;
}

const categoryOptions = [
  { value: "risk_management", label: "Risk Management" },
  { value: "trade_setup", label: "Trade Setup" },
  { value: "execution", label: "Execution" },
  { value: "review", label: "Review" },
  { value: "general", label: "General" },
];

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "priority", label: "Priority" },
  { value: "review", label: "Review" },
  { value: "draft", label: "Draft" },
];

export default function CreateUpdateRuleModal({
  onClose,
  rule,
  isOpen,
}: {
  onClose: () => void;
  rule?: Record<string, unknown>;
  isOpen: boolean;
}) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RuleFormValues>({
    defaultValues: {
      ruleNumber: (rule?.ruleNumber as string) || "",
      rule: (rule?.rule as string) || "",
      category: (rule?.category as string) || "",
      status: (rule?.status as string) || "",
      isRequired: Boolean(rule?.isRequired),
    },
  });

  const header = rule?.id ? "Edit Rule" : "New Rule";

  function onSubmit(data: RuleFormValues) {
    console.log(data);
    onClose();
  }

  const footer = (
    <div className="flex flex-wrap justify-center gap-2">
      <Button type="button" btnType="danger" text="Cancel" onClick={onClose} />
      <Button
        type="button"
        btnType="secondary"
        text="Clear All"
        onClick={() =>
          reset({
            ruleNumber: "",
            rule: "",
            category: "",
            status: "",
            isRequired: false,
          })
        }
      />
      <Button type="submit" text="Save Rule" disabled={isSubmitting} />
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header={
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-blue-200">
            <FaBookOpen size={16} />
          </div>
          <span>{header}</span>
        </div>
      }
      footer={footer}
      className="max-w-2xl overflow-hidden rounded-2xl"
    >
      <form className="flex flex-col gap-4 p-1" onSubmit={handleSubmit(onSubmit)}>
        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
          <div className="mb-3 text-sm font-semibold text-slate-700">Rule details</div>

          <div className="grid gap-4 md:grid-cols-2">
            <Controller
              name="ruleNumber"
              control={control}
              rules={{ required: "Rule number is required" }}
              render={({ field }) => (
                <Field label="Rule number" htmlFor="ruleNumber" error={errors.ruleNumber?.message}>
                  <input
                    {...field}
                    id="ruleNumber"
                    type="text"
                    placeholder="RULE-01"
                    className={`form-input ${errors.ruleNumber ? "form-input-error" : ""}`}
                  />
                </Field>
              )}
            />

            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <Field label="Category" htmlFor="category" error={errors.category?.message}>
                  <Select
                    id="category"
                    options={categoryOptions}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select category"
                  />
                </Field>
              )}
            />
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Controller
              name="status"
              control={control}
              rules={{ required: "Status is required" }}
              render={({ field }) => (
                <Field label="Status" htmlFor="status" error={errors.status?.message}>
                  <Select
                    id="status"
                    options={statusOptions}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select status"
                  />
                </Field>
              )}
            />
          </div>
        </div>

        <Controller
          name="rule"
          control={control}
          rules={{ required: "Rule text is required" }}
          render={({ field }) => (
            <Field label="Rule description" htmlFor="rule" error={errors.rule?.message}>
              <textarea
                {...field}
                id="rule"
                rows={5}
                maxLength={300}
                placeholder="Describe the trading rule clearly and concisely..."
                className={`form-input min-h-32 resize-y leading-relaxed ${errors.rule ? "form-input-error" : ""}`}
              />
            </Field>
          )}
        />
      </form>
    </Modal>
  );
}
