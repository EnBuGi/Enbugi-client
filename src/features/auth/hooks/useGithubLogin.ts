"use client";

import { useState } from "react";
import { publicFetch } from "@/shared/api/client";

export function useGithubLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getLoginUrl = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const redirectUri = `${window.location.origin}/auth/github/callback`;
            const url = await publicFetch(
                `/api/v1/auth/login/github/url?redirectUri=${encodeURIComponent(redirectUri)}`
            );
            return url;
        } catch (err) {
            const message = err instanceof Error ? err.message : "GitHub 로그인 URL을 가져오는 데 실패했습니다.";
            setError(message);
            console.error(err);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async () => {
        const url = await getLoginUrl();
        if (url) {
            window.location.href = url;
        }
    };

    return {
        handleLogin,
        isLoading,
        error
    };
}
