import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteStrategyApi,
  getAllStrategiesApi,
  getStrategyByIdApi,
  saveStrategyApi,
  updateStrategyApi,
} from "@/features/Strategies/strategy.api";
import { GetStrategyByIdPayload } from "@/types/strategy.types";

export const useSaveStrategy = () => {
  return useMutation({
    mutationFn: saveStrategyApi,
  });
};

export const useUpdateStrategy = () => {
  return useMutation({
    mutationFn: updateStrategyApi,
  });
};

export const useGetStrategyById = (requestData: GetStrategyByIdPayload) => {
  return useQuery({
    queryKey: ["strategies", requestData.userId, requestData.strategyId],
    queryFn: () => getStrategyByIdApi(requestData),
    enabled: !!requestData,
  });
};

export const useGetAllStrategies = (requestData: { userId: number }) => {
  return useQuery({
    queryKey: ["strategies", requestData.userId],
    queryFn: () => getAllStrategiesApi(requestData.userId),
    enabled: !!requestData,
  });
};

export const useDeleteStrategy = () => {
  return useMutation({
    mutationFn: deleteStrategyApi,
  });
};