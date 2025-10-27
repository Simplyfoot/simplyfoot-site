import { supabase } from "./supabaseClient";

/**
 * 🔹 Récupère les clubs dont l'utilisateur est président
 * (leaved_at = NULL → président encore en poste)
 */
export async function getActivePresidentClubs(userId: string) {
  const { data, error } = await supabase
    .from("user_club_presidents")
    .select(`
      club_id,
      clubs (
        id,
        name
      )
    `)
    .eq("user_id", userId)
    .is("leaved_at", null);

  if (error) {
    console.error("❌ Erreur récupération clubs président:", error);
    return [];
  }

  return (data ?? []).map((item) => ({
    club_id: item.club_id,
    club_name: item.clubs?.[0]?.name ?? "Club sans nom",
  }));
}

/**
 * 🔹 Met à jour les informations d’un club existant
 */
export async function updateClub(clubId: string, updates: Record<string, unknown>) {
  const { data, error } = await supabase
    .from("clubs")
    .update(updates)
    .eq("id", clubId)
    .select()
    .single();

  if (error) {
    console.error("❌ Erreur update club:", error);
    throw error;
  }

  return data;
}

/**
 * 🔹 Ajoute un nouveau club et associe le président
 */
export async function addClub(
  userId: string,
  clubData: {
    name: string;
    city?: string;
    email?: string;
  }
) {
  // 1️⃣ Trouver l’admin associé à cet utilisateur
  const { data: admin, error: adminError } = await supabase
    .from("admins")
    .select("id")
    .eq("user_id", userId)
    .single();

  if (adminError || !admin) {
    console.error("❌ Aucun compte admin lié à cet utilisateur :", adminError);
    throw new Error("Aucun compte admin lié à cet utilisateur.");
  }

  // 2️⃣ Créer le club
  const { data: newClub, error: clubError } = await supabase
    .from("clubs")
    .insert([
      {
        created_by: admin.id,
        name: clubData.name,
        city: clubData.city ?? null,
        email: clubData.email ?? null,
      },
    ])
    .select()
    .single();

  if (clubError || !newClub) {
    console.error("❌ Erreur création club:", clubError);
    throw new Error("Erreur lors de la création du club.");
  }

  // 3️⃣ Associer le président au club
  const { error: linkError } = await supabase
    .from("user_club_presidents")
    .insert([{ user_id: userId, club_id: newClub.id }]);

  if (linkError) {
    console.error("❌ Erreur association président ↔ club:", linkError);
    throw new Error("Erreur lors de l’association président ↔ club.");
  }

  return newClub;
}

/**
 * 🔹 Récupère les informations d’un utilisateur (profil)
 */
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from("users")
    .select("first_name, last_name, email")
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
  };
}

/**
 * 🔹 Récupère les détails complets d’un club
 */
export async function getClubDetails(clubId: string) {
  if (!clubId) return null;

  const { data, error } = await supabase
    .from("clubs")
    .select(`
      id,
      name,
      address,
      postal_code,
      city,
      country,
      phone_number,
      email,
      siret_number,
      siren_number,
      website,
      webshop,
      created_at,
      updated_at
    `)
    .eq("id", clubId)
    .single();

  if (error) {
    console.error("❌ Erreur récupération détails club:", error);
    return null;
  }

  return {
    id: data.id,
    name: data.name ?? "",
    address: data.address ?? "",
    postal_code: data.postal_code ?? "",
    city: data.city ?? "",
    country: data.country ?? "",
    phone_number: data.phone_number ?? "",
    email: data.email ?? "",
    siret_number: data.siret_number ?? "",
    siren_number: data.siren_number ?? "",
    website: data.website ?? "",
    webshop: data.webshop ?? "",
    created_at: data.created_at,
    updated_at: data.updated_at,
  };
}
