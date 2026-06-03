import { NextResponse } from "next/server";

import { verifyOTP } from "@/services/auth.service";

export async function POST(
  req: Request
) {
  try {
    const body = await req.json();

    await verifyOTP(
      body.email,
      body.otp
    );
    return NextResponse.json({
      success: true,
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
