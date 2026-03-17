'use client';

import React, { useEffect, useState, Suspense } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { CheckCircle2, Github, Loader2 } from 'lucide-react';

import { Button } from '@/shared/components/ui/Button';
import { Card } from '@/shared/components/ui/Card/Card';
import { InputBox } from '@/shared/components/ui/InputBox/InputBox';
import { Text } from '@/shared/components/ui/Text';
import { Select } from '@/shared/components/ui/select/Select';

interface InviteInfo {
  role: 'MENTOR' | 'MENTEE';
  generation: number;
}

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const [inviteInfo, setInviteInfo] = useState<InviteInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [generation, setGeneration] = useState<number | null>(null);

  useEffect(() => {
    const t = searchParams.get('token');
    const c = searchParams.get('code');
    setToken(t);
    setCode(c);

    if (t) {
      sessionStorage.setItem('inviteToken', t);
      validateToken(t);
    } else {
      setError('Invite token is required');
      setLoading(false);
    }
  }, [searchParams]);

  const validateToken = async (token: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invites/validate?token=${token}`,
      );
      if (response.ok) {
        const data: InviteInfo = await response.json();
        setInviteInfo(data);
        if (data.role === 'MENTEE') {
          setGeneration(data.generation);
        }
      } else {
        setError('Invalid or expired invite token');
      }
    } catch (err) {
      setError('Failed to validate invite token');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGithubConnect = () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const redirectUri = `${window.location.origin}/auth/github/callback`;
    const githubUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;

    window.location.href = githubUrl;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !token || !name || generation === null) return;

    const githubId = sessionStorage.getItem('githubId');
    const profileImageUrl = sessionStorage.getItem('profileImageUrl');

    if (!githubId || !profileImageUrl) {
      setError('Missing GitHub user data. Please reconnect your account.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/signup/github`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            githubId,
            name,
            generation,
            profileImageUrl,
            inviteToken: token,
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        sessionStorage.removeItem('inviteToken');
        sessionStorage.removeItem('githubId');
        sessionStorage.removeItem('profileImageUrl');
        router.push('/');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Signup failed');
      }
    } catch (err) {
      setError('An error occurred during signup');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background p-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </main>
    );
  }

  if (error && !inviteInfo) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-background p-4 space-y-4">
        <Text variant="h3" className="text-red-500">
          Signup Error
        </Text>
        <Text variant="body" className="text-muted">
          {error}
        </Text>
        <Button onClick={() => router.push('/login')}>Back to Login</Button>
      </main>
    );
  }

  // Generation options for Mentor (current year - 2000 is current gen, so we show older ones)
  const currentGen = new Date().getFullYear() - 2000;
  const generationOptions = Array.from({ length: currentGen - 1 }, (_, i) => ({
    label: `${i + 1}기`,
    value: i + 1,
  })).reverse();

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4 py-12">
      <Card className="w-full max-w-lg p-8 space-y-8 bg-surface border border-white/5">
        <div className="text-center space-y-2">
          <Text variant="display-xl" gradient>
            Join En#
          </Text>
          <Text variant="body" className="text-muted">
            Complete your registration as a {inviteInfo?.role.toLowerCase()}
          </Text>
        </div>

        {!code ? (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
              <div className="space-y-1">
                <Text variant="small" className="font-semibold text-white">
                  Invite Verified
                </Text>
                <Text variant="tiny" className="text-muted">
                  Your invite token is valid. Now please connect your GitHub
                  account.
                </Text>
              </div>
            </div>
            <Button
              variant="primary"
              className="w-full bg-[#24292F] hover:bg-[#24292F]/90 text-white border-none h-12"
              leftIcon={<Github />}
              onClick={handleGithubConnect}
            >
              Connect GitHub Account
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSignup} className="space-y-6">
            <InputBox
              label="Full Name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            {inviteInfo?.role === 'MENTEE' ? (
              <InputBox
                label="Generation"
                value={`${inviteInfo.generation}기`}
                disabled
                helperText="Mentees are assigned to the current generation."
              />
            ) : (
              <Select
                label="Generation"
                placeholder="Select your generation"
                value={generation?.toString() || null}
                onChange={(val) => setGeneration(Number(val))}
                items={generationOptions.map((opt) => ({
                  label: opt.label,
                  value: opt.value.toString(),
                }))}
                helperText="Mentors can select any previous generation."
              />
            )}

            {error && (
              <Text variant="tiny" className="text-red-500 text-center">
                {error}
              </Text>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full h-12"
              isLoading={submitting}
              disabled={!name || generation === null}
            >
              Complete Registration
            </Button>
          </form>
        )}
      </Card>
    </main>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-background p-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </main>
      }
    >
      <SignupContent />
    </Suspense>
  );
}
