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

export const useGetAllRules = (requestData: { userId: number }) => {
  return useQuery({
    queryKey: ["rules", requestData.userId],
    queryFn: () => getAllRulesApi(requestData.userId),
    enabled: !!requestData,
  });
};

export const useDeleteRule = () => {
  return useMutation({
    mutationFn: deleteRuleApi,
  });
}