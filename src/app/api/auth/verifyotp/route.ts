import { NextResponse } from "next/server";

import { generateToken } from "@/lib/jwt";
import { verifyOTP } from "@/services/auth.service";

export async function POST(
  req: Request
) {
  try {
    const body = await req.json();

    const verifiedUser = await verifyOTP(
      body.email,
      body.otp
    );

    const token = generateToken(verifiedUser.id);
    const response = NextResponse.json({
      success: true,
      data: verifiedUser,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
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
