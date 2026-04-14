'use client';

import dynamic from 'next/dynamic';

const CrestGLB = dynamic(() => import('components/CrestGLB'), { ssr: false });

export default function CrestGLBLazy(props: { src: string; size?: number; padding?: number }) {
  return <CrestGLB {...props} />;
}
