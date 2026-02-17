(() => {
  const LEVELSCALE = 0.1; // ステータス用（既存のまま）

  const clampLv = (v) => {
    const n = parseInt(v, 10);
    return Number.isFinite(n) && n >= 1 ? n : 1;
  };

  // ステータス：仮スケール（既存）
  const calcStat = (base, lv) => Math.floor(base * (1 + (lv - 1) * LEVELSCALE));

  // 経験値：基礎経験値 × floor(0.2×Lv^1.1（最低保証1）)
  const calcExpMultiplier = (lv) => {
    const raw = 0.2 * Math.pow(lv, 1.1);
    const floored = Math.floor(raw);
    return Math.max(1, floored);
  };

  const init = () => {
    const levelInput = document.getElementById("monster-level");
    const statEls = document.querySelectorAll("#status-table dd[data-base]");
    const lvBtns = document.querySelectorAll(".d-btn[data-lv]");
    const originExp = document.getElementById("origin-exp");
    const expEl = document.getElementById("exp-value");

    if (!levelInput || statEls.length === 0) return;

    const recalcStats = (lv) => {
      statEls.forEach((el) => {
        const base = Number(el.dataset.base);
        const stat = el.dataset.stat || "";
        if (!Number.isFinite(base)) return;

        if (stat === "mov") {
          el.textContent = String(base);
          return;
        }
        el.textContent = String(calcStat(base, lv));
      });
    };

    const recalcExp = (lv) => {
      if (!expEl) return;

      const baseRaw = Number(expEl.dataset.base);
      if (!Number.isFinite(baseRaw)) return;

      const base = (originExp && originExp.checked) ? baseRaw * 2 : baseRaw;
      const mult = calcExpMultiplier(lv);

      expEl.textContent = String(base * mult);
    };

    const recalcAll = () => {
      const lv = clampLv(levelInput.value);
      levelInput.value = String(lv);

      recalcStats(lv);
      recalcExp(lv);

      // ▼ カンマ表示（必要なときだけ）
      if (typeof window.formatNumbers === "function") {
        window.formatNumbers(document);
      }
    };

    lvBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        levelInput.value = btn.dataset.lv || "1";
        recalcAll();
      });
    });

    levelInput.addEventListener("input", recalcAll);
    levelInput.addEventListener("change", recalcAll);

    if (originExp) {
      originExp.addEventListener("change", recalcAll);
    }

    recalcAll();
  };

  document.addEventListener("DOMContentLoaded", init);
  window.addEventListener("load", init);
})();
