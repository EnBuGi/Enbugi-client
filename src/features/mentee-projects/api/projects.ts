import { fetchWithAuth } from "@/shared/api/client";
import type { Project, ProjectStatus } from "@/features/mentee-projects/model/project";

export async function fetchProjects(): Promise<Project[]> {
    try {
        const data = await fetchWithAuth('/api/v1/projects');
        const now = new Date();

        return data.map((item: any) => {
            const startDate = new Date(item.startDate);
            const dueDate = new Date(item.dueDate);
            
            let status: ProjectStatus = "BEFORE";
            if (now >= startDate && now <= dueDate) {
                status = "ONGOING";
            } else if (now > dueDate) {
                status = "DONE";
            }

            return {
                id: item.id,
                type: item.type,
                title: item.title,
                startDate: item.startDate.split('T')[0],
                dueDate: item.dueDate.split('T')[0],
                status: status,
                score: item.score,
            };
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}
