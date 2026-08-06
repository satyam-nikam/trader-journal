import { getAuthenticatedUser } from "@/lib/auth";
import { getTradeById } from "@/services/trades.service";

export async function POST(req: Request) {
  try {
    const request = req as Request & {
      cookies?: { get: (name: string) => { value: string } | undefined };
    };
    getAuthenticatedUser(request as never);
    const body = await req.json();

    const trade = await getTradeById(body.id);

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
      { status: 500 },
    );
  }
}
