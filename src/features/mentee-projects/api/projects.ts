import type { Project, ProjectStatus } from "@/features/mentee-projects/model/project";

export async function fetchProjects(): Promise<Project[]> {
    const accessToken = localStorage.getItem('accessToken');
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

    try {
        const response = await fetch(`${apiUrl}/api/v1/projects`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch projects');
        }

        const data = await response.json();
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
                score: undefined, // Score is not provided in list view
            };
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}
