import { getAuthenticatedUser, UnauthorizedError } from "@/lib/auth";
import { getTradeById } from "@/services/trades.service";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = getAuthenticatedUser(req);
    const body = await req.json();

    const trade = await getTradeById(Number(body.tradeId), user.userId);

    if (!trade) {
      return new Response(
        JSON.stringify({ success: false, message: "Trade not found" }),
        { status: 404 },
      );
    }

    return new Response(JSON.stringify({ success: true, trade }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message:
          error instanceof Error ? error.message : "Something went wrong",
      }),
      { status: error instanceof UnauthorizedError ? 401 : 500 },
    );
  }
}
