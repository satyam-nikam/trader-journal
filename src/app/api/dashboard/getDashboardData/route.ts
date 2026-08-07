import { getAuthenticatedUser } from "@/lib/auth";
import {
  getDashboardDataByDateRange,
  getDashboardDataByTrades,
} from "@/services/dashboard.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(res: NextRequest) {
  try {
    const user = getAuthenticatedUser(res);
    const body = await res.json();
    const { startDate, endDate, userId, tradeCount } = body;
    const dataByDate = await getDashboardDataByDateRange(
      userId,
      startDate,
      endDate,
    );
    
    const dataByTrades = await getDashboardDataByTrades(userId, tradeCount);
    return NextResponse.json({
      success: true,
      dashboardData: { dataByDate, dataByTrades },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}
