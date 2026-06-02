"use client";

import { useMutation } from "@tanstack/react-query";
import { registerApi, loginApi } from "@/features/Auth/auth.api";

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