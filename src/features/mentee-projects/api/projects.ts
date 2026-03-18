import type { Project } from "@/features/mentee-projects/model/project";

export const projects: Project[] = [
    {
        id: "p1",
        type: "SPRING",
        title: "SignUp Server",
        startDate: "2026-02-01",
        dueDate: "2026-03-15",
        score: 100,
        status: "ONGOING",
    },
    {
        id: "p2",
        type: "REACT",
        title: "SignUp Client",
        startDate: "2025-12-01",
        dueDate: "2025-12-20",
        score: 95,
        status: "DONE",
    },
    {
        id: "p3",
        type: "JAVA",
        title: "CMD",
        startDate: "2025-11-01",
        dueDate: "2025-11-15",
        score: 90,
        status: "DONE",
    },
    {
        id: "p4",
        type: "JAVA",
        title: "Library",
        startDate: "2025-10-01",
        dueDate: "2025-10-20",
        score: 100,
        status: "DONE",
    },
    {
        id: "p5",
        type: "JAVA",
        title: "Tic-Tac-Toe",
        startDate: "2025-09-01",
        dueDate: "2025-09-15",
        score: 85,
        status: "DONE",
    },
    {
        id: "p6",
        type: "JAVA",
        title: "Star Pattern",
        startDate: "2025-08-01",
        dueDate: "2025-08-15",
        score: 78,
        status: "DONE",
    },
];

export async function fetchProjects(): Promise<Project[]> {

    await new Promise((r) => setTimeout(r, 10));
    return projects;
}
