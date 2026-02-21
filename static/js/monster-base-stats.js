(() => {
  const search = document.getElementById("mbsSearch");
  const tbody = document.getElementById("mbsBody");
  const table = document.getElementById("mbsTable");
  if (!search || !tbody || !table) return;

  const rows = Array.from(tbody.querySelectorAll("tr"));
  const headers = Array.from(table.querySelectorAll("thead th.sort"));

  // 検索（名前/属性/攻撃タイプ/射程）
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

  // ソート
  let sortState = { key: "name", dir: 1 }; // 1=asc, -1=desc

  function getValue(row, key) {
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
