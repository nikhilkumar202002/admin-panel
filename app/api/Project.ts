import { API_BASE_URL } from "./Axios";
import { getAuthToken } from "./Auth";

/* =========================================================================
   Types & Interfaces
========================================================================= */

export type ProjectCategory = {
  id: number;
  category_name: string;
  name?: string;
  slug?: string;
  created_at?: string;
  updated_at?: string;
};

export type ProjectCategoryPayload = {
  category_name?: string;
  name?: string;
  slug?: string;
  [key: string]: unknown;
};

export type Technology = {
  id: number;
  technology_name: string;
  name?: string;
  slug?: string;
  icon?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type TechnologyPayload = {
  technology_name?: string;
  name?: string;
  slug?: string;
  icon?: string | null;
  [key: string]: unknown;
};

export type Project = {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  featured_image: string | null;
  featured_image_alt: string | null;
  gallery_images?: string[];
  category: string;
  category_id?: number | string;
  client?: string;
  project_url?: string;
  github_url?: string;
  technologies: string;
  featured: number | boolean;
  status: number | boolean;
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown;
};

export type ProjectPayload = {
  title: string;
  slug?: string;
  description?: string;
  thumbnail?: string;
  featured_image?: string | null;
  featured_image_alt?: string | null;
  gallery_images?: string[];
  category?: string;
  category_id?: number | string;
  client?: string;
  project_url?: string;
  github_url?: string;
  technologies?: string;
  featured?: boolean | number;
  status?: boolean | number;
  [key: string]: unknown;
};

type ApiResponse<T> = {
  success?: boolean;
  data?: T;
  message?: string;
  [key: string]: unknown;
};

/* =========================================================================
   HTTP Request Helpers
========================================================================= */

const getHeaders = (isFormData: boolean = false): Record<string, string> => {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  const token = getAuthToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
};

async function request<T>(
  path: string,
  method: string,
  payload?: unknown,
  errorMessage: string = "Request failed"
): Promise<T> {
  const isFormData = typeof FormData !== "undefined" && payload instanceof FormData;

  const init: RequestInit = {
    method,
    headers: getHeaders(isFormData),
  };

  if (payload !== undefined && payload !== null) {
    init.body = isFormData ? payload : JSON.stringify(payload);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, init);
  const json = (await response.json().catch(() => null)) as ApiResponse<T> | T | null;

  if (!response.ok) {
    const errorMsg =
      (json && typeof json === "object" && "message" in json && typeof json.message === "string"
        ? json.message
        : null) || errorMessage;
    throw new Error(errorMsg);
  }

  // Extract from { success: true, data: T } or return direct JSON
  if (json && typeof json === "object" && "data" in json && (json as ApiResponse<T>).data !== undefined) {
    return (json as ApiResponse<T>).data as T;
  }

  return json as T;
}

/* =========================================================================
   1. Project Categories Endpoints
========================================================================= */

/**
 * GET /project-categories - Get all project categories
 */
export async function getProjectCategories(): Promise<ProjectCategory[]> {
  const result = await request<ProjectCategory[]>(
    "/project-categories",
    "GET",
    undefined,
    "Failed to load project categories."
  );
  return Array.isArray(result) ? result : [];
}

/**
 * POST /project-categories - Create a new project category
 */
export async function createProjectCategory(
  payload: ProjectCategoryPayload | FormData
): Promise<ProjectCategory> {
  return request<ProjectCategory>(
    "/project-categories",
    "POST",
    payload,
    "Failed to create project category."
  );
}

/**
 * GET /project-categories/:id - Get a single project category
 */
export async function getProjectCategory(
  id: number | string
): Promise<ProjectCategory> {
  return request<ProjectCategory>(
    `/project-categories/${id}`,
    "GET",
    undefined,
    `Failed to fetch project category #${id}.`
  );
}

/**
 * PUT /project-categories/:id - Update an existing project category
 */
export async function updateProjectCategory(
  id: number | string,
  payload: ProjectCategoryPayload | FormData
): Promise<ProjectCategory> {
  return request<ProjectCategory>(
    `/project-categories/${id}`,
    "PUT",
    payload,
    `Failed to update project category #${id}.`
  );
}

/**
 * DELETE /project-categories/:id - Delete a project category
 */
export async function deleteProjectCategory(
  id: number | string
): Promise<unknown> {
  return request<unknown>(
    `/project-categories/${id}`,
    "DELETE",
    undefined,
    `Failed to delete project category #${id}.`
  );
}

/* =========================================================================
   2. Technologies Endpoints
========================================================================= */

/**
 * GET /technologies - Get all technologies
 */
export async function getTechnologies(): Promise<Technology[]> {
  const result = await request<Technology[]>(
    "/technologies",
    "GET",
    undefined,
    "Failed to load technologies."
  );
  return Array.isArray(result) ? result : [];
}

/**
 * POST /technologies - Create a new technology
 */
export async function createTechnology(
  payload: TechnologyPayload | FormData
): Promise<Technology> {
  return request<Technology>(
    "/technologies",
    "POST",
    payload,
    "Failed to create technology."
  );
}

/**
 * GET /technologies/:id - Get a single technology
 */
export async function getTechnology(
  id: number | string
): Promise<Technology> {
  return request<Technology>(
    `/technologies/${id}`,
    "GET",
    undefined,
    `Failed to fetch technology #${id}.`
  );
}

/**
 * PUT /technologies/:id - Update an existing technology
 */
export async function updateTechnology(
  id: number | string,
  payload: TechnologyPayload | FormData
): Promise<Technology> {
  return request<Technology>(
    `/technologies/${id}`,
    "PUT",
    payload,
    `Failed to update technology #${id}.`
  );
}

/**
 * DELETE /technologies/:id - Delete a technology
 */
export async function deleteTechnology(
  id: number | string
): Promise<unknown> {
  return request<unknown>(
    `/technologies/${id}`,
    "DELETE",
    undefined,
    `Failed to delete technology #${id}.`
  );
}

/* =========================================================================
   3. Projects Endpoints
========================================================================= */

/**
 * GET /projects - Get all projects
 */
export async function getProjects(): Promise<Project[]> {
  const result = await request<Project[]>(
    "/projects",
    "GET",
    undefined,
    "Failed to load projects."
  );
  return Array.isArray(result) ? result : [];
}

/**
 * POST /projects - Create a new project
 */
export async function createProject(
  payload: ProjectPayload | FormData
): Promise<Project> {
  return request<Project>(
    "/projects",
    "POST",
    payload,
    "Failed to create project."
  );
}

/**
 * GET /projects/:id - Get a single project
 */
export async function getProject(
  id: number | string
): Promise<Project> {
  return request<Project>(
    `/projects/${id}`,
    "GET",
    undefined,
    `Failed to fetch project #${id}.`
  );
}

/**
 * PUT /projects/:id - Update an existing project
 */
export async function updateProject(
  id: number | string,
  payload: ProjectPayload | FormData
): Promise<Project> {
  return request<Project>(
    `/projects/${id}`,
    "PUT",
    payload,
    `Failed to update project #${id}.`
  );
}

/**
 * DELETE /projects/:id - Delete a project
 */
export async function deleteProject(
  id: number | string
): Promise<unknown> {
  return request<unknown>(
    `/projects/${id}`,
    "DELETE",
    undefined,
    `Failed to delete project #${id}.`
  );
}