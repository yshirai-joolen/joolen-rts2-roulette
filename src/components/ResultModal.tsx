import React from 'react';
import './ResultModal.css';

interface RouletteItem {
  id: number;
  label: string;
  color: string;
}

interface ResultModalProps {
  isOpen: boolean;
  result: RouletteItem | null;
  onClose: () => void;
  isExclusionMode: boolean;
  onExcludeItem: (itemId: number) => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ isOpen, result, onClose, isExclusionMode, onExcludeItem }) => {
  if (!isOpen || !result) return null;

  const handleExclude = () => {
    onExcludeItem(result.id);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="result-header">
          <h2>🎉 結果発表！</h2>
        </div>
        
        <div className="result-display">
          <div 
            className="result-color-circle"
            style={{ backgroundColor: result.color }}
          ></div>
          <div className="result-text">
            {result.label}
          </div>
        </div>
        
        <div className="result-actions">
          {isExclusionMode && (
            <button onClick={handleExclude} className="exclude-button">
              🚫 このアイテムを除外
            </button>
          )}
          <button onClick={onClose} className="close-button">
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;