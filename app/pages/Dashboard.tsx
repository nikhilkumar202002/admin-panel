import React from "react";

const stats = [
  { label: "Profile Views", value: "12.4k", change: "+18%" },
  { label: "Project Clicks", value: "3.8k", change: "+9%" },
  { label: "Contact Leads", value: "86", change: "+14" },
  { label: "Testimonials", value: "24", change: "+4" },
];

const funnel = [
  { label: "Homepage visits", value: "8,420", meta: "Organic + social traffic" },
  { label: "Portfolio clicks", value: "2,136", meta: "Case studies and projects" },
  { label: "Inquiry submissions", value: "86", meta: "Contact form and direct email" },
  { label: "Qualified leads", value: "31", meta: "Shortlisted for follow-up" },
];

const activity = [
  "New inquiry from the hero contact button",
  "Most viewed project: Brand refresh case study",
  "Testimonial added from a recent client",
  "Resume download clicked from the about section",
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-primary">
          Portfolio backend
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
          Personal website KPI overview
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-slate-500">
          Track how your portfolio is performing across visits, project clicks,
          inquiries, and testimonials so you can see what content is helping
          people connect with your work.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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

      <section className="grid gap-4 lg:grid-cols-[1.25fr_0.95fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-slate-950">
                Conversion funnel
              </h3>
              <p className="text-sm text-slate-500">
                From landing page visits to qualified leads.
              </p>
            </div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              This month
            </span>
          </div>

          <div className="mt-5 space-y-4">
            {funnel.map((item, index) => {
              const width = [88, 64, 41, 22][index] ?? 20;

              return (
                <div key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-slate-950">
                        {item.label}
                      </p>
                      <p className="text-xs text-slate-500">{item.meta}</p>
                    </div>
                    <p className="text-sm font-semibold text-slate-950">
                      {item.value}
                    </p>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-primary/15 bg-primary p-5 text-white shadow-sm">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/70">
            Portfolio goal
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight">
            Turn more visitors into inquiries
          </h3>
          <p className="mt-3 text-sm leading-6 text-white/80">
            Focus on stronger project case studies, clearer call-to-action
            blocks, and higher trust signals such as testimonials and client
            logos.
          </p>

          <button className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-orange-50">
            Review portfolio copy
          </button>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-slate-950">
                Website activity
              </h3>
              <p className="text-sm text-slate-500">
                What users are doing on the portfolio site.
              </p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              Live
            </span>
          </div>

          <div className="mt-5 space-y-3">
            {activity.map((item) => (
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

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-primary">
            Quick insights
          </p>
          <div className="mt-4 space-y-4">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Top traffic source</p>
              <p className="mt-1 text-lg font-semibold text-slate-950">
                Instagram bio link
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Best-performing section</p>
              <p className="mt-1 text-lg font-semibold text-slate-950">
                Projects showcase
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Average response time</p>
              <p className="mt-1 text-lg font-semibold text-slate-950">
                2 hours 14 minutes
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
