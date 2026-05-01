/**
 * guide-floor-calc.js
 * 天空回廊 階層到達アイテム早見表ツール
 *
 * 仕様：
 *   - 起点は1F固定
 *   - 1戦闘ごとに +1F（片側撃破）or +2F（両側撃破）進む（ユーザー選択）
 *   - 100層毎にスカイガーディアン撃破で +99F 自動加算
 *   - 天空像～冒険者～：1個 = 1戦闘あたり追加 +1F（所持数分）
 *   - 天空像～悪魔～  ：1個 = スカイガーディアン撃破時に追加 +100F（所持数分）
 *   - 目標階層にちょうど到達できる組み合わせを全列挙
 *
 * 「到達」の定義：
 *   戦闘を繰り返して累積進行がちょうど (target - 1) F 分進んだとき
 *   （1Fスタートなので target - 1 F 進む必要がある）
 *
 * 1戦闘で進む量：
 *   basePerBattle = 1 or 2（片側/両側）
 *   adventurerBonus = 冒険者像所持数（1戦闘あたり追加F）
 *   → 1戦闘の通常進行 = basePerBattle + adventurerBonus
 *
 * スカイガーディアン撃破の発生：
 *   到達済みフロアが 100 の倍数を踏んだ戦闘の直後に発生
 *   撃破で +99F（固定） + 悪魔像所持数 × 100F
 *
 * アルゴリズム：
 *   冒険者像(b: 0〜MAX_B)・悪魔像(a: 0〜MAX_A) の組み合わせを全探索。
 *   各組み合わせで戦闘をシミュレートし、ちょうど target F に到達できるか判定。
 *   「ちょうど」= target F を通過せずに踏む瞬間が存在する。
 */

document.addEventListener("DOMContentLoaded", function () {

  /* ── 定数 ── */
  const MAX_A        = 1000;   // 天空像～悪魔～ 最大所持数
  const MAX_B        = 1000;   // 天空像～冒険者～ 最大所持数
  const START_FLOOR  = 1;      // 起点
  const SG_INTERVAL  = 100;    // スカイガーディアン出現間隔
  const SG_BONUS     = 99;     // スカイガーディアン固定ボーナス
  const DEVIL_BONUS  = 100;    // 悪魔像1個あたりのボーナス

  /* ── DOM 参照 ── */
  const inputTarget  = document.getElementById("targetFloor");
  const radioSide    = document.querySelectorAll('input[name="battleMode"]');
  const btnCalc      = document.getElementById("calcFloorBtn");
  const resultEl     = document.getElementById("floorResult");
  const titleEl      = document.getElementById("floorResultTitle");
  const bodyEl       = document.getElementById("floorResultBody");
  const noResultEl   = document.getElementById("floorNoResult");
  const tableWrapEl  = document.querySelector(".floor-tool__table-wrap");

  if (!btnCalc || !inputTarget) return;

  /* ── 現在選択中の戦闘モード取得 ── */
  function getBasePerBattle() {
    for (const r of radioSide) {
      if (r.checked) return parseInt(r.value, 10);
    }
    return 2; // デフォルト両側
  }

  /**
   * シミュレーション関数
   * @param {number} target - 目標階層
   * @param {number} a      - 悪魔像所持数
   * @param {number} b      - 冒険者像所持数
   * @param {number} base   - 1戦闘の基本進行F（1 or 2）
   * @returns {boolean}     - target にちょうど到達できるか
   */
  function canReach(target, a, b, base) {
    const need = target - START_FLOOR;
    if (need === 0) return true;

    const perBattle = base + b;
    const sgTotal   = SG_BONUS + a * DEVIL_BONUS;

    let floor   = START_FLOOR;
    const maxBattles = target * 2 + 1000;

    for (let battle = 0; battle < maxBattles; battle++) {
      const prevFloor = floor;

      floor += perBattle;
      if (floor === target) return true;
      if (floor > target)   return false;

      // 100層の倍数を跨いだかチェック（スカイガーディアン判定）
      const sgCount = Math.floor(floor / SG_INTERVAL) - Math.floor(prevFloor / SG_INTERVAL);

      if (sgCount > 0) {
        floor += sgTotal * sgCount;
        if (floor === target) return true;
        if (floor > target)   return false;
      }
    }
    return false;
  }

  /**
   * 全組み合わせ探索
   * @param {number} target - 目標階層
   * @param {number} base   - 1戦闘の基本進行F
   * @returns {Array<{a:number, b:number}>}
   */
  function findCombinations(target, base) {
    const results = [];
    for (let a = 0; a <= MAX_A; a++) {
      for (let b = 0; b <= MAX_B; b++) {
        if (canReach(target, a, b, base)) {
          results.push({ a, b });
        }
      }
    }
    return results;
  }

  /* ── 表示関数 ── */
  function showResult(target, combinations) {
    resultEl.hidden = false;
    titleEl.innerHTML = "<strong>" + target + "F</strong> にちょうど到達できる組み合わせ";
    bodyEl.innerHTML  = "";

    if (combinations.length === 0) {
      noResultEl.hidden         = false;
      tableWrapEl.style.display = "none";
    } else {
      noResultEl.hidden         = true;
      tableWrapEl.style.display = "";

      combinations.forEach(function (combo) {
        const tr  = document.createElement("tr");
        const tdA = document.createElement("td");
        const tdB = document.createElement("td");
        tdA.textContent = combo.a + " 個";
        tdB.textContent = combo.b + " 個";
        tr.appendChild(tdA);
        tr.appendChild(tdB);
        bodyEl.appendChild(tr);
      });
    }
  }

  function showError(msg) {
    resultEl.hidden           = false;
    titleEl.innerHTML         = msg;
    bodyEl.innerHTML          = "";
    noResultEl.hidden         = true;
    tableWrapEl.style.display = "none";
  }

  function showLoading() {
    resultEl.hidden           = false;
    titleEl.innerHTML         = "計算中…";
    bodyEl.innerHTML          = "";
    noResultEl.hidden         = true;
    tableWrapEl.style.display = "none";
  }

  /* ── メイン処理 ── */
  function onCalc() {
    const raw    = inputTarget.value.trim();
    const target = parseInt(raw, 10);

    if (!raw || isNaN(target) || target < START_FLOOR) {
      showError(START_FLOOR + "以上の整数を入力してください。");
      return;
    }

    const base = getBasePerBattle();
    showLoading();

    // 重い計算を非同期で実行してUIをブロックしない
    setTimeout(function () {
      const combinations = findCombinations(target, base);
      showResult(target, combinations);
    }, 0);
  }

  btnCalc.addEventListener("click", onCalc);
  inputTarget.addEventListener("keydown", function (e) {
    if (e.key === "Enter") onCalc();
  });
});
