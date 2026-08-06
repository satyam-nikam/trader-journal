import { getAllRules } from "@/services/rules.service";
import { getAuthenticatedUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    getAuthenticatedUser(req);
    const body = await req.json();
    const {rules, count} = await getAllRules(body.userId);

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