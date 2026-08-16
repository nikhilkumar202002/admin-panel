import { API_BASE_URL } from "./Axios";

const TOKEN_KEY = "auth_token";

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
    data?.token ?? data?.accessToken ?? data?.data?.token ?? data?.data?.accessToken;

  if (!token) {
    throw new Error("Login succeeded, but no token was returned.");
  }

  setAuthToken(token);

  return {
    ...data,
    token,
  };
}
