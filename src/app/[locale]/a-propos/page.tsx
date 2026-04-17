import { redirect } from '@/lib/i18n/routing';

export default async function AProposRedirect({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    redirect({ href: '/foot/a-propos', locale });
}
