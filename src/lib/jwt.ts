import jwt from "jsonwebtoken";

export const generateToken = (userId: number) => {
  return jwt.sign({ userId, otpVerified: true }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET!);

  if (
    typeof payload === "string" ||
    payload.otpVerified !== true ||
    !Number.isInteger(payload.userId) ||
    payload.userId <= 0
  ) {
    throw new Error("Invalid token");
  }

  return payload as { userId: number; otpVerified: true };
};