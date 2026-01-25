"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { InputBox } from "@/shared/components/ui/InputBox/InputBox";
import { Button } from "@/shared/components/ui/Button";
import { Text } from "@/shared/components/ui/Text";
import { loginSchema } from "../model/schema";
import type { LoginFormData } from "../model/types";
import { ArrowRight, Check } from "lucide-react";

export const LoginForm = () => {
    const router = useRouter();
    const [globalError, setGlobalError] = useState<string | null>(null);
    const [keepSession, setKeepSession] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isLoading },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    {/* 로그인 Mock함수 */ }
    const onSubmit = async (data: LoginFormData) => {
        setGlobalError(null);
        try {
            // Mock API Call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            if (data.email === "error@test.com") {
                throw new Error("존재하지 않는 계정입니다.");
            }

            console.log("Login Success", data, { keepSession });
            router.push("/");
        } catch (error) {
            if (error instanceof Error) {
                setGlobalError(error.message);
            } else {
                setGlobalError("로그인 중 알 수 없는 오류가 발생했습니다.");
            }
        }
    };

    return (
        <div className="w-full space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-4">
                    <InputBox
                        label="Email"
                        placeholder="sejong@sju.ac.kr"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        {...register("email")}
                        autoFocus
                    />
                    <InputBox
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        {...register("password")}
                    />
                </div>

                <div className="flex items-center justify-between"
                    onClick={() => setKeepSession(!keepSession)}>
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <div
                            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${keepSession ? 'bg-primary border-primary' : 'border-zinc-700 bg-zinc-900 group-hover:border-zinc-500'}`}
                        >
                            {keepSession && <Check size={12} className="text-white" />}
                        </div>
                        <Text variant="small" className="text-zinc-400 group-hover:text-zinc-300">로그인 유지</Text>
                    </label>

                    <Button variant="link" size="sm" className="text-muted ">
                        비밀번호 찾기
                    </Button>
                </div>
                {/* card컴포넌트 구현시 하단부에 에러메세지 표시 변경 예정 */}
                {globalError && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md">
                        <Text variant="small" className="text-red-500">
                            Error: {globalError}
                        </Text>
                    </div>
                )}

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    isLoading={isLoading}
                    rightIcon={<ArrowRight />}
                >
                    Login
                </Button>
            </form>
        </div>
    );
};
