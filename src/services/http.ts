import { API_BASE_URL, REQUEST_TIMEOUT_MS } from '../config';

let authToken: string | null = null;

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export function setAuthToken(token: string | null) {
  authToken = token;
}

export async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const headers = new Headers(options.headers);

  headers.set('Accept', 'application/json');
  headers.set('Content-Type', 'application/json');
  if (authToken) {
    headers.set('Authorization', `Bearer ${authToken}`);
  }

  const url = `${API_BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });

    if (!response.ok) {
      let message = `Request failed with status ${response.status}.`;
      try {
        const body = (await response.json()) as { message?: string };
        if (body.message) {
          message = body.message;
        }
      } catch {
        // Use the status message when the error response is not JSON.
      }
      throw new ApiError(response.status, message);
    }

    try {
      return (await response.json()) as T;
    } catch {
      throw new Error('Invalid server response.');
    }
  } catch (error) {
    if (error instanceof ApiError || (error instanceof Error && error.message === 'Invalid server response.')) {
      throw error;
    }

    throw new Error('Cannot reach the server.');
  } finally {
    clearTimeout(timeout);
  }
}
