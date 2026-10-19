"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  FiPlus,
  FiExternalLink,
  FiGithub,
  FiTrash2,
  FiStar,
  FiRefreshCw,
  FiSearch,
  FiFolder,
  FiAlertCircle,
  FiCheckCircle,
  FiLogIn,
} from "react-icons/fi";
import { getProjects, deleteProject, type Project } from "@/app/api/Project";
import { getAuthToken } from "@/app/api/Auth";

const formatDate = (value?: string) => {
  if (!value) return "—";

  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return value;
  }
};

const getInitials = (title?: string) => {
  if (!title) return "P";
  return (
    title
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "P"
  );
};

// Intelligently resolve storage/backend image URLs
const resolveThumbnailUrl = (project: Project): string | null => {
  let url =
    project.thumbnail_url ||
    (typeof project.thumbnail === "string" ? project.thumbnail : null);
  if (!url) return null;

  // Rewrite localhost:80 without port to 127.0.0.1:8000
  if (url.includes("localhost/storage")) {
    url = url.replace("localhost/storage", "127.0.0.1:8000/storage");
  } else if (url.includes("127.0.0.1/storage")) {
    url = url.replace("127.0.0.1/storage", "127.0.0.1:8000/storage");
  }

  // Already a full URL
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // Relative storage path
  if (url.startsWith("/")) {
    if (url.startsWith("/storage/")) {
      return `http://127.0.0.1:8000${url}`;
    }
    return `http://127.0.0.1:8000/storage${url}`;
  }

  return `http://127.0.0.1:8000/storage/${url}`;
};

// Thumbnail subcomponent with automatic fallback on 404/broken URL
const ProjectThumbnail = ({
  src,
  title,
}: {
  src: string | null;
  title: string;
}) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className="flex h-12 w-16 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-xs font-black text-[#fb6c00] shadow-2xs">
        {getInitials(title)}
      </div>
    );
  }

  return (
    <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-2xs">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={title}
        onError={() => setHasError(true)}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    </div>
  );
};

const Allprojects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<number | string | null>(null);

  const loadProjects = async () => {
    const token = getAuthToken();
    if (!token) {
      setIsUnauthorized(true);
      setIsLoading(false);
      setError("Authentication required: Please sign in to view your projects.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setIsUnauthorized(false);

    try {
      const data = await getProjects();
      setProjects(Array.isArray(data) ? data : []);
    } catch (loadError) {
      const msg =
        loadError instanceof Error
          ? loadError.message
          : "Failed to load projects.";
      setError(msg);
      if (
        msg.toLowerCase().includes("unauthenticated") ||
        msg.toLowerCase().includes("unauthorized")
      ) {
        setIsUnauthorized(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    async function fetchInitialProjects() {
      const token = getAuthToken();
      if (!token) {
        if (isMounted) {
          setIsUnauthorized(true);
          setIsLoading(false);
          setError("Authentication required: Please sign in to view your projects.");
        }
        return;
      }

      try {
        const data = await getProjects();
        if (isMounted) {
          setProjects(Array.isArray(data) ? data : []);
        }
      } catch (loadError) {
        if (isMounted) {
          const msg =
            loadError instanceof Error
              ? loadError.message
              : "Failed to load projects.";
          setError(msg);
          if (
            msg.toLowerCase().includes("unauthenticated") ||
            msg.toLowerCase().includes("unauthorized")
          ) {
            setIsUnauthorized(true);
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchInitialProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = async (id: number | string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      setDeletingId(id);
      await deleteProject(id);
      setSuccessNotice(`Project "${title}" was successfully deleted.`);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setTimeout(() => setSuccessNotice(null), 4000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete project."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // Helper to extract category name from multiple API variations
  const getCategoryName = (project: Project): string => {
    if (project.category_name && typeof project.category_name === "string") {
      return project.category_name;
    }
    if (typeof project.category === "string" && project.category) {
      return project.category;
    }
    if (
      project.category &&
      typeof project.category === "object" &&
      "category_name" in project.category &&
      typeof project.category.category_name === "string"
    ) {
      return project.category.category_name;
    }
    if (
      project.category &&
      typeof project.category === "object" &&
      "name" in project.category &&
      typeof project.category.name === "string"
    ) {
      return project.category.name;
    }
    return "General";
  };

  // Helper to extract technology names list
  const getTechnologyList = (project: Project): string[] => {
    if (
      Array.isArray(project.technology_names) &&
      project.technology_names.length > 0
    ) {
      return project.technology_names;
    }
    if (
      Array.isArray(project.technologies) &&
      project.technologies.length > 0
    ) {
      return project.technologies
        .map((t) =>
          typeof t === "string" ? t : t?.name || t?.technology_name || ""
        )
        .filter(Boolean);
    }
    if (
      typeof project.technologies === "string" &&
      project.technologies.trim()
    ) {
      return project.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }
    return [];
  };

  // Filter projects by search query
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;
    const q = searchQuery.toLowerCase();
    return projects.filter((p) => {
      const title = p.title?.toLowerCase() || "";
      const desc = p.description?.toLowerCase() || "";
      const cat = getCategoryName(p).toLowerCase();
      const client = p.client?.toLowerCase() || "";
      const techs = getTechnologyList(p).join(" ").toLowerCase();
      return (
        title.includes(q) ||
        desc.includes(q) ||
        cat.includes(q) ||
        client.includes(q) ||
        techs.includes(q)
      );
    });
  }, [projects, searchQuery]);

  return (
    <div className="space-y-6 font-google-sans text-slate-950">
      {/* Top Header Section */}
      <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#fb6c00]">
              Portfolio Manager
            </span>
            <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[11px] font-black text-[#fb6c00]">
              {projects.length} Total
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
            Projects
          </h2>
          <p className="mt-1 text-sm font-semibold text-slate-500">
            View, search, and manage your portfolio projects and showcase items.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={loadProjects}
            disabled={isLoading}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 shadow-2xs transition hover:bg-slate-50 hover:text-slate-950 disabled:opacity-50"
            title="Refresh projects list"
            aria-label="Refresh projects list"
          >
            <FiRefreshCw
              className={`h-4 w-4 ${isLoading ? "animate-spin text-[#fb6c00]" : ""}`}
            />
          </button>

          <Link
            href="/projects/create"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#fb6c00] to-[#eb5a00] px-4 text-sm font-bold text-white shadow-xs shadow-orange-500/25 transition hover:brightness-105 active:scale-[0.98]"
          >
            <FiPlus className="h-4 w-4 stroke-[2.5]" />
            <span>New Project</span>
          </Link>
        </div>
      </section>

      {/* Unauthorized Session Alert */}
      {isUnauthorized && (
        <div
          role="alert"
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-amber-300 bg-amber-50 p-4 sm:p-5 text-amber-950 shadow-xs"
        >
          <div className="flex items-start gap-3">
            <FiLogIn className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <div>
              <p className="font-extrabold text-sm text-slate-950">
                Authentication Required (401)
              </p>
              <p className="mt-0.5 text-xs font-semibold text-amber-900">
                You are currently not signed in or your session has expired. Please sign in to load and manage your projects.
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#fb6c00] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#eb5a00]"
          >
            <span>Sign In Now</span>
          </Link>
        </div>
      )}

      {/* General Error Banner */}
      {error && !isUnauthorized && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-950"
        >
          <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
          <div className="flex-1">{error}</div>
        </div>
      )}

      {/* Success Notification */}
      {successNotice && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-950"
        >
          <FiCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
          <div className="flex-1">{successNotice}</div>
        </div>
      )}

      {/* Table Container Card */}
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-900/5">
        {/* Table Search & Filter Bar */}
        <div className="border-b border-slate-200/80 bg-slate-50/50 px-4 py-3 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <FiSearch className="h-4 w-4 stroke-[2.2]" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by title, category, or technology..."
                className="w-full rounded-xl border border-slate-300 bg-white py-2 pl-9 pr-4 text-xs font-semibold text-slate-950 placeholder:font-normal placeholder:text-slate-400 shadow-2xs transition focus:border-[#fb6c00] focus:outline-none focus:ring-2 focus:ring-[#fb6c00]/15"
              />
            </div>

            <div className="text-xs font-bold text-slate-500">
              Showing{" "}
              <span className="text-slate-950 font-black">
                {filteredProjects.length}
              </span>{" "}
              of {projects.length}
            </div>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3.5 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                  Project
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                  Category
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                  Client
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                  Technologies
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                  Featured
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                  Status
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                  Date
                </th>
                <th className="px-5 py-3.5 text-right text-xs font-black uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 bg-white text-slate-900">
              {isLoading ? (
                <tr>
                  <td
                    className="px-5 py-12 text-center text-sm font-semibold text-slate-500"
                    colSpan={8}
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <FiRefreshCw className="h-6 w-6 animate-spin text-[#fb6c00]" />
                      <span>Loading projects from server...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredProjects.length === 0 ? (
                <tr>
                  <td className="px-5 py-16 text-center" colSpan={8}>
                    <div className="mx-auto flex max-w-sm flex-col items-center justify-center text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-[#fb6c00] mb-3">
                        <FiFolder className="h-6 w-6" />
                      </div>
                      <p className="text-base font-extrabold text-slate-950">
                        {searchQuery
                          ? "No matching projects"
                          : isUnauthorized
                          ? "Sign in to view projects"
                          : "No projects found"}
                      </p>
                      <p className="mt-1 text-xs font-semibold text-slate-500">
                        {searchQuery
                          ? "Try adjusting your search criteria or clear the filter."
                          : isUnauthorized
                          ? "You must be signed in with your admin credentials to load project records."
                          : "Your portfolio doesn't have any projects yet. Create your first one!"}
                      </p>
                      {!searchQuery && !isUnauthorized && (
                        <Link
                          href="/projects/create"
                          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#fb6c00] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#eb5a00]"
                        >
                          <FiPlus className="h-3.5 w-3.5" />
                          <span>Create Project</span>
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => {
                  const isFeatured = Boolean(project.featured);
                  const isActive = Boolean(project.status);
                  const categoryName = getCategoryName(project);
                  const techList = getTechnologyList(project);
                  const thumbnailSrc = resolveThumbnailUrl(project);

                  return (
                    <tr
                      key={project.id}
                      className="align-middle transition hover:bg-slate-50/70"
                    >
                      {/* Project info & thumbnail */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3.5">
                          <ProjectThumbnail
                            src={thumbnailSrc}
                            title={project.title}
                          />

                          <div className="min-w-0 max-w-xs">
                            <p className="font-extrabold text-slate-950 leading-snug truncate">
                              {project.title}
                            </p>
                            {project.description && (
                              <p className="mt-0.5 text-xs font-semibold text-slate-500 line-clamp-1">
                                {project.description}
                              </p>
                            )}
                            <p className="mt-0.5 text-[11px] font-mono font-bold text-slate-400 truncate">
                              /{project.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-800">
                          {categoryName}
                        </span>
                      </td>

                      {/* Client */}
                      <td className="px-5 py-4 text-xs font-bold text-slate-700">
                        {project.client || "—"}
                      </td>

                      {/* Technologies */}
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {techList.length > 0 ? (
                            techList.map((tech, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-bold text-slate-800 shadow-2xs"
                              >
                                {tech}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-slate-400 font-medium">
                              —
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Featured */}
                      <td className="px-5 py-4">
                        {isFeatured ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-xs font-extrabold text-amber-800">
                            <FiStar className="h-3 w-3 fill-amber-500 text-amber-500" />
                            Featured
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-500">
                            Standard
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-extrabold ${
                            isActive
                              ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              isActive ? "bg-emerald-500" : "bg-slate-400"
                            }`}
                          />
                          {isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4 text-xs font-bold text-slate-600 whitespace-nowrap">
                        {formatDate(project.created_at)}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {project.project_url && (
                            <a
                              href={project.project_url}
                              target="_blank"
                              rel="noreferrer"
                              title="View Live Project"
                              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-[#fb6c00] hover:text-[#fb6c00] hover:bg-orange-50 shadow-2xs"
                            >
                              <FiExternalLink className="h-3.5 w-3.5 stroke-[2]" />
                            </a>
                          )}

                          {project.github_url && (
                            <a
                              href={project.github_url}
                              target="_blank"
                              rel="noreferrer"
                              title="View GitHub Repository"
                              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-[#fb6c00] hover:text-[#fb6c00] hover:bg-orange-50 shadow-2xs"
                            >
                              <FiGithub className="h-3.5 w-3.5" />
                            </a>
                          )}

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(project.id, project.title)
                            }
                            disabled={deletingId === project.id}
                            title="Delete Project"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:border-red-300 hover:text-red-600 hover:bg-red-50 shadow-2xs disabled:opacity-50"
                          >
                            <FiTrash2 className="h-3.5 w-3.5 stroke-[2]" />
                          </button>
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
