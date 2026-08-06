import { saveRulePayload, updateRulePayload } from "@/types/rules.types";

export const saveRuleApi = async (data: saveRulePayload) => {
  const res = await fetch("/api/rules/createRule", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const updateRuleApi = async (data: updateRulePayload) => {
  const res = await fetch("/api/rules/updateRule", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const getAllRulesApi = async (userId: number) => {
  const res = await fetch("/api/rules/getAllRules", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
  return res.json();
};

export const deleteRuleApi = async (id: number) => {
  const res = await fetch("/api/rules/deleteRule", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  return res.json();
};
