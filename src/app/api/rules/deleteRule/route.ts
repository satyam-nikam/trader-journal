import { NextResponse } from "next/server";
import { deleteRule } from "@/services/rules.service";
import { getAuthenticatedUser, UnauthorizedError } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = getAuthenticatedUser(req);
    const body = await req.json();
    const ruleId = Number(body.id);

    if (!Number.isInteger(ruleId) || ruleId <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid rule id",
        },
        {
          status: 400,
        }
      );
    }

    await deleteRule(ruleId, user.userId);

    return NextResponse.json({
      success: true,
      message: "Rule deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Something went wrong",
      },
      {
        status: error instanceof UnauthorizedError ? 401 : 500,
      }
    );
  }
}
