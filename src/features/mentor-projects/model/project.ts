export type MentorProjectStatus = '진행' | '예정' | '종료';

export interface MentorProject {
  id: string;
  title: string;
  generation: string;
  type: string;
  status: MentorProjectStatus;
  startDate: string;
  endDate: string;
}
