import { getAuthenticatedUser, UnauthorizedError } from "@/lib/auth";
import { deleteStrategy, getStrategyById } from "@/services/strategy.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = getAuthenticatedUser(req);
    const body = await req.json();
    const strategyId = Number(body.id);

    if (!Number.isInteger(strategyId) || strategyId <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid strategy id",
        },
        {
          status: 400,
        }
      );
    }

    await getStrategyById(strategyId, user.userId);
    await deleteStrategy(strategyId, user.userId);

    return NextResponse.json({
      success: true,
      message: "Strategy deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Something went wrong",
      },
      {
        status: error instanceof UnauthorizedError ? 401 : 500,
      }
    );
  }
}
