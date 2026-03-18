import { useEffect, useState } from "react";
import type { Submission, UserProjectSubmission, AdminSubmissionDetail, GlobalSubmission } from "@/features/mentor-projects/model/submission";
import { fetchMentorSubmissions, fetchUserProjectSubmissions, fetchAdminSubmissionDetail, fetchAllSubmissions } from "@/features/mentor-projects/api/projects";

export function useMentorSubmissions(projectId: string) {
    const [data, setData] = useState<Submission[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        setIsLoading(true);
        fetchMentorSubmissions(projectId)
            .then((d) => {
                if (mounted) setData(d);
            })
            .finally(() => mounted && setIsLoading(false));
        return () => {
            mounted = false;
        };
    }, [projectId]);

    return { data, isLoading } as const;
}

export function useUserProjectSubmissions(projectId: string, userId: string) {
    const [data, setData] = useState<UserProjectSubmission[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        setIsLoading(true);
        fetchUserProjectSubmissions(projectId, userId)
            .then((d) => {
                if (mounted) setData(d);
            })
            .finally(() => mounted && setIsLoading(false));
        return () => {
            mounted = false;
        };
    }, [projectId, userId]);

    return { data, isLoading } as const;
}

export function useAdminSubmissionDetail(submissionId: string) {
    const [data, setData] = useState<AdminSubmissionDetail | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        setIsLoading(true);
        fetchAdminSubmissionDetail(submissionId)
            .then((d) => {
                if (mounted) setData(d);
            })
            .finally(() => mounted && setIsLoading(false));
        return () => {
            mounted = false;
        };
    }, [submissionId]);

    return { data, isLoading } as const;
}

export function useAllSubmissions() {
    const [data, setData] = useState<GlobalSubmission[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        setIsLoading(true);
        fetchAllSubmissions()
            .then((d) => {
                if (mounted) setData(d);
            })
            .finally(() => mounted && setIsLoading(false));
        return () => {
            mounted = false;
        };
    }, []);

    return { data, isLoading } as const;
}
