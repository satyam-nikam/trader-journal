import { getAuthenticatedUser, UnauthorizedError } from "@/lib/auth";
import { getAllTrades } from "@/services/trades.service";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const user = getAuthenticatedUser(req);
        const { trades, count } = await getAllTrades(user.userId);

        return new Response(
            JSON.stringify({
                success: true,
                trades,
                count,
            })
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: error instanceof Error ? error.message : "Something went wrong",
            }),
            { status: error instanceof UnauthorizedError ? 401 : 500 }
        );
    }
}