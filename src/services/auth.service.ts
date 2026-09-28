import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/bcrypt";
import { comparePassword } from "@/lib/bcrypt";
import { generateOTP } from "@/lib/otp";
import { Resend } from 'resend';

export const registerUser = async (
  fullName: string,
  email: string,
  password: string
) => {
  const existingUser =
    await prisma.user.findUnique({
      where: {
        email,
      },
    });

  if (existingUser) {
    throw new Error(
      "Email already exists"
    );
  }

  const hashedPassword =
    await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      password: hashedPassword,
    },
  });

  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
  };
};

export const loginUser = async (
  email: string,
  password: string
) => {
  const user =
    await prisma.user.findUnique({
      where: { email },
    });

  if (!user) {
    throw new Error(
      "Invalid credentials"
    );
  }

  const isValid =
    await comparePassword(
      password,
      user.password
    );

  if (!isValid) {
    throw new Error(
      "Invalid credentials"
    );
  }

  const otp = generateOTP();
  await saveOTP(email, otp);

  const resend = new Resend(process.env.RESEND_API_KEY || "");
  const senderEmail =
    process.env.NODE_ENV === "production" && process.env.EMAIL_FROM
      ? process.env.EMAIL_FROM
      : "onboarding@resend.dev";

  try {
    const emailResult = await resend.emails.send({
      from: senderEmail,
      to: [email],
      subject: "OTP Verification",
      html: `<h2>Your OTP</h2>
        <p>${otp}</p>
        <p>Valid for 2 minutes.</p>`,
    });

    if (emailResult.error) {
      console.error("Resend email error:", emailResult.error);
      throw new Error(emailResult.error.message || "Failed to send OTP email");
    }

  } catch (error) {
    console.error("Failed to send OTP email:", error);
    throw new Error("Failed to send OTP email. Please try again.");
  }

  return {
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
    },
  };
};

export const saveOTP = async (
  email: string,
  otp: string
) => {
  const expiry = new Date(
    Date.now() + 2 * 60 * 1000
  );

  return prisma.user.update({
    where: { email },
    data: {
      otp,
      otpExpiry: expiry,
    },
  });
};

export const verifyOTP = async (
  email: string,
  otp: string
) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found");
  }
  if (user.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  if (!user.otpExpiry || new Date() > user.otpExpiry) {
    throw new Error("OTP has expired");
  }

  return prisma.user.update({
    where: { email },
    data: {
      otp: null,
      otpExpiry: null,
    },
  });
};
