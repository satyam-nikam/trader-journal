import { getAllStrategies } from "@/services/strategy.service";
import { getAuthenticatedUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    getAuthenticatedUser(req);
    const { strategies, count } = await getAllStrategies(body.userId);

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