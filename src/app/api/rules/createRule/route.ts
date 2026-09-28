import { NextRequest, NextResponse } from "next/server";
import { saveRule } from "@/services/rules.service";
import { getAuthenticatedUser, UnauthorizedError } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const auth = getAuthenticatedUser(req);
    const body = await req.json();

    const newRule = await saveRule(
      body.rule,
      body.ruleNumber,
      body.category,
      body.status,
      auth.userId
    );

    return NextResponse.json({
      success: true,
      message: "Rule saved successfully",
      rule: newRule,
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
