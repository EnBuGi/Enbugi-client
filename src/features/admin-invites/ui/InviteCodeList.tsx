import { Eye, Copy, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/shared/components/ui/Button';
import { Badge } from '@/shared/components/ui/badge/Badge';
import { Text } from '@/shared/components/ui/Text';
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/shared/components/ui/Table';

interface InviteCode {
  token: string;
  role: 'MENTOR' | 'MENTEE';
  generation: number;
  createdAt: Date;
  expiresAt: Date;
  status: 'active' | 'expired' | 'used';
}

interface InviteCodeListProps {
  codes: InviteCode[];
  isLoading?: boolean;
  onCopy?: (code: InviteCode) => void;
  onView?: (code: InviteCode) => void;
}

/**
 * 초대 코드 목록 컴포넌트
 * 생성된 모든 초대 코드를 테이블로 표시
 */
export function InviteCodeList({
  codes = [],
  isLoading = false,
  onCopy,
  onView,
}: InviteCodeListProps) {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const handleCopy = async (code: InviteCode) => {
    try {
      await navigator.clipboard.writeText(code.token);
      setCopiedToken(code.token);
      setTimeout(() => setCopiedToken(null), 2000);
      onCopy?.(code);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const getStatusBadge = (status: 'active' | 'expired' | 'used') => {
    switch (status) {
      case 'active':
        return (
          <Badge intent="success" tone="soft" shape="pill">
            <Clock size={12} className="inline mr-1" />
            활성
          </Badge>
        );
      case 'expired':
        return (
          <Badge intent="danger" tone="soft" shape="pill">
            <AlertCircle size={12} className="inline mr-1" />
            만료됨
          </Badge>
        );
      case 'used':
        return (
          <Badge intent="neutral" tone="soft" shape="pill">
            <CheckCircle2 size={12} className="inline mr-1" />
            사용됨
          </Badge>
        );
    }
  };

  const getRoleBadge = (role: 'MENTOR' | 'MENTEE') => {
    return (
      <Badge
        intent={role === 'MENTOR' ? 'warning' : 'success'}
        tone="soft"
        shape="pill"
      >
        {role === 'MENTOR' ? '멘토' : '멘티'}
      </Badge>
    );
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTokenDisplay = (token: string) => {
    return token.substring(0, 8) + '...' + token.substring(token.length - 8);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Text variant="body" className="text-secondary">
          로딩 중...
        </Text>
      </div>
    );
  }

  if (codes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 gap-3">
        <AlertCircle size={32} className="text-secondary opacity-50" />
        <Text variant="body" className="text-secondary">
          생성된 초대 코드가 없습니다.
        </Text>
      </div>
    );
  }

  return (
    <div className="w-full border border-border-default rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>토큰</TableHead>
            <TableHead>역할</TableHead>
            <TableHead>기수</TableHead>
            <TableHead>생성일</TableHead>
            <TableHead>만료일</TableHead>
            <TableHead>상태</TableHead>
            <TableHead>작업</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {codes.map((code) => (
            <TableRow key={code.token}>
              <TableCell>
                <code className="text-xs font-mono text-secondary">
                  {getTokenDisplay(code.token)}
                </code>
              </TableCell>
              <TableCell>{getRoleBadge(code.role)}</TableCell>
              <TableCell>
                <Text variant="small" weight="medium">
                  {code.generation}
                </Text>
              </TableCell>
              <TableCell>
                <Text variant="small">{formatDate(code.createdAt)}</Text>
              </TableCell>
              <TableCell>
                <Text variant="small">{formatDate(code.expiresAt)}</Text>
              </TableCell>
              <TableCell>{getStatusBadge(code.status)}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(code)}
                    leftIcon={
                      copiedToken === code.token ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        <Copy size={16} />
                      )
                    }
                    className={
                      copiedToken === code.token ? 'text-success' : ''
                    }
                  >
                    {copiedToken === code.token ? '복사됨' : '복사'}
                  </Button>
                  {onView && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(code)}
                      leftIcon={<Eye size={16} />}
                    >
                      보기
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
