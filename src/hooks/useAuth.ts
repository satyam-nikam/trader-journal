"use client";

import { useMutation } from "@tanstack/react-query";
import { registerApi, loginApi, verifyOTPApi } from "@/features/Auth/auth.api";

export const useRegister = () => {
  return useMutation({
    mutationFn: registerApi,
  });
};


export const useLogin = () => {
  return useMutation({
    mutationFn: loginApi,
  });
};

export const useVerifyOTP = () => {
  return useMutation({
    mutationFn: verifyOTPApi,
  });
}