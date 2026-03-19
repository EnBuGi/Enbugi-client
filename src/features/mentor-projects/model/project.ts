export type ProjectType = 'JAVA' | 'SPRING' | 'REACT';

export interface MentorProject {
  id: string;
  title: string;
  type: ProjectType;
  generation: number;
  startDate: string;
  dueDate: string;
  description?: string;
  skeletonUrl?: string;
  testCodeUrl?: string;
}
