import { getAllRules } from "@/services/rules.service";
import { NextResponse } from "next/server";

export async function GET(
  req: Request
) {
  try {
    const {rules, count} = await getAllRules();

    if( count === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No rules found",
        },
        {
          status: 404,
        }
      );
    }

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