'use client';

import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, CheckCircle2 } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Button from '@/components/ui/Button';
import MagneticButton from '@/components/animations/MagneticButton';

type CalendarView = 'calendar' | 'timeslots' | 'confirmed';

function CalendarPlaceholder() {
  const t = useTranslations('cta.calendar');

  const now = new Date();
  const todayDate = now.getDate();
  const todayMonth = now.getMonth();
  const todayYear = now.getFullYear();

  const [displayMonth, setDisplayMonth] = useState(todayMonth);
  const [displayYear, setDisplayYear] = useState(todayYear);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [view, setView] = useState<CalendarView>('calendar');

  const days = useMemo(() => {
    const dayKeys = ['days.0', 'days.1', 'days.2', 'days.3', 'days.4', 'days.5', 'days.6'] as const;
    return dayKeys.map((key) => t(key));
  }, [t]);

  const monthName = t(`months.${displayMonth}`);

  // Navigate months
  const prevMonth = useCallback(() => {
    if (displayMonth === 0) {
      setDisplayMonth(11);
      setDisplayYear((y) => y - 1);
    } else {
      setDisplayMonth((m) => m - 1);
    }
    setSelectedDay(null);
    setView('calendar');
  }, [displayMonth]);

  const nextMonth = useCallback(() => {
    if (displayMonth === 11) {
      setDisplayMonth(0);
      setDisplayYear((y) => y + 1);
    } else {
      setDisplayMonth((m) => m + 1);
    }
    setSelectedDay(null);
    setView('calendar');
  }, [displayMonth]);

  // Build calendar grid
  const firstDay = new Date(displayYear, displayMonth, 1).getDay();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const isCurrentMonth = displayMonth === todayMonth && displayYear === todayYear;
  const isPastMonth = displayYear < todayYear || (displayYear === todayYear && displayMonth < todayMonth);

  // Fake unavailable slots (weekends + some random days)
  const unavailableDays = [1, 6, 7, 8, 13, 14, 20, 21, 27, 28];

  const isPast = (day: number) => {
    if (isPastMonth) return true;
    if (isCurrentMonth && day <= todayDate) return true;
    return false;
  };

  const isUnavailable = (day: number) => unavailableDays.includes(day);

  const handleDayClick = (day: number) => {
    if (isPast(day) || isUnavailable(day)) return;
    setSelectedDay(day);
    setSelectedSlot(null);
    setView('timeslots');
  };

  const handleSlotClick = (slot: string) => {
    setSelectedSlot(slot);
  };

  const handleConfirm = () => {
    setView('confirmed');
  };

  const handleBack = () => {
    setView('calendar');
    setSelectedSlot(null);
  };

  const handleReset = () => {
    setView('calendar');
    setSelectedDay(null);
    setSelectedSlot(null);
    setDisplayMonth(todayMonth);
    setDisplayYear(todayYear);
  };

  // Can't navigate to past months
  const canGoPrev = !(displayYear === todayYear && displayMonth === todayMonth);

  const slots = ['slots.0', 'slots.1', 'slots.2', 'slots.3', 'slots.4', 'slots.5'] as const;

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className="rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: 'rgba(7, 30, 39, 0.9)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        {/* Top accent line */}
        <div className="h-[2px] gradient-brand-line" />

        <div className="p-7 md:p-8">
          {/* Title */}
          <h3 className="text-[var(--color-on-dark)] font-bold text-xl mb-6">
            {t('title')}
          </h3>

          {/* ── CALENDAR VIEW ── */}
          {view === 'calendar' && (
            <>
              {/* Month navigation */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={canGoPrev ? prevMonth : undefined}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200
                    ${canGoPrev
                      ? 'text-[var(--color-on-dark)]/50 hover:text-[var(--color-on-dark)] hover:bg-white/8 active:scale-90'
                      : 'text-[var(--color-on-dark)]/10 cursor-default'
                    }`}
                  aria-label="Previous month"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="text-[var(--color-on-dark)] text-base font-semibold tracking-wide">
                  {monthName} {displayYear}
                </span>
                <button
                  onClick={nextMonth}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--color-on-dark)]/50 hover:text-[var(--color-on-dark)] hover:bg-white/8 active:scale-90 transition-all duration-200"
                  aria-label="Next month"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1.5 mb-3">
                {days.map((day) => (
                  <div
                    key={day}
                    className="text-center text-[11px] font-semibold text-[var(--color-on-dark)]/25 uppercase tracking-widest py-1"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1.5">
                {cells.map((day, i) => {
                  if (day === null) {
                    return <div key={`empty-${i}`} className="aspect-square" />;
                  }

                  const past = isPast(day);
                  const unavailable = isUnavailable(day);
                  const isToday = isCurrentMonth && day === todayDate;
                  const isSelected = day === selectedDay;
                  const clickable = !past && !unavailable;

                  return (
                    <button
                      key={day}
                      onClick={() => handleDayClick(day)}
                      disabled={!clickable}
                      className={`
                        aspect-square rounded-xl flex items-center justify-center text-sm font-medium relative
                        transition-all duration-200 outline-none
                        ${isSelected
                          ? 'bg-[var(--color-accent)] text-white font-bold shadow-lg shadow-[var(--color-accent)]/30 scale-105'
                          : isToday
                            ? 'ring-2 ring-[var(--color-accent)]/50 text-[var(--color-accent)] font-bold'
                            : past
                              ? 'text-[var(--color-on-dark)]/10'
                              : unavailable
                                ? 'text-[var(--color-on-dark)]/20'
                                : 'text-[var(--color-on-dark)]/70 hover:bg-white/8 hover:text-[var(--color-on-dark)] hover:scale-105 active:scale-95'
                        }
                      `}
                    >
                      {day}
                      {/* Availability dot */}
                      {clickable && !isSelected && (
                        <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--color-primary)]/60" />
                      )}
                      {unavailable && !past && (
                        <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--color-on-dark)]/10" />
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* ── TIME SLOT VIEW ── */}
          {view === 'timeslots' && (
            <>
              <button
                onClick={handleBack}
                className="flex items-center gap-1.5 text-[var(--color-on-dark)]/50 hover:text-[var(--color-on-dark)] text-sm mb-5 transition-colors group"
              >
                <ChevronLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                {t('back')}
              </button>

              <div className="text-[var(--color-on-dark)]/50 text-sm mb-2">
                {selectedDay} {monthName} {displayYear}
              </div>

              <div className="flex items-center gap-2 mb-6">
                <Clock size={16} className="text-[var(--color-accent)]" />
                <span className="text-[var(--color-on-dark)] font-semibold">
                  {t('selectTime')}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {slots.map((slotKey) => {
                  const slot = t(slotKey);
                  const isActive = selectedSlot === slot;
                  return (
                    <button
                      key={slot}
                      onClick={() => handleSlotClick(slot)}
                      className={`
                        py-4 rounded-xl text-base font-medium transition-all duration-200 outline-none
                        ${isActive
                          ? 'bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/30 scale-[1.02]'
                          : 'bg-white/5 text-[var(--color-on-dark)]/70 hover:bg-white/10 hover:text-[var(--color-on-dark)] hover:scale-[1.02] active:scale-[0.98]'
                        }
                      `}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>

              {selectedSlot && (
                <button
                  onClick={handleConfirm}
                  className="w-full mt-6 py-4 rounded-xl bg-[var(--color-primary)] hover:brightness-110 text-white font-bold text-base transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-[var(--color-primary)]/20"
                >
                  {t('confirm')}
                </button>
              )}
            </>
          )}

          {/* ── CONFIRMED VIEW ── */}
          {view === 'confirmed' && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-primary)]/15 mb-5">
                <CheckCircle2 size={32} className="text-[var(--color-primary)]" />
              </div>
              <h4 className="text-[var(--color-on-dark)] text-xl font-bold mb-2">
                {t('confirmed')}
              </h4>
              <p className="text-[var(--color-on-dark)]/50 text-sm mb-2">
                {selectedDay} {monthName} {displayYear} · {selectedSlot}
              </p>
              <p className="text-[var(--color-on-dark)]/40 text-sm mb-8">
                {t('confirmedSub')}
              </p>
              <button
                onClick={handleReset}
                className="text-[var(--color-accent)] text-sm font-medium hover:underline underline-offset-4 transition-all"
              >
                {t('back')}
              </button>
            </div>
          )}
        </div>

        {/* Bottom accent line */}
        <div className="h-[2px] gradient-brand-line opacity-40" />
      </div>
    </div>
  );
}

export default function CTA() {
  const t = useTranslations('cta');

  return (
    <section className="relative py-28 md:py-36 px-6 overflow-hidden noise-overlay">
      {/* Dark background */}
      <div className="absolute inset-0 bg-[var(--color-surface-dark)]" />

      {/* Blurred video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-15 blur-sm"
      >
        <source src="/images/map.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: Text content */}
          <div className="text-center lg:text-left">
            <ScrollReveal variant="fadeUp">
              <span className="font-[family-name:var(--font-label)] text-sm italic text-[var(--color-accent)] tracking-wide">
                {t('label')}
              </span>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.15}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mt-4 mb-6 text-[var(--color-on-dark)] leading-tight">
                {t('headline')}
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.3}>
              <p className="text-base md:text-lg text-[var(--color-on-dark)]/60 max-w-xl mx-auto lg:mx-0 mb-10">
                {t('subtext')}
              </p>
            </ScrollReveal>

            <ScrollReveal variant="scaleUp" delay={0.45}>
              <MagneticButton className="inline-block">
                <Button
                  variant="primary"
                  size="lg"
                  className="animate-[ctaPulse_2s_ease-in-out_infinite]"
                >
                  {t('button')}
                </Button>
              </MagneticButton>
            </ScrollReveal>
          </div>

          {/* Right: Calendar */}
          <ScrollReveal variant="fadeUp" delay={0.3}>
            <CalendarPlaceholder />
          </ScrollReveal>
        </div>
      </div>

      {/* Floating embers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[var(--color-accent)]/40"
            style={{
              left: `${15 + i * 14}%`,
              bottom: '-5%',
              animation: `ember ${4 + i * 0.8}s ease-out ${i * 0.6}s infinite`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes ctaPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255, 87, 34, 0.5); }
          50% { box-shadow: 0 0 20px 8px rgba(255, 87, 34, 0); }
        }
        @keyframes ember {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          10% { opacity: 0.6; }
          100% { transform: translateY(-60vh) scale(0); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
