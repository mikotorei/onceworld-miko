(() => {
  const search = document.getElementById("mbsSearch");
  const tbody = document.getElementById("mbsBody");
  const table = document.getElementById("mbsTable");
  if (!search || !tbody || !table) return;

  const rows = Array.from(tbody.querySelectorAll("tr"));
  const headers = Array.from(table.querySelectorAll("thead th.sort"));

  // 初期は id 昇順（Hugo側で並んでいる前提）
  let sortState = { key: "id", dir: 1 };

  // 検索
  function applyFilter() {
    const q = (search.value || "").trim().toLowerCase();
    if (!q) {
      rows.forEach(r => (r.style.display = ""));
      return;
    }
    rows.forEach(r => {
      const hay =
        (r.dataset.name || "") + " " +
        (r.dataset.element || "") + " " +
        (r.dataset.attack_type || "") + " " +
        (r.dataset.attack_range || "");
      r.style.display = hay.includes(q) ? "" : "none";
    });
  }
  search.addEventListener("input", applyFilter);

  function getValue(row, key) {
    // 名前列は id でソートする
    if (key === "name") key = "id";

    const v = row.dataset[key];
    if (v == null) return "";

    const n = Number(v);
    if (Number.isFinite(n) && String(v).trim() !== "") return n;

    return String(v);
  }

  function sortBy(key) {
    if (sortState.key === key) sortState.dir *= -1;
    else sortState = { key, dir: 1 };

    rows.sort((a, b) => {
      const va = getValue(a, key);
      const vb = getValue(b, key);

      const na = typeof va === "number";
      const nb = typeof vb === "number";

      if (na && nb) return (va - vb) * sortState.dir;
      return String(va).localeCompare(String(vb), "ja") * sortState.dir;
    });

    const frag = document.createDocumentFragment();
    rows.forEach(r => frag.appendChild(r));
    tbody.appendChild(frag);
  }

  headers.forEach(h => {
    h.addEventListener("click", () => sortBy(h.dataset.key));
  });
})();
