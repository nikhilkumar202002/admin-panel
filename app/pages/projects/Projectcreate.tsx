"use client";

import React, { FormEvent, useMemo, useState } from "react";

type ProjectPayload = {
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  featured_image: string;
  featured_image_alt: string;
  gallery_images: string[];
  category: string;
  client: string;
  project_url: string;
  github_url: string;
  technologies: string;
  featured: boolean;
  status: boolean;
};

type FormState = {
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  featured_image: string;
  featured_image_alt: string;
  gallery_images: string;
  category: string;
  client: string;
  project_url: string;
  github_url: string;
  technologies: string;
  featured: boolean;
  status: boolean;
};

const initialState: FormState = {
  title: "",
  slug: "",
  description: "",
  thumbnail: "",
  featured_image: "",
  featured_image_alt: "",
  gallery_images: "",
  category: "",
  client: "",
  project_url: "",
  github_url: "",
  technologies: "",
  featured: false,
  status: false,
};

const fieldClass =
  "mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/15";

const labelClass = "block text-sm font-medium text-slate-700";

const buildPayload = (form: FormState): ProjectPayload => ({
  title: form.title.trim(),
  slug: form.slug.trim(),
  description: form.description.trim(),
  thumbnail: form.thumbnail.trim(),
  featured_image: form.featured_image.trim(),
  featured_image_alt: form.featured_image_alt.trim(),
  gallery_images: form.gallery_images
    .split("\n")
    .map((url) => url.trim())
    .filter(Boolean),
  category: form.category.trim(),
  client: form.client.trim(),
  project_url: form.project_url.trim(),
  github_url: form.github_url.trim(),
  technologies: form.technologies.trim(),
  featured: form.featured,
  status: form.status,
});

const Projectcreate = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [submittedPayload, setSubmittedPayload] = useState<ProjectPayload | null>(
    null
  );

  const previewPayload = useMemo(() => buildPayload(form), [form]);

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setForm((current) => ({
      ...current,
      [name]: value,
    } as FormState));
  };

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.currentTarget;
    setForm((current) => ({
      ...current,
      [name]: checked,
    } as FormState));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedPayload(previewPayload);
  };

  const handleReset = () => {
    setForm(initialState);
    setSubmittedPayload(null);
  };

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-primary">
          Projects
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
          Create project
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-slate-500">
          Start with a blank project entry and fill in the API fields as needed.
        </p>
      </section>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
        >
          <section className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label htmlFor="title" className={labelClass}>
                Title
              </label>
              <input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                className={fieldClass}
                placeholder="Project title"
              />
            </div>

            <div>
              <label htmlFor="slug" className={labelClass}>
                Slug
              </label>
              <input
                id="slug"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                className={fieldClass}
                placeholder="project-slug"
              />
            </div>

            <div>
              <label htmlFor="category" className={labelClass}>
                Category
              </label>
              <input
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                className={fieldClass}
                placeholder="Web Development"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className={labelClass}>
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className={fieldClass}
                placeholder="Short project description"
              />
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Media
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label htmlFor="thumbnail" className={labelClass}>
                  Thumbnail URL
                </label>
                <input
                  id="thumbnail"
                  name="thumbnail"
                  value={form.thumbnail}
                  onChange={handleChange}
                  className={fieldClass}
                  placeholder="https://..."
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="featured_image" className={labelClass}>
                  Featured Image URL
                </label>
                <input
                  id="featured_image"
                  name="featured_image"
                  value={form.featured_image}
                  onChange={handleChange}
                  className={fieldClass}
                  placeholder="https://..."
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="featured_image_alt" className={labelClass}>
                  Featured Image Alt Text
                </label>
                <input
                  id="featured_image_alt"
                  name="featured_image_alt"
                  value={form.featured_image_alt}
                  onChange={handleChange}
                  className={fieldClass}
                  placeholder="Alt text for the featured image"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="gallery_images" className={labelClass}>
                  Gallery Images
                </label>
                <textarea
                  id="gallery_images"
                  name="gallery_images"
                  value={form.gallery_images}
                  onChange={handleChange}
                  rows={5}
                  className={fieldClass}
                  placeholder="One URL per line"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Enter one image URL per line.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Project Details
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="client" className={labelClass}>
                  Client
                </label>
                <input
                  id="client"
                  name="client"
                  value={form.client}
                  onChange={handleChange}
                  className={fieldClass}
                  placeholder="Client name"
                />
              </div>

              <div>
                <label htmlFor="technologies" className={labelClass}>
                  Technologies
                </label>
                <input
                  id="technologies"
                  name="technologies"
                  value={form.technologies}
                  onChange={handleChange}
                  className={fieldClass}
                  placeholder="React, Node.js, ..."
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="project_url" className={labelClass}>
                  Project URL
                </label>
                <input
                  id="project_url"
                  name="project_url"
                  value={form.project_url}
                  onChange={handleChange}
                  className={fieldClass}
                  placeholder="Project website URL"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="github_url" className={labelClass}>
                  GitHub URL
                </label>
                <input
                  id="github_url"
                  name="github_url"
                  value={form.github_url}
                  onChange={handleChange}
                  className={fieldClass}
                  placeholder="https://github.com/..."
                />
              </div>
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2">
            <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <span className="text-sm font-medium text-slate-700">Featured</span>
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleCheckbox}
                className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
              />
            </label>

            <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <span className="text-sm font-medium text-slate-700">Status</span>
              <input
                type="checkbox"
                name="status"
                checked={form.status}
                onChange={handleCheckbox}
                className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
              />
            </label>
          </section>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-[#e85f00]"
            >
              Save Project
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:border-primary/30 hover:text-primary"
            >
              Reset
            </button>
          </div>
        </form>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-primary">
              Payload preview
            </p>
            <pre className="mt-4 overflow-x-auto rounded-2xl bg-slate-950 p-4 text-xs leading-6 text-slate-100">
              {JSON.stringify(previewPayload, null, 2)}
            </pre>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-primary">
              Submitted payload
            </p>
            {submittedPayload ? (
              <pre className="mt-4 overflow-x-auto rounded-2xl bg-slate-50 p-4 text-xs leading-6 text-slate-700">
                {JSON.stringify(submittedPayload, null, 2)}
              </pre>
            ) : (
              <p className="mt-4 text-sm text-slate-500">
                Nothing submitted yet.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Projectcreate;
