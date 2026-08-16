import React from "react";

const stats = [
  { label: "Revenue", value: "$24.8k", change: "+12%" },
  { label: "Clients", value: "128", change: "+8" },
  { label: "Tasks", value: "14", change: "3 due today" },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-primary">
          Dashboard
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
          Welcome back, Nikhil
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-slate-500">
          Here is a quick snapshot of your admin panel. Keep an eye on project
          progress, client activity, and the tasks that need attention today.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-slate-500">{stat.label}</p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <p className="text-3xl font-semibold tracking-tight text-slate-950">
                {stat.value}
              </p>
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-slate-950">
                Recent activity
              </h3>
              <p className="text-sm text-slate-500">
                Latest updates from the workspace.
              </p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              Live
            </span>
          </div>

          <div className="mt-5 space-y-4">
            {[ 
              "New client enquiry from website form",
              "Project brief updated for landing page redesign",
              "Payment received for monthly retainer",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3"
              >
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                <p className="text-sm leading-6 text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-primary/15 bg-primary p-5 text-white shadow-sm">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/70">
            Priority
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight">
            3 tasks need review today
          </h3>
          <p className="mt-3 text-sm leading-6 text-white/80">
            Review pending deliverables, approve the latest content changes, and
            follow up with the two active leads.
          </p>

          <button className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-orange-50">
            Open task queue
          </button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
