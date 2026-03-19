'use client';

import React, { useEffect, useState } from 'react';

import {
  User,
  UserRole,
  fetchUsers,
  updateUserRole,
} from '@/features/mentor-users/api/users';
import { GenerationFilter } from '@/features/mentor-users/ui/GenerationFilter';
import { InviteCodeButton } from '@/features/mentor-users/ui/InviteCodeButton';

import { ConfirmModal } from '@/shared/components/ui/ConfirmModal';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/Table';
import { Text } from '@/shared/components/ui/Text';
import { Pagination } from '@/shared/components/ui/pagination/Pagination';
import { Select } from '@/shared/components/ui/select/Select';

// ── 역할 선택 드롭다운 ──────────────────────────────────────────────────
function RoleSelect({
  role,
  onChange,
  disabled,
}: {
  role: UserRole;
  onChange: (role: UserRole) => void;
  disabled?: boolean;
}) {
  const items = [
    { label: '멘토', value: 'MENTOR' },
    { label: '멘티', value: 'MENTEE' },
  ];

  return (
    <div className="w-[100px] mx-auto flex items-center">
      <Select
        value={role}
        onChange={(val) => onChange(val as UserRole)}
        items={items}
        disabled={disabled}
        className="h-10 [&>div>button]:h-10 [&>div>button]:py-0 [&>div>button]:items-center"
      />
    </div>
  );
}

export function UserList() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [generationFilter, setGenerationFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [pendingRoleChange, setPendingRoleChange] = useState<{
    userId: string;
    newRole: UserRole;
  } | null>(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [generationFilter]);

  useEffect(() => {
    async function loadUsers() {
      setLoading(true);
      try {
        const data = await fetchUsers();
        setAllUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  const executeRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      await updateUserRole(userId, newRole);
      setAllUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user,
        ),
      );
    } catch (error) {
      console.error('Failed to update user role:', error);
      alert('역할 변경에 실패했습니다.');
    } finally {
      setIsConfirmModalOpen(false);
      setPendingRoleChange(null);
    }
  };

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    const user = allUsers.find((u) => u.id === userId);
    if (user?.role === 'MENTEE' && newRole === 'MENTOR') {
      setPendingRoleChange({ userId, newRole });
      setIsConfirmModalOpen(true);
      return;
    }
    await executeRoleChange(userId, newRole);
  };

  const handleConfirmRoleChange = () => {
    if (pendingRoleChange) {
      executeRoleChange(pendingRoleChange.userId, pendingRoleChange.newRole);
    }
  };

  const displayedUsers =
    generationFilter === ''
      ? allUsers
      : allUsers.filter(
          (user) => user.generation.toString() === generationFilter,
        );

  const PAGE_SIZE = 12;
  const paginatedUsers = displayedUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-white mb-4">사용자 관리</h1>
          <Text variant="large" className="text-zinc-400 font-medium">
            멘토 및 멘티 사용자 정보를 열람하고 권한 수정 및 초대 코드를 발급할
            수 있습니다.
          </Text>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <GenerationFilter
            value={generationFilter}
            onChange={setGenerationFilter}
          />
        </div>
        <InviteCodeButton />
      </div>

      {/* Table Section */}
      <div className="rounded-xl border border-white/10 bg-surface/50 overflow-hidden">
        {loading ? (
          <div className="w-full h-64 flex items-center justify-center">
            <span className="text-muted text-sm">로딩 중...</span>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px] text-center">프로필</TableHead>
                <TableHead className="w-[100px]">이름</TableHead>
                <TableHead className="w-[100px] text-center">기수</TableHead>
                <TableHead className="w-[100px] text-center">권한</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow
                  key={user.id}
                  className="group hover:bg-white/5 transition-colors"
                >
                  <TableCell className="text-center p-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-border bg-surfaceHighlight mx-auto shrink-0 flex items-center justify-center">
                      <img
                        src={user.profileImageUrl}
                        alt={`${user.name} profile`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            `https://ui-avatars.com/api/?name=${user.githubId}&background=random`;
                        }}
                      />
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-white">
                        {user.name}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-center font-mono text-zinc-300">
                    {user.generation}기
                  </TableCell>

                  <TableCell className="text-center p-2">
                    <RoleSelect
                      role={user.role}
                      onChange={(newRole) => handleRoleChange(user.id, newRole)}
                      disabled={user.role === 'MENTOR'}
                    />
                  </TableCell>
                </TableRow>
              ))}

              {paginatedUsers.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="h-32 text-center text-zinc-500"
                  >
                    해당 기수의 사용자가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <Pagination
          total={displayedUsers.length}
          currentPage={currentPage}
          pageSize={PAGE_SIZE}
          onPageChange={setCurrentPage}
        />
      </div>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmRoleChange}
        title="권한 변경 확인"
        message="멘티에서 멘토 권한 변경 시 멘토로 변경하면 멘티로 변경할 수 없습니다. 정말 권한을 변경하시겠습니까?"
        confirmLabel="변경하기"
        isDanger={true}
      />
    </div>
  );
}
