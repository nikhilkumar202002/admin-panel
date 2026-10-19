import { API_BASE_URL } from "./Axios";
import { getAuthHeaders } from "./Auth";

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
  client: string;
  project_url: string;
  github_url: string;
  technologies: string;
  featured: number | boolean;
  status: number | boolean;
  created_at?: string;
  updated_at?: string;
};

export type ProjectPayload = {
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  featured_image: string | null;
  featured_image_alt: string | null;
  gallery_images: string[];
  category: string;
  client: string;
  project_url: string;
  github_url: string;
  technologies: string;
  featured: boolean;
  status: boolean;
};

export type ProjectCategory = {
  id?: number;
  category_name: string;
  created_at?: string;
  updated_at?: string;
};

export type ProjectCategoryPayload = {
  category_name: string;
};

export type Technology = {
  id?: number;
  technology_name: string;
  created_at?: string;
  updated_at?: string;
};

export type TechnologyPayload = {
  technology_name: string;
};

type ApiResponse<T> = {
  success?: boolean;
  data?: T;
  message?: string;
  [key: string]: unknown;
};

const parseJson = async <T>(response: Response) =>
  (await response.json().catch(() => null)) as ApiResponse<T> | null;

const getRequestHeaders = () => ({
  ...getAuthHeaders(),
});

const requestJson = async <T>(
  path: string,
  init: RequestInit,
  errorMessage: string
) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      ...getRequestHeaders(),
      ...(init.headers ?? {}),
    },
  });

  const body = await parseJson<T>(response);

  if (!response.ok) {
    throw new Error(body?.message ?? errorMessage);
  }

  if (body?.success === false) {
    throw new Error(body?.message ?? errorMessage);
  }

  return body?.data ?? null;
};

export async function getProjects() {
  const data = await requestJson<Project[]>(
    "/projects",
    {
      method: "GET",
    },
    "Failed to load projects."
  );

  return Array.isArray(data) ? data : [];
}

export async function createProject(payload: ProjectPayload) {
  return requestJson<Project>(
    "/projects",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
    "Failed to create project."
  );
}

export async function getProjectCategories() {
  const data = await requestJson<ProjectCategory[]>(
    "/project-categories",
    {
      method: "GET",
    },
    "Failed to load project categories."
  );

  return Array.isArray(data) ? data : [];
}

export async function createProjectCategory(payload: ProjectCategoryPayload) {
  return requestJson<ProjectCategory>(
    "/project-categories",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
    "Failed to create project category."
  );
}

export async function updateProjectCategory(
  id: number,
  payload: ProjectCategoryPayload
) {
  return requestJson<ProjectCategory>(
    `/project-categories/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
    "Failed to update project category."
  );
}

export async function deleteProjectCategory(id: number) {
  return requestJson<null>(
    `/project-categories/${id}`,
    {
      method: "DELETE",
    },
    "Failed to delete project category."
  );
}

export async function getTechnologies() {
  const data = await requestJson<Technology[]>(
    "/technologies",
    {
      method: "GET",
    },
    "Failed to load technologies."
  );

  return Array.isArray(data) ? data : [];
}

export async function createTechnology(payload: TechnologyPayload) {
  return requestJson<Technology>(
    "/technologies",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
    "Failed to create technology."
  );
}

export async function updateTechnology(id: number, payload: TechnologyPayload) {
  return requestJson<Technology>(
    `/technologies/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
    "Failed to update technology."
  );
}

export async function deleteTechnology(id: number) {
  return requestJson<null>(
    `/technologies/${id}`,
    {
      method: "DELETE",
    },
    "Failed to delete technology."
  );
}
