import { BrevoClient } from '@getbrevo/brevo';

import { BRAND_CONTACT } from '@/config/site';
import {
    buildEmailHtml,
    type ContactPayload,
    contactSchema,
    formatSubject,
} from '@/helpers/contact.helpers';
import { BRANDS } from '@/utils/constants.utils';

export async function POST(request: Request): Promise<Response> {
    let json: unknown;
    try {
        json = await request.json();
    } catch {
        return Response.json({ ok: false, error: 'invalid_json' }, { status: 400 });
    }

    const parsed = contactSchema.safeParse(json);
    if (!parsed.success) {
        return Response.json(
            { ok: false, error: 'validation', issues: parsed.error.flatten() },
            { status: 400 },
        );
    }

    // La validation runtime garantit la forme : on type la donnée parsée via
    // `ContactPayload` (la dérivation dynamique du schéma empêche un infer
    // automatique précis).
    const payload = parsed.data as unknown as ContactPayload;

    // Honeypot : champ rempli => bot. On répond OK silencieusement, sans envoyer.
    if (payload.website && payload.website.length > 0) {
        return Response.json({ ok: true });
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
        console.error('[contact] BREVO_API_KEY manquante');
        return Response.json({ ok: false, error: 'email_service_unavailable' }, { status: 503 });
    }

    const subject = formatSubject(payload);
    const htmlContent = buildEmailHtml(payload);
    const brandLabel = BRANDS[payload.brand].label;
    const brandEmail = BRAND_CONTACT[payload.brand].email;
    const senderName = `${payload.firstName} ${payload.lastName}`.slice(0, 70);

    try {
        const client = new BrevoClient({ apiKey });
        await client.transactionalEmails.sendTransacEmail({
            sender: { email: brandEmail, name: brandLabel },
            to: [{ email: brandEmail }],
            replyTo: { email: payload.email, name: senderName },
            subject,
            htmlContent,
            headers: {
                'X-Simply-Brand': payload.brand,
                'X-Simply-Topic': payload.topic,
            },
            tags: [`brand:${payload.brand}`, `topic:${payload.topic}`],
        });
    } catch (error) {
        console.error('[contact] Brevo send failed', error);
        return Response.json({ ok: false, error: 'email_send_failed' }, { status: 502 });
    }

    return Response.json({ ok: true });
}
