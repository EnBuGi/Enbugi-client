"use client";

import { useEffect, useState } from "react";
import type { Project } from "@/features/mentee-projects/model/project";
import { fetchProjects } from "@/features/mentee-projects/api/projects";

export function useProjects() {
    const [data, setData] = useState<Project[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        setIsLoading(true);
        fetchProjects()
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
