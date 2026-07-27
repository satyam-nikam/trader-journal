import { NextResponse } from "next/server";
import { saveStrategy } from "@/services/strategy.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newRule = await saveStrategy(
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
