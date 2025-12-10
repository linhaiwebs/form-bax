export default function WaterDropletRippleLogo() {
  return (
    <div className="relative w-[300px] h-[300px] flex items-center justify-center">
      <svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        className="absolute"
      >
        <defs>
          <linearGradient id="aquaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4DFFDC" stopOpacity="1" />
            <stop offset="50%" stopColor="#00E6C3" stopOpacity="1" />
            <stop offset="100%" stopColor="#008071" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="aquaGradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B3FFF0" stopOpacity="1" />
            <stop offset="50%" stopColor="#4DFFDC" stopOpacity="1" />
            <stop offset="100%" stopColor="#00E6C3" stopOpacity="1" />
          </linearGradient>

          <radialGradient id="rippleGradient">
            <stop offset="0%" stopColor="rgba(179, 255, 240, 0)" />
            <stop offset="70%" stopColor="rgba(77, 255, 220, 0.6)" />
            <stop offset="100%" stopColor="rgba(0, 230, 195, 0)" />
          </radialGradient>

          <radialGradient id="dropletShine">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.6)" />
            <stop offset="40%" stopColor="rgba(179, 255, 240, 0.3)" />
            <stop offset="100%" stopColor="rgba(77, 255, 220, 0)" />
          </radialGradient>

          <filter id="waterGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="dropletEffect">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="0" dy="2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.5" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="animate-ripple-expand" style={{ transformOrigin: '150px 150px', animationDelay: '0s' }}>
          <circle
            cx="150"
            cy="150"
            r="130"
            fill="none"
            stroke="url(#aquaGradient)"
            strokeWidth="2"
            opacity="0.3"
          />
        </g>

        <g className="animate-ripple-expand" style={{ transformOrigin: '150px 150px', animationDelay: '0.6s' }}>
          <circle
            cx="150"
            cy="150"
            r="130"
            fill="none"
            stroke="url(#aquaGradient)"
            strokeWidth="2.5"
            opacity="0.4"
          />
        </g>

        <g className="animate-ripple-expand" style={{ transformOrigin: '150px 150px', animationDelay: '1.2s' }}>
          <circle
            cx="150"
            cy="150"
            r="130"
            fill="none"
            stroke="url(#aquaGradient)"
            strokeWidth="3"
            opacity="0.5"
          />
        </g>

        <g className="animate-ripple-expand" style={{ transformOrigin: '150px 150px', animationDelay: '1.8s' }}>
          <circle
            cx="150"
            cy="150"
            r="130"
            fill="none"
            stroke="url(#aquaGradientLight)"
            strokeWidth="2"
            opacity="0.6"
          />
        </g>

        <g className="animate-ripple-expand" style={{ transformOrigin: '150px 150px', animationDelay: '2.4s' }}>
          <circle
            cx="150"
            cy="150"
            r="130"
            fill="none"
            stroke="url(#aquaGradientLight)"
            strokeWidth="1.5"
            opacity="0.7"
          />
        </g>

        <circle
          cx="150"
          cy="150"
          r="95"
          fill="url(#aquaGradient)"
          filter="url(#dropletEffect)"
          className="animate-soft-pulse"
          opacity="0.9"
        />

        <circle
          cx="150"
          cy="150"
          r="95"
          fill="url(#dropletShine)"
          opacity="0.4"
          className="animate-water-shimmer"
        />

        <ellipse
          cx="150"
          cy="120"
          rx="35"
          ry="20"
          fill="rgba(255, 255, 255, 0.4)"
          className="animate-soft-pulse"
        />

        <ellipse
          cx="140"
          cy="130"
          rx="15"
          ry="8"
          fill="rgba(255, 255, 255, 0.6)"
        />

        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => {
          const radian = (angle * Math.PI) / 180;
          const x1 = 150;
          const y1 = 150;
          const length = 70 + (index % 2) * 8;
          const x2 = x1 + Math.cos(radian) * length;
          const y2 = y1 + Math.sin(radian) * length;

          return (
            <line
              key={`ray-${index}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="url(#aquaGradientLight)"
              strokeWidth="2"
              opacity="0.4"
              filter="url(#waterGlow)"
              className="animate-water-shimmer"
              style={{
                transformOrigin: '150px 150px',
                animationDelay: `${index * 0.15}s`
              }}
            />
          );
        })}

        {[30, 60, 120, 150, 210, 240, 300, 330].map((angle, index) => {
          const radian = (angle * Math.PI) / 180;
          const radius = 100 + index * 3;
          const cx = 150 + Math.cos(radian) * radius;
          const cy = 150 + Math.sin(radian) * radius;

          return (
            <circle
              key={`particle-${index}`}
              cx={cx}
              cy={cy}
              r="2.5"
              fill="url(#aquaGradientLight)"
              opacity="0.6"
              filter="url(#waterGlow)"
              className="animate-bubble-float"
              style={{
                animationDelay: `${index * 0.2}s`
              }}
            />
          );
        })}

        <g>
          {[
            { x: 105, y: 105, size: 12 },
            { x: 195, y: 105, size: 10 },
            { x: 195, y: 195, size: 14 },
            { x: 105, y: 195, size: 11 },
          ].map((wave, index) => (
            <g key={`wave-${index}`}>
              <path
                d={`M${wave.x - wave.size},${wave.y} Q${wave.x},${wave.y - wave.size / 2} ${wave.x + wave.size},${wave.y}`}
                fill="none"
                stroke="url(#aquaGradientLight)"
                strokeWidth="2"
                opacity="0.5"
                className="animate-wave-flow"
                style={{
                  animationDelay: `${index * 0.4}s`
                }}
              />
              <circle
                cx={wave.x}
                cy={wave.y}
                r="3"
                fill="url(#aquaGradientLight)"
                opacity="0.7"
                className="animate-soft-pulse"
                style={{
                  animationDelay: `${index * 0.3}s`
                }}
              />
            </g>
          ))}
        </g>

        <text
          x="150"
          y="165"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="48"
          fontWeight="700"
          fontFamily="Playfair Display, serif"
          style={{ textShadow: '0 0 20px rgba(0, 230, 195, 0.8)' }}
          className="animate-soft-pulse"
        >
          AI
        </text>

        <text
          x="150"
          y="165"
          textAnchor="middle"
          fill="url(#aquaGradientLight)"
          fontSize="48"
          fontWeight="700"
          fontFamily="Playfair Display, serif"
          opacity="0.5"
          style={{ mixBlendMode: 'screen' }}
        >
          AI
        </text>
      </svg>

      <div
        className="absolute inset-0 rounded-full opacity-30 blur-3xl animate-soft-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(0, 230, 195, 0.7), rgba(77, 255, 220, 0.3), transparent 70%)',
        }}
      />
    </div>
  );
}
