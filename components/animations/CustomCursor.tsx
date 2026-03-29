'use client';

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/lib/animations';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const circlePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if ('ontouchstart' in window) return;

    setVisible(true);

    function onMouseMove(e: MouseEvent) {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }

      const target = e.target as HTMLElement;
      const isHoverable =
        target.closest('a, button, [role="button"], input, [data-cursor-hover]') !== null;
      setHovering(isHoverable);
    }

    function onMouseLeave() {
      setVisible(false);
    }

    function onMouseEnter() {
      setVisible(true);
    }

    let raf: number;
    function animate() {
      const lerp = 0.15;
      circlePos.current.x += (mouse.current.x - circlePos.current.x) * lerp;
      circlePos.current.y += (mouse.current.y - circlePos.current.y) * lerp;
      if (circleRef.current) {
        circleRef.current.style.transform = `translate(${circlePos.current.x - 16}px, ${circlePos.current.y - 16}px)`;
      }
      raf = requestAnimationFrame(animate);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: hovering ? 'var(--color-accent)' : 'var(--color-primary)',
          transition: 'background-color 0.2s, width 0.2s, height 0.2s',
        }}
      />
      <div
        ref={circleRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          width: hovering ? 40 : 32,
          height: hovering ? 40 : 32,
          borderRadius: '50%',
          border: `1.5px solid ${hovering ? 'var(--color-accent)' : 'var(--color-primary)'}`,
          opacity: 0.5,
          transition: 'width 0.3s, height 0.3s, border-color 0.2s, opacity 0.2s',
        }}
      />
    </>
  );
}
