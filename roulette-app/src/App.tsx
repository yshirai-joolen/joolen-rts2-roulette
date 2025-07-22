import React, { useState, useEffect } from 'react';
import './App.css';
import Roulette from './components/Roulette';
import ItemManager from './components/ItemManager';
import ResultModal from './components/ResultModal';
import History from './components/History';

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

function App() {
  const [items, setItems] = useState<RouletteItem[]>([
    { id: 1, label: 'りんご', color: '#e74c3c' },
    { id: 2, label: 'みかん', color: '#f39c12' },
    { id: 3, label: 'バナナ', color: '#f1c40f' },
    { id: 4, label: 'ぶどう', color: '#9b59b6' },
    { id: 5, label: 'いちご', color: '#e91e63' },
    { id: 6, label: 'メロン', color: '#2ecc71' },
  ]);

  const [result, setResult] = useState<RouletteItem | null>(null);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // ローカルストレージから履歴を読み込み
  useEffect(() => {
    const savedHistory = localStorage.getItem('roulette-history');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory).map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
        setHistory(parsedHistory);
      } catch (error) {
        console.error('履歴の読み込みに失敗しました:', error);
      }
    }
  }, []);

  // 履歴をローカルストレージに保存
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('roulette-history', JSON.stringify(history));
    }
  }, [history]);

  const handleResult = (item: RouletteItem) => {
    const newHistoryItem: HistoryItem = {
      id: Date.now(),
      item,
      timestamp: new Date()
    };
    
    setHistory(prev => [newHistoryItem, ...prev]);
    setResult(item);
    setIsResultModalOpen(true);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('roulette-history');
  };

  const closeResultModal = () => {
    setIsResultModalOpen(false);
    setResult(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎲 ルーレットアプリ</h1>
        <p>くじ引きに使えるルーレットアプリです</p>
      </header>
      
      <main className="App-main">
        <div className="app-container">
          <div className="roulette-section">
            {items.length > 0 ? (
              <Roulette items={items} onResult={handleResult} />
            ) : (
              <div className="no-items-message">
                <p>アイテムを追加してルーレットを開始しましょう！</p>
              </div>
            )}
          </div>
          
          <div className="manager-section">
            <ItemManager items={items} onItemsChange={setItems} />
          </div>
          
          <div className="history-section">
            <History history={history} onClearHistory={clearHistory} />
          </div>
        </div>
      </main>

      <ResultModal 
        isOpen={isResultModalOpen}
        result={result}
        onClose={closeResultModal}
      />
    </div>
  );
}

export default App;
