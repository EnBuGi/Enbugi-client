'use client';

import React from 'react';

import { Github } from 'lucide-react';

import { Button } from '@/shared/components/ui/Button';
import { Card } from '@/shared/components/ui/Card/Card';
import { Text } from '@/shared/components/ui/Text';

export default function LoginPage() {
  const handleGithubLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const redirectUri = `${window.location.origin}/auth/github/callback`;
    const githubUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;

    window.location.href = githubUrl;
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-8 space-y-8 bg-surface border border-white/5">
        <div className="text-center space-y-2">
          <Text variant="display-xl" gradient>
            Welcome Back
          </Text>
          <Text variant="body" className="text-muted">
            Login to access your En# account
          </Text>
        </div>

        <div className="space-y-4">
          <Button
            variant="primary"
            className="w-full bg-[#24292F] hover:bg-[#24292F]/90 text-white border-none h-12"
            leftIcon={<Github />}
            onClick={handleGithubLogin}
          >
            Continue with GitHub
          </Button>
        </div>

        <div className="text-center">
          <Text variant="tiny" className="text-muted/60">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </Text>
        </div>
      </Card>
    </main>
  );
}
