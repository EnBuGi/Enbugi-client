"use client";

import { useEffect, useState } from "react";
import type { MentorProject } from "@/features/mentor-projects/model/project";
import { mentorProjectApi } from "@/features/mentor-projects/api/projects";

export function useMentorProjects() {
    const [data, setData] = useState<MentorProject[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let mounted = true;
        setIsLoading(true);
        setError(null);
        
        mentorProjectApi.getAdminProjects()
            .then((d) => {
                if (mounted) setData(d);
            })
            .catch((err) => {
                if (mounted) {
                    console.error("Failed to fetch mentor projects:", err);
                    setError(err);
                }
            })
            .finally(() => {
                if (mounted) setIsLoading(false);
            });

        return () => {
            mounted = false;
        };
    }, []);

    return { data, isLoading, error } as const;
}
