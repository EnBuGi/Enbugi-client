"use client";

import { Button } from "@/shared/components/ui/Button";
import { Text } from "@/shared/components/ui/Text";
import Image from "next/image";

import { useLogin } from "../hooks/useLogin";

export const LoginForm = () => {
    const { isRedirecting, handleGithubLogin } = useLogin();

    return (
        <div className="w-full space-y-6">
            <div className="text-center space-y-2">
            </div>

            <Button
                type="button"
                variant="secondary"
                size="lg"
                className="w-full gap-2 relative overflow-hidden bg-[#24292f] hover:bg-[#24292f]/90 border-transparent text-white"
                onClick={handleGithubLogin}
                isLoading={isRedirecting}
                leftIcon={
                    <Image
                        src="/github.svg"
                        alt="GitHub"
                        width={20}
                        height={20}
                    />
                }
            >
                GitHub로 로그인
            </Button>
            
            <div className="text-center">
                 <Text variant="tiny" className="text-muted-foreground">
                    로그인 시 <span className="font-semibold text-primary/80">GitHub 프로필(이름, 이메일)</span> 정보가 제공되며,<br />
                    이용약관 및 개인정보처리방침에 동의하게 됩니다.
                </Text>
            </div>
        </div>
    );
};
