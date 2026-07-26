import { NextResponse } from "next/server";
import { saveRule } from "@/services/rules.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newRule = await saveRule(
      body.rule,
      body.ruleNumber,
      body.category,
      body.status
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
