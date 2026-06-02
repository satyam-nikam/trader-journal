import { NextResponse } from "next/server";

import { registerUser } from "@/services/auth.service";

export async function POST(
  req: Request
) {
  try {
    const body = await req.json();

    const user =
      await registerUser(
        body.fullName,
        body.email,
        body.password
      );

    return NextResponse.json({
      success: true,
      user,
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
        status: 400,
      }
    );
  }
}