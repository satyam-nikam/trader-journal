"use client";

import { useLogin, useRegister, useVerifyOTP } from "@/hooks/useAuth";
import { saveOTP } from "@/services/auth.service";
import { RegisterPayload } from "@/types/auth.types";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Login() {
  const router = useRouter();
  const { mutate: registerMutate, isPending: registerPending } = useRegister();
  const { mutate: loginMutate, isPending: loginPending } = useLogin();
  const { mutate: verifyOtpMutate, isPending: verifyOtpPending } = useVerifyOTP();

  const [tab, setTab] = useState<"login" | "register" | "2fa">("login");
  const [timer, setTimer] = useState(120);
  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    emailErr: "",
    password: "",
    passwordErr: "",
    repassword: "",
    repasswordErr: "",
    otp: "",
    otpErr: "",
    failErr: "",
  });

  useEffect(() => {
  if (tab !== "2fa") return;

  if (timer <= 0) return;

  const interval = setInterval(() => {
    setTimer((prev) => {
      if (prev <= 1) {
        clearInterval(interval);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, [tab, timer]);

const formatTimer = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

  const handleChange = (e: any) => {
    setUser((state) => ({ ...state, [e.target.name]: e.target.value }));
    // validate(e.target.name, e.target.value);
  };

  const validate = (name: string, value: string) => {
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setUser((state) => ({
        ...state,
        emailErr: emailRegex.test(value) ? "" : "Invalid email address",
      }));
    }
    if (name === "password") {
      setUser((state) => ({
        ...state,
        passwordErr:
          value.length >= 6
            ? ""
            : "Password must be at least 6 characters long",
      }));
    }
  };

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

    setUser((state) => ({
      ...state,
      failErr: "",
      emailErr: "",
      passwordErr: "",
      repasswordErr: "",
    }));
    
    loginMutate(
      { email: user.email, password: user.password },
      {
        onSuccess: () => {
          console.log("Logged in successfully");
              setTimer(120);
    setTab("2fa");
        },
        onError: (error: any) => {
          setUser((state) => ({
            ...state,
            failErr:
              error?.response?.data?.message ?? "Invalid email or password",
          }));
        },
      },
    );
  };

  const verifyOtp = () => {
  // ✅ Guard: OTP must be 4 digits
  if (!user.otp || user.otp.length < 4) {
    setUser((state) => ({ ...state, otpErr: "Please enter the 4-digit OTP" }));
    return;
  }

  setUser((state) => ({ ...state, otpErr: "" }));

  verifyOtpMutate(
    { email: user.email, otp: user.otp },  // pass whatever your API expects
    {
      onSuccess: () => {
        // ✅ OTP verified — redirect to dashboard
        router.push("/dashboard");          
        console.log("otp verified")
        setUser({
            email: "",
            password: "",
            fullname: "",
            emailErr: "",
            passwordErr: "",
            repassword: "",
            repasswordErr: "",
            failErr: "",
            otp: "",
            otpErr: "",
          });
      },
      onError: (error: any) => {
        setUser((state) => ({
          ...state,
          otpErr: error?.response?.data?.message ?? "Invalid OTP. Try again.",
          otp: "",   
        }));
        // refocus first OTP input
        otpRefs[0].current?.focus();
      },
    },
  );
};

  const handleOtpChange = (index: number, value: string) => {
    // Only allow numeric input
    if (!/^\d*$/.test(value)) return;

    const digits = user.otp.split("");
    digits[index] = value.slice(-1);
    const newOtp = digits.join("").padEnd(4, "").slice(0, 4);

    const arr = Array(4).fill("");
    user.otp.split("").forEach((d, i) => (arr[i] = d));
    arr[index] = value.slice(-1);
    const combined = arr.join("").replace(/\s/g, "");

    setUser((prev) => ({ ...prev, otp: combined }));

    // move focus to next input if value is entered
    if (value && index < 3) otpRefs[index + 1].current?.focus();
  };

  // move focus to previous input on backspace if current input is empty
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !user.otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleResendOtp = () => {
  if (timer > 0) return;

  // call resend OTP API here

  setUser((state) => ({
    ...state,
    otp: "",
    otpErr: "",
  }));

  setTimer(120);
};

  const register = (e: any) => {
    console.log("Registering user:", {
      email: user.email,
      password: user.password,
      fullName: user.fullname,
    });

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
      setUser((state) => ({
        ...state,
        repasswordErr: "Passwords do not match",
      }));
      return;
    }

    setUser((state) => ({
      ...state,
      failErr: "",
      emailErr: "",
      passwordErr: "",
      repasswordErr: "",
    }));

    registerMutate(
      { email: user.email, password: user.password, fullName: user.fullname },
      {
        onSuccess: () => {
          console.log("User created");
          setUser({
            email: "",
            password: "",
            fullname: "",
            emailErr: "",
            passwordErr: "",
            repassword: "",
            repasswordErr: "",
            failErr: "",
            otp: "",
            otpErr: "",
          });
          setTab("login");
        },
        onError: (error: any) => {
          setUser((state) => ({
            ...state,
            failErr:
              error?.response?.data?.message ??
              "Registration failed. Please try again.",
          }));
        },
      },
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
            {tab !== "2fa" && (
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
            )}
            {tab !== "2fa" && (
              <button
                onClick={() => setTab("register")}
                className={`relative w-full pb-3 text-xs tracking-[0.2em] uppercase font-medium
                  ${tab === "register" ? "text-[#f0f0f0] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-linear-to-r after:from-[#6c47ff] after:to-[#006cff] after:content-['']" : "text-white/30 hover:text-white/50 border-b-2 border-white/10"}`}
              >
                register
              </button>
            )}

            {tab === "2fa" && (
              <button
                onClick={() => {}}
                className="relative w-full pb-3 text-xs tracking-[0.2em] uppercase font-medium text-[#f0f0f0] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-linear-to-r after:from-[#6c47ff] after:to-[#006cff] after:content-['']"
              >
                User Authentication
              </button>
            )}
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
              <p
                className="text-[#6c47ff] cursor-pointer text-sm"
                onClick={() =>
                  alert("Forgot Password functionality coming soon!")
                }
              >
                Forgot Password?
              </p>
            </div>

            <div>
              <button
                type="button"
                onClick={login}
                disabled={loginPending}
                className="w-full bg-[#6c47ff] hover:bg-[#5a3ae8] text-white font-bold py-3 px-4 rounded-lg cursor-pointer"
              >
                {loginPending ? "Signing In..." : "Sign In"}
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

          {/* two factor auth */}
          <div className={`${tab === "2fa" ? "block" : "hidden"} space-y-4`}>
            <div>
              <p className="text-3xl font-bold text-center">Enter OTP</p>
              <p className="text-center text-white/70 text-sm">
                Otp is sent to your email address.
              </p>
            </div>

            <div>
              <div className="flex justify-center gap-8">
                {[0, 1, 2, 3].map((index) => (
                  <input
                    key={index}
                    ref={otpRefs[index]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={user.otp[index] || ""}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="border border-[#ffffff0f] rounded-lg w-12 h-12 text-center text-lg bg-white/5 placeholder:text-sm focus:outline-none focus:border-white/30"
                    placeholder="_"
                  />
                ))}
              </div>
              <span className="text-red-500 text-sm">{user.otpErr}</span>
            </div>

            <div>
              <button
  type="button"
  onClick={verifyOtp}   
  disabled={verifyOtpPending}
  className="w-full bg-[#6c47ff] hover:bg-[#5a3ae8] text-white font-bold py-3 px-4 rounded-lg cursor-pointer disabled:opacity-50"
>
  {verifyOtpPending ? "Verifying..." : "Verify OTP"}
</button>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-center text-sm text-white/70">
                Didn&apos;t receive OTP?{" "}
              </p>
              <div>
                {timer > 0 && (
                <span className="mr-2 text-white/50">
                  ({formatTimer(timer)})
                </span>
              )}
              <span
                className={`text-base underline transition-colors
                ${
                  timer > 0
                    ? "text-white/30 cursor-not-allowed pointer-events-none"
                    : "text-[#6c47ff] cursor-pointer"
                }`}
                onClick={handleResendOtp}
              >
                Resend
              </span>
              </div>
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
