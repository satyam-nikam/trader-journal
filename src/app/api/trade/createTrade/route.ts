import { getAuthenticatedUser } from "@/lib/auth";
import { UnauthorizedError } from "@/lib/auth";
import { saveTrade } from "@/services/trades.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
            const user = getAuthenticatedUser(req);
            const body = await req.json();

            const newTrade = await saveTrade(
                body.entryDate,
                body.fromDate,
                body.toDate,
                body.tradeType,
                body.instrumentType,
                body.position,
                body.capitalUsed,
                body.entryPrice,
                body.exitPrice,
                body.qty,
                body.riskReward,
                body.totalPnl,
                body.tradeStatus,
                body.result,
                body.strategy,
                body.rulesFollowed,
                body.notes,
                body.tradeImg,
                user.userId,
            );

            return NextResponse.json({
                success: true,
                message: "Trade saved successfully",
                trade: newTrade,
            })
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error instanceof Error ? error.message : "Something went wrong",
            },
            { status: error instanceof UnauthorizedError ? 401 : 500 },
        )
    }
}