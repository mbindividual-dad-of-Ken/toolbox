/* ════════════════════════════════════════════════
   謙謙爸工具箱 — 共用工具函式庫
   toolbox-utils.js v1.0
   ════════════════════════════════════════════════ */

// ── 主題切換 ─────────────────────────────────────
const TbxTheme = (() => {
  const STORAGE_KEY = 'tbx-theme';

  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.textContent = theme === 'dark' ? '☀︎' : '☾';
    });
    // 同步 theme-color meta
    const meta = document.getElementById('themeMetaColor');
    if (meta) meta.content = theme === 'dark' ? '#0e0d0b' : '#f4efe3';
  }

  function toggle() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    apply(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  function restore() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) apply(saved);
  }

  return { toggle, restore, apply };
})();

// ── Markdown 匯出基礎 ────────────────────────────
const TbxMarkdown = (() => {
  function copy(text, btnEl, doneLabel = '已複製 ✓', originalLabel = '複製 Markdown ↗') {
    return navigator.clipboard.writeText(text).then(() => {
      if (btnEl) {
        btnEl.textContent = doneLabel;
        setTimeout(() => { btnEl.textContent = originalLabel; }, 2000);
      }
    });
  }

  function today() {
    return new Date().toISOString().slice(0, 10);
  }

  return { copy, today };
})();

// ── 計時器 ───────────────────────────────────────
function TbxTimer({ onTick, onEnd } = {}) {
  let interval = null;
  let running = false;
  let sec = 0;
  let total = 0;

  function start(seconds) {
    if (seconds !== undefined) { total = seconds; sec = seconds; }
    if (sec <= 0) return;
    running = true;
    interval = setInterval(() => {
      sec--;
      if (onTick) onTick(sec, total);
      if (sec <= 0) {
        stop();
        if (onEnd) onEnd();
      }
    }, 1000);
  }

  function pause() {
    running = false;
    clearInterval(interval);
    interval = null;
  }

  function stop() {
    pause();
    running = false;
  }

  function reset(seconds) {
    stop();
    if (seconds !== undefined) { total = seconds; sec = seconds; }
    else sec = total;
    if (onTick) onTick(sec, total);
  }

  function fmt() {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  function isRunning() { return running; }
  function remaining() { return sec; }
  function progress() { return total > 0 ? (total - sec) / total : 0; }

  return { start, pause, stop, reset, fmt, isRunning, remaining, progress };
}

// ── Toast 通知 ───────────────────────────────────
function TbxToast(message, { type = 'error', duration = 5000 } = {}) {
  const existing = document.getElementById('tbx-toast');
  if (existing) existing.remove();

  const bg = type === 'error' ? 'var(--red, #e86756)' : 'var(--teal, #54c2a2)';
  const toast = document.createElement('div');
  toast.id = 'tbx-toast';
  toast.textContent = message;
  toast.style.cssText = [
    'position:fixed', 'bottom:1.5rem', 'left:50%', 'transform:translateX(-50%)',
    `background:${bg}`, 'color:#fff', 'font-size:13px',
    'padding:10px 18px', 'border-radius:10px', 'z-index:9999',
    'box-shadow:0 4px 16px rgba(0,0,0,0.3)', 'cursor:pointer',
    'white-space:nowrap', 'font-family:inherit'
  ].join(';');
  toast.addEventListener('click', () => toast.remove());
  document.body.appendChild(toast);
  if (duration > 0) setTimeout(() => { if (toast.parentNode) toast.remove(); }, duration);
  return toast;
}

// ── 錯誤邊界 ─────────────────────────────────────
(function setupErrorBoundary() {
  let _errSeen = {}, _errN = 0;
  window.onerror = function(msg, src, line) {
    try {
      const key = String(msg).slice(0, 80) + ':' + line;
      if (_errSeen[key] || _errN >= 3) return;
      _errSeen[key] = 1; _errN++;
      TbxToast('⚠ 發生錯誤，請重新整理頁面');
    } catch(e) {}
  };
  window.addEventListener('unhandledrejection', () => {
    try { TbxToast('⚠ 發生錯誤，請重新整理頁面'); } catch(e) {}
  });
})();
