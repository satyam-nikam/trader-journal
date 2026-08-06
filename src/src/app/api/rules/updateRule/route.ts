import { updateRule } from "@/services/rules.service";
import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {
  try {
    const body = await req.json();

    const newRule =
      await updateRule(
        body.id,
        body.rule,
        body.ruleNumber,
        body.category,
        body.status
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
        status: 401,
      }
    );
  }
}