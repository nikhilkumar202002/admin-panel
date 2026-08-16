import React from "react";

const Header = () => {
  return (
    <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="min-w-0 flex-1">
          <label className="flex h-12 w-full items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 text-sm text-slate-500 shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
            <span className="text-slate-400" aria-hidden="true">
              Search
            </span>
            <input
              type="search"
              placeholder="Search users, reports, orders"
              className="w-full bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-400"
            />
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button className="inline-flex h-12 items-center gap-3 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-[#e85f00]">
            <span className="text-base leading-none">+</span>
            <span>Add</span>
            <span className="border-l border-white/15 pl-3 text-xs">v</span>
          </button>

          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-sm text-primary shadow-sm transition hover:border-primary/30 hover:bg-primary/5"
            aria-label="Notifications"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-25" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
          </button>

          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-sm text-primary shadow-sm transition hover:border-primary/30 hover:bg-primary/5"
            aria-label="Settings"
          >
            <span className="h-2.5 w-2.5 rounded-full border-2 border-primary" />
          </button>

          <button
            type="button"
            className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:border-primary/30 hover:bg-primary/5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#c75100] text-xs font-semibold text-white">
              DD
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium text-slate-950">Derek Dalton</p>
              <p className="text-xs text-slate-500">Superadmin</p>
            </div>
            <span className="text-xs text-primary">v</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
