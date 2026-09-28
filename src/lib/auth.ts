import { verifyToken } from "@/lib/jwt";
import { NextRequest } from "next/server";

export class UnauthorizedError extends Error {
  constructor() {
    super("Unauthorized");
    this.name = "UnauthorizedError";
  }
}

export const getAuthenticatedUser = (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    throw new UnauthorizedError();
  }

  let payload;
  try {
    payload = verifyToken(token);
  } catch {
    throw new UnauthorizedError();
  }

  return {
    userId: payload.userId,
  };
};

export const isAuthenticated = (req: NextRequest) => {
  try {
    return Boolean(getAuthenticatedUser(req)?.userId);
  } catch {
    return false;
  }
};
