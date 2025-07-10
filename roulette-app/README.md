# ルーレットアプリ

くじ引きに使えるルーレットアプリです。WebアプリとしてもElectronでネイティブアプリとしても使用できます。

## 🎯 機能

- **ルーレット回転**: 滑らかなアニメーションでルーレットを回転
- **アイテム管理**: 任意のアイテムを追加・削除・編集
- **カスタムカラー**: 各アイテムに好きな色を設定
- **結果表示**: 美しいモーダルで結果を表示
- **レスポンシブデザイン**: モバイル・デスクトップ対応

## 🚀 実行方法

### Webアプリとして実行

```bash
# 開発サーバーを起動
npm start

# ブラウザで http://localhost:3000 を開く
```

### Electronアプリとして実行

```bash
# プロダクションビルドを作成
npm run build

# Electronアプリを起動
npm run electron
```

## 📦 ビルド

### 各OS用のネイティブアプリをビルド

```bash
# Windows用
npm run build-win

# macOS用
npm run build-mac

# Linux用
npm run build-linux
```

## 🛠️ 技術スタック

- **React** - UIフレームワーク
- **TypeScript** - 型安全性
- **Electron** - ネイティブアプリ化
- **CSS3** - スタイリング・アニメーション
- **Electron Builder** - アプリパッケージング

## 📁 プロジェクト構成

```
roulette-app/
├── src/
│   ├── components/
│   │   ├── Roulette.tsx          # ルーレット本体
│   │   ├── Roulette.css
│   │   ├── ItemManager.tsx       # アイテム管理
│   │   ├── ItemManager.css
│   │   ├── ResultModal.tsx       # 結果表示モーダル
│   │   └── ResultModal.css
│   ├── App.tsx                   # メインアプリケーション
│   ├── App.css
│   └── index.tsx
├── public/
│   └── electron.js               # Electronメインプロセス
├── package.json
└── README.md
```

## 🎨 使い方

1. **アイテム追加**: 右側のアイテム管理パネルで新しいアイテムを追加
2. **色のカスタマイズ**: 各アイテムの色を自由に変更
3. **ルーレット回転**: 「スピン！」ボタンをクリックしてルーレットを回転
4. **結果確認**: 結果がモーダルで表示されます

## 📄 ライセンス

MIT License

## 🤝 貢献

プルリクエストや Issue の作成を歓迎します！

---

楽しいくじ引きライフを！🎲✨