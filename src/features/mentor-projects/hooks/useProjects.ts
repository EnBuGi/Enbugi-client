"use client";

import { useEffect, useState } from "react";
import type { MentorProject } from "@/features/mentor-projects/model/project";
import { fetchMentorProjects } from "@/features/mentor-projects/api/projects";

export function useMentorProjects() {
    const [data, setData] = useState<MentorProject[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        setIsLoading(true);
        fetchMentorProjects()
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
