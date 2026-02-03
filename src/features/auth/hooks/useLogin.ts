import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useLogin = () => {
    const searchParams = useSearchParams();
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        // 초대 코드가 URL에 있다면 로컬 스토리지에 저장 (로그인 후 사용)
        const inviteCode = searchParams.get("invite");
        if (inviteCode) {
            localStorage.setItem("inviteCode", inviteCode);
            console.log("Invite code stored:", inviteCode);
        }
    }, [searchParams]);

    const handleGithubLogin = () => {
        setIsRedirecting(true);
        const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
        
        if (!clientId) {
            console.error("Critical: NEXT_PUBLIC_GITHUB_CLIENT_ID is not defined in environment variables.");
            setIsRedirecting(false);
            return;
        }

        // GitHub OAuth Authorize URL로 이동
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=read:user user:email`;
    };

    return {
        isRedirecting,
        handleGithubLogin,
    };
};
