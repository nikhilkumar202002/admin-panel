"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Sidebar from "./Sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();

  if (pathname === "/") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_#f8f1ea_0%,_#faf7f3_42%,_#eff2f6_100%)] p-4 text-slate-950 lg:p-6">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[1600px] overflow-hidden rounded-[32px] border border-white/80 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)] lg:min-h-[calc(100vh-3rem)]">
        <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white xl:block">
          <Sidebar />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col bg-[#f7f8fa]">
          <Header />

          <main className="min-w-0 flex-1 overflow-y-auto p-4 sm:p-5 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
