import {
  LoginPayload,
  RegisterPayload,
  VerifyOTPPayload
} from "@/types/auth.types";

export const registerApi =
  async (
    data: RegisterPayload
  ) => {
    const res = await fetch(
      "/api/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    return res.json();
  };

export const loginApi =
  async (
    data: LoginPayload
  ) => {
    const res = await fetch(
      "/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    return res.json();
  };

  export const verifyOTPApi =
  async (
    data: VerifyOTPPayload
  ) => {
    const res = await fetch(
      "/api/auth/verifyotp",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    return res.json();
  };