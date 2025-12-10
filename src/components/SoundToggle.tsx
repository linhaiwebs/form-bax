import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundEffects } from '../lib/soundEffects';

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(soundEffects.isEnabled());

  const toggleSound = () => {
    const newState = !enabled;
    setEnabled(newState);
    soundEffects.setEnabled(newState);

    if (newState) {
      soundEffects.click();
    }
  };

  return (
    <button
      onClick={toggleSound}
      onMouseEnter={() => soundEffects.hover()}
      className="fixed top-4 right-4 z-50 p-3 transition-all duration-300 hover:scale-110 group"
      style={{
        background: 'rgba(10, 0, 21, 0.8)',
        border: `2px solid ${enabled ? '#00F0FF' : '#FF006E'}`,
        boxShadow: enabled
          ? '0 0 10px rgba(0, 240, 255, 0.5), inset 0 0 10px rgba(0, 240, 255, 0.1)'
          : '0 0 10px rgba(255, 0, 110, 0.5), inset 0 0 10px rgba(255, 0, 110, 0.1)',
        clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
      }}
      title={enabled ? '音効をオフにする' : '音効をオンにする'}
    >
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyber-cyan animate-neon-pulse" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neon-pink animate-neon-pulse" style={{ animationDelay: '0.5s' }} />

      {enabled ? (
        <Volume2
          className="w-5 h-5"
          style={{
            color: '#00F0FF',
            filter: 'drop-shadow(0 0 5px rgba(0, 240, 255, 0.8))',
          }}
        />
      ) : (
        <VolumeX
          className="w-5 h-5"
          style={{
            color: '#FF006E',
            filter: 'drop-shadow(0 0 5px rgba(255, 0, 110, 0.8))',
          }}
        />
      )}

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: enabled
            ? 'radial-gradient(circle, rgba(0, 240, 255, 0.2), transparent)'
            : 'radial-gradient(circle, rgba(255, 0, 110, 0.2), transparent)',
        }}
      />
    </button>
  );
}
