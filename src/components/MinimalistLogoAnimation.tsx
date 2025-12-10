import { useEffect, useRef } from 'react';

interface Ring {
  radius: number;
  dots: number;
  speed: number;
  rotation: number;
  gapStart: number;
  gapSize: number;
  gapDirection: number;
  color: string;
}

export default function MinimalistLogoAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const centerX = 200;
    const centerY = 200;

    const rings: Ring[] = [
      {
        radius: 60,
        dots: 30,
        speed: 0.003,
        rotation: 0,
        gapStart: 0,
        gapSize: Math.PI / 3,
        gapDirection: 1,
        color: '#3B82F6',
      },
      {
        radius: 90,
        dots: 36,
        speed: 0.002,
        rotation: Math.PI / 4,
        gapStart: Math.PI,
        gapSize: Math.PI / 4,
        gapDirection: -1,
        color: '#06B6D4',
      },
      {
        radius: 120,
        dots: 42,
        speed: 0.0015,
        rotation: Math.PI / 2,
        gapStart: Math.PI / 2,
        gapSize: Math.PI / 5,
        gapDirection: 1,
        color: '#10B981',
      },
      {
        radius: 150,
        dots: 48,
        speed: 0.001,
        rotation: 0,
        gapStart: Math.PI * 1.5,
        gapSize: Math.PI / 6,
        gapDirection: -1,
        color: '#8B5CF6',
      },
    ];

    const drawRings = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      rings.forEach((ring) => {
        ring.rotation += ring.speed;
        ring.gapStart += ring.gapDirection * 0.002;

        const angleStep = (Math.PI * 2) / ring.dots;

        for (let i = 0; i < ring.dots; i++) {
          const angle = i * angleStep + ring.rotation;

          const normalizedAngle = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
          const normalizedGapStart = ((ring.gapStart % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);

          let isInGap = false;
          if (normalizedGapStart + ring.gapSize <= Math.PI * 2) {
            isInGap = normalizedAngle >= normalizedGapStart && normalizedAngle <= normalizedGapStart + ring.gapSize;
          } else {
            const overflow = (normalizedGapStart + ring.gapSize) - Math.PI * 2;
            isInGap = normalizedAngle >= normalizedGapStart || normalizedAngle <= overflow;
          }

          if (isInGap) continue;

          const x = centerX + Math.cos(angle) * ring.radius;
          const y = centerY + Math.sin(angle) * ring.radius;

          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 3);
          gradient.addColorStop(0, ring.color);
          gradient.addColorStop(1, `${ring.color}80`);

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, 2.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.shadowColor = ring.color;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });
    };

    const drawCenterText = () => {
      ctx.save();

      ctx.font = 'bold 64px "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const gradient = ctx.createLinearGradient(centerX - 40, 0, centerX + 40, 0);
      gradient.addColorStop(0, '#3B82F6');
      gradient.addColorStop(0.5, '#06B6D4');
      gradient.addColorStop(1, '#10B981');

      ctx.fillStyle = gradient;
      ctx.fillText('AI', centerX, centerY);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 1;
      ctx.strokeText('AI', centerX, centerY);

      ctx.restore();
    };

    const animate = () => {
      drawRings();
      drawCenterText();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="w-full max-w-[400px] h-auto"
      />
    </div>
  );
}
