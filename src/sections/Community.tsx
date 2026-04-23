import { useRef, useLayoutEffect } from 'react';
import { MessageCircle, Twitter, Globe, Send, Heart, Share2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { name: 'Telegram', handle: '@DrunkRickPortal', icon: Send, url: 'https://t.me/DrunkRickPortal' },
  { name: 'Twitter / X', handle: '@DrunkRickSOL', icon: Twitter, url: 'https://x.com/DrunkRickSOL' },
  { name: 'Discord', handle: 'DrunkRick Labs', icon: MessageCircle, url: 'https://discord.gg/drunkrick' },
  { name: 'PumpFun', handle: 'Buy $DRICK', icon: Globe, url: 'https://pump.fun' },
];

const values = [
  'Be excellent to each other',
  'Memes > Technical Analysis',
  'Wubba Lubba Dub Dub!',
  'Never ask "wen lambo"',
];

export default function Community() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const image = imageRef.current;
    const socialsEl = socialsRef.current;
    if (!section || !header || !image || !socialsEl) return;

    const ctx = gsap.context(() => {
      // Header fromTo
      gsap.fromTo(header,
        { y: 40, opacity: 0, filter: 'blur(6px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' } }
      );

      // Character image fromTo + parallax
      gsap.fromTo(image,
        { x: -80, opacity: 0, scale: 0.9, filter: 'blur(10px)' },
        { x: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 65%', toggleActions: 'play none none reverse' } }
      );

      // Parallax (scrub only)
      gsap.to(image, {
        y: -30, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      });

      // Social cards fromTo
      const cards = socialsEl.querySelectorAll('.social-card');
      gsap.fromTo(cards,
        { x: 50, opacity: 0, filter: 'blur(4px)' },
        { x: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: socialsEl, start: 'top 75%', toggleActions: 'play none none reverse' } }
      );

      // Values card fromTo
      const valuesCard = socialsEl.querySelector('.values-card');
      if (valuesCard) {
        gsap.fromTo(valuesCard,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: 0.4, ease: 'power3.out',
            scrollTrigger: { trigger: socialsEl, start: 'top 60%', toggleActions: 'play none none reverse' } }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div ref={headerRef} className="text-center mb-10 will-change-transform">
          <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'hsl(240, 4%, 66%)' }}>Join the Chaos</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
            The Citadel of Ricks
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
          {/* Left: Character */}
          <div ref={imageRef} className="flex justify-center will-change-transform">
            <div className="relative">
              <div className="absolute -inset-6 bg-white/5 rounded-full blur-3xl" />
              <div className="relative z-10 overflow-hidden rounded-3xl">
                <img src="./rick-mischief.png" alt="Drunk Rick" className="w-48 sm:w-56 lg:w-64 object-contain" />
              </div>
            </div>
          </div>

          {/* Right: Socials + Values */}
          <div ref={socialsRef}>
            <div className="space-y-2">
              {socials.map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                  className="social-card group flex items-center gap-4 p-4 liquid-glass rounded-xl transition-all hover:scale-[1.02] will-change-transform">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <s.icon className="w-5 h-5 text-white/60" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-white text-sm">{s.name}</div>
                    <div className="text-xs" style={{ color: 'hsl(240, 4%, 66%)' }}>{s.handle}</div>
                  </div>
                  <Share2 className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
                </a>
              ))}
            </div>

            <div className="values-card mt-4 liquid-glass rounded-xl p-4">
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                <Heart className="w-4 h-4 text-white/40" /> Community Values
              </h3>
              <ul className="space-y-1.5">
                {values.map((v) => (
                  <li key={v} className="flex items-center gap-2 text-xs" style={{ color: 'hsl(240, 4%, 66%)' }}>
                    <span className="w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />{v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
