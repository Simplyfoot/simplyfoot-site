import { buildPlatformMetadata } from 'lib/seo/metadata';

export const metadata = buildPlatformMetadata({
  title: 'Blog',
  description: 'Conseils, innovations et actualités pour les clubs de sport amateur. Le journal Simply.',
  path: '/blog',
});

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
