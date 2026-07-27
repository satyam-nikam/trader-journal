import { NextResponse } from "next/server";
import { deleteStrategy, getStrategyById } from "@/services/strategy.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const ruleId = Number(body.id);

    if (!Number.isInteger(ruleId) || ruleId <= 0) {
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

    const strategy = await getStrategyById(ruleId);

    if (!strategy) {
      return NextResponse.json(
        {
          success: false,
          message: "Strategy not found",
        },
        {
          status: 404,
        }
      );
    }

    await deleteStrategy(ruleId);

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
        status: 500,
      }
    );
  }
}
