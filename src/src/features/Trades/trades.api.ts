import { TradePayload, TradeUpdatePayload } from "@/types/trade.types";

export const SaveTradeApi = async (data: TradePayload) => {
  const res = await fetch("/api/trade/createTrade", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const getAllTradesApi = async () => {
  const res = await fetch("/api/trade/getAllTrades", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

export const updateTradeApi = async (data: TradeUpdatePayload) => {
  const res = await fetch("/api/trade/updateTrade", {
    method: "POST", // or GET depending on your needs
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const deleteTradeApi = async (id: number) => {
  const res = await fetch("/api/trade/deleteTrade", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  return res.json();
};

export const getTradeByIdApi = async (id: number) => {
  const res = await fetch(`/api/trade/getTradeById`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  return res.json();
};