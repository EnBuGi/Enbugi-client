"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { InputBox } from "@/shared/components/ui/InputBox/InputBox";
import { Button } from "@/shared/components/ui/Button";
import { Text } from "@/shared/components/ui/Text";
import { registerSchema } from "../model/schema";
import type { RegisterFormData } from "../model/types";
import { ArrowRight, Mail, Lock, User, Key } from "lucide-react";
import { useEmailVerification } from "../hooks/useEmailVerification";
import { authApi } from "../api/authApi";

export const RegisterForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const inviteCode = searchParams.get("code");

    const [globalError, setGlobalError] = useState<string | null>(null);
    const {
        emailVerified,
        timeLeft,
        formatTime,
        sendCode,
        verifyCode
    } = useEmailVerification();

    // Redirect if no invite code (Simple Client Check)
    if (!inviteCode) {
        return (
            <div className="text-center space-y-4">
                <Text variant="h4" className="text-error">Access Denied</Text>
                <Text variant="body" className="text-muted">
                    초대 코드가 유효하지 않습니다.<br />관리자에게 문의해주세요.
                </Text>
                <Button variant="secondary" onClick={() => router.push("/login")}>
                    로그인으로 돌아가기
                </Button>
            </div>
        )
    }

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        getValues,
        trigger
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            code: "",
            name: "",
            password: "",
            confirmPassword: "",
        },
    });

    const handleEmailVerify = async () => {
        const email = getValues("email");
        const isValid = await trigger("email");
        if (!isValid) return;

        await sendCode(email);
    };

    const handleCodeCheck = async () => {
        const code = getValues("code");
        await verifyCode(code);
    }

    const onSubmit = async (data: RegisterFormData) => {
        setGlobalError(null);
        if (!emailVerified) {
            setGlobalError("이메일 인증을 완료해주세요.");
            return;
        }

        try {
            await authApi.registerUser(data);
            alert("회원가입이 완료되었습니다.");
            router.push("/login");
        } catch (error) {
            setGlobalError("회원가입 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="w-full space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* 이메일 인증 */}
                <div className="space-y-2">
                    <div className="flex gap-2 items-start">
                        <div className="flex-1">
                            <InputBox
                                label="Email"
                                placeholder="example@sju.ac.kr"
                                icon={<Mail size={18} />}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                {...register("email")}
                                disabled={emailVerified || (timeLeft > 0 && !emailVerified)}
                            />
                        </div>
                        <Button
                            type="button"
                            variant="secondary"
                            className="mt-[32px] min-w-[60px]"
                            onClick={handleEmailVerify}
                            disabled={emailVerified}
                        >
                            {timeLeft > 0 ? "재전송" : "인증"}
                        </Button>
                    </div>
                    {/* 이메일 인증 코드 입력창 */}
                    {(timeLeft > 0 || emailVerified) && (
                        <div className="flex gap-2 items-start animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className="flex-1 relative">
                                <InputBox
                                    placeholder="인증코드 6자리"
                                    {...register("code")}
                                    disabled={emailVerified}
                                    rightIcon={
                                        !emailVerified && (
                                            <span className="text-xs font-mono text-primary">
                                                {formatTime(timeLeft)}
                                            </span>
                                        )
                                    }
                                />
                            </div>
                            <Button
                                type="button"
                                variant="secondary"
                                className="mt-[2px]"
                                onClick={handleCodeCheck}
                                disabled={emailVerified}
                            >
                                확인
                            </Button>
                        </div>
                    )}
                </div>
                {/* 개인정보 입력창 */}
                <InputBox
                    label="Name"
                    placeholder="홍길동"
                    icon={<User size={18} />}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    {...register("name")}
                />

                <InputBox
                    label="Password"
                    type="password"
                    placeholder="8자 이상, 영문/숫자/특수문자"
                    icon={<Lock size={18} />}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    {...register("password")}
                />

                <InputBox
                    label="Confirm Password"
                    type="password"
                    placeholder="비밀번호 확인"
                    icon={<Key size={18} />}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    {...register("confirmPassword")}
                />

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
                    isLoading={isSubmitting}
                    disabled={!emailVerified}
                    rightIcon={<ArrowRight />}
                >
                    회원가입
                </Button>
            </form>
        </div>
    );
};
