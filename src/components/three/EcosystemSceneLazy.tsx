'use client';

import dynamic from 'next/dynamic';

const EcosystemScene = dynamic(() => import('./EcosystemScene'), { ssr: false });

export default EcosystemScene;
