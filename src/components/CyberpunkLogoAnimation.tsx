import { useEffect, useRef, useState } from 'react';

interface OrbitRing {
  radius: number;
  speed: number;
  color: string;
}

interface EnergyPulse {
  angle: number;
  speed: number;
  size: number;
}

interface Lightning {
  from: number;
  to: number;
  opacity: number;
}

export default function CyberpunkLogoAnimation() {
  const [rotation, setRotation] = useState(0);
  const [holographicShift, setHolographicShift] = useState(0);
  const lightningRef = useRef<Lightning[]>([]);
  const pulseAnglesRef = useRef<number[]>([0, 120, 240]);

  const orbitRings: OrbitRing[] = [
    { radius: 80, speed: 1, color: '#FF006E' },
    { radius: 100, speed: -1.5, color: '#00F0FF' },
    { radius: 120, speed: 2, color: '#FFE700' },
    { radius: 140, speed: -1.2, color: '#B026FF' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.5) % 360);
      setHolographicShift((prev) => (prev + 1) % 360);

      pulseAnglesRef.current = pulseAnglesRef.current.map((angle) => (angle + 2) % 360);

      if (Math.random() > 0.95) {
        const from = Math.floor(Math.random() * 6);
        const to = (from + Math.floor(Math.random() * 2) + 1) % 6;
        lightningRef.current.push({ from, to, opacity: 1 });
      }

      lightningRef.current = lightningRef.current
        .map((l) => ({ ...l, opacity: l.opacity - 0.1 }))
        .filter((l) => l.opacity > 0);
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const hexagonPoints = () => {
    const points: Array<{ x: number; y: number }> = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      points.push({
        x: 150 + Math.cos(angle) * 40,
        y: 150 + Math.sin(angle) * 40,
      });
    }
    return points;
  };

  const points = hexagonPoints();

  return (
    <div className="relative w-[300px] h-[300px] flex items-center justify-center">
      <svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        className="absolute"
        style={{ transform: `rotateY(${rotation}deg) rotateX(${rotation * 0.5}deg)` }}
      >
        <defs>
          <linearGradient id="crystalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#FF006E" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#B026FF" stopOpacity="0.6" />
          </linearGradient>

          <radialGradient id="pulseGradient">
            <stop offset="0%" stopColor="#FFE700" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFE700" stopOpacity="0" />
          </radialGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="holographic">
            <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
            <feColorMatrix in="noise" type="saturate" values="0.5" />
            <feBlend in="SourceGraphic" in2="noise" mode="overlay" />
          </filter>
        </defs>

        {orbitRings.map((ring, index) => {
          const orbitAngle = (rotation * ring.speed + index * 30) % 360;
          return (
            <g key={`ring-${index}`}>
              <circle
                cx="150"
                cy="150"
                r={ring.radius}
                fill="none"
                stroke={ring.color}
                strokeWidth="1"
                opacity="0.3"
                filter="url(#glow)"
                className="animate-neon-pulse"
              />

              {pulseAnglesRef.current.map((pulseAngle, pidx) => {
                const angle = ((orbitAngle + pulseAngle) * Math.PI) / 180;
                const x = 150 + Math.cos(angle) * ring.radius;
                const y = 150 + Math.sin(angle) * ring.radius;

                return (
                  <circle
                    key={`pulse-${index}-${pidx}`}
                    cx={x}
                    cy={y}
                    r="4"
                    fill={ring.color}
                    filter="url(#glow)"
                    opacity="0.8"
                  />
                );
              })}
            </g>
          );
        })}

        <polygon
          points={points.map((p) => `${p.x},${p.y}`).join(' ')}
          fill="url(#crystalGradient)"
          stroke="#00F0FF"
          strokeWidth="3"
          filter="url(#glow)"
          opacity="0.9"
        />

        {[0, 1, 2].map((layer) => (
          <polygon
            key={`inner-${layer}`}
            points={points
              .map((p) => {
                const scale = 0.7 - layer * 0.15;
                return `${150 + (p.x - 150) * scale},${150 + (p.y - 150) * scale}`;
              })
              .join(' ')}
            fill="none"
            stroke={['#FF006E', '#FFE700', '#B026FF'][layer]}
            strokeWidth="2"
            opacity={0.6 - layer * 0.1}
            filter="url(#glow)"
          />
        ))}

        {lightningRef.current.map((lightning, idx) => {
          const fromPoint = points[lightning.from];
          const toPoint = points[lightning.to];
          const midX = (fromPoint.x + toPoint.x) / 2 + (Math.random() - 0.5) * 10;
          const midY = (fromPoint.y + toPoint.y) / 2 + (Math.random() - 0.5) * 10;

          return (
            <path
              key={`lightning-${idx}`}
              d={`M ${fromPoint.x} ${fromPoint.y} Q ${midX} ${midY} ${toPoint.x} ${toPoint.y}`}
              stroke="#00F0FF"
              strokeWidth="2"
              fill="none"
              opacity={lightning.opacity}
              filter="url(#glow)"
              className="animate-flicker"
            />
          );
        })}

        <circle
          cx="150"
          cy="150"
          r="15"
          fill="#FFE700"
          filter="url(#glow)"
          className="animate-pulse-glow"
        />

        <circle
          cx="150"
          cy="150"
          r="10"
          fill="#0a0015"
          stroke="#00F0FF"
          strokeWidth="2"
        />

        {points.map((point, index) => (
          <circle
            key={`vertex-${index}`}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#FF006E"
            filter="url(#glow)"
            className="animate-neon-pulse"
          />
        ))}

        <rect
          x="0"
          y="0"
          width="300"
          height="300"
          fill="url(#holographic)"
          opacity="0.2"
          style={{
            mixBlendMode: 'overlay',
            transform: `translateX(${Math.sin((holographicShift * Math.PI) / 180) * 5}px)`,
          }}
        />
      </svg>

      <div className="absolute inset-0 animate-pulse-glow opacity-30 blur-xl bg-gradient-to-r from-cyber-cyan via-neon-pink to-electric-yellow rounded-full" />
    </div>
  );
}
