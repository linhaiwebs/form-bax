import { useEffect, useState } from 'react';

interface Hexagon {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

interface ScanLine {
  id: number;
  delay: number;
  duration: number;
}

export default function HolographicBackground() {
  const [hexagons, setHexagons] = useState<Hexagon[]>([]);
  const [scanLines, setScanLines] = useState<ScanLine[]>([]);

  useEffect(() => {
    const hexCount = 18;
    const newHexagons: Hexagon[] = [];
    for (let i = 0; i < hexCount; i++) {
      newHexagons.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 2,
      });
    }
    setHexagons(newHexagons);

    const scanCount = 4;
    const newScanLines: ScanLine[] = [];
    for (let i = 0; i < scanCount; i++) {
      newScanLines.push({
        id: i,
        delay: i * 2,
        duration: 6 + i * 0.5,
      });
    }
    setScanLines(newScanLines);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, #001122, #000510)',
        }}
      />

      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hexPattern" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
            <polygon
              points="30,1 51,14 51,39 30,52 9,39 9,14"
              fill="none"
              stroke="rgba(0, 217, 255, 0.15)"
              strokeWidth="1"
            />
          </pattern>

          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="scanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 217, 255, 0)" />
            <stop offset="50%" stopColor="rgba(0, 217, 255, 0.4)" />
            <stop offset="100%" stopColor="rgba(0, 217, 255, 0)" />
          </linearGradient>

          <linearGradient id="scanGradientPurple" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(181, 131, 255, 0)" />
            <stop offset="50%" stopColor="rgba(181, 131, 255, 0.3)" />
            <stop offset="100%" stopColor="rgba(181, 131, 255, 0)" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="100%" height="100%" fill="url(#hexPattern)" opacity="0.3" />

        {hexagons.map((hex) => (
          <g key={hex.id}>
            <polygon
              points="30,1 51,14 51,39 30,52 9,39 9,14"
              fill="none"
              stroke="rgba(0, 217, 255, 0.4)"
              strokeWidth="1.5"
              filter="url(#glow)"
              style={{
                transform: `translate(${hex.x}%, ${hex.y}%)`,
              }}
            >
              <animate
                attributeName="opacity"
                values="0.2;0.8;0.2"
                dur={`${hex.duration}s`}
                begin={`${hex.delay}s`}
                repeatCount="indefinite"
              />
            </polygon>
          </g>
        ))}

        {scanLines.map((line) => (
          <rect
            key={line.id}
            x="0"
            y="-100"
            width="100%"
            height="100"
            fill={line.id % 2 === 0 ? 'url(#scanGradient)' : 'url(#scanGradientPurple)'}
            opacity="0.6"
          >
            <animate
              attributeName="y"
              from="-100"
              to="100%"
              dur={`${line.duration}s`}
              begin={`${line.delay}s`}
              repeatCount="indefinite"
            />
          </rect>
        ))}
      </svg>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 217, 255, 0.05), transparent 70%)',
        }}
      />
    </div>
  );
}
