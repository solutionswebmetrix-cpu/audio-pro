import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Search, ArrowRight } from 'lucide-react';
import { siteData } from '@/data/siteData';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { Logo } from './Logo';
import { SearchOverlay } from './SearchOverlay';

interface HeaderProps {
  onQuoteOpen: (product?: string) => void;
}

export function Header({ onQuoteOpen }: HeaderProps) {
  const scrolled = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const reduced = usePrefersReducedMotion();

  const closeMobile = () => setMobileOpen(false);

  const navItems = siteData.nav;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-[#E1E4E8] bg-white/95 shadow-[0_2px_12px_rgba(16,24,40,0.05)] backdrop-blur-xl'
            : 'border-b border-[#E1E4E8] bg-white/95 backdrop-blur-xl'
        }`}
      >
        <div className={`container-px transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}>
          <div className="flex items-center justify-between gap-4">
            <Logo />

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm font-medium transition-colors ${
                      isActive ? 'text-[#1A1A1A]' : 'text-[#5F6368] hover:text-[#1A1A1A]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && !reduced && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-[#E52B25]"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      {isActive && reduced && (
                        <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-[#E52B25]" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="rounded-lg p-2.5 text-[#5F6368] transition-colors hover:bg-[#F5F6F7] hover:text-[#1A1A1A]"
                aria-label="Search products"
              >
                <Search className="h-5 w-5" />
              </button>
              <button
                onClick={() => onQuoteOpen()}
                className="hidden btn-primary px-5 py-2.5 text-xs sm:inline-flex"
              >
                Request Quote
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setMobileOpen(true)}
                className="rounded-lg p-2.5 text-[#1A1A1A] transition-colors hover:bg-[#F5F6F7] lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={reduced ? undefined : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
          >
            <div className="absolute inset-0 bg-white/95 backdrop-blur-xl" onClick={closeMobile} />
            <motion.div
              className="absolute right-0 top-0 h-full w-[80%] max-w-sm border-l border-[#E1E4E8] bg-white"
              initial={reduced ? undefined : { x: '100%' }}
              animate={reduced ? undefined : { x: 0 }}
              exit={reduced ? undefined : { x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between border-b border-[#E1E4E8] px-5 py-4">
                <Logo />
                <button
                  onClick={closeMobile}
                  className="rounded-lg p-2 text-[#7A7F85] transition-colors hover:bg-[#F5F6F7] hover:text-[#1A1A1A]"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1 px-3 py-4" aria-label="Mobile navigation">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={reduced ? undefined : { opacity: 0, x: 20 }}
                    animate={reduced ? undefined : { opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <NavLink
                      to={item.path}
                      onClick={closeMobile}
                      className={({ isActive }) =>
                        `block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                          isActive
                            ? 'bg-[#E52B25]/10 text-[#E52B25]'
                            : 'text-[#5F6368] hover:bg-[#F5F6F7] hover:text-[#1A1A1A]'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                ))}
                <button
                  onClick={() => { closeMobile(); onQuoteOpen(); }}
                  className="btn-primary mt-4 w-full"
                >
                  Request Quote
                  <ArrowRight className="h-4 w-4" />
                </button>
                <Link
                  to="/contact"
                  onClick={closeMobile}
                  className="btn-ghost mt-2 w-full"
                >
                  Contact Us
                </Link>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
