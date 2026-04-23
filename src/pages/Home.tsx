import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SmoothScrollProvider from '../sections/SmoothScrollProvider';
import Navbar from '../sections/Navbar';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Tokenomics from '../sections/Tokenomics';
import Roadmap from '../sections/Roadmap';
import Community from '../sections/Community';

gsap.registerPlugin(ScrollTrigger);

const sectionIds = ['home', 'about', 'tokenomics', 'roadmap', 'community'];

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Parallax video on scroll
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    gsap.to(video, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: mainRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  // Active section tracking for navbar
  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    const triggers: ScrollTrigger[] = [];

    sections.forEach((el, i) => {
      if (!el) return;
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => {
          if (self.isActive) {
            window.dispatchEvent(new CustomEvent('section-change', { detail: i }));
          }
        },
      });
      triggers.push(trigger);
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <SmoothScrollProvider>
      <main ref={mainRef} className="relative" style={{ background: 'hsl(201, 100%, 13%)' }}>
        {/* Fixed fullscreen video background — all sections share this */}
        <div className="fixed inset-0 z-0 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover scale-110"
          >
            <source src="./hero-bg.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay with gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#031221]/70 via-[#031221]/60 to-[#031221]/80" />
          {/* Bottom gradient to blend into sections */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#031221] to-transparent" />
        </div>

        {/* Fixed Navbar */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>

        {/* Continuous scrolling content */}
        <div className="relative z-10">
          {/* Hero */}
          <div id="home">
            <Hero />
          </div>

          {/* Spacer for cinematic transition */}
          <div className="h-[20vh]" />

          {/* About */}
          <div id="about">
            <About />
          </div>

          <div className="h-[20vh]" />

          {/* Tokenomics */}
          <div id="tokenomics">
            <Tokenomics />
          </div>

          <div className="h-[20vh]" />

          {/* Roadmap */}
          <div id="roadmap">
            <Roadmap />
          </div>

          <div className="h-[20vh]" />

          {/* Community */}
          <div id="community">
            <Community />
          </div>

          {/* Footer spacer */}
          <div className="h-[40vh]" />
        </div>
      </main>
    </SmoothScrollProvider>
  );
}
