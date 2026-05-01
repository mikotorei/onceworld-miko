// ============================================================
// tenku.js  天空マップ モンスターステータスツール
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

  // ============================================================
  // 設定
  // ============================================================

  // 天空マップに出現しないモンスターのIDを列挙する
  const EXCLUDED_IDS = [
    // 例: "m001", "m002"
    "m201",
    "m202",
    "m203",
    "m204",
    "m205",
    "m206",
    "m207",
    "m241",
    "m242",
    "m243",
    "m244",
    "m245",
    "m246",
    "m247",
  ];

  const TOP_N = 15;

  // ============================================================
  // 列定義
  // ============================================================

  const COLUMNS = [
    { key: "vit",           label: "VIT",       statType: "enemy" },
    { key: "spd",           label: "SPD",       statType: "enemy" },
    { key: "atk",           label: "ATK",       statType: "enemy" },
    { key: "int",           label: "INT",       statType: "enemy" },
    { key: "def",           label: "DEF",       statType: "enemy" },
    { key: "mdef",          label: "MDEF",      statType: "enemy" },
    { key: "luk",           label: "LUK",       statType: "enemy" },
    { key: "mov",           label: "MOV",       statType: "enemy" },
    { key: "req_def",       label: "無効DEF",   statType: "req",
      tooltip: "この敵の物理攻撃を無効化するために必要な自分のDEF" },
    { key: "req_mdef",      label: "無効MDEF",  statType: "req",
      tooltip: "この敵の魔法攻撃を無効化するために必要な自分のMDEF" },
    { key: "evade_luk",     label: "回避LUK",   statType: "req",
      tooltip: "この敵の攻撃を回避するために必要な自分のLUK" },
    { key: "hit_min_luk",   label: "最低命中LUK", statType: "req",
      tooltip: "この敵に最低限命中するために必要な自分のLUK" },
    { key: "hit_stable_luk",label: "安定命中LUK", statType: "req",
      tooltip: "この敵に安定して命中するために必要な自分のLUK" },
  ];

  // ============================================================
  // ユーティリティ
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

  function evadeLuk(enemyLuk) {
    return Math.floor(Number(enemyLuk) * 3);
  }

  function hitMinLuk(enemyLuk) {
    return Math.floor(Number(enemyLuk) / 2);
  }

  function hitStableLuk(enemyLuk) {
    return Math.floor(Number(enemyLuk));
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

    const atkScaled  = scaleStat(monster.atk, lv);
    const intScaled  = scaleStat(monster.int, lv);

    return {
      id:    monster.id,
      title: monster.title,

      // 敵ステータス
      vit:  scaleStat(monster.vit,  lv),
      spd:  scaleStat(monster.spd,  lv),
      atk:  atkScaled,
      int:  intScaled,
      def:  scaleStat(monster.def,  lv),
      mdef: scaleStat(monster.mdef, lv),
      luk:  lukScaled,
      mov:  scaleStat(monster.mov,  lv),

      // 要求ステータス
      req_def:        requiredDefForNullify(atkScaled),
      req_mdef:       requiredMdefForNullify(intScaled),
      evade_luk:      evadeLuk(lukScaled),
      hit_min_luk:    hitMinLuk(lukScaled),
      hit_stable_luk: hitStableLuk(lukScaled),
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
  // UI 更新
  // ============================================================

  const floorInput    = document.getElementById("tenku-floor");
  const lvDisplay     = document.getElementById("tenku-lv-display");
  const debuffDarkCb  = document.getElementById("debuff-dark");
  const theadRow      = document.getElementById("tenku-thead-row");
  const tbody         = document.getElementById("tenku-tbody");
  const resultMeta    = document.getElementById("result-meta");
  const noResult      = document.getElementById("tenku-no-result");
  const colBtns       = document.querySelectorAll(".col-btn");

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

    // ヘッダ
    const sortColDef = getColDef(sortKey);
    const colLabel   = sortColDef ? sortColDef.label : sortKey;
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
    if (sortColDef && sortColDef.tooltip) thVal.title = sortColDef.tooltip;
    theadRow.appendChild(thVal);

    // tbody
    tbody.innerHTML = "";
    rows.forEach((row, i) => {
      const tr = document.createElement("tr");
      if (i === 0) tr.className = "rank-1";
      else if (i < 3) tr.className = "rank-top3";

      const tdName = document.createElement("td");
      tdName.className = "monster-name";
      tdName.textContent = row.title;
      tr.appendChild(tdName);

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

  // ラジオボタン切り替え時にアクティブクラスを更新
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
