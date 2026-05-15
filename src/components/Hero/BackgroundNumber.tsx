import { motion, AnimatePresence } from 'motion/react';

interface BackgroundNumberProps {
  number: string;
}

export default function BackgroundNumber({ number }: BackgroundNumberProps) {
  return (
    <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none z-0">
      <AnimatePresence mode="wait">
        <motion.span
          key={number}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.035 }}
          exit={{ scale: 1.1, opacity: 0 }}
          transition={{ duration: 2.2, ease: [0.19, 1, 0.22, 1] }}
          className="text-[340px] font-serif font-bold leading-none tracking-tighter select-none"
        >
          {number}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
