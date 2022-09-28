# 楓楓與小芬的島羽

## 賞鳥資料更新項目
`YouTube` `eBird` `Google Drive`

## 待處理

### 待新增功能
* 變更網站字型
* 新年倒數
  - [11 月開始倒數](https://www.npmjs.com/package/react-countdown)
  - [倒數看板](https://codepen.io/MarkBoots/pen/VwMrMQQ)
  - [倒數結束放煙火](https://www.npmjs.com/package/fireworks-js)
  - [設計原理](https://www.digitalocean.com/community/tutorials/react-countdown-timer-react-hooks)
* 每日稀有鳥地圖
* 圖表
  - [下載圖表](https://dev.to/noemelo/how-to-save-chart-as-image-chart-js-2l0i)
  - 列印網頁
* 研究
  - 長條圖 = \[地點, 種數+隻數\]
  - 豐量曲線 = \[Rank(豐量等級), Abundance(log)\]
* 小遊戲
  - [Flappy Bird](https://yudhajitadhikary.medium.com/developing-flappy-birds-in-react-and-javascript-ae54ff0eadb1)
* YouTube
  - [影片 Floating](https://cutt.ly/VmvCtHS)
  - 主題選單(特展)：台北都市常見鳥類、台灣特有種、台灣特有亞種、台灣猛禽、特殊行為、築巢育雛
  - 蝶舞/物語 播放清單：新開分頁或新增選單
* 辨識
  - 猛禽剪影 VS 解答原色
* eBird
  - 鳥種查詢頁面
* 特展(DaPainter)
  - [原民與台灣鳥類](https://m.facebook.com/Pure.Taiwan/photos/a.348053841949679/400116416743421/)
  - 台灣保育類
* 天文
  - 哈伯三年曆
  - [梅西耶](https://www.nasa.gov/content/goddard/hubble-s-messier-catalog)
  - [小行星](http://hcepaper.ncu.edu.tw/content/26)

### 待修正補充
* 關於
  - 教育區展示照片
* 分享
  - 圖表
  - YouTube
* [eBirder 選擇按鈕](https://gist.github.com/hobo71/fca98984a6aa35e4eb19391cd5fad332)
* 時間軸
  - 文字雲：數量與稀有度加權
  - 漂浮鳥：大小、點選開 eBird
* YouTube
  - 關鍵字搜尋框 + [語音](https://www.npmjs.com/package/react-speech-recognition) + 下拉式推薦選單
  - 三種篩選參數互相限縮選項
  - [分頁1](https://www.npmjs.com/package/react-paginate) / [分頁2](https://react-bootstrap.netlify.app/components/pagination/#rb-docs-content)
  - [載入中骨架](https://www.npmjs.com/package/react-loading-skeleton)
* 地圖
  - [鳥點依鳥種數配色](https://ebird.org/taiwan/hotspots)
  - 鳥種超連結 eBird 頁面或介紹(需要中英鳥名轉換)
  - 使用者位置動畫(漣漪)
* 照片
  - [特效](https://w3bits.com/labs/css-image-hover-zoom/)
* 人次
  - 初始值修正
* 鳥音
  - 建立多棲地背景，鳥種放置適當位置，點擊顯示鳥音列表
* 賞鳥地點/鳥種 以代號替換資料
* 鳥種篩選以 Modal 顯示與勾選
* 時間軸鳥種按鈕/圓餅圖區塊 依稀有度上色排序分類
* Lazy Loading: [react-intersection-observer](https://www.npmjs.com/package/react-intersection-observer)
* 使用者同意 Cookie

### 待最後作業
* 下拉式分頁的主分頁都要做入口頁面方便行動裝置進入子分頁
* 甚麼東西都要配個小圖示(個人特色)
* 數字放大凸顯，Mechanical Scoreboard 設計
* 加入可與使用者互動的元素 EX: 拖曳、滑動...(個人特色)
* 載入中骨架：react-loading-skeleton
* [分頁組成群組1](https://pjchender.blogspot.com/2018/11/react-react-router-dynamic-breadcrumb.html?m=1) [分頁組成群組2](https://www.npmjs.com/package/use-react-router-breadcrumbs)
* 網頁主題設計：羽宙(流星)、羽林(飛鳥) | 白天晚上(顏料圖示點擊動畫上色) | 新年、聖誕、萬聖 | 各種鳥代表的顏色
* [react-visualized > react-window](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/virtualize-long-list-with-react-window-95bac3673a91)
* [滾動 lazyload](https://betterprogramming.pub/lazy-load-youtube-video-iframe-8838e1913751)
* React Suspense & React Lazy
* 重構：Profiler 配合 useEffect, useMemo, useCallback & useContext(Context自成一檔：React.createContext())
* [自動執行](https://stackoverflow.com/questions/19762350/execute-an-exe-file-using-node-js)
* 解決分頁網址無法瀏覽問題(Github 才這樣？)

## 使用的外部服務
* `Leaflet`: 建立賞鳥地圖
* `Google Cloud Platform`: 獲取 Google Drive 資料
* `Firebase`: 網站拜訪人次
* `EmailJS`: 網站 email 聯絡
