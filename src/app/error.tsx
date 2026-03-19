'use client'; // Error components must be Client Components

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { reissueToken } from '@/shared/api/client';
import { Loader2 } from 'lucide-react';
import { Text } from '@/shared/components/ui/Text';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // Check if the error is our specific Server Component token expiration error
    if (error.message.includes('서버 렌더링 중 토큰이 만료되었습니다')) {
      setIsRefreshing(true);
      reissueToken()
        .then(() => {
          // Token successfully reissued on the client!
          // Using startTransition with router.refresh() or just reset() to retry the server render
          console.log("Token reissued successfully by GlobalError boundary, retrying render...");
          setIsRefreshing(false);
          reset();
        })
        .catch((err) => {
          console.error('Failed to reissue token on error boundary', err);
          // If reissue fails (e.g., refresh token also expired), redirect to login
          const currentPath = window.location.pathname;
          router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
        });
    }
  }, [error, reset, router]);

  if (isRefreshing) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-background p-4 space-y-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <Text variant="h3">세션 갱신 중...</Text>
        <Text variant="body" className="text-muted text-center max-w-sm">
          안전한 접근을 위해 인증 정보를 갱신하고 있습니다.
        </Text>
      </main>
    );
  }

  // Fallback for other errors
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background p-4 space-y-4 text-center">
      <Text variant="h2" className="text-red-500">
        문제가 발생했습니다!
      </Text>
      <Text variant="body" className="text-muted max-w-md">
        {error.message || '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'}
      </Text>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
      >
        다시 시도
      </button>
    </main>
  );
}
