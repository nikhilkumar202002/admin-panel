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

export async function getProjects() {
  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: "GET",
    headers: getRequestHeaders(),
  });

  const body = await parseJson<Project[]>(response);

  if (!response.ok) {
    throw new Error(body?.message ?? "Failed to load projects.");
  }

  if (body?.success === false) {
    throw new Error(body?.message ?? "Failed to load projects.");
  }

  return Array.isArray(body?.data) ? body.data : [];
}

export async function createProject(payload: ProjectPayload) {
  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getRequestHeaders(),
    },
    body: JSON.stringify(payload),
  });

  const body = await parseJson<Project>(response);

  if (!response.ok) {
    throw new Error(body?.message ?? "Failed to create project.");
  }

  if (body?.success === false) {
    throw new Error(body?.message ?? "Failed to create project.");
  }

  return body?.data ?? null;
}
