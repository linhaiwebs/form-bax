import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

export default function LuxuryMarbleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 50 : 200;

    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 3 + 1,
      speedY: Math.random() * 0.5 + 0.2,
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.3,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
    }));

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate((particle.rotation * Math.PI) / 180);

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size);
        gradient.addColorStop(0, `rgba(212, 175, 55, ${particle.opacity})`);
        gradient.addColorStop(0.5, `rgba(255, 215, 0, ${particle.opacity * 0.6})`);
        gradient.addColorStop(1, `rgba(212, 175, 55, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(-particle.size, -particle.size, particle.size * 2, particle.size * 2);

        ctx.restore();

        particle.y += particle.speedY;
        particle.x += particle.speedX;
        particle.rotation += particle.rotationSpeed;

        if (particle.y > canvas.height + 20) {
          particle.y = -20;
          particle.x = Math.random() * canvas.width;
        }

        if (particle.x < -20) particle.x = canvas.width + 20;
        if (particle.x > canvas.width + 20) particle.x = -20;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      animate();
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 50%, #262626 100%)',
        }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.8 }}
      />

      <svg className="absolute inset-0 w-full h-full opacity-10" style={{ mixBlendMode: 'overlay' }}>
        <defs>
          <pattern id="marbleTexture" x="0" y="0" width="400" height="400" patternUnits="userSpaceOnUse">
            <path
              d="M0,200 Q100,150 200,200 T400,200"
              fill="none"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="2"
            />
            <path
              d="M0,100 Q150,80 300,100 T600,100"
              fill="none"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1.5"
            />
            <path
              d="M0,300 Q120,320 240,300 T480,300"
              fill="none"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="1.8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#marbleTexture)" />
      </svg>

      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.15) 0%, transparent 50%)',
        }}
      />

      <div
        className="absolute top-0 left-0 w-full h-1"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.3) 50%, transparent 100%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-full h-1"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.3) 50%, transparent 100%)',
        }}
      />
      <div
        className="absolute left-0 top-0 w-1 h-full"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(212, 175, 55, 0.3) 50%, transparent 100%)',
        }}
      />
      <div
        className="absolute right-0 top-0 w-1 h-full"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(212, 175, 55, 0.3) 50%, transparent 100%)',
        }}
      />

      <svg className="absolute top-0 left-0 w-24 h-24 opacity-30" viewBox="0 0 100 100">
        <path
          d="M50,10 L60,30 L80,30 L65,45 L70,65 L50,50 L30,65 L35,45 L20,30 L40,30 Z"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="1"
        />
      </svg>

      <svg className="absolute top-0 right-0 w-24 h-24 opacity-30" viewBox="0 0 100 100">
        <path
          d="M50,10 L60,30 L80,30 L65,45 L70,65 L50,50 L30,65 L35,45 L20,30 L40,30 Z"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="1"
          transform="rotate(90 50 50)"
        />
      </svg>

      <svg className="absolute bottom-0 left-0 w-24 h-24 opacity-30" viewBox="0 0 100 100">
        <path
          d="M50,10 L60,30 L80,30 L65,45 L70,65 L50,50 L30,65 L35,45 L20,30 L40,30 Z"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="1"
          transform="rotate(270 50 50)"
        />
      </svg>

      <svg className="absolute bottom-0 right-0 w-24 h-24 opacity-30" viewBox="0 0 100 100">
        <path
          d="M50,10 L60,30 L80,30 L65,45 L70,65 L50,50 L30,65 L35,45 L20,30 L40,30 Z"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="1"
          transform="rotate(180 50 50)"
        />
      </svg>
    </div>
  );
}
