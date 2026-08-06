import { verifyToken } from "@/lib/jwt";
import { NextRequest } from "next/server";

export const getAuthenticatedUser = (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const payload = verifyToken(token);

  return {
    userId: Number(payload.userId),
  };
};

export const isAuthenticated = (req: NextRequest) => {
  try {
    return Boolean(getAuthenticatedUser(req)?.userId);
  } catch {
    return false;
  }
};
