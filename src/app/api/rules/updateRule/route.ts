import { updateRule } from "@/services/rules.service";
import { getAuthenticatedUser, UnauthorizedError } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = getAuthenticatedUser(req);
    const body = await req.json();

    const newRule =
      await updateRule(
        body.id,
        body.rule,
        body.ruleNumber,
        body.category,
        body.status,
        user.userId,
      );

    const response =
      NextResponse.json({
        success: true,
        message: "Rule updated successfully",
        rule: newRule,
      });

    return response;
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