/**
 * guide-floor-calc.js
 * 階層到達アイテム早見表ツール
 *
 * フロントマターから data-* 属性経由で設定を受け取り、
 * 指定階層にちょうど到達できるアイテムA・Bの組み合わせを列挙する。
 *
 * フロントマター対応パラメーター:
 *   item_a_name   : アイテムAの名称
 *   item_a_floors : アイテムA 1個で進める階層数
 *   item_a_max    : アイテムAの最大所持数
 *   item_b_name   : アイテムBの名称
 *   item_b_floors : アイテムB 1個で進める階層数
 *   item_b_max    : アイテムBの最大所持数
 *   floors        : ダンジョン総階層数（入力上限に使用）
 */

document.addEventListener("DOMContentLoaded", function () {
  /* ── 設定読み込み ── */
  const cfg = document.querySelector(".floor-tool__config");
  if (!cfg) return;

  const itemAName   = cfg.dataset.itemAName   || "アイテムA";
  const itemAFloors = parseInt(cfg.dataset.itemAFloors, 10) || 5;
  const itemAMax    = parseInt(cfg.dataset.itemAMax,    10) || 10;
  const itemBName   = cfg.dataset.itemBName   || "アイテムB";
  const itemBFloors = parseInt(cfg.dataset.itemBFloors, 10) || 1;
  const itemBMax    = parseInt(cfg.dataset.itemBMax,    10) || 30;
  const floorMax    = parseInt(cfg.dataset.floorMax,    10) || 50;

  /* ── DOM 参照 ── */
  const inputEl      = document.getElementById("targetFloor");
  const btnEl        = document.getElementById("calcFloorBtn");
  const resultEl     = document.getElementById("floorResult");
  const titleEl      = document.getElementById("floorResultTitle");
  const thAEl        = document.getElementById("thItemA");
  const thBEl        = document.getElementById("thItemB");
  const bodyEl       = document.getElementById("floorResultBody");
  const noResultEl   = document.getElementById("floorNoResult");

  if (!btnEl || !inputEl) return;

  /* ── ヘッダー設定 ── */
  thAEl.textContent = itemAName + "（個）";
  thBEl.textContent = itemBName + "（個）";

  /* ── 計算関数 ──
   * 目標階層 = a * itemAFloors + b * itemBFloors を満たす
   * 0 ≤ a ≤ itemAMax、0 ≤ b ≤ itemBMax の組み合わせを全列挙
   * aの昇順 → bの昇順でソート
   */
  function calcCombinations(target) {
    const results = [];
    for (let a = 0; a <= itemAMax; a++) {
      const remain = target - a * itemAFloors;
      if (remain < 0) break;
      if (remain % itemBFloors !== 0) continue;
      const b = remain / itemBFloors;
      if (b > itemBMax) continue;
      results.push({ a, b });
    }
    return results;
  }

  /* ── 表示関数 ── */
  function showResult(target, combinations) {
    resultEl.hidden = false;

    // タイトル
    titleEl.innerHTML =
      "<strong>" + target + "階</strong> に到達できる組み合わせ";

    // テーブル本体クリア
    bodyEl.innerHTML = "";

    if (combinations.length === 0) {
      noResultEl.hidden = false;
      document.querySelector(".floor-tool__table-wrap").style.display = "none";
    } else {
      noResultEl.hidden = true;
      document.querySelector(".floor-tool__table-wrap").style.display = "";

      combinations.forEach(function (combo) {
        const tr = document.createElement("tr");

        const tdA = document.createElement("td");
        tdA.textContent = combo.a + " 個";

        const tdB = document.createElement("td");
        tdB.textContent = combo.b + " 個";

        tr.appendChild(tdA);
        tr.appendChild(tdB);
        bodyEl.appendChild(tr);
      });
    }
  }

  /* ── エラー表示関数 ── */
  function showError(message) {
    resultEl.hidden = false;
    titleEl.innerHTML = message;
    bodyEl.innerHTML = "";
    noResultEl.hidden = true;
    document.querySelector(".floor-tool__table-wrap").style.display = "none";
  }

  /* ── イベント：ボタンクリック ── */
  btnEl.addEventListener("click", function () {
    const raw = inputEl.value.trim();
    const target = parseInt(raw, 10);

    if (!raw || isNaN(target) || target < 1) {
      showError("1以上の整数を入力してください。");
      return;
    }
    if (target > floorMax) {
      showError("入力できる階層は <strong>" + floorMax + "</strong> 以下です。");
      return;
    }

    const combinations = calcCombinations(target);
    showResult(target, combinations);
  });

  /* ── イベント：Enterキー ── */
  inputEl.addEventListener("keydown", function (e) {
    if (e.key === "Enter") btnEl.click();
  });
});
