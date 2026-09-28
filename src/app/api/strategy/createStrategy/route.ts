import { NextRequest, NextResponse } from "next/server";
import { saveStrategy } from "@/services/strategy.service";
import { getAuthenticatedUser, UnauthorizedError } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const user = getAuthenticatedUser(req);
    const body = await req.json();

    const newRule = await saveStrategy(
      user.userId,
      body.name,
      body.strategyType,
      body.instrumentType,
      body.description,
      body.timeFrame,
      body.entryConditions,
      body.indicatorsUsed
    );

    return NextResponse.json({
      success: true,
      message: "Strategy saved successfully",
      rule: newRule,
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
