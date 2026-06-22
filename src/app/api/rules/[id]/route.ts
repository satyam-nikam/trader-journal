import { getRuleById, updateRule } from "@/services/rules.service";
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
        body.ruleNumber
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

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const ruleId = parseInt(params.id, 10);
    const rule = await getRuleById(ruleId);

    if (!rule) {
      return NextResponse.json(
        {
          success: false,
          message: "Rule not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      rule,
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
        status: 401,
      }
    );
  }
}
