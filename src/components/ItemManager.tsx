import React, { useState } from 'react';
import './ItemManager.css';

interface RouletteItem {
  id: number;
  label: string;
  color: string;
}

interface ItemManagerProps {
  items: RouletteItem[];
  onItemsChange: (items: RouletteItem[]) => void;
}

const ItemManager: React.FC<ItemManagerProps> = ({ items, onItemsChange }) => {
  const [newItemLabel, setNewItemLabel] = useState('');
  const [newItemColor, setNewItemColor] = useState('#3498db');

  const colors = [
    '#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6',
    '#e67e22', '#1abc9c', '#34495e', '#f1c40f', '#e91e63'
  ];

  const addItem = () => {
    if (newItemLabel.trim() === '') return;
    
    const newItem: RouletteItem = {
      id: Date.now(),
      label: newItemLabel.trim(),
      color: newItemColor
    };
    
    onItemsChange([...items, newItem]);
    setNewItemLabel('');
    setNewItemColor(colors[Math.floor(Math.random() * colors.length)]);
  };

  const removeItem = (id: number) => {
    onItemsChange(items.filter(item => item.id !== id));
  };

  const updateItem = (id: number, updates: Partial<RouletteItem>) => {
    onItemsChange(items.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  return (
    <div className="item-manager">
      <h3>アイテム管理</h3>
      
      <div className="add-item-section">
        <input
          type="text"
          value={newItemLabel}
          onChange={(e) => setNewItemLabel(e.target.value)}
          placeholder="新しいアイテムを入力"
          className="item-input"
          onKeyPress={(e) => e.key === 'Enter' && addItem()}
        />
        <div className="color-picker">
          <input
            type="color"
            value={newItemColor}
            onChange={(e) => setNewItemColor(e.target.value)}
            className="color-input"
          />
        </div>
        <button onClick={addItem} className="add-button">
          追加
        </button>
      </div>

      <div className="items-list">
        {items.map((item) => (
          <div key={item.id} className="item-row">
            <div 
              className="item-color-indicator"
              style={{ backgroundColor: item.color }}
            ></div>
            <input
              type="text"
              value={item.label}
              onChange={(e) => updateItem(item.id, { label: e.target.value })}
              className="item-edit-input"
            />
            <input
              type="color"
              value={item.color}
              onChange={(e) => updateItem(item.id, { color: e.target.value })}
              className="item-color-input"
            />
            <button 
              onClick={() => removeItem(item.id)}
              className="remove-button"
            >
              削除
            </button>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="empty-message">
          アイテムを追加してルーレットを開始しましょう！
        </div>
      )}
    </div>
  );
};

export default ItemManager;