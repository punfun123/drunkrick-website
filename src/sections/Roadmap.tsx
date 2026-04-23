import { useRef, useLayoutEffect } from 'react';
import { FlaskConical, Rocket, Globe, Crown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const phases = [
  { phase: 'Phase 1', title: 'The Experiment', status: 'completed', items: ['Token creation on PumpFun', 'Website launch', 'Social media setup', 'LP creation & burn'], icon: FlaskConical },
  { phase: 'Phase 2', title: 'Portal Opening', status: 'active', items: ['DexScreener listing', 'CoinGecko & CMC', '1,000 holders', 'Meme contests'], icon: Rocket },
  { phase: 'Phase 3', title: 'Multiverse', status: 'upcoming', items: ['10,000 holders', 'NFT drop', 'Merch store', 'CEX talks'], icon: Globe },
  { phase: 'Phase 4', title: 'Infinite', status: 'upcoming', items: ['100K holders', 'Major CEX', 'Animated series', 'DAO governance'], icon: Crown },
];

export default function Roadmap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cardsEl = cardsRef.current;
    if (!section || !header || !cardsEl) return;

    const ctx = gsap.context(() => {
      // Header fromTo
      gsap.fromTo(header,
        { y: 40, opacity: 0, filter: 'blur(6px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' } }
      );

      // Cards cascade fromTo
      const cards = cardsEl.querySelectorAll('.roadmap-card');
      gsap.fromTo(cards,
        { y: 60, opacity: 0, filter: 'blur(8px)', scale: 0.95 },
        { y: 0, opacity: 1, filter: 'blur(0px)', scale: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: cardsEl, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );

      // Card items stagger
      phases.forEach((_, i) => {
        const cardItems = cardsEl.querySelectorAll(`.card-${i}-item`);
        gsap.fromTo(cardItems,
          { x: -12, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out',
            scrollTrigger: { trigger: cardsEl, start: 'top 60%', toggleActions: 'play none none reverse' } }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div ref={headerRef} className="text-center mb-10 will-change-transform">
          <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'hsl(240, 4%, 66%)' }}>Roadmap</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
            The Journey
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {phases.map((phase, index) => (
            <div key={phase.phase} className="roadmap-card liquid-glass rounded-2xl p-5 will-change-transform">
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full ${
                  phase.status === 'completed' ? 'bg-white/10 text-white/60' : phase.status === 'active' ? 'bg-white/10 text-white' : 'bg-white/5 text-white/30'
                }`}>{phase.status}</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center mb-3">
                <phase.icon className="w-4.5 h-4.5 text-white/60" />
              </div>
              <div className="text-[10px] font-mono tracking-wider uppercase mb-1" style={{ color: 'hsl(240, 4%, 66%)' }}>{phase.phase}</div>
              <h3 className="text-lg mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>{phase.title}</h3>
              <ul className="space-y-2">
                {phase.items.map((item) => (
                  <li key={item} className={`card-${index}-item flex items-start gap-2`}>
                    <span className={`mt-1.5 w-1 h-1 rounded-full flex-shrink-0 ${phase.status === 'completed' ? 'bg-white/40' : phase.status === 'active' ? 'bg-white' : 'bg-white/20'}`} />
                    <span className={`text-xs ${phase.status === 'completed' ? 'text-white/40 line-through' : phase.status === 'active' ? 'text-white/70' : 'text-white/30'}`}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
