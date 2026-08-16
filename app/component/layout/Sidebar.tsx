"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Projects", href: "/projects" },
  { label: "Testimonials", href: "/testimonials" },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-full flex-col bg-white px-4 py-5 text-slate-950">
      <div className="border-b border-slate-200 pb-5">
        <div className="px-2">
          <p className="text-[20px] font-semibold leading-6 tracking-tight text-slate-950">
            Nikhil Kumar S
          </p>
          <p className="text-sm font-medium text-primary">Visualizer</p>
        </div>
      </div>

      <nav
        aria-label="Primary"
        className="flex-1 space-y-1 overflow-y-auto py-5 pr-1"
      >
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center justify-between rounded-2xl px-3 py-3 text-sm font-medium transition ${
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
