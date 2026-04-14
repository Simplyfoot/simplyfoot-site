'use client';

import dynamic from 'next/dynamic';

const PlanetScene = dynamic(() => import('./PlanetScene'), { ssr: false });

export default PlanetScene;
