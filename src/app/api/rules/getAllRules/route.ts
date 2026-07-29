import { getAllRules } from "@/services/rules.service";
import { getAuthenticatedUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    getAuthenticatedUser(req);
    const {rules, count} = await getAllRules();

    return NextResponse.json({
      success: true,
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
        status: 500,
      }
    );
  }
}