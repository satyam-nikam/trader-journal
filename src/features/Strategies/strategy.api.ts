import { StrategyPayload, StrategyUpdatePayload } from "@/types/strategy.types";

export const saveStrategyApi = async (data: StrategyPayload) => {
  const res = await fetch("/api/strategy/createStrategy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const updateStrategyApi = async (data: StrategyUpdatePayload) => {
  const res = await fetch("/api/strategy/updateStrategy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const getAllStrategiesApi = async () => {
  const res = await fetch("/api/strategy/getAllStrategies", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

export const deleteStrategyApi = async (id: number) => {
  const res = await fetch("/api/strategy/deleteStrategy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  return res.json();
};
