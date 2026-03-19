/**
 * Centralized API client wrapper for fetch with automatic authentication and token reissue handling.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

/**
 * Custom error class for API responses
 */
export class ApiError extends Error {
  constructor(public status: number, message: string, public data?: any) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Helper to get cookies on the server-side only.
 * This is isolated to prevent accidental usage in client bundles.
 */
async function getServerCookies(): Promise<string | undefined> {
  if (typeof window === "undefined") {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      const rt = cookieStore.get("refresh_token");
      if (rt && rt.value) {
        return `refresh_token=${rt.value}`;
      }
      return undefined;
    } catch (e) {
      console.error("Failed to get server cookies:", e);
      return undefined;
    }
  }
  return undefined;
}

/**
 * Helper to get the access token, supporting both Client and Server Components.
 */
async function getAccessToken(): Promise<string | null> {
  if (typeof window === "undefined") {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      return cookieStore.get("accessToken")?.value || null;
    } catch (e) {
      return null;
    }
  } else {
    // Client-side: get from document.cookie, fallback to localStorage
    const match = document.cookie.match(new RegExp('(^| )accessToken=([^;]+)'));
    if (match) return match[2];
    return localStorage.getItem("accessToken");
  }
}

/**
 * Helper to set the access token on the client side only.
 */
export function setAccessToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", token);
    // Set cookie for Next.js Server Components to read. Valid for 1 hour.
    document.cookie = `accessToken=${token}; path=/; max-age=3600; SameSite=Lax`;
  }
}

// Singleton promise for token reissuance to handle concurrent 401/403 errors
let refreshPromise: Promise<string> | null = null;

/**
 * Refreshes the access token using the refresh_token cookie.
 * @returns {Promise<string>} The new access token
 */
export async function reissueToken(): Promise<string> {
  // If a refresh is already in progress, return the existing promise
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const serverCookies = await getServerCookies();
      
      const response = await fetch(`${API_URL}/api/v1/auth/token/reissue`, {
        method: "POST",
        headers: {
          ...(serverCookies ? { "Cookie": serverCookies } : {}),
        },
        credentials: "include", // Important to send/receive refresh_token cookie for client-side
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => "no-body");
        const msg = `토큰 재발급에 실패했습니다. (Status: ${response.status}, Body: ${errorText})`;
        console.error(`[reissueToken] ${msg}, hasCookies=${!!serverCookies}`);
        throw new ApiError(response.status, msg);
      }

      const data = await response.json();
      if (data.accessToken) {
        setAccessToken(data.accessToken);
        return data.accessToken;
      }
      
      throw new Error("응답에 액세스 토큰이 포함되어 있지 않습니다.");
    } finally {
      // Clear the promise after completion (success or failure)
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

/**
 * A wrapper around the native fetch API that handles:
 * 1. Automatic Authorization header attachment
 * 2. 401/403 error interception for token reissue
 * 3. Automatic retry after reissue
 * 4. Redirection to login on persistent failure
 */
export async function fetchWithAuth(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = endpoint.startsWith("http") ? endpoint : `${API_URL}${endpoint}`;
    const serverCookies = await getServerCookies();
    const token = await getAccessToken();

    const getHeaders = (currentToken: string | null) => {
        const headers: Record<string, string> = {
            ...(currentToken ? { "Authorization": `Bearer ${currentToken}` } : {}),
            ...(serverCookies ? { "Cookie": serverCookies } : {}),
            ...(options.headers as Record<string, string> || {}),
        };

        if (!(options.body instanceof FormData) && !headers["Content-Type"]) {
            headers["Content-Type"] = "application/json";
        }

        return headers;
    };

    const config: RequestInit = {
        ...options,
        headers: getHeaders(token),
        credentials: "include",
    };

    try {
        let response = await fetch(url, config);

        if (response.status === 401 || response.status === 403) {
            if (typeof window === "undefined") {
                console.error("Server-side token expired. Need client-side reissue. Endpoint:", endpoint);
                throw new ApiError(response.status, "서버 렌더링 중 토큰이 만료되었습니다. 클라이언트에서 재발급이 필요합니다.");
            }

            try {
                // Use the singleton refreshPromise
                const newAccessToken = await reissueToken();

                // Retry original request with new token
                const retryConfig: RequestInit = {
                    ...config,
                    headers: getHeaders(newAccessToken),
                };

                response = await fetch(url, retryConfig);
            } catch (reissueErr) {
                console.error("Token reissue failed:", reissueErr);
                handleLogout();
                throw reissueErr;
            }
        }

        if (!response.ok) {
            // If still not ok or other error
            if (response.status === 401) {
                handleLogout();
            }
            const errorText = await response.text().catch(() => "{}");
            const errorData = (() => {
                try { return JSON.parse(errorText); } catch { return {}; }
            })();
            throw new ApiError(response.status, errorData.message || "API 요청 중 오류가 발생했습니다.", errorData);
        }

        const resText = await response.text().catch(() => "{}");
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            try { return JSON.parse(resText); } catch { return {}; }
        }
        return resText;
    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new Error(error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.");
    }
}

/**
 * A wrapper around the native fetch API for public (unauthenticated) requests.
 */
export async function publicFetch(endpoint: string, options: RequestInit = {}): Promise<any> {
  const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint}`;
  const config: RequestInit = {
    ...options,
    headers: {
      ...(!(options.body instanceof FormData) ? { "Content-Type": "application/json" } : {}),
      ...(options.headers || {}),
    },
    credentials: 'include',
  };

  const response = await fetch(url, config);
  
  if (!response.ok) {
    const errorText = await response.text().catch(() => "{}");
    const errorData = (() => {
        try { return JSON.parse(errorText); } catch { return {}; }
    })();
    throw new ApiError(response.status, errorData.message || 'API 요청 중 오류가 발생했습니다.', errorData);
  }

  const resText = await response.text().catch(() => "{}");
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    try { return JSON.parse(resText); } catch { return {}; }
  }
  return resText;
}

/**
 * Handles logout by clearing local state and redirecting to login page.
 */
function handleLogout() {
    if (typeof window !== "undefined") {
        localStorage.removeItem('accessToken');
        document.cookie = "accessToken=; path=/; max-age=0";
        const currentPath = window.location.pathname;
        if (currentPath !== '/login') {
            window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
        }
    }
}
