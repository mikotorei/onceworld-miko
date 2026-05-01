// ============================================================
// tenku.js  天空回廊計算表
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

  // ============================================================
  // 設定
  // ============================================================

  // 天空マップに出現しないモンスターのIDを列挙する
  const EXCLUDED_IDS = [
    // 例: "001", "042"
    "201",
    "202",
    "203",
    "204",
    "205",
    "206",
    "207",
    "241",
    "242",
    "243",
    "244",
    "245",
    "246",
    "247",
    "248",
    "249",
  ];

  const TOP_N = 15;

  // ============================================================
  // 列定義
  // ============================================================

  const COLUMNS = [
    { key: "vit",            label: "VIT",         tooltip: "" },
    { key: "spd",            label: "SPD",         tooltip: "" },
    { key: "atk",            label: "ATK",         tooltip: "" },
    { key: "int",            label: "INT",         tooltip: "" },
    { key: "def",            label: "DEF",         tooltip: "" },
    { key: "mdef",           label: "MDEF",        tooltip: "" },
    { key: "luk",            label: "LUK",         tooltip: "" },
    { key: "mov",            label: "MOV",         tooltip: "" },
    { key: "req_def",        label: "無効DEF",     tooltip: "物理攻撃を無効化するために必要な自分のDEF" },
    { key: "req_mdef",       label: "無効MDEF",    tooltip: "魔法攻撃を無効化するために必要な自分のMDEF" },
    { key: "evade_luk",      label: "回避LUK",     tooltip: "攻撃を回避するために必要な自分のLUK" },
    { key: "hit_min_luk",    label: "最低命中LUK", tooltip: "最低限命中するために必要な自分のLUK" },
    { key: "hit_stable_luk", label: "安定命中LUK", tooltip: "安定して命中するために必要な自分のLUK" },
  ];

  // ============================================================
  // 計算ユーティリティ
  // ============================================================

  function scaleStat(base, lv) {
    return Math.floor(Number(base) * (1 + lv * 0.1));
  }

  function requiredDefForNullify(enemyAtk) {
    const a = Math.floor(Number(enemyAtk));
    if (!Number.isFinite(a) || a <= 0) return 0;
    return Math.floor((a * 7 - 10) / 4) + 1;
  }

  function requiredMdefForNullify(enemyInt) {
    const i = Math.floor(Number(enemyInt));
    if (!Number.isFinite(i) || i <= 0) return 0;
    return Math.floor((i * 7 - 10) / 4) + 1;
  }

  function fmt(n) {
    if (!Number.isFinite(n)) return "—";
    return n.toLocaleString();
  }

  // ============================================================
  // データ計算
  // ============================================================

  function calcMonsterRow(monster, lv, debuffDark) {
    const lukScaled = debuffDark
      ? Math.floor(scaleStat(monster.luk, lv) / 2)
      : scaleStat(monster.luk, lv);

    const atkScaled = scaleStat(monster.atk, lv);
    const intScaled = scaleStat(monster.int, lv);

    return {
      id:    monster.id,
      title: monster.title,

      vit:  scaleStat(monster.vit,  lv),
      spd:  scaleStat(monster.spd,  lv),
      atk:  atkScaled,
      int:  intScaled,
      def:  scaleStat(monster.def,  lv),
      mdef: scaleStat(monster.mdef, lv),
      luk:  lukScaled,
      mov:  scaleStat(monster.mov,  lv),

      req_def:        requiredDefForNullify(atkScaled),
      req_mdef:       requiredMdefForNullify(intScaled),
      evade_luk:      Math.floor(lukScaled * 3),
      hit_min_luk:    Math.floor(lukScaled / 2),
      hit_stable_luk: lukScaled,
    };
  }

  // ============================================================
  // フィルタ・ソート
  // ============================================================

  function getFilteredMonsters() {
    if (!window.MONSTERS || !Array.isArray(window.MONSTERS)) return [];
    return window.MONSTERS.filter(m => !EXCLUDED_IDS.includes(m.id));
  }

  function calcAndSort(monsters, lv, sortKey, debuffDark) {
    const rows = monsters.map(m => calcMonsterRow(m, lv, debuffDark));
    rows.sort((a, b) => b[sortKey] - a[sortKey]);
    return rows.slice(0, TOP_N);
  }

  // ============================================================
  // DOM参照
  // ============================================================

  const floorInput   = document.getElementById("tenku-floor");
  const lvDisplay    = document.getElementById("tenku-lv-display");
  const debuffDarkCb = document.getElementById("debuff-dark");
  const theadRow     = document.getElementById("tenku-thead-row");
  const tbody        = document.getElementById("tenku-tbody");
  const resultMeta   = document.getElementById("result-meta");
  const noResult     = document.getElementById("tenku-no-result");
  const colBtns      = document.querySelectorAll(".col-btn");

  // ============================================================
  // UI更新
  // ============================================================

  function getFloor() {
    const v = parseInt(floorInput.value, 10);
    return Number.isFinite(v) && v >= 1 ? v : 1;
  }

  function getLv(floor) {
    return 10000 + 100 * floor;
  }

  function getSortKey() {
    const checked = document.querySelector('input[name="sort-col"]:checked');
    return checked ? checked.value : "vit";
  }

  function getColDef(key) {
    return COLUMNS.find(c => c.key === key);
  }

  function rankClass(i) {
    if (i === 0) return "rank-1";
    if (i === 1) return "rank-2";
    if (i === 2) return "rank-3";
    return "rank-other";
  }

  function renderTable() {
    const floor      = getFloor();
    const lv         = getLv(floor);
    const sortKey    = getSortKey();
    const debuffDark = debuffDarkCb.checked;
    const monsters   = getFilteredMonsters();

    lvDisplay.textContent = lv.toLocaleString();

    if (monsters.length === 0) {
      noResult.style.display = "";
      tbody.innerHTML = "";
      theadRow.innerHTML = "";
      resultMeta.textContent = "";
      return;
    }

    const rows = calcAndSort(monsters, lv, sortKey, debuffDark);

    if (rows.length === 0) {
      noResult.style.display = "";
      tbody.innerHTML = "";
      theadRow.innerHTML = "";
      resultMeta.textContent = "";
      return;
    }

    noResult.style.display = "none";

    const colDef   = getColDef(sortKey);
    const colLabel = colDef ? colDef.label : sortKey;

    // result meta
    resultMeta.textContent =
      `${floor}階（Lv ${lv.toLocaleString()}）／ ${colLabel} 上位${rows.length}体`;

    // thead
    theadRow.innerHTML = "";

    const thName = document.createElement("th");
    thName.textContent = "モンスター";
    theadRow.appendChild(thName);

    const thVal = document.createElement("th");
    thVal.textContent = colLabel;
    thVal.className = "col-highlight";
    if (colDef && colDef.tooltip) thVal.title = colDef.tooltip;
    theadRow.appendChild(thVal);

    // tbody
    tbody.innerHTML = "";
    rows.forEach((row, i) => {
      const tr = document.createElement("tr");
      tr.className = rankClass(i);

      // モンスター名セル（ランクバッジ付き）
      const tdName = document.createElement("td");
      const nameWrap = document.createElement("span");
      nameWrap.className = "monster-name-cell";

      const badge = document.createElement("span");
      badge.className = "rank-badge";
      badge.textContent = i + 1;

      nameWrap.appendChild(badge);
      nameWrap.appendChild(document.createTextNode(row.title));
      tdName.appendChild(nameWrap);
      tr.appendChild(tdName);

      // 値セル
      const tdVal = document.createElement("td");
      tdVal.className = "col-highlight";
      tdVal.textContent = fmt(row[sortKey]);
      tr.appendChild(tdVal);

      tbody.appendChild(tr);
    });
  }

  // ============================================================
  // イベント登録
  // ============================================================

  floorInput.addEventListener("input", renderTable);
  debuffDarkCb.addEventListener("change", renderTable);

  colBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      colBtns.forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      renderTable();
    });
  });

  // ============================================================
  // 初期描画
  // ============================================================

  renderTable();

});
