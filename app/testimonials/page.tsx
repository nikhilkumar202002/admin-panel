import React from "react";

const testimonials = [
  {
    name: "Ayesha Khan",
    role: "Founder, Studio Bloom",
    quote:
      "The portfolio presentation made it easy for clients to trust the work immediately.",
  },
  {
    name: "Rahul Mehta",
    role: "Product Manager",
    quote:
      "Fast communication, polished design, and a clear process from start to finish.",
  },
];

export default function Page() {
  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-primary">
          Testimonials
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
          Client feedback
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-slate-500">
          A simple place to manage the social proof shown on the portfolio site.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {testimonials.map((item) => (
          <article
            key={item.name}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm leading-6 text-slate-600">
              &quot;{item.quote}&quot;
            </p>
            <div className="mt-4">
              <p className="font-semibold text-slate-950">{item.name}</p>
              <p className="text-sm text-slate-500">{item.role}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
