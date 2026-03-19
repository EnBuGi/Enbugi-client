import { useState, useEffect } from 'react';
import { mentorProjectApi, AdminSubmissionDetailResponse } from '../api/projects';

export const useAdminSubmissionDetail = (submissionId: string) => {
  const [detail, setDetail] = useState<AdminSubmissionDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = async () => {
    try {
      setIsLoading(true);
      const data = await mentorProjectApi.getAdminSubmissionDetail(submissionId);
      setDetail(data);
      setError(null);
    } catch (err) {
      setError('제출 상세 정보를 불러오는 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (submissionId) {
      fetchDetail();
    }
  }, [submissionId]);

  return { detail, isLoading, error, refresh: fetchDetail };
};
