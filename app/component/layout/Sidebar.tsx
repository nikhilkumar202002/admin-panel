import React from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const Sidebar = () => {
  return (
    <aside className="flex h-full w-full max-w-xs flex-col justify-between border-r border-zinc-200 bg-white px-6 py-8">
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white">
            N
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight text-zinc-900">
              Nikhil
            </p>
            <p className="text-sm text-zinc-500">Portfolio</p>
          </div>
        </div>

        <nav aria-label="Primary" className="space-y-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="space-y-4 pt-8">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
          Available for freelance
        </p>
        <a
          href="#contact"
          className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
        >
          Let&apos;s talk
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
