import React from 'react';
import './History.css';

interface RouletteItem {
  id: number;
  label: string;
  color: string;
}

interface HistoryItem {
  id: number;
  item: RouletteItem;
  timestamp: Date;
}

interface HistoryProps {
  history: HistoryItem[];
  onClearHistory: () => void;
}

const History: React.FC<HistoryProps> = ({ history, onClearHistory }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="history-container">
      <div className="history-header">
        <h3>🏆 当選履歴</h3>
        {history.length > 0 && (
          <button onClick={onClearHistory} className="clear-button">
            履歴をクリア
          </button>
        )}
      </div>
      
      <div className="history-content">
        {history.length === 0 ? (
          <div className="no-history-message">
            まだ履歴がありません。<br />
            ルーレットを回して記録を作成しましょう！
          </div>
        ) : (
          <div className="history-list">
            {history.slice(0, 20).map((historyItem, index) => (
              <div key={historyItem.id} className="history-item">
                <div className="history-rank">#{index + 1}</div>
                <div 
                  className="history-color"
                  style={{ backgroundColor: historyItem.item.color }}
                ></div>
                <div className="history-details">
                  <div className="history-name">{historyItem.item.label}</div>
                  <div className="history-time">{formatTime(historyItem.timestamp)}</div>
                </div>
              </div>
            ))}
            {history.length > 20 && (
              <div className="history-more">
                他 {history.length - 20} 件の履歴...
              </div>
            )}
          </div>
        )}
      </div>
      
      {history.length > 0 && (
        <div className="history-stats">
          <div className="stats-item">
            <span className="stats-label">総回数:</span>
            <span className="stats-value">{history.length}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;