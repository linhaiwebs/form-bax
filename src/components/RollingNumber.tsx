import { useState, useEffect, useRef } from 'react';

interface RollingNumberProps {
  value: number;
  decimals?: number;
  className?: string;
  glowColor?: 'green' | 'red' | 'none';
}

export default function RollingNumber({ value, decimals = 2, className = '', glowColor = 'none' }: RollingNumberProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);
  const previousValue = useRef(value);

  useEffect(() => {
    if (previousValue.current !== value) {
      setIsAnimating(true);

      const startValue = previousValue.current;
      const endValue = value;
      const duration = 800;
      const startTime = Date.now();

      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + (endValue - startValue) * easeOutCubic;

        setDisplayValue(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
          previousValue.current = value;
        }
      };

      animate();
    }
  }, [value]);

  const formattedValue = displayValue.toFixed(decimals);

  const glowClass =
    glowColor === 'green' ? 'text-green-400' :
    glowColor === 'red' ? 'text-red-400' :
    '';

  const shadowStyle =
    glowColor === 'green' && isAnimating ? { textShadow: '0 0 8px rgba(34, 197, 94, 0.6)' } :
    glowColor === 'red' && isAnimating ? { textShadow: '0 0 8px rgba(239, 68, 68, 0.6)' } :
    {};

  return (
    <span
      className={`inline-block font-mono ${glowClass} ${className} transition-all duration-200`}
      style={shadowStyle}
    >
      {formattedValue}
    </span>
  );
}
