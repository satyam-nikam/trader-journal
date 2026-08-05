import { getAuthenticatedUser } from "@/lib/auth";
import { getAllTrades } from "@/services/trades.service";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        getAuthenticatedUser(req);
        const { trades, count } = await getAllTrades();

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
            {
                status: 500,
            }
        );
    }
}