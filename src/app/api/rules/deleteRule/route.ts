import { NextResponse } from "next/server";
import { deleteRule, getRuleById } from "@/services/rules.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const ruleId = Number(body.id);

    if (!Number.isInteger(ruleId) || ruleId <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid rule id",
        },
        {
          status: 400,
        }
      );
    }

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

    await deleteRule(ruleId);

    return NextResponse.json({
      success: true,
      message: "Rule deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}
