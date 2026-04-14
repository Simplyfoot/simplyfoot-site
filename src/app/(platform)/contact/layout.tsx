import { buildPlatformMetadata } from 'lib/seo/metadata';

export const metadata = buildPlatformMetadata({
  title: 'Contact',
  description: 'Contactez l\u2019\u00e9quipe Simply. Une question, une d\u00e9mo, un projet club ? Nous r\u00e9pondons sous 24h ouvr\u00e9es.',
  path: '/contact',
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
