export interface TeamMemberDTO {
  id: string;
  name: string;
  initials: string;
  role: string;
  bio: string | null;
  photoUrl: string | null;
  rowGroup: number;
}
