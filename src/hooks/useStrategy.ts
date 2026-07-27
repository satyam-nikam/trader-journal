import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteStrategyApi,
  getAllStrategiesApi,
  saveStrategyApi,
  updateStrategyApi,
} from "@/features/Strategies/strategy.api";

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

export const useGetAllStrategies = () => {
  return useQuery({
    queryKey: ["strategies"],
    queryFn: getAllStrategiesApi,
  });
};

export const useDeleteStrategy = () => {
  return useMutation({
    mutationFn: deleteStrategyApi,
  });
};