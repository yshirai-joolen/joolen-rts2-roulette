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
  const wheelRef = useRef<SVGSVGElement>(null);

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
      
      // ポインターは上（12時位置）にあり、セグメントも-90度から開始
      // 時計回りに回転するので、最終的な角度を計算
      const finalAngle = (rotation + totalRotation) % 360;
      const segmentAngle = 360 / items.length;
      
      // ポインターが指している角度を正規化
      // 反時計回りに回転しているように見えるが、実際には時計回りに回転している
      const normalizedAngle = (360 - finalAngle) % 360;
      const winningIndex = Math.floor(normalizedAngle / segmentAngle) % items.length;
      
      console.log('Final angle:', finalAngle, 'Normalized angle:', normalizedAngle, 'Winning index:', winningIndex, 'Winner:', items[winningIndex].label);
      
      onResult(items[winningIndex]);
    }, spinDuration);
  };

  const segmentAngle = 360 / items.length;

  return (
    <div className="roulette-container">
      <div className="roulette-wheel-container">
        <div className="roulette-pointer"></div>
        <svg 
          ref={wheelRef}
          className="roulette-wheel"
          viewBox="0 0 400 400"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
          }}
        >
          {items.map((item, index) => {
            // セグメントを-90度から開始（12時位置から）
            const startAngle = ((index * segmentAngle) - 90) * Math.PI / 180;
            const endAngle = (((index + 1) * segmentAngle) - 90) * Math.PI / 180;
            const centerX = 200;
            const centerY = 200;
            const radius = 190;
            
            const x1 = centerX + radius * Math.cos(startAngle);
            const y1 = centerY + radius * Math.sin(startAngle);
            const x2 = centerX + radius * Math.cos(endAngle);
            const y2 = centerY + radius * Math.sin(endAngle);
            
            const largeArc = segmentAngle > 180 ? 1 : 0;
            const pathData = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
            
            const textAngle = (startAngle + endAngle) / 2;
            const textRadius = radius * 0.7;
            const textX = centerX + textRadius * Math.cos(textAngle);
            const textY = centerY + textRadius * Math.sin(textAngle);
            
            return (
              <g key={item.id}>
                <path
                  d={pathData}
                  fill={item.color}
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                <text
                  x={textX + 1}
                  y={textY + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="rgba(0, 0, 0, 0.8)"
                  fontSize="14"
                  fontWeight="bold"
                  transform={`rotate(${textAngle * 180 / Math.PI}, ${textX + 1}, ${textY + 1})`}
                >
                  {item.label}
                </text>
                <text
                  x={textX}
                  y={textY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="14"
                  fontWeight="bold"
                  transform={`rotate(${textAngle * 180 / Math.PI}, ${textX}, ${textY})`}
                >
                  {item.label}
                </text>
              </g>
            );
          })}
        </svg>
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