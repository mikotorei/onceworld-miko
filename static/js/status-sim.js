document.addEventListener("DOMContentLoaded", async () => {
  function getAssetBaseUrl() {
    const s = document.currentScript;
    if (!s || !s.src) return window.location.origin;
    const u = new URL(s.src, window.location.href);
    const basePath = u.pathname.replace(/\/js\/status-sim\.js$/, "");
    return `${u.origin}${basePath}`;
  }

  const ASSET_BASE = getAssetBaseUrl();
  const EQUIP_URL = ASSET_BASE + "/db/equipment.json";
  const PET_URL = ASSET_BASE + "/db/pet_skills.json";

  const slots = {
    weapon: document.getElementById("select_weapon"),
    head: document.getElementById("select_head"),
    body: document.getElementById("select_body"),
    hands: document.getElementById("select_hands"),
    feet: document.getElementById("select_feet"),
    shield: document.getElementById("select_shield"),
    accessory: [
      document.getElementById("select_accessory1"),
      document.getElementById("select_accessory2"),
      document.getElementById("select_accessory3"),
      document.getElementById("select_accessory4")
    ]
  };

  const pets = [
    document.getElementById("select_pet1"),
    document.getElementById("select_pet2"),
    document.getElementById("select_pet3")
  ];

  function fillSelect(select, items) {
    if (!select) return;
    select.innerHTML = "";
    select.appendChild(new Option("（なし）", ""));
    items.forEach((item) => {
      select.appendChild(new Option(item.name, item.id));
    });
  }

  try {
    const equipRes = await fetch(EQUIP_URL, { cache: "no-store" });
    if (!equipRes.ok) throw new Error(`equipment.json HTTP ${equipRes.status}`);

    const equipData = await equipRes.json();
    const equipmentDB = Array.isArray(equipData.items) ? equipData.items : [];

    const weaponItems = equipmentDB.filter((i) => i.category === "weapon");
    const armorItems = equipmentDB.filter((i) => i.category === "armor");
    const accessoryItems = equipmentDB.filter((i) => i.category === "accessory");

    fillSelect(slots.weapon, weaponItems);
    fillSelect(slots.head, armorItems.filter((i) => i.slot === "head"));
    fillSelect(slots.body, armorItems.filter((i) => i.slot === "body"));
    fillSelect(slots.hands, armorItems.filter((i) => i.slot === "hands"));
    fillSelect(slots.feet, armorItems.filter((i) => i.slot === "feet"));
    fillSelect(slots.shield, armorItems.filter((i) => i.slot === "shield"));
    slots.accessory.forEach((sel) => fillSelect(sel, accessoryItems));
  } catch (e) {
    console.error("equipment.json 読み込み失敗", e);
  }

  try {
    const petRes = await fetch(PET_URL, { cache: "no-store" });
    if (!petRes.ok) throw new Error(`pet_skills.json HTTP ${petRes.status}`);

    const petData = await petRes.json();
    const petDB = Array.isArray(petData.pets) ? petData.pets : [];

    pets.forEach((select) => {
      if (!select) return;
      select.innerHTML = "";
      select.appendChild(new Option("（なし）", ""));
      petDB.forEach((p) => {
        select.appendChild(new Option(p.name, p.id));
      });
    });
  } catch (e) {
    console.error("pet_skills.json 読み込み失敗", e);
  }
});
