import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number[];
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

interface DataBlock {
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  speed: number;
  angle: number;
}

export default function NeuralNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const dataBlocksRef = useRef<DataBlock[]>([]);
  const animationFrameRef = useRef<number>();
  const radarAngleRef = useRef(0);
  const scanLineYRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeNodes();
      initializeDataBlocks();
    };

    const initializeNodes = () => {
      const isMobile = window.innerWidth < 768;
      const nodeCount = isMobile ? 15 : 35;
      nodesRef.current = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        connections: []
      }));

      nodesRef.current.forEach((node, i) => {
        const nearbyNodes = nodesRef.current
          .map((n, idx) => ({ node: n, idx, dist: Math.hypot(n.x - node.x, n.y - node.y) }))
          .filter(n => n.idx !== i && n.dist < 150)
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 3);

        node.connections = nearbyNodes.map(n => n.idx);
      });
    };

    const initializeDataBlocks = () => {
      const blockCount = window.innerWidth < 768 ? 8 : 15;
      dataBlocksRef.current = Array.from({ length: blockCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: 40 + Math.random() * 80,
        height: 30 + Math.random() * 60,
        opacity: 0.05 + Math.random() * 0.1,
        speed: 0.1 + Math.random() * 0.3,
        angle: Math.random() * Math.PI * 2
      }));
    };

    const createParticles = () => {
      const isMobile = window.innerWidth < 768;
      const particleCount = isMobile ? 30 : 100;

      if (particlesRef.current.length < particleCount && Math.random() < 0.1) {
        const colors = ['#00F0FF', '#67E8F9', '#6366F1', '#06B6D4'];
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          life: 1,
          maxLife: 100 + Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const drawBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0A0E27');
      gradient.addColorStop(0.5, '#050810');
      gradient.addColorStop(1, '#000000');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
      ctx.lineWidth = 1;

      const gridSize = 60;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const drawScanLines = () => {
      scanLineYRef.current += 2;
      if (scanLineYRef.current > canvas.height + 100) {
        scanLineYRef.current = -100;
      }

      const gradient = ctx.createLinearGradient(0, scanLineYRef.current - 50, 0, scanLineYRef.current + 50);
      gradient.addColorStop(0, 'rgba(0, 240, 255, 0)');
      gradient.addColorStop(0.5, 'rgba(0, 240, 255, 0.15)');
      gradient.addColorStop(1, 'rgba(0, 240, 255, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanLineYRef.current - 50, canvas.width, 100);

      ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, scanLineYRef.current);
      ctx.lineTo(canvas.width, scanLineYRef.current);
      ctx.stroke();
    };

    const drawRadar = () => {
      radarAngleRef.current += 0.01;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.max(canvas.width, canvas.height) * 0.7;

      ctx.save();
      ctx.translate(centerX, centerY);

      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
      gradient.addColorStop(0, 'rgba(99, 102, 241, 0.1)');
      gradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.05)');
      gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');

      ctx.rotate(radarAngleRef.current);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, 0, Math.PI / 3);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    const drawDataBlocks = () => {
      dataBlocksRef.current.forEach(block => {
        block.y += block.speed;
        block.x += Math.sin(block.angle) * 0.2;

        if (block.y > canvas.height + block.height) {
          block.y = -block.height;
          block.x = Math.random() * canvas.width;
        }

        ctx.fillStyle = `rgba(0, 240, 255, ${block.opacity})`;
        ctx.strokeStyle = `rgba(0, 240, 255, ${block.opacity * 2})`;
        ctx.lineWidth = 1;

        ctx.fillRect(block.x, block.y, block.width, block.height);
        ctx.strokeRect(block.x, block.y, block.width, block.height);

        ctx.strokeStyle = `rgba(103, 232, 249, ${block.opacity * 1.5})`;
        ctx.strokeRect(block.x + 2, block.y + 2, block.width - 4, block.height - 4);
      });
    };

    const drawNodes = () => {
      nodesRef.current.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));
      });

      nodesRef.current.forEach((node, i) => {
        node.connections.forEach(connIdx => {
          const connNode = nodesRef.current[connIdx];
          const dist = Math.hypot(connNode.x - node.x, connNode.y - node.y);
          const opacity = Math.max(0, 1 - dist / 150) * 0.4;

          const gradient = ctx.createLinearGradient(node.x, node.y, connNode.x, connNode.y);
          gradient.addColorStop(0, `rgba(0, 240, 255, ${opacity})`);
          gradient.addColorStop(0.5, `rgba(99, 102, 241, ${opacity * 1.2})`);
          gradient.addColorStop(1, `rgba(0, 240, 255, ${opacity})`);

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(connNode.x, connNode.y);
          ctx.stroke();

          const pulsePos = (Date.now() % 2000) / 2000;
          const pulseX = node.x + (connNode.x - node.x) * pulsePos;
          const pulseY = node.y + (connNode.y - node.y) * pulsePos;

          ctx.fillStyle = `rgba(0, 240, 255, ${opacity * 2})`;
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
          ctx.fill();
        });
      });

      nodesRef.current.forEach(node => {
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 6);
        gradient.addColorStop(0, 'rgba(0, 240, 255, 1)');
        gradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.8)');
        gradient.addColorStop(1, 'rgba(0, 240, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#00F0FF';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawParticles = () => {
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 1;

        if (particle.life <= 0) return false;

        const opacity = particle.life / particle.maxLife;
        const size = 1 + (1 - opacity) * 2;

        ctx.fillStyle = particle.color.replace(')', `, ${opacity * 0.8})`).replace('rgb', 'rgba');
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = particle.color.replace(')', `, ${opacity * 0.5})`).replace('rgb', 'rgba');
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size + 2, 0, Math.PI * 2);
        ctx.stroke();

        return true;
      });
    };

    const animate = () => {
      drawBackground();
      drawGrid();
      drawRadar();
      drawDataBlocks();
      drawNodes();
      drawParticles();
      drawScanLines();
      createParticles();

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
