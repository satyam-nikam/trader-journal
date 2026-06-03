import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/bcrypt";
import { comparePassword } from "@/lib/bcrypt";
import { generateToken } from "@/lib/jwt";
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

  return user;
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

  const token = generateToken(
    user.id
  );

  const otp = generateOTP();
  await saveOTP(email, otp);
  console.log("Generated OTP:", otp);

const resend = new Resend(process.env.RESEND_API_KEY);

resend.emails.send({
  from: process.env.EMAIL_FROM!,
  to: email,
  subject: 'OTP Verification',
  html: `<h2>Your OTP</h2>
        <p>${otp}</p>
        <p>Valid for 2 minutes.</p>`
});

console.log("OTP email sent to:", email);

  return {
    token,
    user,
  };
};

export const saveOTP = async (
  email: string,
  otp: string
) => {
  console.log("Saving OTP for email:", email);
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
  console.log(user.otp, otp)

  if (user.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  if (user.otpExpiry && (new Date() > user.otpExpiry)) {
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
