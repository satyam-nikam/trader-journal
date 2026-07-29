import { getAllStrategies } from "@/services/strategy.service";
import { getAuthenticatedUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    getAuthenticatedUser(req);
    const { strategies, count } = await getAllStrategies();

    return NextResponse.json({
      success: true,
      strategies,
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