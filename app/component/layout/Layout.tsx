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
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <Header />

      <div className="mx-auto flex w-full max-w-6xl gap-6 px-4 py-6 lg:px-6">
        <aside className="sticky top-6 hidden h-[calc(100vh-6rem)] w-72 shrink-0 lg:block">
          <Sidebar />
        </aside>

        <main className="min-w-0 flex-1 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
