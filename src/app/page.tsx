import type { Metadata } from 'next';
import { getAllBrands } from 'lib/config/brands';
import { buildPlatformMetadata } from 'lib/seo/metadata';
import { PlatformPortal } from 'components/platform/PlatformPortal';

export function generateMetadata(): Metadata {
  return buildPlatformMetadata({
    title: 'Simply — La plateforme des clubs amateurs',
    description:
      'SimplyFoot, SimplyRugby, SimplyHandball — un écosystème complet pour gérer, motiver et faire rayonner votre club amateur.',
    path: '/',
  });
}

export default function RootPage() {
  const brands = getAllBrands();
  return <PlatformPortal brands={brands} />;
}
