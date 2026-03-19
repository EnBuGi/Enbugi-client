import { useState } from "react";
import { publicFetch } from "@/shared/api/client";
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
            const result = await publicFetch('/api/v1/auth/signup/github', {
                method: 'POST',
                body: JSON.stringify(data),
            });

            localStorage.setItem('accessToken', result.accessToken);
            document.cookie = `accessToken=${result.accessToken}; path=/; max-age=3600; SameSite=Lax`;
            
            // Cleanup session storage
            sessionStorage.removeItem('inviteToken');
            sessionStorage.removeItem('githubId');
            sessionStorage.removeItem('profileImageUrl');
            
            router.push('/');
            return true;
        } catch (err) {
            setError(err instanceof Error ? err.message : '회원가입 처리 중 오류가 발생했습니다.');
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
