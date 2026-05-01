/**
 * guide-floor-calc.js
 * 天空回廊 階層到達早見表ツール（最適戦略版）
 *
 * ═══════════════════════════════════════════════
 * 前提・仕様
 * ═══════════════════════════════════════════════
 *
 * 変数定義：
 *   A = 天空像～悪魔～  所持数（0〜1000）
 *   B = 天空像～冒険者～ 所持数（100の倍数、100〜1000）
 *
 * ── 初回（1F → 最初の100の倍数F） ──
 *   冒険者像を2個一時的に置いて (B-2) 個の状態で片側撃破
 *   進行: 1F(片側) + (B-2)F(冒険者) = B-1 F
 *   到達: 1 + (B-1) = B F（100の倍数）
 *
 * ── 2回目以降（毎サイクル） ──
 *   片側撃破 : +1F
 *   冒険者B個: +B F
 *   SG撃破   : +99F（固定、100の倍数Fで必ず発生）
 *   悪魔A個  : +100×A F
 *   ─────────────────────────
 *   1サイクル: 100 + B + 100×A F
 *
 * ── 到達条件 ──
 *   target = B + n × (100 + B + 100×A)
 *   → (target - B) が (100 + B + 100×A) で割り切れる
 *   → target は100の倍数のみ有効
 */

document.addEventListener("DOMContentLoaded", function () {

  /* ── 定数 ── */
  const MAX_A       = 1000;
  const MAX_B       = 1000;
  const B_STEP      = 100;   // Bは100の倍数のみ
  const START_FLOOR = 1;

  /* ── DOM 参照 ── */
  const inputTarget = document.getElementById("targetFloor");
  const btnCalc     = document.getElementById("calcFloorBtn");
  const resultEl    = document.getElementById("floorResult");
  const titleEl     = document.getElementById("floorResultTitle");
  const bodyEl      = document.getElementById("floorResultBody");
  const noResultEl  = document.getElementById("floorNoResult");
  const tableWrapEl = document.querySelector(".floor-tool__table-wrap");

  if (!btnCalc || !inputTarget) return;

  /**
   * 到達可能な組み合わせを列挙
   * @param {number} target - 目標階層（100の倍数）
   * @returns {Array<{a:number, b:number, cycles:number, perCycle:number}>}
   */
  function findCombinations(target) {
    const results = [];

    for (let b = B_STEP; b <= MAX_B; b += B_STEP) {
      const firstReach = b; // 初回到達F = B
      const remaining  = target - firstReach;

      // 残り0 → 初回だけでちょうど到達（A=0, n=0扱い）
      if (remaining === 0) {
        results.push({ a: 0, b, cycles: 0, perCycle: 0 });
        continue;
      }

      if (remaining < 0) continue;

      for (let a = 0; a <= MAX_A; a++) {
        const perCycle = 100 + b + 100 * a;
        if (remaining % perCycle === 0) {
          const cycles = remaining / perCycle;
          results.push({ a, b, cycles, perCycle });
        }
      }
    }

    // B昇順 → A昇順でソート
    results.sort(function (x, y) {
      if (x.b !== y.b) return x.b - y.b;
      return x.a - y.a;
    });

    return results;
  }

  /* ── 表示 ── */
  function showResult(target, combinations) {
    resultEl.hidden = false;
    titleEl.innerHTML =
      "<strong>" + target.toLocaleString() + "F</strong>" +
      " にちょうど到達できる組み合わせ";

    bodyEl.innerHTML = "";

    if (combinations.length === 0) {
      noResultEl.hidden         = false;
      tableWrapEl.style.display = "none";
      return;
    }

    noResultEl.hidden         = true;
    tableWrapEl.style.display = "";

    combinations.forEach(function (combo) {
      const tr = document.createElement("tr");

      const tdB      = document.createElement("td");
      const tdA      = document.createElement("td");
      const tdCycles = document.createElement("td");
      const tdPer    = document.createElement("td");

      tdB.textContent = combo.b + " 個";
      tdA.textContent = combo.a + " 個";

      if (combo.cycles === 0) {
        tdCycles.textContent = "初回のみ";
        tdPer.textContent    = "—";
      } else {
        tdCycles.textContent = combo.cycles + " 回";
        tdPer.textContent    = combo.perCycle.toLocaleString() + " F/サイクル";
      }

      tr.appendChild(tdB);
      tr.appendChild(tdA);
      tr.appendChild(tdCycles);
      tr.appendChild(tdPer);
      bodyEl.appendChild(tr);
    });
  }

  function showError(msg) {
    resultEl.hidden           = false;
    titleEl.innerHTML         = msg;
    bodyEl.innerHTML          = "";
    noResultEl.hidden         = true;
    tableWrapEl.style.display = "none";
  }

  /* ── メイン処理 ── */
  function onCalc() {
    const raw    = inputTarget.value.trim();
    const target = parseInt(raw, 10);

    if (!raw || isNaN(target) || target < 100) {
      showError("100以上の整数を入力してください。");
      return;
    }

    if (target % 100 !== 0) {
      showError("目標階層は<strong>100の倍数</strong>で入力してください。");
      return;
    }

    const combinations = findCombinations(target);
    showResult(target, combinations);
  }

  btnCalc.addEventListener("click", onCalc);
  inputTarget.addEventListener("keydown", function (e) {
    if (e.key === "Enter") onCalc();
  });
});
