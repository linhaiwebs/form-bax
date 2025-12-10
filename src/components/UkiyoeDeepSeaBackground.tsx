import { useEffect, useRef } from 'react';

interface Bubble {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  drift: number;
}

export default function UkiyoeDeepSeaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
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
    const bubbleCount = isMobile ? 30 : 80;

    bubblesRef.current = Array.from({ length: bubbleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height + canvas.height,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 0.8 + 0.3,
      opacity: Math.random() * 0.4 + 0.2,
      drift: (Math.random() - 0.5) * 0.5,
    }));

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubblesRef.current.forEach((bubble) => {
        ctx.save();

        const gradient = ctx.createRadialGradient(
          bubble.x,
          bubble.y,
          0,
          bubble.x,
          bubble.y,
          bubble.size
        );
        gradient.addColorStop(0, `rgba(179, 255, 240, ${bubble.opacity})`);
        gradient.addColorStop(0.5, `rgba(77, 255, 220, ${bubble.opacity * 0.6})`);
        gradient.addColorStop(1, `rgba(0, 230, 195, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `rgba(179, 255, 240, ${bubble.opacity * 0.4})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();

        bubble.y -= bubble.speed;
        bubble.x += bubble.drift;

        if (bubble.y < -20) {
          bubble.y = canvas.height + 20;
          bubble.x = Math.random() * canvas.width;
        }

        if (bubble.x < -20) bubble.x = canvas.width + 20;
        if (bubble.x > canvas.width + 20) bubble.x = -20;
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
          background: 'linear-gradient(180deg, #00101A 0%, #022036 30%, #042F52 60%, #063E6E 100%)',
        }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.9 }}
      />

      <svg className="absolute inset-0 w-full h-full opacity-30" style={{ mixBlendMode: 'screen' }}>
        <defs>
          <pattern id="ukiyoeWaves" x="0" y="0" width="800" height="400" patternUnits="userSpaceOnUse">
            <path
              d="M0,200 Q50,150 100,180 T200,200 Q250,220 300,200 T400,180 Q450,160 500,180 T600,200 Q650,220 700,200 T800,180"
              fill="none"
              stroke="rgba(77, 255, 220, 0.4)"
              strokeWidth="3"
              className="animate-wave-flow"
            />
            <path
              d="M0,250 Q60,210 120,240 T240,250 Q300,270 360,250 T480,240 Q540,220 600,240 T720,250 Q780,270 840,250"
              fill="none"
              stroke="rgba(0, 230, 195, 0.3)"
              strokeWidth="2.5"
              className="animate-wave-flow"
              style={{ animationDelay: '0.5s' }}
            />
            <path
              d="M0,300 Q40,270 80,290 T160,300 Q200,315 240,300 T320,290 Q360,275 400,290 T480,300 Q520,315 560,300 T640,290 Q680,275 720,290 T800,300"
              fill="none"
              stroke="rgba(0, 149, 224, 0.25)"
              strokeWidth="2"
              className="animate-wave-flow"
              style={{ animationDelay: '1s' }}
            />
            <g className="animate-wave-flow" style={{ animationDelay: '1.5s' }}>
              <circle cx="100" cy="180" r="3" fill="rgba(179, 255, 240, 0.6)" />
              <circle cx="300" cy="200" r="2.5" fill="rgba(179, 255, 240, 0.5)" />
              <circle cx="500" cy="180" r="3.5" fill="rgba(179, 255, 240, 0.7)" />
              <circle cx="700" cy="200" r="2" fill="rgba(179, 255, 240, 0.4)" />
            </g>
          </pattern>

          <radialGradient id="causticLight1">
            <stop offset="0%" stopColor="rgba(77, 255, 220, 0.3)" />
            <stop offset="50%" stopColor="rgba(0, 230, 195, 0.15)" />
            <stop offset="100%" stopColor="rgba(0, 149, 224, 0)" />
          </radialGradient>

          <radialGradient id="causticLight2">
            <stop offset="0%" stopColor="rgba(179, 255, 240, 0.25)" />
            <stop offset="50%" stopColor="rgba(77, 255, 220, 0.1)" />
            <stop offset="100%" stopColor="rgba(0, 230, 195, 0)" />
          </radialGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#ukiyoeWaves)" />

        <ellipse
          cx="30%"
          cy="20%"
          rx="300"
          ry="200"
          fill="url(#causticLight1)"
          className="animate-caustic-light"
        />
        <ellipse
          cx="70%"
          cy="40%"
          rx="250"
          ry="180"
          fill="url(#causticLight2)"
          className="animate-caustic-light"
          style={{ animationDelay: '2s' }}
        />
        <ellipse
          cx="50%"
          cy="60%"
          rx="280"
          ry="190"
          fill="url(#causticLight1)"
          className="animate-caustic-light"
          style={{ animationDelay: '4s' }}
        />
      </svg>

      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(77, 255, 220, 0.1) 0%, transparent 60%)',
        }}
      />

      <svg className="absolute bottom-0 left-0 w-full h-64 opacity-40">
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(77, 255, 220, 0.6)" />
            <stop offset="50%" stopColor="rgba(0, 230, 195, 0.4)" />
            <stop offset="100%" stopColor="rgba(0, 149, 224, 0.2)" />
          </linearGradient>
        </defs>
        <path
          d="M0,150 Q200,100 400,130 T800,150 Q1000,170 1200,150 T1600,130 L1600,300 L0,300 Z"
          fill="url(#waveGradient)"
          className="animate-wave-flow"
        />
        <path
          d="M0,180 Q150,140 300,170 T600,180 Q750,200 900,180 T1200,170 Q1350,160 1500,180 T1800,180 L1800,300 L0,300 Z"
          fill="url(#waveGradient)"
          opacity="0.6"
          className="animate-wave-flow"
          style={{ animationDelay: '1s' }}
        />
      </svg>

      <div className="absolute top-10 left-10 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100">
          <path
            d="M10,50 Q20,30 40,35 Q60,40 70,25 Q80,10 90,30"
            fill="none"
            stroke="rgba(77, 255, 220, 0.6)"
            strokeWidth="2"
            className="animate-wave-flow"
          />
          <path
            d="M10,60 Q25,45 45,50 Q65,55 75,40 Q85,25 95,45"
            fill="none"
            stroke="rgba(0, 230, 195, 0.5)"
            strokeWidth="1.5"
            className="animate-wave-flow"
            style={{ animationDelay: '0.5s' }}
          />
        </svg>
      </div>

      <div className="absolute top-10 right-10 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100">
          <path
            d="M10,30 Q30,10 50,25 Q70,40 90,20"
            fill="none"
            stroke="rgba(77, 255, 220, 0.6)"
            strokeWidth="2"
            className="animate-wave-flow"
          />
          <path
            d="M10,45 Q35,25 55,40 Q75,55 95,35"
            fill="none"
            stroke="rgba(0, 230, 195, 0.5)"
            strokeWidth="1.5"
            className="animate-wave-flow"
            style={{ animationDelay: '0.7s' }}
          />
        </svg>
      </div>

      <div className="absolute bottom-10 left-10 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100">
          <circle cx="30" cy="30" r="3" fill="rgba(179, 255, 240, 0.6)" className="animate-soft-pulse" />
          <circle cx="60" cy="50" r="4" fill="rgba(179, 255, 240, 0.5)" className="animate-soft-pulse" style={{ animationDelay: '0.5s' }} />
          <circle cx="80" cy="30" r="2.5" fill="rgba(179, 255, 240, 0.7)" className="animate-soft-pulse" style={{ animationDelay: '1s' }} />
        </svg>
      </div>

      <div className="absolute bottom-10 right-10 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100">
          <circle cx="40" cy="40" r="3.5" fill="rgba(179, 255, 240, 0.6)" className="animate-soft-pulse" />
          <circle cx="70" cy="60" r="3" fill="rgba(179, 255, 240, 0.5)" className="animate-soft-pulse" style={{ animationDelay: '0.7s' }} />
          <circle cx="50" cy="25" r="2" fill="rgba(179, 255, 240, 0.7)" className="animate-soft-pulse" style={{ animationDelay: '1.3s' }} />
        </svg>
      </div>
    </div>
  );
}
