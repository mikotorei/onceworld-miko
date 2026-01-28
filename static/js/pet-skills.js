(() => {
  const section = document.getElementById("pet-skill-section");
  const list = document.getElementById("pet-skill-list");
  if (!section || !list) return;

  const monsterId = String(section.dataset.monsterId || "").trim();
  const jsonUrl = String(section.dataset.jsonUrl || "").trim();

  if (!monsterId || !jsonUrl) {
    section.style.display = "none";
    return;
  }

  const LEVELS = [31, 71, 121, 181];

  const keyLabel = (k) => {
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
      .map(([k, v]) => `${keyLabel(k)}×${Number(v) * 100}%${suffix}`)
      .join(" / ");

  const render = (skills) => {
    if (!Array.isArray(skills) || skills.length === 0) {
      // ここは「無いなら非表示」でもいいけど、今は原因追跡のため表示を残す
      list.innerHTML = `<div class="d-row"><dt>-</dt><dd>（ペットスキルデータなし）</dd></div>`;
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

  fetch(jsonUrl, { cache: "no-store" })
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
    .then((db) => render(db?.[monsterId]))
    .catch((e) => {
      console.error("pet_skills load failed:", jsonUrl, e);
      list.innerHTML = `<div class="d-row"><dt>ERR</dt><dd>pet_skills.json を読み込めません（URL: ${jsonUrl}）</dd></div>`;
    });
})();
