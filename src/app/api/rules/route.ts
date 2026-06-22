import { NextResponse } from "next/server";
import { getAllRules, saveRule } from "@/services/rules.service";

export async function GET(
  req: Request
) {
  try {
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

export async function POST(
  req: Request
) {
  try {
    const body = await req.json();

    const newRule =
      await saveRule(
        body.rule,
        body.ruleNumber
      );

    const response =
      NextResponse.json({
        success: true,
        message: "Rule saved successfully",
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