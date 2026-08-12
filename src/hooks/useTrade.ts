import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteTradeApi, getAllTradesApi, getTradeByIdApi, SaveTradeApi, updateTradeApi } from "@/features/Trades/trades.api";
import { GetTradeByIdPayload } from "@/types/trade.types";

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

export const useGetTradeById = (requestData: GetTradeByIdPayload) => {
  return useQuery({
    queryKey: ["trades", requestData.userId, requestData.tradeId],
    queryFn: () => getTradeByIdApi(requestData),
    enabled: Boolean(requestData?.userId) && (requestData?.tradeId ?? 0) > 0,
  });
};

export const useGetAllTrades = (requestData: { userId: number }) => {
  return useQuery({
    queryKey: ["trades", requestData.userId],
    queryFn: () => getAllTradesApi(requestData.userId),
  });
};

export const useDeleteTrade = () => {
  return useMutation({
    mutationFn: deleteTradeApi,
  });
};