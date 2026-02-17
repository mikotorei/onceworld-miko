(() => {
  const fmt = (n) => {
    if (!Number.isFinite(n)) return null;
    return n.toLocaleString("ja-JP");
  };

  const formatNode = (el) => {
    const raw = (el.textContent || "").trim();
    if (!raw) return;

    // "1234" 形式のみ対象（符号もOK）
    if (!/^-?\d+(\.\d+)?$/.test(raw)) return;

    const num = Number(raw);
    const out = fmt(num);
    if (out != null) el.textContent = out;
  };

  const run = () => {
    document.querySelectorAll(".n").forEach(formatNode);
  };

  // 初回
  document.addEventListener("DOMContentLoaded", run);
  window.addEventListener("load", run);

  // レベル変更などで数値が書き換わるので監視
  const obs = new MutationObserver(() => run());
  obs.observe(document.documentElement, { subtree: true, childList: true, characterData: true });
})();
