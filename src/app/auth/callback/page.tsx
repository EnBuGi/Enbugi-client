"use client";

import { ApiError, authApi } from "@/features/auth/api/authApi";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function GithubCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState("인증 정보를 처리하고 있습니다...");

    useEffect(() => {
        const code = searchParams.get("code");
        if (!code) {
            setStatus("잘못된 접근입니다. (Code 누락)");
            return;
        }

        const handleLogin = async () => {
            try {
                const inviteCode = localStorage.getItem("inviteCode");
                
                const result = await authApi.login(code, inviteCode);

                if (result.type === 'SIGNUP_REQUIRED') {
                    // 가입 필요: 응답에서 가입용 토큰 및 정보 추출
                    localStorage.setItem("signupInfo", JSON.stringify(result.data));
                    localStorage.removeItem("inviteCode"); // 사용 후 삭제
                    router.replace("/auth/signup");
                    return;
                }

                // 로그인 성공
                localStorage.setItem("accessToken", result.data.accessToken);
                localStorage.setItem("refreshToken", result.data.refreshToken);
                router.replace("/");

            } catch (error) {
                console.error("Login Error:", error);
                
                // 에러 메시지 사용자 친화적으로 표시
                let message = "로그인 처리 중 오류가 발생했습니다.";
                if (error instanceof ApiError) {
                     // 백엔드 에러 코드(error.code)를 확인하여 처리 가능
                     // 예: ERR_INVALID_INVITE_CODE 등
                     message = `${error.message} (${error.code})`;
                } else if (error instanceof Error) {
                     message = `${message} (${error.message})`;
                }
                
                setStatus(message);
            }
        };

        handleLogin();
    }, [searchParams, router]);

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-zinc-500">{status}</p>
        </div>
    );
}
