import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { Collection } from '../../constants/collections';
import { cn } from '../../lib/utils';
import { ArrowUpRight } from 'lucide-react';

interface SlideContentProps {
  key?: string;
  collection: Collection;
  isActive: boolean;
  index: number;
  total: number;
}

export default function SlideContent({ collection, isActive, index, total }: SlideContentProps) {
  const mobileImageRef = useRef<HTMLDivElement>(null);
  const desktopImageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;
    const isMobile = window.innerWidth < 768;
    const target = isMobile ? mobileImageRef.current : desktopImageRef.current;
    if (!target) return;
    gsap.fromTo(
      target,
      {
        clipPath: 'inset(20% 45% 20% 45%)',
        x: isMobile ? 60 : 400,
        scale: 0.5,
        opacity: 0
      },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        x: 0,
        scale: 1,
        opacity: 1,
        duration: isMobile ? 1.8 : 2.6,
        ease: 'power4.inOut',
        delay: 0.1
      }
    );
  }, [isActive]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 flex items-center justify-center transition-opacity duration-1000",
        isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
      )}
    >
      {/* Background Section Reveal (Light Streaks / Shadows) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.15] bg-[conic-gradient(from_0deg_at_50%_50%,#fff_0deg,#000_180deg,#fff_360deg)] mix-blend-soft-light" />
      </div>

      {/* ==================== MOBILE LAYOUT (< md) ==================== */}
      <div className="md:hidden relative w-full h-full overflow-hidden">

        {/* Full-screen Model Image */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div ref={mobileImageRef} className="w-full h-full relative overflow-hidden">
            <img
              src={collection.image}
              alt={collection.title}
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Light gradient overlay — fades image into background */}
        <div className="absolute inset-0 z-20 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #F2F1EF 0%, #F2F1EF 15%, rgba(242,241,239,0.97) 28%, rgba(242,241,239,0.8) 42%, rgba(242,241,239,0.3) 60%, transparent 100%)' }}
        />

        {/* Top-left collection number */}
        <div className="absolute top-20 left-6 z-30">
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="flex items-center gap-3"
              >
                <span className="text-[42px] font-serif font-light text-black/[0.06] leading-none">{collection.number}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom content overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-30 px-6 pb-7">
          <AnimatePresence>
            {isActive && (
              <>
                {/* Subtitle */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="flex items-center gap-2.5 mb-3"
                >
                  <div className="w-5 h-[1px] bg-black/30" />
                  <span className="text-[8px] uppercase tracking-[0.35em] font-semibold text-black/50">{collection.subtitle}</span>
                </motion.div>

                {/* Title */}
                <div className="overflow-hidden mb-2">
                  <motion.h2
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.65, duration: 1.6, ease: [0.19, 1, 0.22, 1] }}
                    className="text-[32px] font-serif font-light leading-[1.05] tracking-[-0.01em] text-black"
                  >
                    {collection.title}
                  </motion.h2>
                </div>

                {/* Quote */}
                <div className="overflow-hidden mb-5">
                  <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
                    className="text-[10px] text-black/40 max-w-[260px] leading-[1.8] font-light italic font-serif"
                  >
                    {collection.quote.replace(/"/g, '')}
                  </motion.p>
                </div>

                {/* Action row */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.7 }}
                  className="flex items-center justify-between"
                >
                  {/* Explore CTA */}
                  <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-active:bg-black group-active:text-white transition-all duration-500">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-black/80">Explore</span>
                  </div>

                  {/* Counter */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[18px] font-serif font-light text-black/70">0{index + 1}</span>
                    <div className="w-3 h-[1px] bg-black/15" />
                    <span className="text-[9px] font-bold tracking-[0.15em] text-black/25">0{total}</span>
                  </div>

                  {/* Film play */}
                  <div className="flex items-center gap-2.5 cursor-pointer group">
                    <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-active:bg-black/10 transition-all duration-500">
                      <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[7px] border-l-black/40 border-b-[4px] border-b-transparent translate-x-[1px]" />
                    </div>
                    <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-black/40">Film</span>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ==================== DESKTOP LAYOUT (>= md) ==================== */}
      <div className="hidden md:flex relative w-full h-full items-center px-12 lg:px-24">

        {/* Vertical side text */}
        <div className="absolute left-12 top-1/2 -translate-y-1/2 h-fit flex items-center z-20">
          <span className="vertical-text text-[9px] uppercase tracking-[0.8em] opacity-60 font-bold rotate-180">
            Luminaire / Collection
          </span>
        </div>

        {/* Center Main Model Image */}
        <div className="absolute top-[54%] left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-[9/16] h-[82vh] lg:h-[88vh] z-10 pointer-events-none">
          <div ref={desktopImageRef} className="w-full h-full relative overflow-hidden">
            <img
              src={collection.image}
              alt={collection.title}
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Text Area (Left Aligned) */}
        <div className="relative z-20 flex-1 max-w-2xl mt-20 ml-12">
          <AnimatePresence>
            {isActive && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-3 mb-3"
                >
                  <div className="w-10 h-[1px] bg-black/40" />
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-80">New Collection</span>
                </motion.div>

                <div className="overflow-hidden mb-5">
                  <motion.h2
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.7, duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
                    className="text-6xl lg:text-[92px] font-serif font-light leading-[1.05] tracking-tight max-w-[12ch]"
                  >
                    {collection.title}
                  </motion.h2>
                </div>

                <div className="overflow-hidden mb-8">
                  <motion.p
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                    className="text-[14px] text-black/60 max-w-[300px] leading-[1.7]"
                  >
                    A study of simplicity, light and form. Timeless silhouettes crafted for a new generation.
                  </motion.p>
                </div>

                <div className="flex items-center gap-8">
                  <motion.button
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1, duration: 1 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-700 ease-out">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex items-center gap-2 relative">
                      <span className="text-[9px] uppercase tracking-[0.4em] font-bold">
                        Explore Collection
                      </span>
                      <div className="absolute -bottom-1 left-0 w-6 h-[1px] bg-black/10 group-hover:w-full transition-all duration-500" />
                    </div>
                  </motion.button>

                  {/* Separator */}
                  <div className="w-[1px] h-6 bg-black/10" />

                  {/* Collection Film */}
                  <div className="flex items-center gap-3 cursor-pointer group">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3 }}
                      className="w-13 h-9 bg-black/10 overflow-hidden relative shadow-lg flex-shrink-0"
                    >
                      <img src={collection.previewImage} alt="Film" className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-5 h-5 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                          <div className="w-0 h-0 border-t-[2.5px] border-t-transparent border-l-[4px] border-l-white border-b-[2.5px] border-b-transparent translate-x-0.5" />
                        </div>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4 }}
                      className="flex flex-col items-start"
                    >
                      <span className="text-[9px] uppercase tracking-[0.35em] font-bold opacity-80 mb-0.5">Collection Film</span>
                      <span className="text-[7px] uppercase tracking-[0.25em] opacity-50 font-bold">Play Now</span>
                    </motion.div>
                  </div>
                </div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side Content */}
        <div className="hidden lg:flex absolute right-24 top-1/2 -translate-y-1/2 w-[380px] flex-col justify-between h-[80vh] z-20">

          {/* Top Right Detail Image with Frame */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 20 }}
            transition={{ delay: 1.6, duration: 1.2 }}
            className="self-end relative mt-8 mr-16"
          >
            <div className="absolute inset-0 border border-black/10 translate-x-4 translate-y-4 pointer-events-none" />
            <div className="w-48 h-64 border border-black/10 p-2 bg-white/40 backdrop-blur-xl relative">
              <img src={collection.previewImage} alt="Detail" className="w-full h-full object-contain opacity-90 transition-opacity duration-1000" />
            </div>
            <div className="absolute -bottom-8 right-0">
              <span className="text-[10px] font-bold tracking-[0.4em] opacity-80">0{index + 1} / 0{total}</span>
            </div>
          </motion.div>

          {/* Bottom Right Quotation */}
          <div className="self-end mr-16 w-48 relative mb-8">
            <span className="text-[100px] font-serif text-black/[0.03] absolute -left-12 -top-12 italic leading-none pointer-events-none select-none">"</span>
            <motion.div
              key={collection.id + 'text'}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 1 }}
            >
              <p className="text-[18px] font-serif italic text-black/90 leading-tight mb-6 w-full">
                {collection.quote.replace(/"/g, '')}
              </p>
              <span className="font-serif italic text-2xl text-black/50 font-light block tracking-widest">
                Veloura
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
