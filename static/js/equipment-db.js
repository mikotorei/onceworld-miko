document.addEventListener("DOMContentLoaded", async () => {
  const statList = ["vit", "spd", "atk", "int", "def", "mdef", "luk", "mov"];

  const weaponBody = document.getElementById("weaponBody");
  const armorBody = document.getElementById("armorBody");
  const accessoryBody = document.getElementById("accessoryBody");

  const tabs = document.querySelectorAll(".equip-tab");
  const tables = document.querySelectorAll(".equip-table");

  const slotLabelMap = {
    head: "頭",
    body: "体",
    hands: "手",
    feet: "脚",
    shield: "盾"
  };

  const seriesLabelMap = {
    cloth: "布",
    leather: "皮",
    metal: "メタル",
    platinum: "白金",
    mage: "魔道士",
    inferno: "獄炎",
    dragon: "ドラゴン",
    tyrant: "暴君",
  };

  const statLabelMap = {
    vit: "VIT",
    spd: "SPD",
    atk: "ATK",
    int: "INT",
    def: "DEF",
    mdef: "MDEF",
    luk: "LUK",
    mov: "MOV",
    exp: "EXP",
    drop: "ドロップ",
    capture: "捕獲",
    recovery: "回復"
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tables.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById("tab-" + tab.dataset.tab)?.classList.add("active");
    });
  });

  function getBaseUrl() {
    return window.location.origin + window.location.pathname.split("/equipment")[0];
  }

  function appendWeaponRow(item) {
    const tr = document.createElement("tr");

    const nameTd = document.createElement("td");
    nameTd.textContent = item.name || "";
    tr.appendChild(nameTd);

    statList.forEach((stat) => {
      const td = document.createElement("td");
      const add = Number(item.base_add?.[stat] ?? 0);
      td.textContent = add !== 0 ? String(add) : "";
      tr.appendChild(td);
    });

    weaponBody?.appendChild(tr);
  }

  function appendArmorRow(item) {
    const tr = document.createElement("tr");

    const nameTd = document.createElement("td");
    nameTd.textContent = item.name || "";
    tr.appendChild(nameTd);

    const slotTd = document.createElement("td");
    slotTd.textContent = slotLabelMap[item.slot] || item.slot || "";
    tr.appendChild(slotTd);

    const seriesTd = document.createElement("td");
    seriesTd.textContent = seriesLabelMap[item.series] || "";
    tr.appendChild(seriesTd);

    statList.forEach((stat) => {
      const td = document.createElement("td");
      const add = Number(item.base_add?.[stat] ?? 0);
      td.textContent = add !== 0 ? String(add) : "";
      tr.appendChild(td);
    });

    armorBody?.appendChild(tr);
  }

  function buildAccessoryLines(item) {
    const effects = Array.isArray(item.display_effects) ? item.display_effects : [];
    const effectNames = [];
    const effectValues = [];

    if (effects.length > 0) {
      effects.forEach((ef) => {
        const target = statLabelMap[String(ef.target || "").toLowerCase()] || String(ef.target || "");

        if (ef.type === "flat") {
          effectNames.push(target);
          effectValues.push(`${ef.initial} → ${ef.max}`);
        } else if (ef.type === "rate") {
          effectNames.push(`*${target}`);
          effectValues.push(`${ef.initial} → ${ef.max}`);
        } else if (ef.type === "special") {
          effectNames.push(target);
          effectValues.push(`${ef.initial} → ${ef.max}`);
        } else if (ef.type === "special_rate") {
          effectNames.push(`*${target}`);
          effectValues.push(`${ef.initial} → ${ef.max}`);
        }
      });

      return {
        names: effectNames,
        values: effectValues
      };
    }

    statList.forEach((stat) => {
      const add = Number(item.base_add?.[stat] ?? 0);
      const rate = Number(item.base_rate?.[stat] ?? 0);

      if (add !== 0) {
        effectNames.push(statLabelMap[stat]);
        effectValues.push(String(add));
      }
      if (rate !== 0) {
        effectNames.push(`*${statLabelMap[stat]}`);
        effectValues.push(`${rate}%`);
      }
    });

    return {
      names: effectNames,
      values: effectValues
    };
  }

  function appendAccessoryRow(item) {
    const tr = document.createElement("tr");

    const nameTd = document.createElement("td");
    nameTd.className = "acc-name";
    nameTd.textContent = item.name || "";

    const effectTd = document.createElement("td");
    effectTd.className = "acc-effect";

    const valueTd = document.createElement("td");
    valueTd.className = "acc-value";

    const levelTd = document.createElement("td");
    levelTd.className = "acc-level";
    levelTd.textContent = item.max_level ? `Lv.${item.max_level}` : "";

    const lines = buildAccessoryLines(item);

    effectTd.innerHTML = lines.names.map(v => `<div>${v}</div>`).join("");
    valueTd.innerHTML = lines.values.map(v => `<div>${v}</div>`).join("");

    tr.appendChild(nameTd);
    tr.appendChild(effectTd);
    tr.appendChild(valueTd);
    tr.appendChild(levelTd);

    accessoryBody?.appendChild(tr);
  }

  try {
    const url = getBaseUrl() + "/db/equipment.json";
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const items = Array.isArray(data.items) ? data.items : [];

    items.forEach((item) => {
      if (item.category === "weapon") {
        appendWeaponRow(item);
      } else if (item.category === "armor") {
        appendArmorRow(item);
      } else if (item.category === "accessory") {
        appendAccessoryRow(item);
      }
    });
  } catch (e) {
    console.error("装備DB読み込み失敗", e);
  }
});
