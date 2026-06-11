# 謙謙爸工具箱

> 為思考而造的小工具。每一個解決一個真實問題。

**線上使用** → [mbindividual-dad-of-Ken.github.io/toolbox](https://mbindividual-dad-of-Ken.github.io/toolbox/)

---

## 工具清單

| 工具 | 說明 | 時間 |
|------|------|------|
| [1 小時決策法](https://mbindividual-dad-of-Ken.github.io/decision-tool/) | 引導式計時框架，從釐清問題到承諾行動 | ~60 min |
| [策略思考引導器](https://mbindividual-dad-of-Ken.github.io/toolbox/strategic/) | 先問對的問題，再決定做什麼 | ~15 min |
| [情緒輪光譜](https://mbindividual-dad-of-Ken.github.io/emotion-wheel/) | 72 個情緒詞彙，Plutchik 輪轉盤 | 隨時用 |
| [慢讀筆記](https://mbindividual-dad-of-Ken.github.io/reading-tools/) | 費曼筆記法閱讀工具 | 隨時用 |

---

## 架構

```
toolbox/              ← 本 repo（GitHub Pages）
├── index.html        ← 工具箱首頁
├── manifest.json     ← PWA manifest
├── sw.js             ← Service Worker（離線快取）
├── icons/            ← PWA 圖示
│   ├── icon-192.png
│   └── icon-512.png
└── strategic/
    └── index.html    ← 策略思考引導器
```

其他工具各自維護在獨立 repo，首頁以連結整合。

---

## 安裝為 PWA

在手機瀏覽器開啟首頁後，點「加入主畫面」即可安裝。支援離線使用首頁與策略思考工具。

---

## 設計原則

- 每個工具一個 HTML 檔，零依賴，零後端
- 暗色 / 亮色主題，偏好設定自動記憶
- 產出 Obsidian 友善的 Markdown（含 frontmatter）
