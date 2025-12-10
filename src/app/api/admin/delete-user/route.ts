import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { userId }: { userId: string } = await req.json();
    if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY! // ⚠️ Service role (pas publique)
    );

    // Supprimer d’abord le profil public (cascade)
    await supabaseAdmin.from("users").delete().eq("id", userId);

    // Supprimer le compte Auth
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (authError) throw authError;

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    console.error("❌ Erreur suppression RGPD :", e);
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
