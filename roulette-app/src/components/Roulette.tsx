import React, { useState, useRef } from 'react';
import './Roulette.css';

interface RouletteItem {
  id: number;
  label: string;
  color: string;
}

interface RouletteProps {
  items: RouletteItem[];
  onResult: (item: RouletteItem) => void;
}

const Roulette: React.FC<RouletteProps> = ({ items, onResult }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    
    const spinDuration = 3000;
    const spins = 5;
    const randomAngle = Math.random() * 360;
    const totalRotation = spins * 360 + randomAngle;
    
    setRotation(prev => prev + totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      
      const normalizedAngle = (360 - (totalRotation % 360)) % 360;
      const segmentAngle = 360 / items.length;
      const winningIndex = Math.floor(normalizedAngle / segmentAngle);
      
      onResult(items[winningIndex]);
    }, spinDuration);
  };

  const segmentAngle = 360 / items.length;

  return (
    <div className="roulette-container">
      <div className="roulette-wheel-container">
        <div className="roulette-pointer"></div>
        <div 
          ref={wheelRef}
          className="roulette-wheel"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
          }}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              className="roulette-segment"
              style={{
                transform: `rotate(${index * segmentAngle}deg)`,
                backgroundColor: item.color,
                '--segment-angle': `${segmentAngle}deg`
              } as React.CSSProperties}
            >
              <div className="segment-text">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      <button 
        onClick={spin} 
        disabled={isSpinning}
        className="spin-button"
      >
        {isSpinning ? 'スピン中...' : 'スピン！'}
      </button>
    </div>
  );
};

export default Roulette;