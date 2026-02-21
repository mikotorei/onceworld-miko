(() => {
  const search = document.getElementById("mbsSearch");
  const tbody = document.getElementById("mbsBody");
  const wrap = document.getElementById("mbsWrap");
  const compactToggle = document.getElementById("mbsCompactToggle");

  const sortKeyEl = document.getElementById("mbsSortKey");
  const sortDirBtn = document.getElementById("mbsSortDir");
  const sortStatus = document.getElementById("mbsSortStatus");

  const filterToggleBtn = document.getElementById("mbsFilterToggle");
  const filterToggleIcon = document.getElementById("mbsFilterToggleIcon");
  const filtersBox = document.getElementById("mbsFilters");
  const filterClearBtn = document.getElementById("mbsFilterClear");

  const filterElementBox = document.getElementById("mbsFilterElement");
  const filterAttackTypeBox = document.getElementById("mbsFilterAttackType");
  const filterAttackRangeBox = document.getElementById("mbsFilterAttackRange");

  if (!search || !tbody) return;

  const rows = Array.from(tbody.querySelectorAll("tr"));

  // -------------------------
  // 状態
  // -------------------------
  let sortState = { key: "id", dir: 1 }; // 1=asc, -1=desc

  const selected = {
    element: new Set(),
    attack_type: new Set(),
    attack_range: new Set(),
  };

  // -------------------------
  // UIユーティリティ
  // -------------------------
  const keyLabel = (key) => key;

  function setSortUI() {
    if (sortDirBtn) sortDirBtn.textContent = sortState.dir === 1 ? "↑" : "↓";
    if (sortStatus) sortStatus.textContent = `${keyLabel(sortState.key)} ${sortState.dir === 1 ? "↑" : "↓"}`;
    if (sortKeyEl) sortKeyEl.value = sortState.key;
  }

  function updateRanks() {
    let rank = 0;
    rows.forEach(r => {
      const cell = r.querySelector(".mbs-rank");
      if (!cell) return;
      if (r.style.display === "none") {
        cell.textContent = "";
        return;
      }
      rank += 1;
      cell.textContent = rank;
    });
  }

  function getValue(row, key) {
    const v = row.dataset[key];
    if (v == null) return "";

    const n = Number(v);
    if (Number.isFinite(n) && String(v).trim() !== "") return n;

    return String(v);
  }

  // -------------------------
  // 並び替え
  // -------------------------
  function applySort() {
    rows.sort((a, b) => {
      const va = getValue(a, sortState.key);
      const vb = getValue(b, sortState.key);

      const na = typeof va === "number";
      const nb = typeof vb === "number";
      if (na && nb) return (va - vb) * sortState.dir;

      return String(va).localeCompare(String(vb), "ja") * sortState.dir;
    });

    const frag = document.createDocumentFragment();
    rows.forEach(r => frag.appendChild(r));
    tbody.appendChild(frag);

    setSortUI();
    updateRanks();
  }

  if (sortKeyEl) {
    sortKeyEl.addEventListener("change", () => {
      sortState.key = sortKeyEl.value;
      sortState.dir = 1;
      applySort();
    });
  }

  if (sortDirBtn) {
    sortDirBtn.addEventListener("click", () => {
      sortState.dir *= -1;
      applySort();
    });
  }

  // -------------------------
  // 検索 + 絞り込み（複数選択）
  // -------------------------
  function matchesMulti(row, key, set) {
    // 未選択なら全許可
    if (!set || set.size === 0) return true;

    const v = (row.dataset[key] || "").toLowerCase();
    return set.has(v);
  }

  function applyFilter() {
    const q = (search.value || "").trim().toLowerCase();

    rows.forEach(r => {
      // 検索対象（名前/属性/攻撃タイプ/射程）
      const hay =
        (r.dataset.name || "") + " " +
        (r.dataset.element || "") + " " +
        (r.dataset.attack_type || "") + " " +
        (r.dataset.attack_range || "");

      const okSearch = !q || hay.includes(q);

      const okElement = matchesMulti(r, "element", selected.element);
      const okType = matchesMulti(r, "attack_type", selected.attack_type);
      const okRange = matchesMulti(r, "attack_range", selected.attack_range);

      r.style.display = (okSearch && okElement && okType && okRange) ? "" : "none";
    });

    updateRanks();
  }

  search.addEventListener("input", applyFilter);

  // -------------------------
  // 絞り込みUI生成（チェックボックス）
  // -------------------------
  function uniqValues(key) {
    const s = new Set();
    rows.forEach(r => {
      const v = (r.dataset[key] || "").toLowerCase();
      if (v) s.add(v);
    });
    return Array.from(s).sort((a, b) => a.localeCompare(b, "ja"));
  }

  function renderChecks(container, key, setRef) {
    if (!container) return;
    container.innerHTML = "";

    const values = uniqValues(key);

    values.forEach(v => {
      const id = `mbs-${key}-${v}`.replace(/[^a-z0-9\-_]/gi, "_");

      const label = document.createElement("label");
      label.className = "mbs-check";

      const input = document.createElement("input");
      input.type = "checkbox";
      input.value = v;
      input.id = id;

      input.addEventListener("change", () => {
        if (input.checked) setRef.add(v);
        else setRef.delete(v);
        applyFilter();
      });

      const text = document.createElement("span");
      text.textContent = v; // 小文字になっているが、元の表記に寄せたいならここを調整できる

      label.appendChild(input);
      label.appendChild(text);
      container.appendChild(label);
    });
  }

  renderChecks(filterElementBox, "element", selected.element);
  renderChecks(filterAttackTypeBox, "attack_type", selected.attack_type);
  renderChecks(filterAttackRangeBox, "attack_range", selected.attack_range);

  // 絞り込み開閉
  if (filterToggleBtn && filtersBox) {
    filterToggleBtn.addEventListener("click", () => {
      const closed = filtersBox.classList.toggle("is-closed");
      if (filterToggleIcon) filterToggleIcon.textContent = closed ? "開く" : "閉じる";
    });
  }

  // 絞り込み解除
  if (filterClearBtn) {
    filterClearBtn.addEventListener("click", () => {
      selected.element.clear();
      selected.attack_type.clear();
      selected.attack_range.clear();

      // チェックを外す
      document.querySelectorAll("#mbsFilters input[type='checkbox']").forEach(cb => {
        cb.checked = false;
      });

      applyFilter();
    });
  }

  // -------------------------
  // コンパクト切替
  // -------------------------
  if (compactToggle && wrap) {
    const sync = () => wrap.classList.toggle("mbs-compact-on", !!compactToggle.checked);
    compactToggle.addEventListener("change", sync);
    sync();
  }

  // 初期整形：ソート状態表示 + 初期順位
  setSortUI();
  updateRanks();

  // 初期はid昇順のままでもOKだが、状態UIと一致させるため一応適用
  applySort();
})();
