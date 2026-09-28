import { getAllRules } from "@/services/rules.service";
import { getAuthenticatedUser, UnauthorizedError } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = getAuthenticatedUser(req);
    const { rules, count } = await getAllRules(user.userId);

    return NextResponse.json({
      success: true,
      message: "All Rules fetched successfully",
      rules,
      count,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      },
      {
        status: error instanceof UnauthorizedError ? 401 : 500,
      }
    );
  }
}