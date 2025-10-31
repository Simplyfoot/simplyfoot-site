import { User } from "app/_types/User";
import { supabase } from "./supabaseClient";
import { Club } from "app/_types/Club";

/* =========================================================================
   🔹 RÉCUPÉRER LES INFOS DE L’UTILISATEUR
   ========================================================================= */
export async function getUserProfile(userId: string): Promise<User> {
  const { data, error } = await supabase
    .from("users")
    .select(
      "first_name, last_name, email, phone_number, birth_date, gender, gender_other_label"
    )
    .eq("id", userId)
    .single();

  if (error) {
    console.error("❌ Erreur récupération profil utilisateur:", error);
    throw error;
  }

  return {
    firstname: data.first_name ?? "",
    lastname: data.last_name ?? "",
    email: data.email ?? "",
    phone_number: data.phone_number ?? null,
    birth_date: data.birth_date ?? null,
    gender: data.gender ?? null,
    gender_other_label: data.gender_other_label ?? null,
  };
}

/* =========================================================================
   🔹 METTRE À JOUR UN UTILISATEUR
   ========================================================================= */
export async function updateUser(userId: string, updates: User) {
  const { data, error } = await supabase
    .from("users")
    .update({
      first_name: updates.firstname,
      last_name: updates.lastname,
      email: updates.email,
      phone_number: updates.phone_number ?? null,
      birth_date: updates.birth_date ?? null,
      gender: updates.gender ?? null,
      gender_other_label: updates.gender_other_label ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    console.error("❌ Erreur update user:", error);
    throw error;
  }

  return data;
}

/* =========================================================================
   🔹 RÉCUPÉRER LES CLUBS DONT L’USER EST PRÉSIDENT
   ========================================================================= */
export async function getActivePresidentClubs(
  userId: string
): Promise<{ club_id: string; club_name: string }[]> {
  const { data, error } = await supabase
    .from("user_club_presidents")
    .select(
      `
      club_id,
      clubs (
        id,
        name
      )
    `
    )
    .eq("user_id", userId)
    .is("leaved_at", null);

  if (error) {
    console.error("❌ Erreur récupération clubs président:", error);
    return [];
  }

  return (data ?? []).map((item: any) => {
    const club = Array.isArray(item.clubs) ? item.clubs[0] : item.clubs;
    return {
      club_id: item.club_id,
      club_name: club?.name ?? "Club sans nom",
    };
  });
}

/* =========================================================================
   🔹 RÉCUPÉRER LES DÉTAILS D’UN CLUB
   ========================================================================= */
export async function getClubDetails(clubId: string): Promise<Club | null> {
  if (!clubId) return null;

  const { data, error } = await supabase
    .from("clubs")
    .select(
      `
      id,
      code,
      created_by,
      name,
      address,
      postal_code,
      city,
      country,
      phone_number,
      email,
      company_name,
      siret_number,
      siren_number,
      vat_number,
      website,
      webshop,
      required_registration_fields,
      created_at,
      updated_at
    `
    )
    .eq("id", clubId)
    .single();

  if (error) {
    console.error("❌ Erreur récupération détails club:", error);
    return null;
  }

  return {
    id: data.id,
    created_by: data.created_by,
    code: data.code ?? null,
    name: data.name ?? "",
    address: data.address ?? null,
    postal_code: data.postal_code ?? null,
    city: data.city ?? null,
    country: data.country ?? null,
    phone_number: data.phone_number ?? null,
    email: data.email ?? null,
    company_name: data.company_name ?? null,
    siret_number: data.siret_number ?? null,
    siren_number: data.siren_number ?? null,
    vat_number: data.vat_number ?? null,
    website: data.website ?? null,
    webshop: data.webshop ?? null,
    required_registration_fields: data.required_registration_fields ?? null,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };

}

/* =========================================================================
   🔹 METTRE À JOUR LES INFOS D’UN CLUB
   ========================================================================= */
export async function updateClub(clubId: string, updates: Club) {
  const { data, error } = await supabase
    .from("clubs")
    .update({
      name: updates.name,
      address: updates.address ?? null,
      postal_code: updates.postal_code ?? null,
      city: updates.city ?? null,
      country: updates.country ?? null,
      phone_number: updates.phone_number ?? null,
      email: updates.email ?? null,
      company_name: updates.company_name ?? null,
      siret_number: updates.siret_number ?? null,
      siren_number: updates.siren_number ?? null,
      vat_number: updates.vat_number ?? null,
      website: updates.website ?? null,
      webshop: updates.webshop ?? null,
      required_registration_fields: updates.required_registration_fields ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", clubId)
    .select()
    .single();

  if (error) {
    console.error("❌ Erreur update club:", error);
    throw error;
  }

  return data;
}

/* =========================================================================
   🔹 AJOUTER UN CLUB + L’ASSOCIER AU PRÉSIDENT CONNECTÉ
   ========================================================================= */
export async function addClub(
  userId: string,
  clubData: Club
): Promise<Club> {
  // 1️⃣ Créer le club directement lié à l’utilisateur (plus à un admin)
  const { data: newClub, error: clubError } = await supabase
    .from("clubs")
    .insert([
      {
        created_by: userId,
        name: clubData.name,
        address: clubData.address ?? null,
        postal_code: clubData.postal_code ?? null,
        city: clubData.city ?? null,
        country: clubData.country ?? "France",
        phone_number: clubData.phone_number ?? null,
        email: clubData.email ?? null,
        company_name: clubData.company_name ?? null,
        siret_number: clubData.siret_number ?? null,
        siren_number: clubData.siren_number ?? null,
        vat_number: clubData.vat_number ?? null,
        website: clubData.website ?? null,
        webshop: clubData.webshop ?? null,
        required_registration_fields:
          clubData.required_registration_fields ?? [],
      },
    ])
    .select()
    .single();

  if (clubError || !newClub) {
    console.error("❌ Erreur création club:", clubError);
    throw new Error("Erreur lors de la création du club.");
  }

  // 2️⃣ Associer le président à ce club
  const { error: linkError } = await supabase
    .from("user_club_presidents")
    .insert([{ user_id: userId, club_id: newClub.id }]);

  if (linkError) {
    console.error("❌ Erreur lien président-club:", linkError);
    throw new Error("Erreur lors de l’association président ↔ club.");
  }

  return newClub;
}

// 🔴 Supprimer un club (cascade sur les relations)
export async function deleteClub(clubId: string) {
  const { error } = await supabase.from("clubs").delete().eq("id", clubId);
  if (error) throw error;
}

// 🔴 Supprimer le compte utilisateur (table public.users)
// ⚠️ Ne supprime PAS l’utilisateur Auth.
export async function deleteUserAccountRow(userId: string) {
  const { error } = await supabase.from("users").delete().eq("id", userId);
  if (error) throw error;
}

