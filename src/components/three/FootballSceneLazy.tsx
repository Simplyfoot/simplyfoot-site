'use client';

import dynamic from 'next/dynamic';

const FootballScene = dynamic(() => import('./FootballScene'), { ssr: false });

export default FootballScene;
