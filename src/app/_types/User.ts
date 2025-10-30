export type User = {
  firstname: string;
  lastname: string;
  email: string;
  phone_number?: string | null;
  birth_date?: string | null;
  gender?: "MALE" | "FEMALE" | "OTHER" | null;
  gender_other_label?: string | null;
};