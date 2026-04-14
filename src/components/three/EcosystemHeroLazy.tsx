'use client';

import dynamic from 'next/dynamic';

const EcosystemHero = dynamic(() => import('./EcosystemHero'), { ssr: false });

export default EcosystemHero;
