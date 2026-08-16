import { API_BASE_URL } from "./Axios";

const TOKEN_KEY = "auth_token";
const TOKEN_FIELD_NAMES = new Set([
  "token",
  "access_token",
  "accesstoken",
  "jwt",
  "jwttoken",
  "id_token",
  "idtoken",
  "auth_token",
  "authtoken",
]);

export type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  token?: string;
  accessToken?: string;
  message?: string;
  data?: {
    token?: string;
    accessToken?: string;
  };
  [key: string]: unknown;
};

const normalizeKey = (key: string) => key.replace(/[\s-]/g, "_").toLowerCase();

const extractTokenFromValue = (value: unknown): string | null => {
  if (!value || typeof value !== "object") {
    return null;
  }

  const stack: Record<string, unknown>[] = [value as Record<string, unknown>];
  const seen = new WeakSet<object>();

  while (stack.length > 0) {
    const current = stack.pop();

    if (!current || seen.has(current)) {
      continue;
    }

    seen.add(current);

    for (const [key, candidate] of Object.entries(current)) {
      const normalizedKey = normalizeKey(key);

      if (TOKEN_FIELD_NAMES.has(normalizedKey)) {
        if (typeof candidate === "string" && candidate.trim()) {
          return candidate.trim();
        }
      }

      if (
        (normalizedKey.includes("token") || normalizedKey.includes("auth")) &&
        typeof candidate === "string" &&
        candidate.trim()
      ) {
        return candidate.trim();
      }

      if (candidate && typeof candidate === "object") {
        stack.push(candidate as Record<string, unknown>);
      }
    }
  }

  return null;
};

const extractTokenFromHeaders = (headers: Headers) => {
  const bearerHeader = headers.get("authorization");
  const rawHeader =
    bearerHeader ?? headers.get("x-auth-token") ?? headers.get("x-access-token");

  if (!rawHeader) {
    return null;
  }

  return rawHeader.replace(/^Bearer\s+/i, "").trim() || null;
};

export const getAuthToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(TOKEN_KEY);
};

export const setAuthToken = (token: string) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(TOKEN_KEY, token);
};

export const clearAuthToken = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(TOKEN_KEY);
};

export const getAuthHeaders = () => {
  const token = getAuthToken();

  return token ? { Authorization: `Bearer ${token}` } : {};
};

export async function loginUser(payload: LoginPayload) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => null)) as LoginResponse | null;

  if (!response.ok) {
    throw new Error(data?.message ?? "Unable to sign in. Please try again.");
  }

  const token =
    extractTokenFromValue(data) ?? extractTokenFromHeaders(response.headers);

  if (!token) {
    throw new Error("Login succeeded, but no token was returned.");
  }

  setAuthToken(token);

  return {
    ...data,
    token,
  };
}
