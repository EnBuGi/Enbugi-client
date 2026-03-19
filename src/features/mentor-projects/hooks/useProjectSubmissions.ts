import { useState, useEffect } from 'react';
import { mentorProjectApi, AdminProjectSubmissionSummaryResponse } from '../api/projects';

export const useProjectSubmissions = (projectId: string) => {
  const [submissions, setSubmissions] = useState<AdminProjectSubmissionSummaryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubmissions = async () => {
    try {
      setIsLoading(true);
      const data = await mentorProjectApi.getProjectSubmissionSummary(projectId);
      setSubmissions(data);
      setError(null);
    } catch (err) {
      setError('제출 현황을 불러오는 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchSubmissions();
    }
  }, [projectId]);

  return { submissions, isLoading, error, refresh: fetchSubmissions };
};
