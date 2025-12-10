import { useEffect, useRef } from 'react';

export default function KLineBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const gridSpacing = 40;
    const candleWidth = 20;
    const priceLinePoints: Array<{ x: number; y: number; time: number }> = [];
    const maxPoints = 100;

    let animationFrame: number;
    let offset = 0;

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.15)';
      ctx.lineWidth = 0.5;

      for (let x = 0; x < canvas.width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      ctx.strokeStyle = 'rgba(34, 197, 94, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };

    const drawCandlestick = (x: number, y: number, height: number, isGreen: boolean) => {
      const wickHeight = height * 1.4;
      const bodyHeight = height * 0.8;
      const color = isGreen ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)';
      const wickColor = isGreen ? 'rgba(34, 197, 94, 0.25)' : 'rgba(239, 68, 68, 0.25)';

      ctx.strokeStyle = wickColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x + candleWidth / 2, y - wickHeight / 2);
      ctx.lineTo(x + candleWidth / 2, y + wickHeight / 2);
      ctx.stroke();

      ctx.fillStyle = color;
      ctx.fillRect(x, y - bodyHeight / 2, candleWidth, bodyHeight);
      ctx.strokeStyle = wickColor;
      ctx.strokeRect(x, y - bodyHeight / 2, candleWidth, bodyHeight);
    };

    const drawPriceLine = () => {
      if (priceLinePoints.length < 2) return;

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, 'rgba(34, 197, 94, 0.6)');
      gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.6)');
      gradient.addColorStop(1, 'rgba(239, 68, 68, 0.6)');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(priceLinePoints[0].x, priceLinePoints[0].y);

      for (let i = 1; i < priceLinePoints.length; i++) {
        ctx.lineTo(priceLinePoints[i].x, priceLinePoints[i].y);
      }

      ctx.stroke();

      ctx.fillStyle = 'rgba(34, 197, 94, 0.1)';
      ctx.beginPath();
      ctx.moveTo(priceLinePoints[0].x, canvas.height);
      ctx.lineTo(priceLinePoints[0].x, priceLinePoints[0].y);

      for (let i = 1; i < priceLinePoints.length; i++) {
        ctx.lineTo(priceLinePoints[i].x, priceLinePoints[i].y);
      }

      ctx.lineTo(priceLinePoints[priceLinePoints.length - 1].x, canvas.height);
      ctx.closePath();
      ctx.fill();
    };

    const animate = () => {
      ctx.fillStyle = '#0a0e14';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawGrid();

      const numCandles = Math.floor(canvas.width / (candleWidth + 15));
      for (let i = 0; i < numCandles; i++) {
        const x = i * (candleWidth + 15) + offset % (candleWidth + 15);
        const y = canvas.height / 2 + Math.sin(i * 0.3 + offset * 0.01) * 100;
        const height = 40 + Math.random() * 40;
        const isGreen = Math.sin(i * 0.5 + offset * 0.02) > 0;
        drawCandlestick(x, y, height, isGreen);
      }

      const now = Date.now();
      if (priceLinePoints.length === 0 || now - priceLinePoints[priceLinePoints.length - 1].time > 50) {
        const newPoint = {
          x: offset * 2,
          y: canvas.height / 2 + Math.sin(offset * 0.02) * 150 + Math.cos(offset * 0.03) * 50,
          time: now
        };
        priceLinePoints.push(newPoint);

        if (priceLinePoints.length > maxPoints) {
          priceLinePoints.shift();
        }
      }

      for (const point of priceLinePoints) {
        point.x -= 2;
      }

      if (priceLinePoints.length > 0 && priceLinePoints[0].x < -10) {
        priceLinePoints.shift();
      }

      drawPriceLine();

      offset += 0.5;
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ background: '#0a0e14' }}
    />
  );
}
