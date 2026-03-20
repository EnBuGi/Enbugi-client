"use client";

import { useState, useEffect, useCallback } from "react";
import { projectApi } from "../api/project";
import type { ProjectDetail, SubmissionHistory } from "../model/project";

export function useProject(projectId: string) {
  const [projectDetail, setProjectDetail] = useState<ProjectDetail | null>(null);
  const [history, setHistory] = useState<SubmissionHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!projectId) return;
    setIsLoading(true);
    setError(null);
    try {
      const [pData, hData] = await Promise.all([
        projectApi.getProjectDetail(projectId),
        projectApi.getSubmissionHistory(projectId, { size: 100 }) // Fetch last 100 for side list
      ]);
      setProjectDetail(pData);
      setHistory(hData.content);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load project data"));
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { projectDetail, history, isLoading, error, refetch: fetchData };
}
