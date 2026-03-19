import { useEffect, useState } from "react";
import { GlobalSubmission } from "@/features/mentor-projects/model/submission";
import { menteeSubmissionApi } from "../api/submissions";

export function useMySubmissions() {
  const [data, setData] = useState<GlobalSubmission[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    menteeSubmissionApi.getMySubmissions()
      .then((d) => {
        if (mounted) setData(d);
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return { data, isLoading } as const;
}
