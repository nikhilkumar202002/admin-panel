"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getProjects, type Project } from "@/app/api/Service";

const formatDate = (value?: string) => {
  if (!value) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
};

const getInitials = (title: string) =>
  title
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "P";

const Allprojects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getProjects();

        if (isMounted) {
          setProjects(data);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Failed to load projects."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-primary">
          Projects
        </p>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
              Project table view
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              A clean view of the projects on your portfolio website, loaded
              directly from the API.
            </p>
          </div>

          <Link
            href="/projects/create"
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-[#e85f00]"
          >
            New Project
          </Link>
        </div>
      </section>

      {error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

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
              {isLoading ? (
                <tr>
                  <td className="px-5 py-8 text-sm text-slate-500" colSpan={8}>
                    Loading projects...
                  </td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td className="px-5 py-8 text-sm text-slate-500" colSpan={8}>
                    No projects found. Create your first project to get started.
                  </td>
                </tr>
              ) : (
                projects.map((project) => {
                  const isFeatured = Boolean(project.featured);
                  const isActive = Boolean(project.status);

                  return (
                    <tr
                      key={project.id}
                      className="align-top transition hover:bg-slate-50/80"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-sm font-semibold text-primary">
                            {getInitials(project.title)}
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
                            isFeatured
                              ? "bg-primary/10 text-primary"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {isFeatured ? "Yes" : "No"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                            isActive
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {formatDate(project.created_at)}
                      </td>

                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={project.project_url || "#"}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-primary hover:text-primary"
                          >
                            View
                          </a>
                          <a
                            href={project.github_url || "#"}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-primary hover:text-primary"
                          >
                            GitHub
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Allprojects;
