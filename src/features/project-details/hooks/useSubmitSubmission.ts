"use client";

import { useState } from "react";
import { projectApi } from "../api/project";

export function useSubmitSubmission(projectId: string) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitSubmission = async (repoUrl: string) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      if (!repoUrl.includes("github.com")) {
        throw new Error("올바른 GitHub URL을 입력해주세요.");
      }

      await projectApi.submitSubmission(projectId, repoUrl);
      setSuccess(true);
      
      setTimeout(() => {
        window.location.reload(); 
      }, 1500);

      return true;
    } catch (err: any) {
      setError(err.message || "제출 중 오류가 발생했습니다.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitSubmission, isSubmitting, error, success };
}
