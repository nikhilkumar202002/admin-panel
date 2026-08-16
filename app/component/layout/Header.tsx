import React from "react";
import Link from "next/link";
import { FiChevronDown, FiMenu, FiPlus } from "react-icons/fi";

type HeaderProps = {
  onMenuClick: () => void;
};

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="border-b border-slate-200 bg-white px-3 py-3 sm:px-4">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-primary/30 hover:bg-primary/5 xl:hidden"
          aria-label="Open sidebar"
        >
          <FiMenu className="text-lg" />
        </button>

        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
          <Link
            href="/projects/create"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition hover:bg-[#e85f00] sm:h-10 sm:w-auto sm:gap-2 sm:px-4"
            aria-label="Add Project"
          >
            <FiPlus className="text-base" />
            <span className="hidden text-sm font-medium sm:inline">
              Add Project
            </span>
          </Link>

          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1 shadow-sm transition hover:border-primary/30 hover:bg-primary/5 sm:gap-2.5 sm:px-2.5"
            aria-label="Profile menu"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#c75100] text-[11px] font-semibold text-white">
              DD
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium text-slate-950">Derek Dalton</p>
              <p className="text-xs text-slate-500">Superadmin</p>
            </div>
            <FiChevronDown className="text-slate-500" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
