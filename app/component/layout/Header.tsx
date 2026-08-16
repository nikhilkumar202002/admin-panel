import React from "react";

const navItems = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  return (
    <header className="w-full border-b border-zinc-200 bg-white/95 px-6 py-4 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white">
            N
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight text-zinc-900">
              Nikhil
            </p>
            <p className="text-xs text-zinc-500">Portfolio</p>
          </div>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-2 sm:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:border-zinc-900 hover:bg-zinc-900 hover:text-white"
        >
          Hire me
        </a>
      </div>
    </header>
  );
};

export default Header;
