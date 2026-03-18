"use client";

import { useState, useEffect, useCallback } from "react";

interface InviteInfo {
    role: 'MENTOR' | 'MENTEE';
    generation: number;
}

export function useInvite(token: string | null) {
    const [inviteInfo, setInviteInfo] = useState<InviteInfo | null>(null);
    const [isLoading, setIsLoading] = useState(!!token);
    const [error, setError] = useState<string | null>(null);

    const validateToken = useCallback(async (t: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invites/validate?token=${t}`
            );
            
            if (response.ok) {
                const data: InviteInfo = await response.json();
                setInviteInfo(data);
                return data;
            } else {
                setError("유효하지 않거나 만료된 초대 코드입니다.");
                return null;
            }
        } catch (err) {
            setError("초대 코드 검증 중 오류가 발생했습니다.");
            console.error(err);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (token) {
            validateToken(token);
        } else {
            setError("초대 코드가 필요합니다.");
            setIsLoading(false);
        }
    }, [token, validateToken]);

    return {
        inviteInfo,
        isLoading,
        error,
        validateToken
    };
}
