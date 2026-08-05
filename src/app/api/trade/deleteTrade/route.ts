import { deleteTrade } from "@/services/trades.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const tradeId = Number(body.id);

    if (!Number.isInteger(tradeId) || tradeId <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid trade id",
        },
        {
          status: 400,
        }
      );
    }

    const trade = await deleteTrade(tradeId);

    const response = NextResponse.json({
      success: true,
      message: "Trade deleted successfully",
      trade: trade,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}