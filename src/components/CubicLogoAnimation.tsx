import { useEffect, useState } from 'react';

const stockTerms = [
  '株価収益率', '株価純資産倍率', '自己資本利益率', '一株当たり利益',
  '営業利益', '総資本利益率', 'ベータ値', '一株当たり純資産'
];

interface Particle {
  id: number;
  angle: number;
  distance: number;
  opacity: number;
  size: number;
}

export default function CubicLogoAnimation() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    let animationFrame: number;
    let startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const rotX = (elapsed * 0.02) % 360;
      const rotY = (elapsed * 0.03) % 360;
      setRotation({ x: rotX, y: rotY });

      if (Math.random() < 0.15) {
        setParticles(prev => {
          const newParticles = [...prev, {
            id: Date.now() + Math.random(),
            angle: Math.random() * Math.PI * 2,
            distance: 0,
            opacity: 1,
            size: 2 + Math.random() * 3
          }];
          return newParticles.slice(-30);
        });
      }

      setParticles(prev => prev
        .map(p => ({
          ...p,
          distance: p.distance + 2,
          opacity: Math.max(0, p.opacity - 0.02)
        }))
        .filter(p => p.opacity > 0 && p.distance < 150)
      );

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  const renderOrbit = (orbitRadius: number, speed: number, offset: number, termsIndices: number[]) => {
    const elapsed = Date.now() * speed + offset;

    return (
      <div
        className="absolute"
        style={{
          width: orbitRadius * 2,
          height: orbitRadius * 1.2,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          border: '1px solid rgba(0, 240, 255, 0.2)',
          borderRadius: '50%',
          boxShadow: '0 0 20px rgba(0, 240, 255, 0.3), inset 0 0 20px rgba(0, 240, 255, 0.1)',
        }}
      >
        {termsIndices.map((termIdx, i) => {
          const angle = (elapsed + (i * 360 / termsIndices.length)) * Math.PI / 180;
          const x = Math.cos(angle) * orbitRadius;
          const y = Math.sin(angle) * orbitRadius * 0.6;

          return (
            <div
              key={termIdx}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
              }}
            >
              <div
                className="px-3 py-1.5 text-xs font-bold whitespace-nowrap rounded"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.8) 0%, rgba(99, 102, 241, 0.9) 100%)',
                  color: '#FFFFFF',
                  boxShadow: '0 0 15px rgba(0, 240, 255, 0.6), 0 4px 8px rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {stockTerms[termIdx]}
              </div>
            </div>
          );
        })}

        <div
          className="absolute w-3 h-3 rounded-full"
          style={{
            left: '50%',
            top: '50%',
            background: 'radial-gradient(circle, rgba(0, 240, 255, 1) 0%, rgba(99, 102, 241, 0.5) 50%, transparent 100%)',
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.8)',
            transform: `rotate(${elapsed}deg) translateX(${orbitRadius}px) translate(-50%, -50%)`,
          }}
        />
      </div>
    );
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
            width: particle.size,
            height: particle.size,
            borderRadius: '50%',
            background: `rgba(0, 240, 255, ${particle.opacity})`,
            boxShadow: `0 0 ${particle.size * 2}px rgba(0, 240, 255, ${particle.opacity})`,
            transform: `translate(-50%, -50%) translate(${Math.cos(particle.angle) * particle.distance}px, ${Math.sin(particle.angle) * particle.distance}px)`,
            pointerEvents: 'none',
          }}
        />
      ))}

      <div className="relative" style={{ perspective: '1000px' }}>
        {renderOrbit(200, 0.03, 0, [0, 1, 2])}
        {renderOrbit(160, 0.04, 120, [3, 4, 5])}
        {renderOrbit(220, 0.025, 240, [6, 7])}

        <div
          className="relative"
          style={{
            width: '120px',
            height: '120px',
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          }}
        >
          {[
            { transform: 'rotateY(0deg) translateZ(60px)', background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.15) 0%, rgba(99, 102, 241, 0.2) 100%)', text: 'AI診断' },
            { transform: 'rotateY(180deg) translateZ(60px)', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(0, 240, 255, 0.15) 100%)', text: '株式分析' },
            { transform: 'rotateY(90deg) translateZ(60px)', background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.18) 0%, rgba(99, 102, 241, 0.15) 100%)', text: '投資判断' },
            { transform: 'rotateY(-90deg) translateZ(60px)', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(0, 240, 255, 0.18) 100%)', text: 'リスク評価' },
            { transform: 'rotateX(90deg) translateZ(60px)', background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.2) 0%, rgba(99, 102, 241, 0.25) 100%)', text: '収益予測' },
            { transform: 'rotateX(-90deg) translateZ(60px)', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(0, 240, 255, 0.2) 100%)', text: '市場動向' },
          ].map((face, index) => (
            <div
              key={index}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                transform: face.transform,
                background: face.background,
                border: '2px solid rgba(0, 240, 255, 0.5)',
                boxShadow: '0 0 30px rgba(0, 240, 255, 0.4), inset 0 0 30px rgba(0, 240, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                borderRadius: '4px',
              }}
            >
              <div
                className="text-xl font-bold"
                style={{
                  color: '#F0F9FF',
                  textShadow: '0 0 20px rgba(0, 240, 255, 0.8), 0 0 40px rgba(0, 240, 255, 0.5)',
                }}
              >
                {face.text}
              </div>
            </div>
          ))}

          {[
            { x1: 0, y1: 0, x2: 120, y2: 0, x3: 120, y3: 120, x4: 0, y4: 120 },
            { x1: 0, y1: 0, x2: 120, y2: 0, x3: 120, y3: 0, x4: 0, y4: 0 },
            { x1: 0, y1: 120, x2: 120, y2: 120, x3: 120, y3: 120, x4: 0, y4: 120 },
            { x1: 0, y1: 0, x2: 0, y2: 120, x3: 0, y3: 120, x4: 0, y4: 0 },
            { x1: 120, y1: 0, x2: 120, y2: 120, x3: 120, y3: 120, x4: 120, y4: 0 },
          ].map((edge, index) => (
            <div
              key={`edge-${index}`}
              className="absolute"
              style={{
                left: edge.x1,
                top: edge.y1,
                width: Math.abs(edge.x2 - edge.x1) || 2,
                height: Math.abs(edge.y2 - edge.y1) || 2,
                background: 'linear-gradient(90deg, rgba(0, 240, 255, 0.8) 0%, rgba(103, 232, 249, 0.6) 100%)',
                boxShadow: '0 0 10px rgba(0, 240, 255, 0.8)',
                transformStyle: 'preserve-3d',
              }}
            />
          ))}
        </div>
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 240, 255, 0.05) 0%, transparent 50%)',
        }}
      />
    </div>
  );
}
