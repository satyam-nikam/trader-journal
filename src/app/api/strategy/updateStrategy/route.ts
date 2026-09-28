import { updateStrategy } from "@/services/strategy.service";
import { getAuthenticatedUser, UnauthorizedError } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = getAuthenticatedUser(req);
    const body = await req.json();

    const newStrategy =
      await updateStrategy(
        body.id,
        body.name,
        body.strategyType,
        body.instrumentType,
        body.description,
        body.timeFrame,
        body.entryConditions,
        body.indicatorsUsed,
        user.userId,
      );

    const response =
      NextResponse.json({
        success: true,
        message: "Strategy updated successfully",
        strategy: newStrategy,
      });

    return response;
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