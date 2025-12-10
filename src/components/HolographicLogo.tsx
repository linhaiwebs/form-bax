import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  angle: number;
  speed: number;
}

interface DataNode {
  id: number;
  ring: number;
  angle: number;
  speed: number;
}

export default function HolographicLogo() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [dataNodes, setDataNodes] = useState<DataNode[]>([]);

  useEffect(() => {
    const particleCount = 10;
    const newParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        angle: (i / particleCount) * 360,
        speed: 3 + Math.random() * 2,
      });
    }
    setParticles(newParticles);

    const nodeCount = 15;
    const newDataNodes: DataNode[] = [];
    for (let i = 0; i < nodeCount; i++) {
      newDataNodes.push({
        id: i,
        ring: Math.floor(i / 5),
        angle: (i % 5) * 72,
        speed: 8 + (i % 3) * 4,
      });
    }
    setDataNodes(newDataNodes);
  }, []);

  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="logoGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id="nodeGradient1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00D9FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#00D9FF" stopOpacity="0.3" />
          </radialGradient>

          <radialGradient id="nodeGradient2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#B583FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#B583FF" stopOpacity="0.3" />
          </radialGradient>

          <radialGradient id="nodeGradient3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF9500" stopOpacity="1" />
            <stop offset="100%" stopColor="#FF9500" stopOpacity="0.3" />
          </radialGradient>
        </defs>

        <path
          d="M 100 30 Q 130 40, 140 60 Q 145 80, 140 100 Q 135 120, 120 135 Q 100 145, 80 140 Q 60 135, 50 120 Q 45 100, 50 80 Q 55 60, 70 45 Q 85 35, 100 30 Z"
          fill="none"
          stroke="rgba(0, 217, 255, 0.6)"
          strokeWidth="2"
          filter="url(#logoGlow)"
        />

        <rect x="70" y="70" width="60" height="60" fill="none" stroke="rgba(181, 131, 255, 0.5)" strokeWidth="1.5" />
        <line x1="70" y1="85" x2="130" y2="85" stroke="rgba(181, 131, 255, 0.4)" strokeWidth="1" />
        <line x1="70" y1="100" x2="130" y2="100" stroke="rgba(181, 131, 255, 0.4)" strokeWidth="1" />
        <line x1="70" y1="115" x2="130" y2="115" stroke="rgba(181, 131, 255, 0.4)" strokeWidth="1" />
        <line x1="85" y1="70" x2="85" y2="130" stroke="rgba(181, 131, 255, 0.4)" strokeWidth="1" />
        <line x1="100" y1="70" x2="100" y2="130" stroke="rgba(181, 131, 255, 0.4)" strokeWidth="1" />
        <line x1="115" y1="70" x2="115" y2="130" stroke="rgba(181, 131, 255, 0.4)" strokeWidth="1" />

        <rect x="75" y="75" width="8" height="8" fill="rgba(255, 149, 0, 0.7)" />
        <rect x="90" y="75" width="8" height="8" fill="rgba(255, 149, 0, 0.7)" />
        <rect x="105" y="75" width="8" height="8" fill="rgba(255, 149, 0, 0.7)" />
        <rect x="75" y="95" width="8" height="8" fill="rgba(255, 149, 0, 0.7)" />
        <rect x="117" y="95" width="8" height="8" fill="rgba(255, 149, 0, 0.7)" />
        <rect x="75" y="117" width="8" height="8" fill="rgba(255, 149, 0, 0.7)" />
        <rect x="90" y="117" width="8" height="8" fill="rgba(255, 149, 0, 0.7)" />
        <rect x="117" y="117" width="8" height="8" fill="rgba(255, 149, 0, 0.7)" />

        {particles.map((particle) => (
          <circle key={particle.id} r="3" fill="#00D9FF" filter="url(#logoGlow)">
            <animateMotion
              dur={`${particle.speed}s`}
              repeatCount="indefinite"
              path="M 100 30 Q 130 40, 140 60 Q 145 80, 140 100 Q 135 120, 120 135 Q 100 145, 80 140 Q 60 135, 50 120 Q 45 100, 50 80 Q 55 60, 70 45 Q 85 35, 100 30 Z"
              begin={`${(particle.id / particles.length) * particle.speed}s`}
            />
          </circle>
        ))}

        <g className="holographic-ring-outer">
          <ellipse
            cx="100"
            cy="100"
            rx="75"
            ry="75"
            fill="none"
            stroke="rgba(0, 217, 255, 0.4)"
            strokeWidth="1.5"
            filter="url(#logoGlow)"
            style={{ transformOrigin: '100px 100px' }}
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 100 100"
              to="-360 100 100"
              dur="15s"
              repeatCount="indefinite"
            />
          </ellipse>

          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={`outer-${i}`} r="4" fill="url(#nodeGradient1)" filter="url(#logoGlow)">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`${i * 72} 100 100`}
                to={`${i * 72 - 360} 100 100`}
                dur="15s"
                repeatCount="indefinite"
              />
              <animateMotion
                dur="15s"
                repeatCount="indefinite"
                path={`M ${100 + 75 * Math.cos((i * 72 * Math.PI) / 180)} ${100 + 75 * Math.sin((i * 72 * Math.PI) / 180)} A 75 75 0 1 1 ${100 + 75 * Math.cos(((i * 72 + 0.1) * Math.PI) / 180)} ${100 + 75 * Math.sin(((i * 72 + 0.1) * Math.PI) / 180)}`}
              />
            </circle>
          ))}
        </g>

        <g className="holographic-ring-middle">
          <ellipse
            cx="100"
            cy="100"
            rx="55"
            ry="55"
            fill="none"
            stroke="rgba(181, 131, 255, 0.4)"
            strokeWidth="1.5"
            filter="url(#logoGlow)"
            style={{ transformOrigin: '100px 100px' }}
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 100 100"
              to="360 100 100"
              dur="12s"
              repeatCount="indefinite"
            />
          </ellipse>

          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={`middle-${i}`} r="3.5" fill="url(#nodeGradient2)" filter="url(#logoGlow)">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`${i * 72} 100 100`}
                to={`${i * 72 + 360} 100 100`}
                dur="12s"
                repeatCount="indefinite"
              />
              <animateMotion
                dur="12s"
                repeatCount="indefinite"
                path={`M ${100 + 55 * Math.cos((i * 72 * Math.PI) / 180)} ${100 + 55 * Math.sin((i * 72 * Math.PI) / 180)} A 55 55 0 1 0 ${100 + 55 * Math.cos(((i * 72 + 0.1) * Math.PI) / 180)} ${100 + 55 * Math.sin(((i * 72 + 0.1) * Math.PI) / 180)}`}
              />
            </circle>
          ))}
        </g>

        <g className="holographic-ring-inner">
          <ellipse
            cx="100"
            cy="100"
            rx="35"
            ry="35"
            fill="none"
            stroke="rgba(255, 149, 0, 0.4)"
            strokeWidth="1.5"
            filter="url(#logoGlow)"
            style={{ transformOrigin: '100px 100px' }}
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 100 100"
              to="-360 100 100"
              dur="8s"
              repeatCount="indefinite"
            />
          </ellipse>

          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={`inner-${i}`} r="3" fill="url(#nodeGradient3)" filter="url(#logoGlow)">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`${i * 72} 100 100`}
                to={`${i * 72 - 360} 100 100`}
                dur="8s"
                repeatCount="indefinite"
              />
              <animateMotion
                dur="8s"
                repeatCount="indefinite"
                path={`M ${100 + 35 * Math.cos((i * 72 * Math.PI) / 180)} ${100 + 35 * Math.sin((i * 72 * Math.PI) / 180)} A 35 35 0 1 1 ${100 + 35 * Math.cos(((i * 72 + 0.1) * Math.PI) / 180)} ${100 + 35 * Math.sin(((i * 72 + 0.1) * Math.PI) / 180)}`}
              />
            </circle>
          ))}
        </g>
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-32 h-32 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 217, 255, 0.1), transparent 70%)',
            animation: 'breathe 3s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.2); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}
