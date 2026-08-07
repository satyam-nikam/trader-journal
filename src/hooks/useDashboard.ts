import { getDashboardDataApi } from "@/features/Dashboard/dashboard.api";
import { useQuery } from "@tanstack/react-query";

export const useGetDashboardData = (requestData: {
  userId: number;
  startDate: string;
  endDate: string;
  tradeCount: number;
}) => {
  return useQuery({
    queryKey: [
      "dashboard",
      requestData.userId,
      requestData.startDate,
      requestData.endDate,
      requestData.tradeCount,
    ],
    queryFn: () =>
      getDashboardDataApi(
        requestData.userId,
        requestData.startDate,
        requestData.endDate,
        requestData.tradeCount,
      ),
    enabled: !!requestData,
  });
};
