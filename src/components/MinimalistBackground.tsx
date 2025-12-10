import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  opacity: number;
  fadeDirection: number;
  speed: number;
}

export default function MinimalistBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(25, Math.floor((canvas.width * canvas.height) / 30000));

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          opacity: Math.random() * 0.3 + 0.1,
          fadeDirection: Math.random() > 0.5 ? 1 : -1,
          speed: Math.random() * 0.003 + 0.001,
        });
      }
    };

    const drawGradientBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#FFFFFF');
      gradient.addColorStop(0.5, '#F5F5F7');
      gradient.addColorStop(1, '#E8E8EA');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawRadialGlow = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxRadius = Math.max(canvas.width, canvas.height) * 0.6;

      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.03)');
      gradient.addColorStop(0.3, 'rgba(6, 182, 212, 0.02)');
      gradient.addColorStop(0.6, 'rgba(16, 185, 129, 0.01)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawDotGrid = () => {
      const spacing = 40;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';

      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const drawParticles = () => {
      particles.forEach((particle) => {
        particle.opacity += particle.fadeDirection * particle.speed;

        if (particle.opacity >= 0.4) {
          particle.fadeDirection = -1;
        } else if (particle.opacity <= 0.05) {
          particle.fadeDirection = 1;
        }

        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fill();

        const glowGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, 8
        );
        glowGradient.addColorStop(0, `rgba(59, 130, 246, ${particle.opacity * 0.3})`);
        glowGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        ctx.fillStyle = glowGradient;
        ctx.fillRect(particle.x - 8, particle.y - 8, 16, 16);
      });
    };

    const animate = () => {
      drawGradientBackground();
      drawRadialGlow();
      drawDotGrid();
      drawParticles();

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ background: '#FFFFFF' }}
    />
  );
}
