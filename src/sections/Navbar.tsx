import { useState, useEffect } from 'react';
import { Menu, X, FlaskConical } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Tokenomics', href: '#tokenomics' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Community', href: '#community' },
];

export default function Navbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent;
      setActiveIndex(custom.detail);
    };
    window.addEventListener('section-change', handler);
    return () => window.removeEventListener('section-change', handler);
  }, []);

  // Track scroll for glass effect intensity
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`relative z-50 w-full transition-all duration-500 ${
        scrolled ? 'liquid-glass' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between py-5">
          {/* Logo */}
          <button onClick={() => goTo('#home')} className="flex items-center gap-3 group">
            <img
              src="/drick-logo.png"
              alt="DrunkRick"
              className="w-9 h-9 object-contain rounded-full transition-transform duration-300 group-hover:scale-110"
            />
            <span
              className="text-2xl sm:text-3xl tracking-tight text-foreground"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              DrunkRick<sup className="text-xs">&reg;</sup>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <button
                key={link.href}
                onClick={() => goTo(link.href)}
                className={`text-sm transition-colors duration-300 ${
                  activeIndex === i
                    ? 'text-foreground'
                    : 'text-[hsl(240,4%,66%)] hover:text-foreground'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <a
              href="https://pump.fun"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass rounded-full px-5 py-2.5 text-sm text-foreground transition-transform duration-300 hover:scale-[1.03] hidden sm:inline-flex items-center gap-2"
            >
              <FlaskConical className="w-3.5 h-3.5" />
              Begin Journey
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-foreground/70 hover:text-foreground transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 liquid-glass mx-4 rounded-2xl p-4 z-50">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => goTo(link.href)}
              className={`block w-full text-left px-4 py-3 rounded-lg text-sm transition-colors ${
                activeIndex === i
                  ? 'text-foreground bg-white/5'
                  : 'text-[hsl(240,4%,66%)] hover:text-foreground'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
