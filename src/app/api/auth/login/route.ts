import { NextResponse } from "next/server";

import { loginUser } from "@/services/auth.service";

export async function POST(
  req: Request
) {
  try {
    const body = await req.json();

    const { token, user } =
      await loginUser(
        body.email,
        body.password
      );

    return NextResponse.json({
      success: true,
      token,
      data: user,
      requiresOtp: true,
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