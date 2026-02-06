(() => {
  const LEVELSCALE = 0.1; // ステータス用（既存のまま）

  const clampLv = (v) => {
    const n = parseInt(v, 10);
    return Number.isFinite(n) && n >= 1 ? n : 1;
  };

  const calcStat = (base, lv) => Math.floor(base * (1 + (lv - 1) * LEVELSCALE));

  const init = () => {
    const levelInput = document.getElementById("monster-level");
    const statEls = document.querySelectorAll("#status-table dd[data-base]");
    const lvBtns = document.querySelectorAll(".d-btn[data-lv]");
    const originExp = document.getElementById("origin-exp");
    const expEl = document.getElementById("exp-value");

    if (!levelInput || statEls.length === 0) return;

    const recalcStats = () => {
      const lv = clampLv(levelInput.value);
      levelInput.value = String(lv);

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

    const recalcExpBaseOnly = () => {
      if (!expEl) return;
      const base = Number(expEl.dataset.base);
      if (!Number.isFinite(base)) return;

      const on = originExp ? originExp.checked : false;
      expEl.textContent = String(on ? base * 2 : base);
    };

    const recalcAll = () => {
      recalcStats();
      recalcExpBaseOnly();
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
      originExp.addEventListener("change", recalcExpBaseOnly);
    }

    recalcAll();
  };

  document.addEventListener("DOMContentLoaded", init);
  window.addEventListener("load", init);
})();
