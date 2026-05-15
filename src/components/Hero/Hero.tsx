import { useState, useCallback, useEffect, useRef } from 'react';
import { COLLECTIONS } from '../../constants/collections';
import SlideContent from './SlideContent';
import BackgroundNumber from './BackgroundNumber';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { gsap } from 'gsap';

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isTransitioning = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setCurrentIndex((prev) => (prev + 1) % COLLECTIONS.length);
    setTimeout(() => {
      isTransitioning.current = false;
    }, 2200);
  }, []);

  const prevSlide = useCallback(() => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setCurrentIndex((prev) => (prev - 1 + COLLECTIONS.length) % COLLECTIONS.length);
    setTimeout(() => {
      isTransitioning.current = false;
    }, 2200);
  }, []);

  // Desktop scroll
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 60) {
        if (e.deltaY > 0) nextSlide();
        else prevSlide();
      }
    };
    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [nextSlide, prevSlide]);

  // Mobile touch swipe support
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0) nextSlide();
        else prevSlide();
      }
      touchStartY.current = null;
    };
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [nextSlide, prevSlide]);

  // Parallax mouse — desktop only
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Skip on touch devices
      if ('ontouchstart' in window) return;
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 15;
      const yPos = (clientY / window.innerHeight - 0.5) * 15;
      gsap.to(containerRef.current, {
        x: xPos,
        y: yPos,
        duration: 2.5,
        ease: 'power2.out',
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative w-full h-[100dvh] overflow-hidden bg-[#F2F1EF]">
      <div className="absolute inset-0 grain-overlay z-40" />

      <BackgroundNumber number={COLLECTIONS[currentIndex].number} />

      <div ref={containerRef} className="relative w-full h-full">
        {COLLECTIONS.map((collection, index) => (
          <SlideContent
            key={collection.id}
            collection={collection}
            isActive={index === currentIndex}
            index={index}
            total={COLLECTIONS.length}
          />
        ))}
      </div>

      {/* Vertical Navigation Dots (Right Side) */}
      <div className="absolute right-2 md:right-12 top-[30%] md:top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 md:gap-8 items-center">
        <div className="w-[1px] h-12 md:h-32 bg-black/10 absolute -z-10" />
        {COLLECTIONS.map((_, index) => (
          <button
            key={index}
            onClick={() => { if (!isTransitioning.current) setCurrentIndex(index); }}
            className="group relative flex items-center justify-center p-2 sm:p-2"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className={cn(
              "w-1.5 h-1.5 rounded-full transition-all duration-700",
              index === currentIndex ? "bg-black scale-125" : "bg-black/20 group-hover:bg-black/60"
            )} />
            {index === currentIndex && (
              <motion.div layoutId="activeNav" className="absolute -inset-1 border border-black/20 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Footer Content — hidden on mobile (mobile has its own bottom bar) */}
      <div className="hidden md:flex absolute bottom-8 left-0 w-full px-12 items-end justify-between z-50">
        <div className="flex items-center gap-4 cursor-pointer group">
          <div className="relative w-8 h-8 rounded-full border border-black/[0.06] flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
            <div className="w-1 h-1 bg-black/40 rounded-full" />
          </div>
          <span className="text-[8px] uppercase tracking-[0.4em] font-bold opacity-40 group-hover:opacity-100 transition-opacity">
            Swipe to discover
          </span>
        </div>

        <div className="flex items-center gap-8">
          {['Instagram', 'Facebook', 'Twitter'].map((social) => (
            <a
              key={social}
              href="#"
              className="text-[8px] uppercase tracking-[0.3em] font-bold opacity-30 hover:opacity-100 transition-all"
            >
              {social}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
