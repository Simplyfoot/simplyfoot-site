import { redirect } from '@/lib/i18n/routing';

export default async function ContactRedirect({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    redirect({ href: '/foot/contact', locale });
}
