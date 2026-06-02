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

    const response =
      NextResponse.json({
        success: true,
        user,
      });

    response.cookies.set(
      "token",
      token,
      {
        httpOnly: true,
        maxAge:
          60 * 60 * 24 * 7,
        path: "/",
      }
    );

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