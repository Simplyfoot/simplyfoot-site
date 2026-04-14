'use client';

import dynamic from 'next/dynamic';

const ResponsiveCanvas = dynamic(() => import('./ResponsiveCanvas'), { ssr: false });

export default ResponsiveCanvas;
