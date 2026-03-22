import { useEffect, useState } from "react";
import type { Submission, UserProjectSubmission, AdminSubmissionDetail, GlobalSubmission } from "../model/submission";
import { mentorProjectApi } from "@/features/mentor-projects/api/projects";

export function useMentorSubmissions(projectId: string) {
    const [data, setData] = useState<Submission[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        setIsLoading(true);
        mentorProjectApi.getProjectSubmissionSummary(projectId)
            .then((d) => {
                if (mounted) setData(d);
            })
            .finally(() => {
                if (mounted) setIsLoading(false);
            });
        return () => {
            mounted = false;
        };
    }, [projectId]);

    return { data, isLoading } as const;
}

export function useUserProjectSubmissions(projectId: string, userId: string, page: number = 0, size: number = 10) {
    const [data, setData] = useState<UserProjectSubmission[] | undefined>(undefined);
    const [totalElements, setTotalElements] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        setIsLoading(true);
        mentorProjectApi.getUserProjectSubmissions(projectId, userId, { page, size })
            .then((res) => {
                if (mounted) {
                    setData(res.content);
                    setTotalElements(res.totalElements);
                }
            })
            .finally(() => {
                if (mounted) setIsLoading(false);
            });
        return () => {
            mounted = false;
        };
    }, [projectId, userId, page, size]);

    return { data, totalElements, isLoading } as const;
}

export function useAdminSubmissionDetail(submissionId: string) {
    const [data, setData] = useState<AdminSubmissionDetail | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        setIsLoading(true);
        mentorProjectApi.getAdminSubmissionDetail(submissionId)
            .then((d) => {
                if (mounted) setData(d);
            })
            .finally(() => {
                if (mounted) setIsLoading(false);
            });
        return () => {
            mounted = false;
        };
    }, [submissionId]);

    return { data, isLoading } as const;
}

export function useAllSubmissions(page: number = 0, size: number = 10) {
    const [data, setData] = useState<GlobalSubmission[] | undefined>(undefined);
    const [totalElements, setTotalElements] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        setIsLoading(true);
        mentorProjectApi.getAllSubmissions({ page, size })
            .then((res) => {
                if (mounted) {
                    setData(res.content);
                    setTotalElements(res.totalElements);
                }
            })
            .finally(() => {
                if (mounted) setIsLoading(false);
            });
        return () => {
            mounted = false;
        };
    }, [page, size]);

    return { data, totalElements, isLoading } as const;
}
