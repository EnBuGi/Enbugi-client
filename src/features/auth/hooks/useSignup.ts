"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SignupData {
    name: string;
    generation: number;
    githubId: string;
    profileImageUrl: string;
    inviteToken: string;
}

export function useSignup() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const signup = async (data: SignupData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/v1/auth/signup/github`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                }
            );

            if (response.ok) {
                const result = await response.json();
                localStorage.setItem('accessToken', result.accessToken);
                
                // Cleanup session storage
                sessionStorage.removeItem('inviteToken');
                sessionStorage.removeItem('githubId');
                sessionStorage.removeItem('profileImageUrl');
                
                router.push('/');
                return true;
            } else {
                const errorData = await response.json();
                setError(errorData.message || '회원가입에 실패했습니다.');
                return false;
            }
        } catch (err) {
            setError('회원가입 처리 중 오류가 발생했습니다.');
            console.error(err);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        signup,
        isSubmitting,
        error
    };
}
