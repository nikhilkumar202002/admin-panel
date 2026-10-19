"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  FiGrid,
  FiFolder,
  FiMessageSquare,
  FiPlus,
  FiX,
  FiLogOut,
  FiExternalLink,
} from "react-icons/fi";
import { logoutUser } from "@/app/api/Auth";

type SidebarProps = {
  onClose?: () => void;
  onNavigate?: () => void;
};

const mainNavItems = [
  { label: "Dashboard", href: "/dashboard", icon: FiGrid },
  { label: "Projects", href: "/projects", icon: FiFolder, badge: "12" },
  { label: "Testimonials", href: "/testimonials", icon: FiMessageSquare, badge: "8" },
];

const Sidebar = ({ onClose, onNavigate }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.push("/");
  };

  return (
    <aside className="flex h-full w-full flex-col justify-between bg-white text-slate-950 font-google-sans select-none border-r border-slate-200">
      {/* Top Section */}
      <div className="flex flex-col">
        {/* Workspace Brand Header - Main Logo Only */}
        <div className="flex items-center justify-between border-b border-slate-200/80 px-4 py-4 sm:px-5">
          <Link
            href="/dashboard"
            onClick={onNavigate}
            className="flex items-center transition-opacity hover:opacity-90"
          >
            <Image
              src="/logo.png"
              alt="Nikhil Kumar S - Visualizer"
              width={220}
              height={52}
              priority
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </Link>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 xl:hidden"
            aria-label="Close sidebar"
          >
            <FiX className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation Groups */}
        <div className="px-3.5 py-4 space-y-6 overflow-y-auto">
          {/* Main Navigation */}
          <div>
            <p className="px-3 pb-2 text-[11px] font-black uppercase tracking-wider text-slate-500">
              Main Menu
            </p>
            <nav className="space-y-1">
              {mainNavItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" && pathname.startsWith(`${item.href}/`));
                const Icon = item.icon;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={onNavigate}
                    className={`group relative flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-bold transition-all duration-150 ${
                      isActive
                        ? "bg-orange-50/90 text-[#fb6c00] shadow-xs ring-1 ring-orange-200/60"
                        : "text-slate-800 hover:bg-slate-100/80 hover:text-slate-950"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`h-4.5 w-4.5 stroke-[2.2] transition-colors ${
                          isActive
                            ? "text-[#fb6c00]"
                            : "text-slate-500 group-hover:text-slate-900"
                        }`}
                      />
                      <span className="tracking-tight">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.badge ? (
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-extrabold ${
                            isActive
                              ? "bg-[#fb6c00]/20 text-[#fb6c00]"
                              : "bg-slate-200/80 text-slate-700 group-hover:bg-slate-300/80"
                          }`}
                        >
                          {item.badge}
                        </span>
                      ) : null}

                      {isActive ? (
                        <span
                          className="h-2 w-2 rounded-full bg-[#fb6c00]"
                          aria-hidden="true"
                        />
                      ) : null}
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Quick Actions / Shortcuts */}
          <div>
            <p className="px-3 pb-2 text-[11px] font-black uppercase tracking-wider text-slate-500">
              Quick Actions
            </p>
            <nav className="space-y-1">
              <Link
                href="/projects/create"
                onClick={onNavigate}
                className="group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-800 transition-colors hover:bg-slate-100/80 hover:text-slate-950"
              >
                <div className="flex items-center gap-3">
                  <FiPlus className="h-4.5 w-4.5 stroke-[2.2] text-slate-500 group-hover:text-[#fb6c00]" />
                  <span>Create Project</span>
                </div>
                <span className="rounded border border-slate-300 bg-white px-1.5 py-0.5 text-[10px] font-extrabold text-slate-600">
                  New
                </span>
              </Link>

              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-800 transition-colors hover:bg-slate-100/80 hover:text-slate-950"
              >
                <div className="flex items-center gap-3">
                  <FiExternalLink className="h-4.5 w-4.5 stroke-[2.2] text-slate-500 group-hover:text-slate-900" />
                  <span>Public Portfolio</span>
                </div>
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="border-t border-slate-200/80 p-3.5 sm:p-4 space-y-3">
        {/* System Status Pill */}
        <div className="flex items-center justify-between rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-xs text-slate-800">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-bold text-slate-900">API Operational</span>
          </div>
          <span className="text-xs font-mono font-bold text-slate-500">v2.4</span>
        </div>

        {/* User Profile Lockup */}
        <div className="flex items-center justify-between gap-2 rounded-2xl p-2 hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#fb6c00] to-[#e05300] text-xs font-extrabold text-white shadow-xs">
              NK
            </div>
            <div className="flex flex-col min-w-0 text-left">
              <span className="truncate text-sm font-extrabold text-slate-950">
                Nikhil Kumar S
              </span>
              <span className="truncate text-xs font-semibold text-slate-500">
                admin@visualizer.io
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            title="Sign out"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600"
            aria-label="Sign out"
          >
            <FiLogOut className="h-4 w-4 stroke-[2]" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
