'use client';

import React, { useEffect, useState, Suspense } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Loader2 } from 'lucide-react';

import { Text } from '@/shared/components/ui/Text';

function GithubCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    const exchangeCode = async () => {
      if (!code) {
        setError('No code provided from GitHub');
        return;
      }
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login/github`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code, state }),
          },
        );

        if (response.ok) {
          const data = await response.json();
          // Assuming the backend returns tokens
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);

          router.push('/'); // Redirect to home or dashboard
        } else if (response.status === 404) {
          const errorData = await response.json();
          // User not found, redirect to signup
          const inviteToken = sessionStorage.getItem('inviteToken');
          if (inviteToken) {
            sessionStorage.setItem('githubId', errorData.githubId);
            sessionStorage.setItem('profileImageUrl', errorData.profileImageUrl);
            router.push(`/signup?token=${inviteToken}&code=${code}`);
          } else {
            setError(
              'Account not found. Please use an invite link to sign up.',
            );
          }
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Failed to authenticate with GitHub');
        }
      } catch (err) {
        setError('An error occurred during authentication');
        console.error(err);
      }
    };

    exchangeCode();
  }, [router, searchParams]);

  if (error) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-background p-4 space-y-4">
        <Text variant="h3" className="text-red-500">
          Authentication Error
        </Text>
        <Text variant="body" className="text-muted">
          {error}
        </Text>
        <button
          onClick={() => router.push('/login')}
          className="text-primary hover:underline"
        >
          Back to Login
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background p-4 space-y-4">
      <Loader2 className="w-12 h-12 text-primary animate-spin" />
      <Text variant="h3">Authenticating...</Text>
      <Text variant="body" className="text-muted">
        Please wait while we complete the GitHub authentication.
      </Text>
    </main>
  );
}

export default function GithubCallbackPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-background p-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </main>
      }
    >
      <GithubCallbackContent />
    </Suspense>
  );
}
