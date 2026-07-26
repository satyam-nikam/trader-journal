import { getAllRulesApi, saveRuleApi, updateRuleApi, deleteRuleApi } from "@/features/RuleBook/rule.api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useSaveRule = () => {
  return useMutation({
    mutationFn: saveRuleApi,
  });
};

export const useUpdateRule = () => {
  return useMutation({
    mutationFn: updateRuleApi,
  });
}

export const useGetAllRules = () => {
  return useQuery({
    queryKey: ["rules"],
    queryFn: getAllRulesApi,
  });
};

export const useDeleteRule = () => {
  return useMutation({
    mutationFn: deleteRuleApi,
  });
}