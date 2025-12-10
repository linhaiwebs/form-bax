export default function GoldenShieldLogoAnimation() {
  return (
    <div className="relative w-[300px] h-[300px] flex items-center justify-center">
      <svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        className="absolute"
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="1" />
            <stop offset="50%" stopColor="#B8860B" stopOpacity="1" />
            <stop offset="100%" stopColor="#CD7F32" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="goldGradientReverse" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="1" />
            <stop offset="100%" stopColor="#B8860B" stopOpacity="1" />
          </linearGradient>

          <filter id="metallic" x="-50%" y="-50%" width="200%" height="200%">
            <feSpecularLighting
              result="specOut"
              specularExponent="20"
              lightingColor="#FFD700"
            >
              <fePointLight x="50" y="50" z="200" />
            </feSpecularLighting>
            <feComposite
              in="SourceGraphic"
              in2="specOut"
              operator="arithmetic"
              k1="0"
              k2="1"
              k3="1"
              k4="0"
            />
          </filter>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id="shieldShine">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.1)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </radialGradient>
        </defs>

        <g className="animate-radial-glow origin-center" style={{ transformOrigin: '150px 150px' }}>
          <circle
            cx="150"
            cy="150"
            r="110"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="2"
            opacity="0.4"
            className="animate-gold-ring-pulse"
          />
        </g>

        <g className="animate-radial-glow origin-center" style={{ transformOrigin: '150px 150px', animationDelay: '0.5s' }}>
          <circle
            cx="150"
            cy="150"
            r="120"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="1.5"
            opacity="0.3"
            className="animate-gold-ring-pulse"
            style={{ animationDelay: '0.5s' }}
          />
        </g>

        <g className="animate-radial-glow origin-center" style={{ transformOrigin: '150px 150px', animationDelay: '1s' }}>
          <circle
            cx="150"
            cy="150"
            r="130"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="1"
            opacity="0.2"
            className="animate-gold-ring-pulse"
            style={{ animationDelay: '1s' }}
          />
        </g>

        <g className="animate-radial-glow origin-center" style={{ transformOrigin: '150px 150px', animationDelay: '1.5s' }}>
          <circle
            cx="150"
            cy="150"
            r="140"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="0.5"
            opacity="0.15"
            className="animate-gold-ring-pulse"
            style={{ animationDelay: '1.5s' }}
          />
        </g>

        <path
          d="M150,40 L180,50 Q200,70 200,100 L200,160 Q200,190 180,210 L150,230 L120,210 Q100,190 100,160 L100,100 Q100,70 120,50 Z"
          fill="url(#goldGradient)"
          filter="url(#metallic)"
          className="animate-gentle-pulse"
        />

        <path
          d="M150,40 L180,50 Q200,70 200,100 L200,160 Q200,190 180,210 L150,230 L120,210 Q100,190 100,160 L100,100 Q100,70 120,50 Z"
          fill="url(#shieldShine)"
          opacity="0.3"
        />

        <ellipse
          cx="150"
          cy="120"
          rx="30"
          ry="15"
          fill="rgba(255, 255, 255, 0.2)"
        />

        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, index) => {
          const radian = (angle * Math.PI) / 180;
          const x1 = 150;
          const y1 = 150;
          const length = 60 + (index % 2) * 10;
          const x2 = x1 + Math.cos(radian) * length;
          const y2 = y1 + Math.sin(radian) * length;

          return (
            <line
              key={`ray-${index}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="url(#goldGradient)"
              strokeWidth="2"
              opacity="0.3"
              filter="url(#glow)"
              className="animate-radial-glow"
              style={{
                transformOrigin: '150px 150px',
                animationDelay: `${index * 0.1}s`
              }}
            />
          );
        })}

        <g>
          {[
            { x: 120, y: 70, rotation: 0 },
            { x: 180, y: 70, rotation: 90 },
            { x: 180, y: 200, rotation: 180 },
            { x: 120, y: 200, rotation: 270 },
          ].map((corner, index) => (
            <g key={`corner-${index}`} transform={`translate(${corner.x}, ${corner.y})`}>
              <path
                d="M0,0 L8,0 Q12,0 12,4 L12,12 L8,8 L4,12 L0,8 Z"
                fill="url(#goldGradient)"
                opacity="0.6"
                transform={`rotate(${corner.rotation})`}
                className="animate-gentle-pulse"
                style={{
                  transformOrigin: '6px 6px',
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
          style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)' }}
        >
          AI
        </text>

        <text
          x="150"
          y="165"
          textAnchor="middle"
          fill="url(#goldGradientReverse)"
          fontSize="48"
          fontWeight="700"
          fontFamily="Playfair Display, serif"
          opacity="0.3"
          style={{ mixBlendMode: 'overlay' }}
        >
          AI
        </text>
      </svg>

      <div
        className="absolute inset-0 rounded-full opacity-20 blur-3xl animate-radial-glow"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.6), transparent 70%)',
        }}
      />
    </div>
  );
}
