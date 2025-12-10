import { useEffect, useState } from 'react';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export default function BusinessCircularLogoAnimation() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const newBubbles: Bubble[] = [];
    for (let i = 0; i < 10; i++) {
      newBubbles.push({
        id: i,
        x: Math.random() * 300,
        y: Math.random() * 300,
        size: 10 + Math.random() * 30,
        delay: Math.random() * 6,
        duration: 4 + Math.random() * 4,
      });
    }
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="relative w-[300px] h-[300px] flex items-center justify-center">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full blur-sm animate-bubble-float"
          style={{
            left: `${bubble.x}px`,
            top: `${bubble.y}px`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            background: 'radial-gradient(circle, rgba(96, 165, 250, 0.3), rgba(110, 231, 183, 0.3))',
            animationDelay: `${bubble.delay}s`,
            animationDuration: `${bubble.duration}s`,
          }}
        />
      ))}

      <svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        className="absolute animate-soft-pulse"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#4ADE80" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#6EE7B7" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="50%" stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#6EE7B7" />
          </linearGradient>

          <filter id="softGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle
          cx="150"
          cy="150"
          r="100"
          fill="url(#logoGradient)"
          filter="url(#softGlow)"
          opacity="0.9"
        />

        <circle
          cx="150"
          cy="150"
          r="80"
          fill="rgba(255, 255, 255, 0.4)"
        />

        <circle
          cx="150"
          cy="150"
          r="60"
          fill="url(#logoGradient)"
          opacity="0.7"
        />

        <g className="animate-rotate-slow origin-center" style={{ transformOrigin: '150px 150px' }}>
          <circle
            cx="150"
            cy="150"
            r="110"
            fill="none"
            stroke="url(#ringGradient)"
            strokeWidth="3"
            strokeDasharray="20 10"
            opacity="0.6"
          />
        </g>

        <g className="animate-rotate-slow origin-center" style={{ transformOrigin: '150px 150px', animationDirection: 'reverse', animationDuration: '15s' }}>
          <circle
            cx="150"
            cy="150"
            r="120"
            fill="none"
            stroke="url(#ringGradient)"
            strokeWidth="2"
            strokeDasharray="15 15"
            opacity="0.4"
          />
        </g>

        {[0, 90, 180, 270].map((angle, index) => {
          const radian = (angle * Math.PI) / 180;
          const x = 150 + Math.cos(radian) * 110;
          const y = 150 + Math.sin(radian) * 110;

          return (
            <circle
              key={`dot-${index}`}
              cx={x}
              cy={y}
              r="5"
              fill="#60A5FA"
              filter="url(#softGlow)"
              className="animate-soft-pulse"
              style={{ animationDelay: `${index * 0.2}s` }}
            />
          );
        })}

        <text
          x="150"
          y="155"
          textAnchor="middle"
          fill="white"
          fontSize="32"
          fontWeight="700"
          fontFamily="Poppins, sans-serif"
        >
          AI
        </text>
      </svg>

      <div
        className="absolute inset-0 rounded-full opacity-20 blur-2xl animate-soft-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.5), rgba(110, 231, 183, 0.5))',
        }}
      />
    </div>
  );
}
