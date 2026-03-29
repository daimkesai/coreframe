'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { gsap, ScrollTrigger } from '@/lib/animations';
import { prefersReducedMotion } from '@/lib/animations';
import Button from '@/components/ui/Button';
import MagneticButton from '@/components/animations/MagneticButton';
import TextScramble from '@/components/animations/TextScramble';

// Pin icon SVGs — hollow outline style in brand green
const PIN_ICON_COLOR = '#2EBB50';

function ChatGPTIcon() {
  return (
    <svg width="55" height="55" viewBox="0 0 41 41" fill="none">
      <path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835A9.964 9.964 0 0 0 18.306.5a10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 7.516 3.35 10.078 10.078 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813zM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496zM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744zM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.012L7.044 23.86a7.504 7.504 0 0 1-2.747-10.24zm27.658 6.437-9.724-5.615 3.367-1.943a.121.121 0 0 1 .113-.012l8.051 4.649a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.649-1.131zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763zm-21.063 6.929-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225zm1.829-3.943 4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V18z" fill={PIN_ICON_COLOR}/>
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="55" height="55" viewBox="0 0 24 24" fill="none" stroke={PIN_ICON_COLOR} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'scaleY(-1)' }}>
      <path d="M20.945 11A8.966 8.966 0 0 0 21 10.5C21 5.253 16.747 1 11.5 1S2 5.253 2 10.5 6.253 20 11.5 20c2.14 0 4.12-.71 5.71-1.9" />
      <path d="M12 10.5h9" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="55" height="55" viewBox="0 0 24 24" fill="none" stroke={PIN_ICON_COLOR} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

const pinIcons = [ChatGPTIcon, GoogleIcon, ShieldIcon];

// Reference width for scaling — matches max-w-4xl (56rem = 896px)
const PIN_REFERENCE_WIDTH = 896;

// Positions: % relative to video container — anchored to specific buildings
const pinPositions = [
  { left: '39%', top: '52%' },   // Pin 0: blue and white building
  { left: '20%', top: '18%' },   // Pin 1: brown-roof building (upper-left)
  { left: '74.5%', top: '19%' },   // Pin 2: red building (right)
];

// 3D cartoonish map pin SVG in accent orange
function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="48"
      height="68"
      viewBox="0 0 24 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shadow */}
      <ellipse cx="12" cy="32" rx="5" ry="2" fill="rgba(0,0,0,0.15)" />
      {/* Pin body — teardrop */}
      <path
        d="M12 0C5.373 0 0 5.373 0 12c0 8 12 20 12 20s12-12 12-20C24 5.373 18.627 0 12 0z"
        fill="#FF5722"
      />
      {/* 3D highlight */}
      <path
        d="M12 0C5.373 0 0 5.373 0 12c0 1.5.3 2.9.8 4.2C2.5 8.5 6.8 3 12 3s9.5 5.5 11.2 13.2c.5-1.3.8-2.7.8-4.2C24 5.373 18.627 0 12 0z"
        fill="rgba(255,255,255,0.3)"
      />
      {/* Inner circle */}
      <circle cx="12" cy="11" r="5" fill="white" />
      <circle cx="12" cy="11" r="3" fill="#FF5722" opacity="0.6" />
    </svg>
  );
}

export default function Hero() {
  const t = useTranslations('hero');
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const pinsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [pinScale, setPinScale] = useState(1);

  useEffect(() => {
    if (prefersReducedMotion()) {
      const els = [headlineRef, subRef, videoContainerRef, ctaRef];
      els.forEach((ref) => {
        if (ref.current) ref.current.style.opacity = '1';
      });
      pinsRef.current.forEach((pin) => {
        if (pin) pin.style.opacity = '1';
      });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    // Set initial states for page-load elements
    const refs = [headlineRef, subRef, videoContainerRef, ctaRef];
    refs.forEach((ref) => {
      if (ref.current) gsap.set(ref.current, { opacity: 0, y: 30 });
    });

    // Pins start hidden and above (will drop from sky)
    pinsRef.current.forEach((pin) => {
      if (pin) gsap.set(pin, { opacity: 0, y: -40 });
    });

    // Choreographed page-load sequence (NO pins)
    tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.3)
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.9)
      .to(videoContainerRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 1.0)
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, 1.6);

    // Pins drop from sky on scroll — separate ScrollTrigger
    if (videoContainerRef.current) {
      const validPins = pinsRef.current.filter(Boolean) as HTMLDivElement[];
      if (validPins.length > 0) {
        ScrollTrigger.create({
          trigger: videoContainerRef.current,
          start: 'top 30%',
          once: true,
          onEnter: () => {
            gsap.to(validPins, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.25,
              ease: 'back.out(1.4)',
            });
          },
        });
      }
    }

    return () => {
      tl.kill();
    };
  }, []);

  // Scale pins proportionally with video container width
  useEffect(() => {
    const container = videoContainerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      setPinScale(entry.contentRect.width / PIN_REFERENCE_WIDTH);
    });
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-68 pb-16 overflow-hidden"
    >
      {/* Gradient mesh background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{
            background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)',
            animation: 'heroFloat 20s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)',
            animation: 'heroFloat 25s ease-in-out infinite reverse',
          }}
        />
      </div>

      {/* Headline */}
      <h1
        ref={headlineRef}
        className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center max-w-4xl leading-tight mb-6"
      >
        {t('headlinePre')}{' '}
        <span
          className="italic"
          style={{
            background: 'linear-gradient(135deg, #1B5E3B 0%, #3A8C52 50%, #6BAF47 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >{t('headlineGreen')}</span>{' '}
        {t('headlinePost')}{' '}
        <span className="text-[var(--color-on-surface)]">{t('headlineEnd')}</span>
      </h1>

      {/* Subheadline */}
      <p
        ref={subRef}
        className="text-base md:text-lg text-[var(--color-outline)] text-center max-w-2xl mb-10 leading-relaxed"
      >
        {t('subheadline')}
      </p>

      {/* CTA button */}
      <div ref={ctaRef} className="flex justify-center mb-12">
        <MagneticButton>
          <Button variant="primary" size="lg">
            {t('ctaPrimary')}
          </Button>
        </MagneticButton>
      </div>

      {/* Video + map pins — outer relative container for pin positioning */}
      <div ref={videoContainerRef} className="relative w-full max-w-4xl mx-auto">
        {/* Video — isolated with overflow-hidden */}
        <div className="relative rounded-2xl overflow-hidden shadow-ambient-lg">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/map-poster.jpg"
            className="w-full h-auto block"
          >
            <source src="/map.mp4" type="video/mp4" />
          </video>

          {/* Radial overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, transparent 30%, var(--color-background) 100%)',
              animation: 'heroBreathe 4s ease-in-out infinite',
            }}
          />

          {/* Radar ping */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <circle cx="50" cy="50" r="15" fill="none" stroke="var(--color-primary)" strokeWidth="0.15" opacity="0.2">
              <animate attributeName="r" from="10" to="45" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.3" to="0" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="50" cy="50" r="15" fill="none" stroke="var(--color-primary)" strokeWidth="0.15" opacity="0.2">
              <animate attributeName="r" from="10" to="45" dur="3s" begin="1s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.3" to="0" dur="3s" begin="1s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        {/* Map pins — OUTSIDE overflow-hidden, inside relative parent */}
        {pinPositions.map((pos, i) => (
          <div
            key={i}
            ref={(el) => { pinsRef.current[i] = el; }}
            className="absolute pointer-events-none z-10"
            style={{
              left: pos.left,
              top: pos.top,
              opacity: 0,
            }}
          >
            {/* Scale + center wrapper — separated from GSAP's transform */}
            <div
              className="flex flex-col items-center"
              style={{
                transform: `translateX(-50%) scale(${pinScale})`,
                transformOrigin: 'center bottom',
              }}
            >
              {/* Card — square, white bg, brand-aligned */}
              <div
                className="pointer-events-auto bg-white/75 backdrop-blur-sm border border-white/70 shadow-ambient rounded-2xl flex flex-col justify-center gap-3 px-4 py-4 w-max"
                style={{
                  animation: `heroPinBob 3s ease-in-out ${i * 0.5}s infinite`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="shrink-0">{(() => { const Icon = pinIcons[i]; return <Icon />; })()}</div>
                  <div className="text-lg font-extrabold text-[var(--color-on-surface)] leading-tight whitespace-nowrap">
                    <div>{t(`pins.${i}.line1a`)}</div>
                    <div>{t(`pins.${i}.line1b`)}</div>
                  </div>
                </div>
                <p className="text-base font-medium text-[var(--color-on-surface)]/70 leading-snug whitespace-nowrap">
                  {t(`pins.${i}.line2`)}
                </p>
              </div>

              {/* Stem */}
              <div className="shrink-0 bg-transparent" style={{ width: 2, height: 30 }} />

              {/* 3D map pin marker */}
              <MapPinIcon className="shrink-0" />
            </div>
          </div>
        ))}

      </div>

      <style jsx>{`
        @keyframes heroFloat {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -20px); }
        }
        @keyframes heroBreathe {
          0%, 100% { opacity: 0.03; }
          50% { opacity: 0.08; }
        }
        @keyframes heroPinBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </section>
  );
}
