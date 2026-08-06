import { NextResponse } from "next/server";
import { saveRule } from "@/services/rules.service";
import { getAuthenticatedUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const request = req as Request & { cookies?: { get: (name: string) => { value: string } | undefined } };
    const auth = getAuthenticatedUser(request as never);
    const body = await req.json();

    const newRule = await saveRule(
      body.rule,
      body.ruleNumber,
      body.category,
      body.status,
      body.userId
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
        status: 401,
      }
    );
  }
}
