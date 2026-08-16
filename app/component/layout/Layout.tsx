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
    <div className="h-screen overflow-hidden">
      <div className="mx-auto flex h-full w-full">
        <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white xl:block">
          <Sidebar />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col bg-[#f7f8fa] min-h-0">
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
