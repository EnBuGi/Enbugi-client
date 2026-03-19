"use client";

import React from 'react';
import { Card } from '@/shared/components/ui/Card/Card';
import { Button } from '@/shared/components/ui/Button';
import { Text } from '@/shared/components/ui/Text';

export default function ProfileEditPage() {
    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            <div className="mb-8">
                <Text variant="h1" className="text-white mb-2">내 정보 수정</Text>
                <Text className="text-zinc-400">프로필 정보를 확인하고 수정할 수 있는 페이지입니다. (현재는 틀만 제공됩니다)</Text>
            </div>

            <Card className="p-8 border-white/5 bg-surface/50">
                <div className="space-y-6">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-full bg-zinc-800 border-2 border-primary/20 flex items-center justify-center overflow-hidden">
                            <span className="text-4xl text-zinc-600">👤</span>
                        </div>
                        <div>
                            <Button variant="secondary" size="sm">사진 변경 (준비 중)</Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">이름</label>
                            <input
                                disabled
                                type="text"
                                className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-2 text-zinc-500"
                                value="김보빈"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">기수</label>
                            <input
                                disabled
                                type="text"
                                className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-2 text-zinc-500"
                                value="26기"
                            />
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/5">
                        <Button disabled className="w-full md:w-auto">수정 완료 (준비 중)</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
