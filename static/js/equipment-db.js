document.addEventListener("DOMContentLoaded", async () => {
  const statList = ["vit", "spd", "atk", "int", "def", "mdef", "luk", "mov"];

  const weaponBody = document.getElementById("weaponBody");
  const armorBody = document.getElementById("armorBody");
  const accessoryBody = document.getElementById("accessoryBody");

  const tabs = document.querySelectorAll(".equip-tab");
  const tables = document.querySelectorAll(".equip-table");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tables.forEach((t) => t.classList.remove("active"));

      tab.classList.add("active");

      const target = tab.dataset.tab;
      document.getElementById("tab-" + target)?.classList.add("active");
    });
  });

  try {
    const base = window.location.origin + window.location.pathname.split("/equipment")[0];
    const url = base + "/db/equipment.json";

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const items = Array.isArray(data.items) ? data.items : [];

    items.forEach((item) => {
      const tr = document.createElement("tr");

      const nameTd = document.createElement("td");
      nameTd.textContent = item.name || "";
      tr.appendChild(nameTd);

      statList.forEach((stat) => {
        const td = document.createElement("td");

        const add = Number(item.base_add?.[stat] ?? 0);
        const rate = Number(item.base_rate?.[stat] ?? 0);
        const finalRate = Number(item.final_rate?.[stat] ?? 0);

        let value = "";
        if (add !== 0) value = String(add);
        if (rate !== 0) value = (value ? value + " / " : "") + "+" + rate + "%";
        if (finalRate !== 0) value = (value ? value + " / " : "") + "*" + finalRate + "%";

        td.textContent = value;
        tr.appendChild(td);
      });

      if (item.category === "weapon") {
        weaponBody?.appendChild(tr);
      } else if (item.category === "armor") {
        armorBody?.appendChild(tr);
      } else if (item.category === "accessory") {
        accessoryBody?.appendChild(tr);
      }
    });
  } catch (e) {
    console.error("装備DB読み込み失敗", e);
  }
});
