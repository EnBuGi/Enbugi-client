"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";
import { Card } from "@/shared/components/ui/Card/Card";
import { Text } from "@/shared/components/ui/Text";
import { InputBox } from "@/shared/components/ui/InputBox/InputBox";
import { Button } from "@/shared/components/ui/Button";
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
    <Card title="코드 제출">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <InputBox
          label="Repository URL"
          type="url"
          placeholder="https://github.com/username/repo"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          disabled={isSubmitting}
          required
          icon={<Send size={14} />}
          error={error || undefined}
          helperText={success ? "제출이 완료되었습니다. 곧 채점이 시작됩니다." : undefined}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          disabled={isSubmitting || !repoUrl}
          className="w-full mt-1"
        >
          {isSubmitting ? "제출 중..." : "제출하기"}
        </Button>
      </form>
    </Card>
  );
}
