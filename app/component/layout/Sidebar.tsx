"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiX } from "react-icons/fi";

type SidebarProps = {
  onClose?: () => void;
  onNavigate?: () => void;
};

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Projects", href: "/projects" },
  { label: "Testimonials", href: "/testimonials" },
];

const Sidebar = ({ onClose, onNavigate }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-full flex-col bg-white px-3 py-4 text-slate-950 sm:px-4 sm:py-5">
      <div className="flex items-start justify-between border-b border-slate-200 pb-4">
        <div className="px-1">
          <p className="text-[18px] font-semibold leading-6 tracking-tight text-slate-950 sm:text-[20px]">
            Nikhil Kumar S
          </p>
          <p className="text-sm font-medium text-primary">Visualizer</p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-primary/30 hover:bg-primary/5 xl:hidden"
          aria-label="Close sidebar"
        >
          <FiX className="text-lg" />
        </button>
      </div>

      <nav
        aria-label="Primary"
        className="flex-1 space-y-1 overflow-y-auto py-4 pr-0.5"
      >
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              onClick={onNavigate}
              className={`flex items-center justify-between rounded-2xl px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              }`}
            >
              <span>{item.label}</span>
              {isActive ? (
                <span
                  className="h-2.5 w-2.5 rounded-full bg-primary-foreground"
                  aria-hidden="true"
                />
              ) : null}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
