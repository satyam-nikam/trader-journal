import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteTradeApi, getAllTradesApi, getTradeByIdApi, SaveTradeApi, updateTradeApi } from "@/features/Trades/trades.api";

export const useSaveTrade = () => {
  return useMutation({
    mutationFn: SaveTradeApi,
  });
};

export const useUpdateTrade = () => {
  return useMutation({
    mutationFn: updateTradeApi,
  });
};

export const useGetTradeById = () => {
  return useMutation({
    mutationFn: getTradeByIdApi,
  });
};

export const useGetAllTrades = () => {
  return useQuery({
    queryKey: ["trades"],
    queryFn: getAllTradesApi,
  });
};

export const useDeleteTrade = () => {
  return useMutation({
    mutationFn: deleteTradeApi,
  });
};