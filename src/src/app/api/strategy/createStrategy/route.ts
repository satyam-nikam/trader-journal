import { NextResponse } from "next/server";
import { saveStrategy } from "@/services/strategy.service";
import { getAuthenticatedUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const request = req as Request & { cookies?: { get: (name: string) => { value: string } | undefined } };
    getAuthenticatedUser(request as never);
    const body = await req.json();

    const newRule = await saveStrategy(
      body.userId,
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
        status: 401,
      }
    );
  }
}
