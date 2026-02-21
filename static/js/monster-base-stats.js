(() => {
  const search = document.getElementById("mbsSearch");
  const tbody = document.getElementById("mbsBody");
  const table = document.getElementById("mbsTable");
  const sortStatus = document.getElementById("mbsSortStatus");

  const wrap = document.getElementById("mbsWrap");
  const compactToggle = document.getElementById("mbsCompactToggle");

  const filterToggleBtn = document.getElementById("mbsFilterToggle");
  const filterToggleIcon = document.getElementById("mbsFilterToggleIcon");
  const filtersBox = document.getElementById("mbsFilters");
  const filterClearBtn = document.getElementById("mbsFilterClear");

  const filterElementBox = document.getElementById("mbsFilterElement");
  const filterAttackTypeBox = document.getElementById("mbsFilterAttackType");
  const filterAttackRangeBox = document.getElementById("mbsFilterAttackRange");

  if (!tbody || !table) return;

  const rows = Array.from(tbody.querySelectorAll("tr"));
  const headers = Array.from(table.querySelectorAll("thead th.sort"));

  // ヘッダーに矢印表示
  headers.forEach(h => {
    if (!h.querySelector(".arrow")) {
      const s = document.createElement("span");
      s.className = "arrow";
      s.textContent = "↕";
      h.appendChild(s);
    }
  });

  let sortState = { key: "id", dir: 1 }; // 1=asc, -1=desc

  const selected = {
    element: new Set(),
    attack_type: new Set(),
    attack_range: new Set(),
  };

  function getValue(row, key) {
    const v = row.dataset[key];
    if (v == null) return "";

    const n = Number(v);
    if (Number.isFinite(n) && String(v).trim() !== "") return n;

    return String(v);
  }

  function setSortUI() {
    if (sortStatus) sortStatus.textContent = `${sortState.key} ${sortState.dir === 1 ? "↑" : "↓"}`;

    headers.forEach(h => {
      h.classList.remove("is-active");
      const arrow = h.querySelector(".arrow");
      if (!arrow) return;

      if (h.dataset.key === sortState.key) {
        h.classList.add("is-active");
        arrow.textContent = sortState.dir === 1 ? "▲" : "▼";
      } else {
        arrow.textContent = "↕";
      }
    });
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

  // ヘッダークリック/Enterでソート
  function handleSortTrigger(key) {
    if (sortState.key === key) sortState.dir *= -1;
    else sortState = { key, dir: 1 };
    applySort();
  }

  headers.forEach(h => {
    h.addEventListener("click", () => handleSortTrigger(h.dataset.key));
    h.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleSortTrigger(h.dataset.key);
      }
    });
  });

  function matchesMulti(row, key, set) {
    if (!set || set.size === 0) return true;
    const v = (row.dataset[key] || "").toLowerCase();
    return set.has(v);
  }

  function applyFilter() {
    const q = (search?.value || "").trim().toLowerCase();

    rows.forEach(r => {
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

  if (search) search.addEventListener("input", applyFilter);

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

    uniqValues(key).forEach(v => {
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
      text.textContent = v;

      label.appendChild(input);
      label.appendChild(text);
      container.appendChild(label);
    });
  }

  renderChecks(filterElementBox, "element", selected.element);
  renderChecks(filterAttackTypeBox, "attack_type", selected.attack_type);
  renderChecks(filterAttackRangeBox, "attack_range", selected.attack_range);

  if (filterToggleBtn && filtersBox) {
    filterToggleBtn.addEventListener("click", () => {
      const closed = filtersBox.classList.toggle("is-closed");
      if (filterToggleIcon) filterToggleIcon.textContent = closed ? "開く" : "閉じる";
    });
  }

  if (filterClearBtn) {
    filterClearBtn.addEventListener("click", () => {
      selected.element.clear();
      selected.attack_type.clear();
      selected.attack_range.clear();

      document.querySelectorAll("#mbsFilters input[type='checkbox']").forEach(cb => {
        cb.checked = false;
      });

      applyFilter();
    });
  }

  if (compactToggle && wrap) {
    const sync = () => wrap.classList.toggle("mbs-compact-on", !!compactToggle.checked);
    compactToggle.addEventListener("change", sync);
    sync();
  }

  // 初期化
  setSortUI();
  applyFilter();  // 順位をまず付ける
  applySort();    // id順を確定
})();
