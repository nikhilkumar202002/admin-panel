import React from "react";

type Project = {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  featured_image: string | null;
  featured_image_alt: string | null;
  category: string;
  client: string;
  project_url: string;
  github_url: string;
  technologies: string;
  featured: number;
  status: number;
  created_at: string;
  updated_at: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Website",
    slug: "e-commerce-website",
    description: "Modern responsive e-commerce website.",
    thumbnail: "/images/projects/ecommerce.jpg",
    featured_image: null,
    featured_image_alt: null,
    category: "Web Development",
    client: "ABC Company",
    project_url: "https://example.com",
    github_url: "https://github.com/example/project",
    technologies: "React, Node.js, MongoDB",
    featured: 1,
    status: 1,
    created_at: "2026-08-16T18:21:12.000000Z",
    updated_at: "2026-08-16T18:21:12.000000Z",
  },
];

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

const Allprojects = () => {
  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-primary">
          Projects
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
          Project table view
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-slate-500">
          A structured view of the projects displayed on the portfolio website.
          This keeps the content easy to scan, edit, and publish.
        </p>
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Project
                </th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Category
                </th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Client
                </th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Technologies
                </th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Featured
                </th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Status
                </th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Created
                </th>
                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 bg-white">
              {projects.map((project) => (
                <tr key={project.id} className="align-top transition hover:bg-slate-50/80">
                  <td className="px-5 py-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-sm font-semibold text-primary">
                        {project.title
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-950">
                          {project.title}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          {project.description}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {project.slug}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {project.category}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {project.client}
                  </td>

                  <td className="px-5 py-4">
                    <p className="max-w-xs text-sm leading-6 text-slate-600">
                      {project.technologies}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        project.featured === 1
                          ? "bg-primary/10 text-primary"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {project.featured === 1 ? "Yes" : "No"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        project.status === 1
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {project.status === 1 ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {formatDate(project.created_at)}
                  </td>

                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={project.project_url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-primary hover:text-primary"
                      >
                        View
                      </a>
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-primary hover:text-primary"
                      >
                        GitHub
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Allprojects;
