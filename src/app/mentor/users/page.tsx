import React from 'react';
import { UserList } from '@/features/mentor-users/ui/UserList';

export default function MentorUsersPage() {
  return (
    <div className="w-full max-w-[1200px] mx-auto p-8">
      <UserList />
    </div>
  );
}
