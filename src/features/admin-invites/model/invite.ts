export type Role = 'MENTOR' | 'MENTEE';

export interface InviteRequest {
  role: Role;
  durationInMillis: number;
}

export interface InviteResponse {
  token: string;
  role: Role;
  generation: number;
}

export interface CreatedInviteCode {
  token: string;
  role: Role;
  generation: number;
  createdAt: Date;
  expiresAt: Date;
  inviteUrl: string;
}
