(() => {
  const section = document.getElementById("pet-skill-section");
  const list = document.getElementById("pet-skill-list");
  if (!section || !list) return;

  const monsterId = String(section.dataset.monsterId || "").trim();
  if (!monsterId) {
    section.style.display = "none";
    return;
  }

  const LEVELS = [31, 71, 121, 181];

  const keyLabel = (k) => {
    // 表示名は必要になったらここで変換していける
    // 例: vit→VIT, capture_rate→捕獲率, drop_rate→ドロップ率
    const map = {
      vit: "VIT",
      spd: "SPD",
      atk: "ATK",
      int: "INT",
      def: "DEF",
      mdef: "MDEF",
      luk: "LUK",
      mov: "MOV",
      heal: "回復",
      capture_rate: "捕獲率",
      drop_rate: "ドロップ率",
      exp: "経験値",
      gold: "ゴールド",
      final_damage: "最終ダメ"
    };
    return map[k] || k;
  };

  const fmtAdd = (obj) =>
    Object.entries(obj).map(([k, v]) => `${keyLabel(k)}+${v}`).join(" / ");

  const fmtMul = (obj, suffix = "") =>
    Object.entries(obj)
      .map(([k, v]) => `${keyLabel(k)}×${(Number(v) * 100)}%${suffix}`)
      .join(" / ");

  const render = (skills) => {
    if (!Array.isArray(skills) || skills.length === 0) {
      section.style.display = "none";
      return;
    }

    list.innerHTML = "";

    skills.forEach((s, i) => {
      const lv = LEVELS[i] ?? "";
      const parts = [];

      if (s.add && typeof s.add === "object") parts.push(fmtAdd(s.add));
      if (s.mul && typeof s.mul === "object") parts.push(fmtMul(s.mul));
      if (s.final_mul && typeof s.final_mul === "object") parts.push(fmtMul(s.final_mul, "(最終)"));

      const text = parts.filter(Boolean).join(" / ") || "-";

      const row = document.createElement("div");
      row.className = "d-row";
      row.innerHTML = `<dt>Lv${lv}</dt><dd>${text}</dd>`;
      list.appendChild(row);
    });
  };

  fetch(`${document.baseURI.replace(/\/$/, "")}/db/pet_skills.json`, { cache: "no-store" })
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
    .then((db) => render(db?.[monsterId]))
    .catch(() => {
      // JSONが無い/該当IDが無い/読めない → セクション非表示
      section.style.display = "none";
    });
})();
