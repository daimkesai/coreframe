'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';
import { prefersReducedMotion } from '@/lib/animations';

interface LineDrawSVGProps {
  className?: string;
  pathData: string;
  width?: number;
  height?: number;
  strokeColor?: string;
  strokeWidth?: number;
}

export default function LineDrawSVG({
  className,
  pathData,
  width = 200,
  height = 400,
  strokeColor = 'var(--color-primary)',
  strokeWidth = 2,
}: LineDrawSVGProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !pathRef.current || !svgRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: svgRef.current,
        start: 'top 70%',
        end: 'bottom 30%',
        scrub: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, [pathData]);

  return (
    <svg
      ref={svgRef}
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
    >
      <path
        ref={pathRef}
        d={pathData}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
