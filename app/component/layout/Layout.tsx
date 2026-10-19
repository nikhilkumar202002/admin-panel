"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { getAuthToken } from "@/app/api/Auth";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (pathname !== "/" && !getAuthToken()) {
      router.push("/");
    }
  }, [pathname, router]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isSidebarOpen]);

  if (pathname === "/") {
    return <>{children}</>;
  }

  return (
    <div className="h-screen overflow-hidden bg-[#f8fafc] font-google-sans text-slate-900">
      <div className="flex h-full w-full">
        <aside className="hidden w-72 shrink-0 border-r border-slate-200/80 bg-white xl:block">
          <Sidebar />
        </aside>

        <div
          className={`fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-xs transition-opacity xl:hidden ${
            isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden="true"
          onClick={() => setIsSidebarOpen(false)}
        />

        <aside
          className={`fixed inset-y-0 left-0 z-50 w-[280px] max-w-[86vw] border-r border-slate-200/80 bg-white shadow-2xl transition-transform duration-300 xl:hidden ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar
            onClose={() => setIsSidebarOpen(false)}
            onNavigate={() => setIsSidebarOpen(false)}
          />
        </aside>

        <div className="flex min-w-0 flex-1 min-h-0 flex-col bg-[#f8fafc]">
          <Header onMenuClick={() => setIsSidebarOpen(true)} />

          <main className="min-w-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
