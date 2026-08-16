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
        <div className="px-2">
          <p className="text-[20px] font-semibold leading-6 tracking-tight text-slate-950">
            Nikhil Kumar S
          </p>
          <p className="text-sm font-medium text-primary">Visualizer</p>
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
