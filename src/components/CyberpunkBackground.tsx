import { useEffect, useRef } from 'react';

interface Building {
  x: number;
  y: number;
  width: number;
  height: number;
  windows: Array<{ x: number; y: number; lit: boolean }>;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 'triangle' | 'hex' | 'line';
  rotation: number;
  rotationSpeed: number;
  size: number;
  color: string;
}

export default function CyberpunkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const buildingsRef = useRef<Building[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const scanLineYRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initBuildings();
      initParticles();
    };

    const initBuildings = () => {
      const buildings: Building[] = [];
      const numBuildings = Math.floor(canvas.width / 80) + 1;

      for (let i = 0; i < numBuildings; i++) {
        const width = 40 + Math.random() * 60;
        const height = 80 + Math.random() * 120;
        const x = i * (canvas.width / numBuildings);
        const y = canvas.height - height;

        const windows: Array<{ x: number; y: number; lit: boolean }> = [];
        for (let row = 0; row < Math.floor(height / 15); row++) {
          for (let col = 0; col < Math.floor(width / 10); col++) {
            windows.push({
              x: x + col * 10 + 5,
              y: y + row * 15 + 10,
              lit: Math.random() > 0.3,
            });
          }
        }

        buildings.push({ x, y, width, height, windows });
      }

      buildingsRef.current = buildings;
    };

    const initParticles = () => {
      const particles: Particle[] = [];
      const numParticles = 30;
      const colors = ['#FF006E', '#00F0FF', '#FFE700', '#B026FF'];

      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          type: ['triangle', 'hex', 'line'][Math.floor(Math.random() * 3)] as Particle['type'],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          size: 10 + Math.random() * 20,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      particlesRef.current = particles;
    };

    const drawGradientBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0a0015');
      gradient.addColorStop(0.5, '#1a0033');
      gradient.addColorStop(1, '#2d0a4e');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawNeonGrid = (time: number) => {
      const gridSize = 50;
      const pulse = Math.sin(time * 0.001) * 0.3 + 0.7;

      ctx.strokeStyle = `rgba(255, 0, 110, ${0.1 * pulse})`;
      ctx.lineWidth = 1;

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      ctx.strokeStyle = `rgba(0, 240, 255, ${0.1 * pulse})`;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      ctx.strokeStyle = `rgba(255, 231, 0, ${0.05 * pulse})`;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 5; i++) {
        const y = i * (canvas.height / 5);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, canvas.height - y);
        ctx.stroke();
      }
    };

    const drawBuildings = (time: number) => {
      buildingsRef.current.forEach((building) => {
        ctx.fillStyle = 'rgba(10, 0, 30, 0.8)';
        ctx.fillRect(building.x, building.y, building.width, building.height);

        ctx.strokeStyle = 'rgba(176, 38, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(building.x, building.y, building.width, building.height);

        building.windows.forEach((window) => {
          if (Math.random() > 0.998) {
            window.lit = !window.lit;
          }

          if (window.lit) {
            const colors = ['#FF006E', '#00F0FF', '#FFE700'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const flicker = Math.random() > 0.95 ? 0.3 : 1;

            ctx.fillStyle = color;
            ctx.globalAlpha = 0.6 * flicker;
            ctx.fillRect(window.x, window.y, 4, 6);

            ctx.shadowBlur = 5;
            ctx.shadowColor = color;
            ctx.fillRect(window.x, window.y, 4, 6);
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
          }
        });
      });
    };

    const drawParticles = () => {
      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);

        ctx.strokeStyle = particle.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.4;

        ctx.shadowBlur = 10;
        ctx.shadowColor = particle.color;

        if (particle.type === 'triangle') {
          ctx.beginPath();
          ctx.moveTo(0, -particle.size / 2);
          ctx.lineTo(particle.size / 2, particle.size / 2);
          ctx.lineTo(-particle.size / 2, particle.size / 2);
          ctx.closePath();
          ctx.stroke();
        } else if (particle.type === 'hex') {
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const x = Math.cos(angle) * particle.size / 2;
            const y = Math.sin(angle) * particle.size / 2;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.moveTo(-particle.size / 2, 0);
          ctx.lineTo(particle.size / 2, 0);
          ctx.stroke();
        }

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
        ctx.restore();
      });
    };

    const drawScanLine = () => {
      scanLineYRef.current += 2;
      if (scanLineYRef.current > canvas.height) {
        scanLineYRef.current = 0;
      }

      const gradient = ctx.createLinearGradient(0, scanLineYRef.current - 50, 0, scanLineYRef.current + 50);
      gradient.addColorStop(0, 'rgba(0, 240, 255, 0)');
      gradient.addColorStop(0.5, 'rgba(0, 240, 255, 0.1)');
      gradient.addColorStop(1, 'rgba(0, 240, 255, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanLineYRef.current - 50, canvas.width, 100);
    };

    const animate = (time: number) => {
      drawGradientBackground();
      drawNeonGrid(time);
      drawBuildings(time);
      drawParticles();
      drawScanLine();

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ background: '#0a0015' }}
    />
  );
}
