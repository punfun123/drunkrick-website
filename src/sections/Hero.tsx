import { useRef, useLayoutEffect, useState } from 'react';
import { ArrowRight, Copy, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CONTRACT_ADDRESS = 'ZWQ撸管中。。';

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const h1 = h1Ref.current;
    const sub = subRef.current;
    const cta = ctaRef.current;
    const hint = scrollHintRef.current;
    if (!section || !h1 || !sub || !cta || !hint) return;

    const ctx = gsap.context(() => {
      // Set initial hidden states
      gsap.set([h1, sub, cta], { opacity: 0, y: 30 });
      gsap.set(hint, { opacity: 0 });

      // Entry animation timeline (plays once on load)
      const entryTl = gsap.timeline({ delay: 0.2 });
      entryTl.to(h1, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
      entryTl.to(sub, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.6');
      entryTl.to(cta, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5');
      entryTl.to(hint, { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3');

      // Scroll-driven exit animations using fromTo (explicit start/end)
      gsap.fromTo(
        h1,
        { opacity: 1, y: 0, filter: 'blur(0px)' },
        {
          opacity: 0,
          y: -60,
          filter: 'blur(8px)',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '50% top',
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        sub,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '45% top',
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        cta,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '40% top',
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        hint,
        { opacity: 1 },
        {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: '10% top',
            end: '30% top',
            scrub: 1,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20"
    >
      <div className="relative z-10 flex flex-col items-center">
        {/* H1 */}
        <h1
          ref={h1Ref}
          className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-5xl font-normal will-change-transform"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Where{' '}
          <em className="not-italic" style={{ color: 'hsl(240, 4%, 66%)' }}>
            degen
          </em>{' '}
          energy rises
          <br className="hidden sm:block" />{' '}
          <em className="not-italic" style={{ color: 'hsl(240, 4%, 66%)' }}>
            through the silence.
          </em>
        </h1>

        {/* Subtext */}
        <p
          ref={subRef}
          className="mt-8 text-base sm:text-lg max-w-2xl leading-relaxed will-change-transform"
          style={{ color: 'hsl(240, 4%, 66%)' }}
        >
          The drunkest scientist in the multiverse just became the most chaotic meme coin on Solana.
          0% tax. LP burned. Mint revoked. Wubba Lubba Dub Dub.
        </p>

        {/* CA + CTA */}
        <div ref={ctaRef} className="flex flex-col items-center gap-5 mt-12 will-change-transform">
          <button
            onClick={handleCopy}
            className="liquid-glass rounded-full px-6 py-2.5 text-sm font-mono tracking-wider flex items-center gap-3 transition-transform duration-300 hover:scale-[1.03] cursor-pointer"
          >
            <span style={{ color: 'hsl(240, 4%, 66%)' }}>CA</span>
            <span className="w-px h-3 bg-white/20" />
            <span className="text-foreground">
              {CONTRACT_ADDRESS.slice(0, 14)}...{CONTRACT_ADDRESS.slice(-4)}
            </span>
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-white/40" />
            )}
          </button>

          <a
            href="https://pump.fun"
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass rounded-full px-14 py-5 text-base text-foreground transition-transform duration-300 hover:scale-[1.03] cursor-pointer inline-flex items-center gap-3"
          >
            Begin Journey
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 will-change-transform"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'hsl(240, 4%, 66%)' }}>
          Scroll
        </span>
        <div className="w-px h-5 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
