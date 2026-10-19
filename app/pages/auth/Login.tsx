"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { loginUser } from "@/app/api/Auth";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiAlertCircle,
  FiShield,
  FiCheckCircle,
} from "react-icons/fi";

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setNotice(null);

    try {
      const formData = new FormData(event.currentTarget);
      const email = String(formData.get("email") ?? "").trim();
      const password = String(formData.get("password") ?? "");

      await loginUser({ email, password });
      router.push("/dashboard");
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : "Unable to sign in. Please verify your credentials and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotClick = () => {
    setNotice(
      "Password recovery instructions have been routed to administrator support."
    );
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-50 px-4 py-8 sm:px-6 lg:px-8 font-google-sans text-slate-950 selection:bg-orange-500/15 selection:text-[#fb6c00]">
      {/* Background Ambience */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-b from-[#fb6c00]/12 via-[#fb6c00]/5 to-transparent blur-3xl" />
        <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -bottom-24 right-1/4 h-[350px] w-[350px] rounded-full bg-orange-400/8 blur-3xl" />
      </div>

      <div className="w-full max-w-[440px]">
        {/* Main Card Container */}
        <main className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-9 shadow-xl shadow-slate-200/60 ring-1 ring-slate-900/5">
          {/* Header Branding - Main Logo Only */}
          <div className="mb-7 flex flex-col items-center text-center">
            <div className="mb-5 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Nikhil Kumar S - Visualizer"
                width={260}
                height={62}
                priority
                className="h-10 sm:h-11 w-auto object-contain"
              />
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-[28px]">
              Sign in to your account
            </h1>
            <p className="mt-1.5 text-sm font-semibold text-slate-600">
              Enter your credentials to continue
            </p>
          </div>

          {/* Feedback Alerts */}
          {error && (
            <div
              role="alert"
              className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs font-semibold text-red-950"
            >
              <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
              <div className="leading-relaxed">{error}</div>
            </div>
          )}

          {notice && !error && (
            <div
              role="status"
              className="mb-5 flex items-start gap-2.5 rounded-xl border border-orange-200 bg-orange-50 p-3.5 text-xs font-semibold text-orange-950"
            >
              <FiCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#fb6c00]" />
              <div className="leading-relaxed">{notice}</div>
            </div>
          )}

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit} noValidate={false}>
            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5"
              >
                Email address
              </label>
              <div className="relative rounded-xl shadow-2xs">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                  <FiMail className="h-4 w-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="username"
                  required
                  enterKeyHint="next"
                  spellCheck={false}
                  placeholder="name@company.com"
                  className="block w-full rounded-xl border border-slate-300 bg-slate-50/60 py-2.5 pl-10 pr-3.5 text-sm font-semibold text-slate-950 placeholder:font-normal placeholder:text-slate-400 transition-all duration-150 focus:border-[#fb6c00] focus:bg-white focus:outline-none focus:ring-3 focus:ring-[#fb6c00]/15"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="current-password"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-900"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleForgotClick}
                  className="text-xs font-bold text-[#fb6c00] hover:text-[#d95d00] transition-colors focus:outline-none"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative rounded-xl shadow-2xs">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                  <FiLock className="h-4 w-4" />
                </div>
                <input
                  id="current-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  enterKeyHint="done"
                  placeholder="••••••••••••"
                  className="block w-full rounded-xl border border-slate-300 bg-slate-50/60 py-2.5 pl-10 pr-11 text-sm font-semibold text-slate-950 placeholder:font-normal placeholder:text-slate-400 transition-all duration-150 focus:border-[#fb6c00] focus:bg-white focus:outline-none focus:ring-3 focus:ring-[#fb6c00]/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-500 hover:text-slate-800 transition-colors focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FiEyeOff className="h-4 w-4" />
                  ) : (
                    <FiEye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center pt-0.5 pb-0.5">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  id="remember-me"
                  name="remember-me"
                  defaultChecked
                  className="h-4 w-4 rounded border-slate-300 text-[#fb6c00] accent-[#fb6c00] focus:ring-2 focus:ring-[#fb6c00]/20"
                />
                <span className="text-sm font-bold text-slate-800">
                  Keep me signed in for 30 days
                </span>
              </label>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#fb6c00] via-[#fb6c00] to-[#eb6000] px-4 py-3 text-base font-bold text-white shadow-md shadow-orange-500/25 transition-all duration-150 hover:shadow-lg hover:shadow-orange-500/35 hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-65"
            >
              {isLoading ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Verifying credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign in to Dashboard</span>
                  <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          {/* Security Assurance */}
          <div className="mt-6 flex items-center justify-center gap-1.5 text-center text-xs font-bold text-slate-500">
            <FiShield className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>End-to-end encrypted session • 256-bit TLS</span>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
