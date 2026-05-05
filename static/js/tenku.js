// ============================================================
// tenku.js  天空回廊計算表
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

  // ============================================================
  // 設定
  // ============================================================

  const EXCLUDED_IDS = [
    // 例: "001", "042"
  ];

  const TOP_N = 15;

  const ATTACK_TYPE_FILTER = {
    req_def:  "物理",
    req_mdef: "魔法",
  };

  // ステータス列定義
  const STATUS_COLUMNS = [
    { key: "vit",  label: "VIT"  },
    { key: "spd",  label: "SPD"  },
    { key: "atk",  label: "ATK"  },
    { key: "int",  label: "INT"  },
    { key: "def",  label: "DEF"  },
    { key: "mdef", label: "MDEF" },
    { key: "luk",  label: "LUK"  },
  ];

  // 単一列表示の列定義
  const SINGLE_COLUMNS = [
    { key: "req_def",        label: "無効DEF",     tooltip: "物理攻撃を無効化するために必要な自分のDEF（物理型のみ）" },
    { key: "req_mdef",       label: "無効MDEF",    tooltip: "魔法攻撃を無効化するために必要な自分のMDEF（魔法型のみ）" },
    { key: "evade_luk",      label: "回避LUK",     tooltip: "攻撃を回避するために必要な自分のLUK" },
    { key: "hit_min_luk",    label: "最低命中LUK", tooltip: "最低限命中するために必要な自分のLUK" },
    { key: "hit_stable_luk", label: "安定命中LUK", tooltip: "安定して命中するために必要な自分のLUK" },
  ];

  // ============================================================
  // レベル計算
  // ============================================================

  function getLv(floor) {
    const n = Math.floor(floor);
    if (n % 100 === 0) return 100 * n + 9900;
    if (n >= 10000)    return 100 * n;
    return 100 * n + 10000;
  }

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

  function getFilteredMonsters(sortKey) {
    if (!window.MONSTERS || !Array.isArray(window.MONSTERS)) return [];

    let list = window.MONSTERS.filter(m => !EXCLUDED_IDS.includes(m.id));

    const attackTypeFilter = ATTACK_TYPE_FILTER[sortKey] || null;
    if (attackTypeFilter) {
      list = list.filter(m => m.attack_type === attackTypeFilter);
    }

    return list;
  }

  function calcAndSort(monsters, lv, sortKey, debuffDark) {
    const rows = monsters.map(m => calcMonsterRow(m, lv, debuffDark));
    rows.sort((a, b) => b[sortKey] - a[sortKey]);
    return rows.slice(0, TOP_N);
  }

  // ============================================================
  // DOM参照
  // ============================================================

  const floorInput     = document.getElementById("tenku-floor");
  const lvDisplay      = document.getElementById("tenku-lv-display");
  const debuffDarkCb   = document.getElementById("debuff-dark");
  const theadRow       = document.getElementById("tenku-thead-row");
  const tbody          = document.getElementById("tenku-tbody");
  const resultMeta     = document.getElementById("result-meta");
  const noResult       = document.getElementById("tenku-no-result");
  const groupBtns      = document.querySelectorAll("#group-select-group .col-btn");
  const sortBtns       = document.querySelectorAll("#status-sort-group .col-btn");
  const statusSortRow  = document.getElementById("status-sort-row");

  // ============================================================
  // UI状態取得
  // ============================================================

  function getFloor() {
    const v = parseInt(floorInput.value, 10);
    return Number.isFinite(v) && v >= 1 ? v : 1;
  }

  function getViewGroup() {
    const checked = document.querySelector('input[name="view-group"]:checked');
    return checked ? checked.value : "status";
  }

  function getStatusSortKey() {
    const checked = document.querySelector('input[name="sort-col"]:checked');
    return checked ? checked.value : "vit";
  }

  function rankClass(i) {
    if (i === 0) return "rank-1";
    if (i === 1) return "rank-2";
    if (i === 2) return "rank-3";
    return "rank-other";
  }

  // ============================================================
  // テーブル描画
  // ============================================================

  function renderTable() {
    const floor      = getFloor();
    const lv         = getLv(floor);
    const viewGroup  = getViewGroup();
    const debuffDark = debuffDarkCb.checked;

    lvDisplay.textContent = lv.toLocaleString();

    // ステータスソート行の表示切り替え
    statusSortRow.style.display = viewGroup === "status" ? "" : "none";

    // ソートキーを決定
    const sortKey = viewGroup === "status" ? getStatusSortKey() : viewGroup;

    const monsters = getFilteredMonsters(sortKey);

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

    // result meta
    const attackTypeFilter = ATTACK_TYPE_FILTER[sortKey] || null;
    const filterNote = attackTypeFilter ? `（${attackTypeFilter}型）` : "";
    const sortLabel = viewGroup === "status"
      ? STATUS_COLUMNS.find(c => c.key === sortKey)?.label || sortKey
      : SINGLE_COLUMNS.find(c => c.key === sortKey)?.label || sortKey;

    resultMeta.textContent =
      `${floor}階（Lv ${lv.toLocaleString()}）／ ${sortLabel} 上位${rows.length}体${filterNote}`;

    // ---- ステータス表示（全7列） ----
    if (viewGroup === "status") {
      // thead
      theadRow.innerHTML = "";
      const thName = document.createElement("th");
      thName.textContent = "モンスター";
      theadRow.appendChild(thName);
      STATUS_COLUMNS.forEach(col => {
        const th = document.createElement("th");
        th.textContent = col.label;
        if (col.key === sortKey) th.className = "col-highlight";
        theadRow.appendChild(th);
      });

      // tbody
      tbody.innerHTML = "";
      rows.forEach((row, i) => {
        const tr = document.createElement("tr");
        tr.className = rankClass(i);

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

        STATUS_COLUMNS.forEach(col => {
          const td = document.createElement("td");
          td.textContent = fmt(row[col.key]);
          if (col.key === sortKey) td.className = "col-highlight";
          tr.appendChild(td);
        });

        tbody.appendChild(tr);
      });

    // ---- 単一列表示 ----
    } else {
      const colDef = SINGLE_COLUMNS.find(c => c.key === sortKey);
      const colLabel = colDef ? colDef.label : sortKey;

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

        const tdVal = document.createElement("td");
        tdVal.className = "col-highlight";
        tdVal.textContent = fmt(row[sortKey]);
        tr.appendChild(tdVal);

        tbody.appendChild(tr);
      });
    }
  }

  // ============================================================
  // イベント登録
  // ============================================================

  floorInput.addEventListener("input", renderTable);
  debuffDarkCb.addEventListener("change", renderTable);

  groupBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      groupBtns.forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      renderTable();
    });
  });

  sortBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      sortBtns.forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      renderTable();
    });
  });

  // ============================================================
  // 初期描画
  // ============================================================

  renderTable();

});
