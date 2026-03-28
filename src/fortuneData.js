/** Daily omikuji: same local calendar day → same slip (deterministic). */

export const FORTUNES = [
  {
    tier: "大吉",
    tone: "great",
    title: "Packet 都走對路由",
    body: "今天思緒清楚，Debug 特別順。適合交作業、整理筆記，長輩與隊友也願意幫你一把。",
  },
  {
    tier: "吉",
    tone: "good",
    title: "防火牆心情不錯",
    body: "穩扎穩打的一天。照計畫推進就好，小有延遲別急躁，下午茶可以犒賞自己。",
  },
  {
    tier: "中吉",
    tone: "good",
    title: "Log 裡藏驚喜",
    body: "表面平淡，細看會有收穫。適合複盤上週實驗、把雜訊里真正有料的訊號撈出來。",
  },
  {
    tier: "小吉",
    tone: "fair",
    title: "Latency 微微有感",
    body: "進度尚可，偶有小卡關。休息一下、換個環境走走，靈感會回來。",
  },
  {
    tier: "末吉",
    tone: "fair",
    title: "握手還要多試幾次",
    body: "需要耐心重試的一天。別獨撐，問問同學或搜關鍵字，晚一點狀況會好轉。",
  },
  {
    tier: "平",
    tone: "neutral",
    title: "今日如 TCP 一樣可靠",
    body: "沒有大起大落，適合打底：備份檔案、清理桌面、把待辦清掉一兩項也很棒。",
  },
  {
    tier: "吉",
    tone: "good",
    title: "SSH 金鑰對上了",
    body: "溝通順暢，適合討論題目或 pair lab。把好問題問出口，答案會靠近你。",
  },
  {
    tier: "中吉",
    tone: "good",
    title: "CIDR 心態寬一點",
    body: "視野放寬就不卡關。讀一份沒讀過的 RFC 摘要或論文導讀，會意外有幫助。",
  },
  {
    tier: "小吉",
    tone: "fair",
    title: "Checksum 差一點點",
    body: "小心細節與拼字。提交前再掃一眼，能省下不少來回。",
  },
  {
    tier: "大吉",
    tone: "great",
    title: "Zero-day 輪不到你煩惱",
    body: "運氣站在謹慎的人這邊。適合規劃、學新工具，長遠佈局特別有利。",
  },
  {
    tier: "吉",
    tone: "good",
    title: "Cookie 是新鮮的",
    body: "人緣與靈感都不錯。把想法寫下來，晚上回讀會覺得「原來我懂這麼多」。",
  },
  {
    tier: "平",
    tone: "neutral",
    title: "維護視窗內平靜施工",
    body: "適合內部優化：整理資料夾、寫 README、把小腳本重構乾淨。",
  },
  {
    tier: "末吉",
    tone: "fair",
    title: "DNS 還在 propagation",
    body: "事情要慢慢對齊。今天不強求立即結果，明天可能就通了。",
  },
  {
    tier: "中吉",
    tone: "good",
    title: "封包嗅一嗅就有頭緒",
    body: "觀察力在線。適合 trace、畫圖、把抽象概念畫成一張圖給自己看。",
  },
  {
    tier: "小吉",
    tone: "fair",
    title: "Rate limit 提醒你慢一點",
    body: "別透支體力與專注。分段工作、定時喝水，效率反而更好。",
  },
  {
    tier: "吉",
    tone: "good",
    title: "本機測試一回過",
    body: "準備有回報。按部就班執行計畫，小小里程碑也值得慶祝。",
  },
];

function hashDateKey(key) {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function getFortuneForLocalDate(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const dateKey = `${y}-${m}-${d}`;
  const idx = hashDateKey(dateKey) % FORTUNES.length;
  return {
    ...FORTUNES[idx],
    dateKey,
  };
}
