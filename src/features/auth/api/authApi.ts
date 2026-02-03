import { SignupFormData } from "../model/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api/v1";

interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

interface SignupRequiredResponse {
    registerToken: string;
    githubName: string;
    email: string;
    profileImageUrl: string;
}

export class ApiError extends Error {
    code: string;
    constructor(message: string, code: string) {
        super(message);
        this.code = code;
        this.name = 'ApiError';
    }
}

export type LoginResult = 
    | { type: 'SUCCESS'; data: LoginResponse }
    | { type: 'SIGNUP_REQUIRED'; data: SignupRequiredResponse };

export const authApi = {
    login: async (code: string, inviteCode?: string | null): Promise<LoginResult> => {
        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };

        // 개발 환경에서 쉬운 테스트를 위해 특정 초대 코드나 localStorage 플래그가 있으면 가입 필요 응답을 강제함
        if (process.env.NODE_ENV === 'development') {
            const isTestSignup = inviteCode === 'TEST_SIGNUP' || 
                               (typeof window !== 'undefined' && localStorage.getItem('MOCK_FORCE_SIGNUP') === 'true');
            
            if (isTestSignup) {
                headers['Prefer'] = 'code=403';
                console.info("⚡️ Mocking Signup Required Flow triggered via TEST_SIGNUP code or local flag.");
            }
        }

        const body: Record<string, string> = { code };
        if (inviteCode) {
            body.inviteCode = inviteCode;
        }

        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        });

        if (res.status === 403) {
            const data = await res.json();
            return { type: 'SIGNUP_REQUIRED', data };
        }

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new ApiError(
                errorData.message || `Login failed with status: ${res.status}`, 
                errorData.code || 'UNKNOWN_ERROR'
            );
        }

        const data = await res.json();
        return { type: 'SUCCESS', data };
    },

    signup: async (data: SignupFormData & { registerToken: string; profileImageUrl?: string }) => {
        const res = await fetch(`${BASE_URL}/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new ApiError(
                errorData.message || "Signup failed", 
                errorData.code || 'UNKNOWN_ERROR'
            );
        }

        return res.json() as Promise<LoginResponse>;
    }
};
