"use client";

import { useState, useEffect } from "react";
import { projectApi } from "../api/project";
import type { ProjectDetail, SubmissionHistory } from "../model/project";

export function useProject(projectId: string) {
  const [projectDetail, setProjectDetail] = useState<ProjectDetail | null>(null);
  const [history, setHistory] = useState<SubmissionHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!projectId) return;

    let isMounted = true;

    async function fetchData() {
      setIsLoading(true);
      try {
        const [pData, hData] = await Promise.all([
          projectApi.getProjectDetail(projectId),
          projectApi.getSubmissionHistory(projectId)
        ]);
        
        if (isMounted) {
          setProjectDetail(pData);
          setHistory(hData);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("Failed to load project data"));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [projectId]);

  return { projectDetail, history, isLoading, error };
}
