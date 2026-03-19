"use client";

import { useState } from "react";
import { InputBox } from "@/shared/components/ui/InputBox/InputBox";
import { Button } from "@/shared/components/ui/Button";
import { Text } from "@/shared/components/ui/Text";
import { Select } from "@/shared/components/ui/select/Select";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, User, GraduationCap } from "lucide-react";
import { useSignup } from "../hooks/useSignup";

interface RegisterFormProps {
    inviteInfo: {
        role: 'MENTOR' | 'MENTEE';
        generation: number;
    };
    token: string;
    code: string;
}

export const RegisterForm = ({ inviteInfo, token, code }: RegisterFormProps) => {
    const searchParams = useSearchParams();
    const { signup, isSubmitting, error: signupError } = useSignup();
    const [name, setName] = useState('');
    const [generation, setGeneration] = useState<number | null>(
        inviteInfo.role === 'MENTEE' ? inviteInfo.generation : null
    );
    const [localError, setLocalError] = useState<string | null>(null);

    const currentYearGen = new Date().getFullYear() - 2000;
    const generationOptions = Array.from({ length: currentYearGen - 1 }, (_, i) => ({
        label: `${i + 1}기`,
        value: (i + 1).toString(),
    })).reverse();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || generation === null) return;

        // Try to get from search params first, then fallback to session storage
        const githubId = searchParams.get('githubId') || sessionStorage.getItem('githubId');
        const profileImageUrl = searchParams.get('profileImageUrl') || sessionStorage.getItem('profileImageUrl');

        if (!githubId || !profileImageUrl) {
            setLocalError('GitHub 사용자 정보가 부족합니다. 다시 시도해 주세요.');
            return;
        }

        setLocalError(null);
        await signup({
            githubId,
            name,
            generation,
            profileImageUrl,
            inviteToken: token,
        });
    };

    const displayError = localError || signupError;

    return (
        <form onSubmit={onSubmit} className="w-full space-y-6">
            <div className="space-y-4">
                <InputBox
                    label="이름"
                    placeholder="홍길동"
                    icon={<User size={18} />}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                {inviteInfo.role === 'MENTEE' ? (
                    <InputBox
                        label="기수"
                        value={`${inviteInfo.generation}기`}
                        icon={<GraduationCap size={18} />}
                        disabled
                        helperText="멘티는 현재 기수로 고정됩니다."
                    />
                ) : (
                    <Select
                        label="기수"
                        placeholder="기수를 선택하세요"
                        value={generation?.toString() || null}
                        onChange={(val) => setGeneration(Number(val))}
                        items={generationOptions}
                        helperText="멘토는 이전 기수를 선택할 수 있습니다."
                    />
                )}
            </div>

            {displayError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md">
                    <Text variant="small" className="text-red-500 text-center">
                        {displayError}
                    </Text>
                </div>
            )}

            <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isSubmitting}
                disabled={!name || generation === null}
                rightIcon={<ArrowRight size={18} />}
            >
                회원가입 완료
            </Button>
        </form>
    );
};
