export type ProjectStatus = "ONGOING" | "DONE";

export interface Project {
    id: string;
    type: string;
    title: string;
    startDate: string;
    dueDate: string;
    score?: number;
    status?: ProjectStatus;
}
