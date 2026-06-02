import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/bcrypt";
import { comparePassword } from "@/lib/bcrypt";
import { generateToken } from "@/lib/jwt";

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

  return {
    token,
    user,
  };
};