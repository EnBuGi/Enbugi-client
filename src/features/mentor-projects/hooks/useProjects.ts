"use client";

import { useEffect, useState } from "react";
import type { MentorProject } from "@/features/mentor-projects/model/project";
import { mentorProjectApi } from "@/features/mentor-projects/api/projects";

export function useMentorProjects() {
    const [data, setData] = useState<MentorProject[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const [isDeleting, setIsDeleting] = useState(false);

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

    const deleteProject = async (id: string) => {
        setIsDeleting(true);
        try {
            await mentorProjectApi.deleteProject(id);
            setData((prev) => prev?.filter((p) => p.id !== id));
            return true;
        } catch (err) {
            console.error("Failed to delete project:", err);
            return false;
        } finally {
            setIsDeleting(false);
        }
    };

    return { data, isLoading, error, deleteProject, isDeleting } as const;
}
