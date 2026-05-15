import { motion } from 'motion/react';
import { Menu, Search } from 'lucide-react';

export default function Navbar() {
  const navLinks = ['Collections', 'About', 'Journal', 'Stores'];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5 md:px-12 md:py-6"
    >
      {/* Left: Menu */}
      <div className="flex items-center gap-1.5 sm:gap-2 group cursor-pointer lg:w-1/4">
        <Menu className="w-5 h-5 sm:hidden opacity-80" strokeWidth={1.5} />
        <span className="hidden sm:inline text-[10px] uppercase tracking-[0.4em] font-medium">Menu</span>
        <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-black" />
      </div>

      {/* Center: Brand + Nav Links */}
      <div className="flex flex-col items-center gap-3 sm:gap-4 lg:w-2/4">
        <h1 className="text-lg sm:text-2xl md:text-3xl font-serif font-light tracking-[0.25em] sm:tracking-[0.4em] md:tracking-[0.5em] uppercase leading-none">
          Velóura
        </h1>
        <div className="hidden lg:flex items-center justify-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[10px] uppercase tracking-[0.3em] font-medium opacity-60 hover:opacity-100 transition-opacity"
            >
              {link}
            </a>
          ))}
        </div>
      </div>

      {/* Right: Search */}
      <div className="flex items-center justify-end gap-1.5 sm:gap-2 group cursor-pointer lg:w-1/4">
        <Search className="w-5 h-5 sm:hidden opacity-80" strokeWidth={1.5} />
        <span className="hidden sm:inline text-[10px] uppercase tracking-[0.4em] font-medium">Search</span>
        <div className="hidden sm:block w-2 h-2 rounded-full border border-black" />
      </div>
    </motion.nav>
  );
}
