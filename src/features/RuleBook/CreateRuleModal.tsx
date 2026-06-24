import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

export default function CreateRuleModal({
  onClose,
  rule,
  isOpen,
}: {
  onClose: () => void;
  rule?: any;
  isOpen: boolean;
}) {
  console.log(rule);

  const {
    control,
    setValue,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ruleNumber: rule?.ruleNumber || "",
      rule: rule?.rule || "",
    },
  });

  const header = rule?.id ? "Edit Rule" : "New Rule";

  const footer = (
    <div className="flex gap-2">
      <Button type="button" btnType="danger" text="Cancel" onClick={onClose} />
      <Button
        type="button"
        btnType="secondary"
        text="Clear All"
        onClick={() => reset(
            {
              ruleNumber: "",
              rule: "",
            }
        )}
      />
      <Button type="submit" text="Save" />
    </div>
  );
  return (
    <Modal isOpen={isOpen} onClose={onClose} header={header} footer={footer}>
      <form className="flex flex-col gap-2 p-1">
        <Controller
          name="ruleNumber"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <label className="form-label">Rule Number</label>
              <input
                {...field}
                type="text"
                // placeholder="RULE-01"
                className="w-full border border-[#b2b2b2] rounded-md p-2 text-sm"
              />
            </div>
          )}
        />

        <Controller
          name="rule"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <label className="form-label">Rule</label>
              <textarea
                {...field}
                // placeholder="Rule"
                className="w-full border border-[#b2b2b2] rounded-md p-2 text-sm"
              />
            </div>
          )}
        />
      </form>
    </Modal>
  );
}
