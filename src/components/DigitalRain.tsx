import { useEffect, useRef } from 'react';

interface Drop {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  opacity: number[];
}

export default function DigitalRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const dropsRef = useRef<Drop[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDrops();
    };

    const initDrops = () => {
      const drops: Drop[] = [];
      const columns = Math.floor(canvas.width / 20);

      const characters = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*()';

      for (let i = 0; i < columns; i++) {
        const charCount = 15 + Math.floor(Math.random() * 20);
        const chars: string[] = [];
        const opacity: number[] = [];

        for (let j = 0; j < charCount; j++) {
          chars.push(characters[Math.floor(Math.random() * characters.length)]);
          opacity.push(1 - j / charCount);
        }

        drops.push({
          x: i * 20,
          y: Math.random() * canvas.height - canvas.height,
          speed: 1 + Math.random() * 3,
          chars,
          opacity,
        });
      }

      dropsRef.current = drops;
    };

    const drawRain = () => {
      ctx.fillStyle = 'rgba(10, 0, 21, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = '14px "Share Tech Mono", monospace';

      dropsRef.current.forEach((drop) => {
        drop.chars.forEach((char, index) => {
          const y = drop.y + index * 20;

          if (y > 0 && y < canvas.height) {
            const gradient = ctx.createLinearGradient(drop.x, y - 10, drop.x, y + 10);

            if (index === 0) {
              gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
              gradient.addColorStop(1, 'rgba(0, 240, 255, 0.9)');
            } else {
              const opacity = drop.opacity[index] * 0.8;
              const hue = 180 + (index / drop.chars.length) * 140;
              gradient.addColorStop(0, `hsla(${hue}, 100%, 60%, ${opacity})`);
              gradient.addColorStop(1, `hsla(${hue + 20}, 100%, 50%, ${opacity * 0.7})`);
            }

            ctx.fillStyle = gradient;

            if (index === 0) {
              ctx.shadowBlur = 10;
              ctx.shadowColor = '#00F0FF';
            } else {
              ctx.shadowBlur = 5;
              ctx.shadowColor = `rgba(0, 240, 255, ${drop.opacity[index] * 0.5})`;
            }

            ctx.fillText(char, drop.x, y);
          }
        });

        drop.y += drop.speed;

        if (drop.y - drop.chars.length * 20 > canvas.height) {
          drop.y = -drop.chars.length * 20;
          drop.speed = 1 + Math.random() * 3;
        }

        if (Math.random() > 0.98) {
          const randomIndex = Math.floor(Math.random() * drop.chars.length);
          const characters = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789';
          drop.chars[randomIndex] = characters[Math.floor(Math.random() * characters.length)];
        }
      });

      ctx.shadowBlur = 0;
    };

    const animate = () => {
      drawRain();
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
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
