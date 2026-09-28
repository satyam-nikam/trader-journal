import { getStrategyById } from "@/services/strategy.service";
import { getAuthenticatedUser, UnauthorizedError } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = getAuthenticatedUser(req);
    const body = await req.json();
    const strategy = await getStrategyById(Number(body.strategyId), user.userId);

    return NextResponse.json({
      success: true,
      strategy,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      },
      {
        status: error instanceof UnauthorizedError ? 401 : 500,
      }
    );
  }
}