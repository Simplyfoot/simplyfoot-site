export type Club = {
  id: string;
  created_by: string;
  code: string | null;
  name: string;
  address?: string | null;
  postal_code?: string | null;
  city?: string | null;
  country?: string | null;
  phone_number?: string | null;
  email?: string | null;
  company_name?: string | null;
  siret_number?: string | null;
  siren_number?: string | null;
  vat_number?: string | null;
  website?: string | null;
  webshop?: string | null;
  required_registration_fields?: string[] | null;
  created_at: string;
  updated_at: string;
};

