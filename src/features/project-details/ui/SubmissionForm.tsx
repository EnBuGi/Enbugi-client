"use client";

import React, { useState } from "react";
import { AuthCard } from "@/features/auth/ui/AuthCard";
import { useSubmitSubmission } from "../hooks/useSubmitSubmission";

interface Props {
  projectId: string;
}

export function SubmissionForm({ projectId }: Props) {
  const [repoUrl, setRepoUrl] = useState("");
  const { submitSubmission, isSubmitting, error, success } = useSubmitSubmission(projectId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl) return;

    await submitSubmission(repoUrl);
  };

  return (
    <AuthCard>
      <div className="p-6">
        <h2 className="text-xl font-bold text-white mb-4">프로젝트 제출</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-white/80 mb-1">GitHub 저장소 링크</label>
            <input 
              type="url" 
              placeholder="https://github.com/vvineey/project-repo" 
              className="w-full bg-black/20 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/30 transition-colors"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm mt-1">{error}</div>
          )}
          {success && (
            <div className="text-green-400 text-sm mt-1">제출이 완료되었습니다. 곧 채점이 시작됩니다.</div>
          )}

          <button 
            type="submit"
            disabled={isSubmitting || !repoUrl}
            className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {isSubmitting ? "제출 중..." : "제출하기"}
          </button>
        </form>
      </div>
    </AuthCard>
  );
}
