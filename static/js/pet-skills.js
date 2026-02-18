(() => {
  const LEVELS = [31, 71, 121, 181];

  const STAT_LABEL = {
    vit: "VIT",
    spd: "SPD",
    atk: "ATK",
    int: "INT",
    def: "DEF",
    mdef: "MDEF",
    luk: "LUK",
    mov: "MOV",
    exp: "EXP",
    heal: "HP回復",
    capture: "基礎捕獲×",
    drop: "基礎ドロップ×",
  };

  const fmtNum = (n) => {
    if (typeof n !== "number") return String(n ?? "");
    return Number.isInteger(n) ? n.toLocaleString("ja-JP") : String(n);
  };

  // mul/final_mul は「×」表示（例：0.35 → ×1.35）
  const fmtMul = (ratio) => {
    const r = Number(ratio);
    if (!Number.isFinite(r)) return "";
    const x = 1 + r;
    // 端数が出るのは想定内。不要なら round 桁数を変えてOK
    return `×${x.toFixed(2).replace(/\.?0+$/, "")}`;
  };

  const parseOne = (entry) => {
    if (!entry || typeof entry !== "object") return null;

    if (entry.add) {
      const stat = Object.keys(entry.add)[0];
      const val = entry.add[stat];
      const name = STAT_LABEL[stat] ?? stat;
      return `${name} +${fmtNum(val)}`;
    }

    if (entry.mul) {
      const stat = Object.keys(entry.mul)[0];
      const val = entry.mul[stat];
      const name = STAT_LABEL[stat] ?? stat;

      // capture/drop/exp など “倍率系” は × 表示に寄せる
      if (stat === "capture" || stat === "drop" || stat === "exp") {
        return `${name} ${fmtMul(val)}`;
      }

      // それ以外は +〇% 表示
      return `${name} +${fmtNum(val * 100)}%`;
    }

    if (entry.final_mul) {
      const stat = Object.keys(entry.final_mul)[0];
      const val = entry.final_mul[stat];
      const name = STAT_LABEL[stat] ?? stat;

      if (stat === "capture" || stat === "drop" || stat === "exp") {
        return `${name} 最終${fmtMul(val)}`;
      }

      return `${name} 最終+${fmtNum(val * 100)}%`;
    }

    return null;
  };

  const render = (skills) => {
    const list = document.getElementById("pet-skill-list");
    if (!list) return;

    list.innerHTML = "";

    for (let i = 0; i < LEVELS.length; i++) {
      const lv = LEVELS[i];
      const label = skills && skills[i] ? parseOne(skills[i]) : null;

      const row = document.createElement("div");
      row.className = "d-row";

      const dt = document.createElement("dt");
      dt.textContent = `Lv${lv}`;

      const dd = document.createElement("dd");
      dd.textContent = label || "—";

      row.appendChild(dt);
      row.appendChild(dd);
      list.appendChild(row);
    }
  };

  const init = async () => {
    const section = document.getElementById("pet-skill-section");
    if (!section) return;

    const monsterId = section.dataset.monsterId;
    const url = section.dataset.jsonUrl;
    if (!monsterId || !url) return;

    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();

      const skills = json[monsterId];
      if (!skills) {
        render(null);
        return;
      }
      render(skills);
    } catch (e) {
      render(null);
    }
  };

  document.addEventListener("DOMContentLoaded", init);
})();
