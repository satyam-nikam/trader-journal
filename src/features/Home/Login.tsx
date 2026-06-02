"use client";

import { useLogin, useRegister } from "@/hooks/useAuth";
import { RegisterPayload } from "@/types/auth.types";
import { useState } from "react";

export default function Login() {

  const { mutate: registerMutate, isPending: registerPending } = useRegister();
  const { mutate: loginMutate, isPending: loginPending } = useLogin();

  const [tab, setTab] = useState<"login" | "register">("login");
  const [user, setUser] = useState({
    email: "",
    password: "",
    fullname: "",
    emailErr: "",
    passwordErr: "",
    repassword: "",
    repasswordErr: "",
    failErr: "",
  });

  const handleChange = (e: any) => {
    setUser((state) => ({ ...state, [e.target.name]: e.target.value }));
    // validate(e.target.name, e.target.value);
  }

  const validate = (name: string, value: string) => {
    if(name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setUser((state) => ({ ...state, emailErr: emailRegex.test(value) ? "" : "Invalid email address" }));
    }
    if(name === "password") {
      setUser((state) => ({ ...state, passwordErr: value.length >= 6 ? "" : "Password must be at least 6 characters long" }));
    }
  }

  const login = (e: any) => {
  e.preventDefault();

  if (!user.email && !user.password) {
    setUser((state) => ({ ...state, failErr: "Please fill in all fields" }));
    return;
  }

  if (!user.email) {
    setUser((state) => ({ ...state, emailErr: "Email is required" }));
    return;
  }

  if (!user.password) {
    setUser((state) => ({ ...state, passwordErr: "Password is required" }));
    return;
  }

  setUser((state) => ({ ...state, failErr: "", emailErr: "", passwordErr: "" }));

  loginMutate(
    { email: user.email, password: user.password },
    {
      onSuccess: () => {
        console.log("Logged in successfully");
      },
      onError: (error: any) => {
        setUser((state) => ({
          ...state,
          failErr: error?.response?.data?.message ?? "Invalid email or password",
        }));
      },
    }
  );
};

const register = (e: any) => {
  console.log("Registering user:", { email: user.email, password: user.password, fullName: user.fullname });

  if (!user.fullname) {
    setUser((state) => ({ ...state, failErr: "Full name is required" }));
    return;
  }

  if (!user.email) {
    setUser((state) => ({ ...state, emailErr: "Email is required" }));
    return;
  }

  if (!user.password) {
    setUser((state) => ({ ...state, passwordErr: "Password is required" }));
    return;
  }

  if (user.password !== user.repassword) {
  setUser((state) => ({ ...state, repasswordErr: "Passwords do not match" }));
  return;
}

  setUser((state) => ({ ...state, failErr: "", emailErr: "", passwordErr: "" }));

  registerMutate(
    { email: user.email, password: user.password, fullName: user.fullname },
    {
      onSuccess: () => {
        console.log("User created");
        setTab("login");
      },
      onError: (error: any) => {
        setUser((state) => ({
          ...state,
          failErr: error?.response?.data?.message ?? "Registration failed. Please try again.",
        }));
      },
    }
  );
};

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-r from-[#080810] to-[#1e1e2f]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[52px_52px]" />

      <div className="absolute w-160 h-160 -top-56 -left-40 bg-[radial-gradient(circle,rgba(108,71,255,0.14)_0%,transparent_70%)]" />

      <div className="absolute w-160 h-160 -bottom-56 -right-40 bg-[radial-gradient(circle,rgba(108,71,255,0.14)_0%,transparent_70%)]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-115 rounded-lg border border-[#ffffff10] bg-[#0e0e1c] p-8 shadow-xl">
          {/* tabs */}
          <div className="flex justify-around mb-8 ">
            <button
              onClick={() => setTab("login")}
              className={`relative w-full pb-3 text-xs tracking-[0.2em] uppercase font-medium
              ${
                tab === "login"
                  ? "text-[#f0f0f0] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-linear-to-r after:from-[#6c47ff] after:to-[#006cff] after:content-['']"
                  : "text-white/30 hover:text-white/50 border-b-2 border-white/10"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setTab("register")}
              className={`relative w-full pb-3 text-xs tracking-[0.2em] uppercase font-medium
                  ${tab === "register" ? "text-[#f0f0f0] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-linear-to-r after:from-[#6c47ff] after:to-[#006cff] after:content-['']" : "text-white/30 hover:text-white/50 border-b-2 border-white/10"}`}
            >
              register
            </button>
          </div>

          {/* login */}
          <div className={`${tab === "login" ? "block" : "hidden"} space-y-4`}>
            <div>
              <p className="text-3xl font-bold text-center">Welcome Back</p>
              <p className="text-center text-white/70 text-sm">
                Sign in to your account
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                value={user.email}
                placeholder="Enter your email"
                className="border border-[#ffffff0f] rounded-lg p-3 w-full h-auto bg-white/5 placeholder:text-sm"
              />
              <span className="text-red-500 text-sm">{user.emailErr}</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                value={user.password}
                placeholder="Enter your password"
                className="border border-[#ffffff0f] rounded-lg p-3 w-full h-auto bg-white/5 placeholder:text-sm"
              />
              <span className="text-red-500 text-sm">{user.passwordErr}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="border border-[#ffffff0f] rounded-lg p-3 h-auto bg-white/5 cursor-pointer"
                />
                <p className="w-full text-sm">Remember me</p>
              </div>
              <p className="text-[#6c47ff] cursor-pointer text-sm" onClick={() => alert("Forgot Password functionality coming soon!")}>
                Forgot Password?
              </p>
            </div>

            <div>
              <button
                type="button"
                onClick={login}
                className="w-full bg-[#6c47ff] hover:bg-[#5a3ae8] text-white font-bold py-3 px-4 rounded-lg cursor-pointer"
              >
                Sign In
              </button>
            </div>

            <div>
              <p className="text-center text-sm text-white/70">
                Don&apos;t have an account?{" "}
                <span
                  className="text-[#6c47ff] cursor-pointer text-base"
                  onClick={() => setTab("register")}
                >
                  Sign Up
                </span>
              </p>
            </div>
          </div>

          {/* register */}
          <div
            className={`${tab === "register" ? "block" : "hidden"} space-y-4`}
          >
            <div>
              <p className="text-3xl font-bold text-center">Create Account</p>
              <p className="text-center text-white/70 text-sm">
                Sign up to get started
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="fullname" className="label">
                Full Name
              </label>
              <input
                type="fullname"
                id="fullname"
                name="fullname"
                onChange={handleChange}
                value={user.fullname}
                placeholder="Enter your full name"
                className="border border-[#ffffff0f] rounded-lg p-3 w-full h-auto bg-white/5 placeholder:text-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                value={user.email}
                placeholder="Enter your email"
                className="border border-[#ffffff0f] rounded-lg p-3 w-full h-auto bg-white/5 placeholder:text-sm"
              />
              <span className="text-red-500 text-sm">{user.emailErr}</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                value={user.password}
                placeholder="Enter your password"
                className="border border-[#ffffff0f] rounded-lg p-3 w-full h-auto bg-white/5 placeholder:text-sm"
              />
              <span className="text-red-500 text-sm">{user.passwordErr}</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="repassword" className="label">
                Confirm Password
              </label>
              <input
                type="password"
                id="repassword"
                name="repassword"
                onChange={handleChange}
                value={user.repassword}
                placeholder="Confirm your password"
                className="border border-[#ffffff0f] rounded-lg p-3 w-full h-auto bg-white/5 placeholder:text-sm"
              />
              <span className="text-red-500 text-sm">{user.repasswordErr}</span>
            </div>

            <div>
              <button
                type="button"
                onClick={register}
                className="w-full bg-[#6c47ff] hover:bg-[#5a3ae8] text-white font-bold py-3 px-4 rounded-lg cursor-pointer"
              >
                Sign Up
              </button>
            </div>

            <div>
              <p className="text-center text-sm text-white/70">
                Do you have an account?{" "}
                <span
                  className="text-[#6c47ff] cursor-pointer"
                  onClick={() => setTab("login")}
                >
                  Sign In
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
