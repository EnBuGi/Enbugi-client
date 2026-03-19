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
function setAccessToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", token);
    // Set cookie for Next.js Server Components to read. Valid for 1 hour.
    document.cookie = `accessToken=${token}; path=/; max-age=3600; SameSite=Lax`;
  }
}

/**
 * Refreshes the access token using the refresh_token cookie.
 * @returns {Promise<string>} The new access token
 */
export async function reissueToken(): Promise<string> {
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
}

/**
 * A wrapper around the native fetch API that handles:
 * 1. Automatic Authorization header attachment
 * 2. 403 error interception for token reissue
 * 3. Automatic retry after reissue
 * 4. Redirection to login on persistent failure
 */
export async function fetchWithAuth(endpoint: string, options: RequestInit = {}): Promise<any> {
  const url = endpoint.startsWith("http") ? endpoint : `${API_URL}${endpoint}`;
  const serverCookies = await getServerCookies();
  const token = await getAccessToken();

  const getHeaders = () => {
    const headers: Record<string, string> = {
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      ...(serverCookies ? { "Cookie": serverCookies } : {}),
      ...(options.headers as Record<string, string> || {}),
    };

    // Only set Content-Type to application/json if it's not FormData and not already set
    if (!(options.body instanceof FormData) && !headers["Content-Type"]) {
      headers["Content-Type"] = "application/json";
    }

    return headers;
  };

  const config: RequestInit = {
    ...options,
    headers: getHeaders(),
    credentials: "include", // Ensure cookies are sent (needed for refresh flow)
  };

  try {
    let response = await fetch(url, config);

    // If 401/403 (Unauthorized/Forbidden/Token Expired), attempt to reissue
    if (response.status === 401 || response.status === 403) {
      if (typeof window === "undefined") {
        // We are on the server. Do NOT attempt to reissue because Server Components 
        // cannot send the new refresh_token Set-Cookie header back to the browser.
        // This causes the browser's refresh_token to become out of sync with the backend.
        console.error("Server-side token expired. Need client-side reissue. Endpoint:", endpoint);
        throw new ApiError(response.status, "서버 렌더링 중 토큰이 만료되었습니다. 클라이언트에서 재발급이 필요합니다.");
      }

      try {
        const newAccessToken = await reissueToken();
        
        // Retry original request with new token
        const retryConfig: RequestInit = {
          ...config,
          headers: {
            ...config.headers,
            "Authorization": `Bearer ${newAccessToken}`,
          },
        };
        
        response = await fetch(url, retryConfig);
        // Let the retry response fall through to the general error handling below.
      } catch (reissueErr) {
        // Reissue itself failed
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
    try {
      return JSON.parse(resText);
    } catch {
      return {};
    }
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
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: 'include',
  };

  const response = await fetch(url, config);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(response.status, errorData.message || 'API 요청 중 오류가 발생했습니다.', errorData);
  }

  return await response.json();
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
