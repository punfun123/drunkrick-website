import { useRef, useLayoutEffect } from 'react';
import { Flame, Droplets, Users, Lock, TrendingUp, Shield } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const allocation = [
  { label: 'Public Sale', value: 60, amount: '600M', color: 'rgba(255,255,255,0.8)' },
  { label: 'LP Locked', value: 20, amount: '200M', color: 'rgba(255,255,255,0.6)' },
  { label: 'Community', value: 10, amount: '100M', color: 'rgba(255,255,255,0.4)' },
  { label: 'Burn', value: 10, amount: '100M', color: 'rgba(255,255,255,0.25)' },
];

const tokenDetails = [
  { label: 'Token', value: 'DrunkRick ($DRICK)', icon: Droplets },
  { label: 'Supply', value: '1,000,000,000', icon: Users },
  { label: 'Chain', value: 'Solana (SPL)', icon: TrendingUp },
  { label: 'Decimals', value: '9', icon: Lock },
  { label: 'Buy Tax', value: '0%', icon: Flame },
  { label: 'Sell Tax', value: '0%', icon: Flame },
];

export default function Tokenomics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const bar = barRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!section || !header || !bar || !left || !right) return;

    const ctx = gsap.context(() => {
      // Header fromTo
      gsap.fromTo(header,
        { y: 40, opacity: 0, filter: 'blur(6px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' } }
      );

      // Left panel fromTo
      gsap.fromTo(left,
        { x: -60, opacity: 0, filter: 'blur(8px)' },
        { x: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 60%', toggleActions: 'play none none reverse' } }
      );

      // Right panel fromTo
      gsap.fromTo(right,
        { x: 60, opacity: 0, filter: 'blur(8px)' },
        { x: 0, opacity: 1, filter: 'blur(0px)', duration: 1, delay: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 60%', toggleActions: 'play none none reverse' } }
      );

      // Allocation bar segments fromTo
      const barSegments = bar.querySelectorAll('.bar-seg');
      gsap.fromTo(barSegments,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out', transformOrigin: 'left center',
          scrollTrigger: { trigger: bar, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );

      // Detail rows fromTo
      const rows = right.querySelectorAll('.detail-row');
      gsap.fromTo(rows,
        { x: 20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: right, start: 'top 70%', toggleActions: 'play none none reverse' } }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div ref={headerRef} className="text-center mb-10 will-change-transform">
          <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'hsl(240, 4%, 66%)' }}>Token Economics</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
            $DRICK Tokenomics
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Left: Allocation */}
          <div ref={leftRef} className="liquid-glass rounded-2xl p-6 will-change-transform">
            <h3 className="text-sm font-medium mb-5 flex items-center gap-2" style={{ color: 'hsl(240, 4%, 66%)' }}>
              <TrendingUp className="w-4 h-4" /> Allocation
            </h3>
            <div ref={barRef} className="flex h-5 rounded-full overflow-hidden mb-6 bg-white/5">
              {allocation.map((item) => (
                <div key={item.label} className="bar-seg h-full" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
              ))}
            </div>
            <div className="space-y-2">
              {allocation.map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-white/80">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono" style={{ color: 'hsl(240, 4%, 66%)' }}>{item.amount}</span>
                    <span className="text-sm font-medium w-10 text-right">{item.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div ref={rightRef} className="liquid-glass rounded-2xl p-6 h-full will-change-transform">
            <h3 className="text-sm font-medium mb-5 flex items-center gap-2" style={{ color: 'hsl(240, 4%, 66%)' }}>
              <Shield className="w-4 h-4" /> Token Details
            </h3>
            <div className="space-y-1">
              {tokenDetails.map((item) => (
                <div key={item.label} className="detail-row flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-3.5 h-3.5 text-white/30" />
                    <span className="text-sm" style={{ color: 'hsl(240, 4%, 66%)' }}>{item.label}</span>
                  </div>
                  <span className="text-sm font-mono text-white/90">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="flex items-center gap-2 mb-1">
                <Flame className="w-4 h-4 text-orange-400/70" />
                <span className="text-sm font-medium">LP Burned Forever</span>
              </div>
              <p className="text-xs" style={{ color: 'hsl(240, 4%, 66%)' }}>LP tokens portal-gunned into a black hole. Never coming back.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
