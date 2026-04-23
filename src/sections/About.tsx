import { useRef, useLayoutEffect } from 'react';
import { Skull, Zap, Rocket, FlaskConical } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: Skull, title: 'Zero F*cks Given', desc: "Rick doesn't care about your feelings. Just sending it to the moon while blackout drunk." },
  { icon: Zap, title: 'Powered by Science', desc: "Brewed in Rick's interdimensional lab using portal fluid. 0% organic, 420% degen." },
  { icon: Rocket, title: 'Interdimensional Travel', desc: "Why stop at the moon? $DRICK is your portal gun to infinite gains across realities." },
  { icon: FlaskConical, title: 'Zero Tax, Pure Chaos', desc: 'No buy tax. No sell tax. No dev wallet. Just pure meme energy.' },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const title = titleRef.current;
    const cardsEl = cardsRef.current;
    if (!section || !image || !title || !cardsEl) return;

    const ctx = gsap.context(() => {
      // Image: fromTo with explicit states
      gsap.fromTo(
        image,
        { x: -80, opacity: 0, scale: 0.92, filter: 'blur(10px)' },
        {
          x: 0, opacity: 1, scale: 1, filter: 'blur(0px)',
          duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' },
        }
      );

      // Title fromTo
      gsap.fromTo(
        title,
        { y: 50, opacity: 0, filter: 'blur(6px)' },
        {
          y: 0, opacity: 1, filter: 'blur(0px)',
          duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none reverse' },
        }
      );

      // Feature cards fromTo with stagger
      const cards = cardsEl.querySelectorAll('.feature-card');
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0, filter: 'blur(4px)' },
        {
          y: 0, opacity: 1, filter: 'blur(0px)',
          duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: cardsEl, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );

      // Parallax on image (scrub only, no conflict)
      gsap.to(image, {
        y: -40, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Character */}
          <div ref={imageRef} className="relative flex justify-center will-change-transform">
            <div className="absolute -inset-8 bg-white/5 rounded-full blur-3xl" />
            <div className="relative z-10 overflow-hidden rounded-3xl">
              <img src="./about-character.png" alt="Drunk Rick" className="w-full max-w-xs lg:max-w-sm object-contain" />
            </div>
            <div className="absolute top-4 right-4 liquid-glass rounded-full px-4 py-2 animate-float z-20">
              <span className="text-xs font-medium tracking-wide">100% DEGEN</span>
            </div>
            <div className="absolute bottom-12 left-0 liquid-glass rounded-full px-4 py-2 animate-float z-20" style={{ animationDelay: '1s' }}>
              <span className="text-xs font-medium tracking-wide">0% TAX</span>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: 'hsl(240, 4%, 66%)' }}>About the Project</p>
            <h2 ref={titleRef} className="text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight mb-6 will-change-transform" style={{ fontFamily: "'Instrument Serif', serif" }}>
              The Drunkest Scientist<br /><span className="text-gradient">in the Multiverse</span>
            </h2>
            <div className="space-y-3 mb-6" style={{ color: 'hsl(240, 4%, 66%)' }}>
              <p className="text-sm sm:text-base leading-relaxed">In a garage in Dimension C-137, Rick accidentally turned his last portal fluid into a cryptocurrency.</p>
              <p className="text-sm sm:text-base leading-relaxed"><span className="text-white font-medium">$DRICK</span> isn't just a token — it's a middle finger to serious crypto.</p>
            </div>
            <div ref={cardsRef} className="grid grid-cols-2 gap-2.5">
              {features.map((f) => (
                <div key={f.title} className="feature-card liquid-glass rounded-xl p-3.5 transition-all hover:scale-[1.02] will-change-transform">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mb-2">
                    <f.icon className="w-4 h-4 text-white/70" />
                  </div>
                  <h3 className="font-medium text-white text-sm mb-1">{f.title}</h3>
                  <p className="text-xs leading-snug" style={{ color: 'hsl(240, 4%, 66%)' }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
