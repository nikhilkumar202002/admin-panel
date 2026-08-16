import React from "react";
import { FiChevronDown, FiPlus } from "react-icons/fi";

const Header = () => {
  return (
    <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
      <div className="flex items-center justify-end gap-3">
        <button className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-[#e85f00]">
          <FiPlus className="text-base" />
          <span>New Project</span>
        </button>

        <button
          type="button"
          className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:border-primary/30 hover:bg-primary/5"
          aria-label="Profile menu"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#c75100] text-xs font-semibold text-white">
            DD
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium text-slate-950">Derek Dalton</p>
            <p className="text-xs text-slate-500">Superadmin</p>
          </div>
          <FiChevronDown className="text-slate-500" />
        </button>
      </div>
    </header>
  );
};

export default Header;
