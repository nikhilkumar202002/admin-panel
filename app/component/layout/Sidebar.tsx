import React from "react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", active: true },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
];

const Sidebar = () => {
  return (
    <aside className="flex h-full w-full flex-col bg-white px-4 py-5 text-slate-950">
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground shadow-sm">
            C
          </div>
          <div>
            <p className="text-base font-semibold tracking-tight">CORCOM</p>
            <p className="text-xs text-slate-500">Corp Community</p>
          </div>
        </div>
      </div>

      <nav aria-label="Primary" className="flex-1 space-y-1 overflow-y-auto py-5 pr-1">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`flex items-center justify-between rounded-2xl px-3 py-3 text-sm font-medium transition ${
              item.active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
            }`}
          >
            <span>{item.label}</span>
            {item.active ? (
              <span className="h-2.5 w-2.5 rounded-full bg-primary-foreground" aria-hidden="true" />
            ) : null}
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
