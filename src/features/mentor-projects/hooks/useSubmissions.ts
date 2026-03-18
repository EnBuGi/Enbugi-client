"use client";

import { useEffect, useState } from "react";
import type { Submission } from "@/features/mentor-projects/model/submission";
import { fetchMentorSubmissions } from "@/features/mentor-projects/api/projects";

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
