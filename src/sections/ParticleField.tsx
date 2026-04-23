import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  pulse: number;
  pulseSpeed: number;
}

const COLORS = ['#00E5FF', '#39FF14', '#00B8D4', '#00E676'];

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles - sparse blockchain node pattern
    const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 20000));
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2.5 + 1,
      opacity: Math.random() * 0.5 + 0.3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
    }));

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouse);

    // Hexagonal blockchain grid overlay
    const drawHexGrid = (
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      time: number
    ) => {
      const hexSize = 60;
      const hexHeight = hexSize * Math.sqrt(3);
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.04)';
      ctx.lineWidth = 0.5;

      for (let row = -1; row < h / hexHeight + 1; row++) {
        for (let col = -1; col < w / (hexSize * 1.5) + 1; col++) {
          const x = col * hexSize * 1.5 + (row % 2) * hexSize * 0.75;
          const y = row * hexHeight * 0.5;
          const dist = Math.sqrt(
            Math.pow(x - w / 2, 2) + Math.pow(y - h / 2, 2)
          );
          const pulse = Math.sin(time * 0.001 + dist * 0.003) * 0.5 + 0.5;
          ctx.strokeStyle = `rgba(0, 229, 255, ${0.03 + pulse * 0.04})`;

          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 6;
            const hx = x + hexSize * Math.cos(angle);
            const hy = y + hexSize * Math.sin(angle);
            if (i === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }
    };

    // Floating data stream lines
    const drawDataStreams = (
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      time: number
    ) => {
      for (let i = 0; i < 5; i++) {
        const baseY = (h / 6) * (i + 1);
        const offset = Math.sin(time * 0.0005 + i * 1.5) * 50;

        ctx.beginPath();
        ctx.moveTo(0, baseY + offset);

        for (let x = 0; x < w; x += 20) {
          const y =
            baseY +
            offset +
            Math.sin(x * 0.01 + time * 0.001 + i) * 20 +
            Math.sin(x * 0.003 + time * 0.0005) * 40;
          ctx.lineTo(x, y);
        }

        const gradient = ctx.createLinearGradient(0, 0, w, 0);
        gradient.addColorStop(0, 'rgba(0, 229, 255, 0)');
        gradient.addColorStop(0.3, `rgba(0, 229, 255, ${0.03 + i * 0.01})`);
        gradient.addColorStop(0.7, `rgba(57, 255, 20, ${0.03 + i * 0.01})`);
        gradient.addColorStop(1, 'rgba(57, 255, 20, 0)');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    let animationId: number;
    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Draw hexagonal grid
      drawHexGrid(ctx, canvas.width, canvas.height, time);

      // Draw data streams
      drawDataStreams(ctx, canvas.width, canvas.height, time);

      // Update and draw particles
      for (const p of particles) {
        // Mouse interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.vx += (dx / dist) * force * 0.5;
          p.vy += (dy / dist) * force * 0.5;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        // Damping
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        const pulseSize = p.size * (1 + Math.sin(p.pulse) * 0.3);
        ctx.beginPath();
        ctx.arc(p.x, p.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity * (0.7 + Math.sin(p.pulse) * 0.3);
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, pulseSize * 3, 0, Math.PI * 2);
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pulseSize * 3);
        glow.addColorStop(0, p.color + '40');
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.globalAlpha = p.opacity * 0.3;
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
}
