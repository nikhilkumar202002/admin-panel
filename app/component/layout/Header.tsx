"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiChevronDown,
  FiMenu,
  FiPlus,
  FiSearch,
  FiBell,
  FiExternalLink,
  FiLogOut,
  FiCheck,
  FiGrid,
  FiFolder,
} from "react-icons/fi";
import { getLoggedInUser, logoutUser, User } from "@/app/api/Auth";

type HeaderProps = {
  onMenuClick: () => void;
};

const Header = ({ onMenuClick }: HeaderProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch logged in user via /me endpoint
  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const userData = await getLoggedInUser();
        if (isMounted && userData) {
          setUser(userData);
        }
      } catch (err) {
        console.error("Error fetching logged-in user (/me):", err);
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle outside click to close user menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle logout via /logout endpoint
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutUser();
      router.push("/");
    } catch (err) {
      console.error("Logout request failed:", err);
      router.push("/");
    } finally {
      setIsLoggingOut(false);
      setIsDropdownOpen(false);
    }
  };

  // Helper to get initials
  const getInitials = (name?: string) => {
    if (!name) return "NK";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Determine breadcrumb segment from current URL
  const getBreadcrumbTitle = () => {
    if (pathname.startsWith("/projects/create")) return "Create Project";
    if (pathname.startsWith("/projects")) return "Projects";
    if (pathname.startsWith("/testimonials")) return "Testimonials";
    return "Dashboard Overview";
  };

  const displayName = user?.name || "Nikhil Kumar";
  const displayEmail = user?.email || "nikhilkumars12343@gmail.com";
  const userInitials = getInitials(displayName);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-3 sm:px-6 font-google-sans select-none">
      {/* Left Area: Mobile Trigger & Breadcrumbs */}
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle button */}
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 shadow-2xs transition hover:border-[#fb6c00] hover:bg-orange-50 xl:hidden"
          aria-label="Open sidebar"
        >
          <FiMenu className="h-4 w-4 stroke-[2.2]" />
        </button>

        {/* Breadcrumb Path */}
        <div className="hidden items-center gap-2 text-sm sm:flex">
          <span className="font-bold text-slate-400">Admin</span>
          <span className="text-slate-300 font-bold">/</span>
          <span className="font-extrabold text-slate-950">
            {getBreadcrumbTitle()}
          </span>
        </div>
      </div>

      {/* Middle Area: SaaS Quick Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-sm mx-4">
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
            <FiSearch className="h-4 w-4 stroke-[2.2]" />
          </div>
          <input
            type="text"
            readOnly
            placeholder="Search projects, leads, testimonials..."
            className="w-full rounded-xl border border-slate-300 bg-slate-50 py-1.5 pl-9 pr-14 text-xs font-semibold text-slate-950 placeholder:text-slate-500 cursor-pointer shadow-2xs transition hover:bg-white hover:border-slate-400 focus:outline-none"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <kbd className="rounded border border-slate-300 bg-white px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-600 shadow-2xs">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right Area: Action Buttons & Profile Dropdown */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* "+ Add Project" CTA */}
        <Link
          href="/projects/create"
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#fb6c00] to-[#eb5a00] px-3.5 text-xs font-bold text-white shadow-xs shadow-orange-500/25 transition hover:brightness-105 active:scale-[0.98]"
          aria-label="Add Project"
        >
          <FiPlus className="h-4 w-4 stroke-[2.5]" />
          <span className="hidden sm:inline">Add Project</span>
        </Link>

        {/* Notification Bell */}
        <button
          type="button"
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 shadow-2xs transition hover:bg-slate-50 hover:text-slate-950"
          aria-label="View notifications"
        >
          <FiBell className="h-4 w-4 stroke-[2.2]" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#fb6c00] ring-2 ring-white" />
        </button>

        {/* Live Site Preview Link */}
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="hidden lg:inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 shadow-2xs transition hover:bg-slate-50 hover:text-slate-950"
          title="Open live website"
          aria-label="Open live website"
        >
          <FiExternalLink className="h-4 w-4 stroke-[2]" />
        </a>

        {/* Separator */}
        <div className="h-5 w-px bg-slate-300 mx-0.5" />

        {/* User Profile Pill & Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className={`flex items-center gap-2 rounded-xl border bg-white px-2 py-1 shadow-2xs transition sm:gap-2.5 sm:px-2.5 ${
              isDropdownOpen
                ? "border-[#fb6c00] ring-2 ring-[#fb6c00]/15"
                : "border-slate-300 hover:bg-slate-50"
            }`}
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#fb6c00] to-[#c75100] text-xs font-black text-white shadow-xs">
              {userInitials}
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-xs font-extrabold leading-tight text-slate-950">
                {displayName}
              </p>
              <p className="text-[10px] font-bold leading-tight text-slate-500 truncate max-w-[140px]">
                {displayEmail}
              </p>
            </div>
            <FiChevronDown
              className={`h-3.5 w-3.5 stroke-[2.2] text-slate-500 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180 text-[#fb6c00]" : ""
              }`}
            />
          </button>

          {/* SaaS Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5 animate-in fade-in zoom-in-95 duration-150 z-50">
              {/* User Identity Header */}
              <div className="rounded-xl bg-slate-50 p-3 mb-1.5 border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#fb6c00] to-[#e05300] text-xs font-black text-white shadow-xs">
                    {userInitials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-extrabold text-slate-950">
                      {displayName}
                    </p>
                    <p className="truncate text-[11px] font-medium text-slate-500">
                      {displayEmail}
                    </p>
                  </div>
                </div>

                <div className="mt-2.5 flex items-center justify-between border-t border-slate-200/60 pt-2 text-[10px]">
                  <span className="font-bold text-slate-500">Role: Admin</span>
                  <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
                    <FiCheck className="h-3 w-3 stroke-[3]" />
                    Verified
                  </span>
                </div>
              </div>

              {/* Navigation Options */}
              <div className="space-y-0.5">
                <Link
                  href="/dashboard"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100/80 hover:text-slate-950"
                >
                  <FiGrid className="h-4 w-4 text-slate-500" />
                  <span>Dashboard Overview</span>
                </Link>

                <Link
                  href="/projects"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100/80 hover:text-slate-950"
                >
                  <FiFolder className="h-4 w-4 text-slate-500" />
                  <span>Manage Projects</span>
                </Link>
              </div>

              {/* Divider */}
              <div className="my-1.5 border-t border-slate-100" />

              {/* Logout Button */}
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50 hover:text-red-700 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoggingOut ? (
                  <svg
                    className="h-4 w-4 animate-spin text-red-600"
                    viewBox="0 0 24 24"
                    fill="none"
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
                ) : (
                  <FiLogOut className="h-4 w-4 stroke-[2]" />
                )}
                <span>{isLoggingOut ? "Signing out..." : "Sign out"}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
