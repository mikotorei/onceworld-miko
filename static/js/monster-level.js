(() => {
  const LEVELSCALE = 0.1; // 1Lvごとに+10%（仮。後で式だけ変える）

  const clampLv = (v) => {
    const n = parseInt(v, 10);
    return Number.isFinite(n) && n >= 1 ? n : 1;
  };

  const calc = (base, lv) => Math.floor(base * (1 + (lv - 1) * LEVELSCALE));

  const init = () => {
    const levelInput = document.getElementById("monster-level");
    const statEls = document.querySelectorAll("#status-table dd[data-base]");
    const lvBtns = document.querySelectorAll(".d-btn[data-lv]");

    // デバッグ（Consoleで確認できる）
    console.log("[monster-level] init", {
      levelInput: !!levelInput,
      statEls: statEls.length,
      lvBtns: lvBtns.length
    });

    if (!levelInput || statEls.length === 0) return;

    const recalc = () => {
      const lv = clampLv(levelInput.value);
      levelInput.value = String(lv);

      statEls.forEach((el) => {
        const base = Number(el.dataset.base);
        const stat = el.dataset.stat || "";

        if (!Number.isFinite(base)) return;

        // movは固定
        if (stat === "mov") {
          el.textContent = String(base);
          return;
        }

        el.textContent = String(calc(base, lv));
      });
    };

    // ボタンでLvをセット
    lvBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        levelInput.value = btn.dataset.lv || "1";
        recalc();
      });
    });

    // 手入力
    levelInput.addEventListener("input", recalc);
    levelInput.addEventListener("change", recalc);

    recalc();
  };

  // DOMContentLoadedが効かない環境対策で両方張る
  document.addEventListener("DOMContentLoaded", init);
  window.addEventListener("load", init);
})();
