'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { AuthBackground } from '@/features/auth/ui/AuthBackground';
import { AuthCard } from '@/features/auth/ui/AuthCard';
import { RegisterHeader } from '@/features/auth/ui/RegisterHeader';
import { RegisterForm } from '@/features/auth/ui/RegisterForm';
import { LoginForm } from '@/features/auth/ui/LoginForm';
import { Text } from '@/shared/components/ui/Text';
import { Button } from '@/shared/components/ui/Button';
import { useInvite } from '@/features/auth/hooks/useInvite';

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);
  
  useEffect(() => {
    const t = searchParams.get('token');
    const c = searchParams.get('code');
    setToken(t);
    setCode(c);

    if (t) {
      sessionStorage.setItem('inviteToken', t);
    }
  }, [searchParams]);

  const { inviteInfo, isLoading, error } = useInvite(token);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center relative overflow-hidden selection:bg-primary/30">
      <AuthBackground />

      <AuthCard>
        <RegisterHeader />
        
        {error && !inviteInfo ? (
          <div className="text-center space-y-4">
            <Text variant="body" className="text-red-500">
              {error}
            </Text>
            <Button variant="secondary" onClick={() => router.push('/login')}>
              로그인으로 돌아가기
            </Button>
          </div>
        ) : !code ? (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Text variant="body" className="text-muted text-sm">
                초대가 확인되었습니다. <br />계속하려면 GitHub 계정을 연결해주세요.
              </Text>
            </div>
            <LoginForm />
          </div>
        ) : (
          inviteInfo && token && (
            <RegisterForm 
                inviteInfo={inviteInfo} 
                token={token} 
                code={code} 
            />
          )
        )}
      </AuthCard>

      <div className="absolute bottom-6 w-full text-center">
        <Text variant="tiny" className="text-zinc-600 font-mono">
          En# Online Judge Platform v1.0.0
        </Text>
      </div>
    </main>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-black">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </main>
      }
    >
      <SignupContent />
    </Suspense>
  );
}
