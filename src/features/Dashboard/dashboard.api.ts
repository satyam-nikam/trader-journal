export const getDashboardDataApi = async (
  userId: number,
  startDate: string,
  endDate: string,
  tradeCount: number,
) => {
  const res = await fetch("/api/dashboard/getDashboardData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, startDate, endDate, tradeCount }),
  });
  return res.json();
};
