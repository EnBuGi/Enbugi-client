import { useEffect, useState } from "react";
import { GlobalSubmission } from "@/features/mentor-projects/model/submission";
import { menteeSubmissionApi } from "../api/submissions";
import { PageResponse } from "@/shared/api/types";

export function useMySubmissions(initialPage = 0, initialSize = 10) {
  const [data, setData] = useState<PageResponse<GlobalSubmission> | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(initialPage);
  const [size, setSize] = useState(initialSize);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    menteeSubmissionApi.getMySubmissions({ page, size })
      .then((d) => {
        if (mounted) setData(d);
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [page, size]);

  return { 
    data, 
    isLoading, 
    page, 
    setPage, 
    size, 
    setSize 
  } as const;
}
