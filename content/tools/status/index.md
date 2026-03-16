+++
title = "主人公ステータス・シミュレーター"
home = true
weight = 30
description = "主人公の装備・ペット・ステータスを確認できるシミュレーター"
+++

<div class="status-sim">

<h1>主人公ステータス・シミュレーター</h1>

<h2>主人公 振り分けポイント</h2>

<div class="row">
  <label class="pill">合計 <input id="basePointTotal" type="number" min="0" value="0"></label>
  <div id="basePointInfo" class="note"></div>
</div>

<div class="grid">
  <label class="pill">vit <input id="base_vit" type="number" min="0" value="0"></label>
  <label class="pill">spd <input id="base_spd" type="number" min="0" value="0"></label>
  <label class="pill">atk <input id="base_atk" type="number" min="0" value="0"></label>
  <label class="pill">int <input id="base_int" type="number" min="0" value="0"></label>
  <label class="pill">def <input id="base_def" type="number" min="0" value="0"></label>
  <label class="pill">mdef <input id="base_mdef" type="number" min="0" value="0"></label>
  <label class="pill">luk <input id="base_luk" type="number" min="0" value="0"></label>
</div>

<hr>

<h2>結果</h2>

<table class="stats-table">
  <thead>
    <tr>
      <th>ステ</th>
      <th>基礎＋プロテイン</th>
      <th>装備</th>
      <th>合計</th>
    </tr>
  </thead>
  <tbody id="statsTbody"></tbody>
</table>

<div class="row buttons">
  <button id="recalcBtn" type="button">再計算</button>
  <button id="resetBtn" type="button">振り分けリセット</button>
  <button id="clearSaveBtn" type="button">保存クリア</button>
</div>

<div class="error" id="errBox"></div>

<hr>

<details class="fold" id="foldProtein">
  <summary>プロテイン</summary>

  <div class="row">
    <label class="pill">シェイカー <input id="shakerCount" type="number" min="0" value="0"></label>
  </div>

  <div class="grid">
    <label class="pill">vit <input id="protein_vit" type="number" min="0" value="0"></label>
    <label class="pill">spd <input id="protein_spd" type="number" min="0" value="0"></label>
    <label class="pill">atk <input id="protein_atk" type="number" min="0" value="0"></label>
    <label class="pill">int <input id="protein_int" type="number" min="0" value="0"></label>
    <label class="pill">def <input id="protein_def" type="number" min="0" value="0"></label>
    <label class="pill">mdef <input id="protein_mdef" type="number" min="0" value="0"></label>
    <label class="pill">luk <input id="protein_luk" type="number" min="0" value="0"></label>
  </div>
</details>

<details class="fold" id="foldEquip" open>
  <summary>装備</summary>

  <div class="equip-grid">

  <div class="equip-row">
      <div class="slot">武器</div>
      <div class="main"><select id="select_weapon"></select></div>
      <div class="lvtag">+</div>
      <div class="lvbox"><input id="level_weapon" type="number" min="0" value="0"></div>
    </div>

  <div class="equip-row">
      <div class="slot">頭</div>
      <div class="main"><select id="select_head"></select></div>
      <div class="lvtag">+</div>
      <div class="lvbox"><input id="level_head" type="number" min="0" value="0"></div>
    </div>

  <div class="equip-row">
      <div class="slot">体</div>
      <div class="main"><select id="select_body"></select></div>
      <div class="lvtag">+</div>
      <div class="lvbox"><input id="level_body" type="number" min="0" value="0"></div>
    </div>

  <div class="equip-row">
      <div class="slot">手</div>
      <div class="main"><select id="select_hands"></select></div>
      <div class="lvtag">+</div>
      <div class="lvbox"><input id="level_hands" type="number" min="0" value="0"></div>
    </div>

  <div class="equip-row">
      <div class="slot">脚</div>
      <div class="main"><select id="select_feet"></select></div>
      <div class="lvtag">+</div>
      <div class="lvbox"><input id="level_feet" type="number" min="0" value="0"></div>
    </div>

  <div class="equip-row">
      <div class="slot">盾</div>
      <div class="main"><select id="select_shield"></select></div>
      <div class="lvtag">+</div>
      <div class="lvbox"><input id="level_shield" type="number" min="0" value="0"></div>
    </div>

  <div class="equip-row">
      <div class="slot">アクセ1</div>
      <div class="main"><select id="select_accessory1"></select></div>
      <div class="lvtag">Lv</div>
      <div class="lvbox"><input id="level_accessory1" type="number" min="1" value="1"></div>
    </div>

  <div class="equip-row">
      <div class="slot">アクセ2</div>
      <div class="main"><select id="select_accessory2"></select></div>
      <div class="lvtag">Lv</div>
      <div class="lvbox"><input id="level_accessory2" type="number" min="1" value="1"></div>
    </div>

  <div class="equip-row">
      <div class="slot">アクセ3</div>
      <div class="main"><select id="select_accessory3"></select></div>
      <div class="lvtag">Lv</div>
      <div class="lvbox"><input id="level_accessory3" type="number" min="1" value="1"></div>
    </div>

  <div class="equip-row">
      <div class="slot">アクセ4</div>
      <div class="main"><select id="select_accessory4"></select></div>
      <div class="lvtag">Lv</div>
      <div class="lvbox"><input id="level_accessory4" type="number" min="1" value="1"></div>
    </div>

  </div>
</details>

<details class="fold" id="foldPet" open>
  <summary>ペットスキル</summary>

  <div class="equip-grid">

  <div class="equip-row pet-row">
      <div class="slot">ペット1</div>
      <div class="main"><select id="select_pet1"></select></div>
      <div class="lvtag">段階</div>
      <div class="lvbox">
        <select id="stage_pet1">
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
    </div>

  <div class="equip-row pet-row">
      <div class="slot">ペット2</div>
      <div class="main"><select id="select_pet2"></select></div>
      <div class="lvtag">段階</div>
      <div class="lvbox">
        <select id="stage_pet2">
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
    </div>

  <div class="equip-row pet-row">
      <div class="slot">ペット3</div>
      <div class="main"><select id="select_pet3"></select></div>
      <div class="lvtag">段階</div>
      <div class="lvbox">
        <select id="stage_pet3">
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
    </div>

  </div>
</details>

</div>

<link rel="stylesheet" href="../../css/status-sim.css">
<script src="../../js/utils/format.js"></script>

<script>
document.addEventListener("DOMContentLoaded", async () => {
  const base = window.location.origin + window.location.pathname.split("/tools/status/")[0];
  const EQUIP_URL = base + "/db/equipment.json";
  const PET_SKILLS_URL = base + "/db/pet-skills.json";
  const PET_NAMES_URL = base + "/pet-names/index.json";

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

  const petSelects = [
    document.getElementById("select_pet1"),
    document.getElementById("select_pet2"),
    document.getElementById("select_pet3")
  ];

  function fillSelect(select, items) {
    if (!select) return;
    select.innerHTML = "";
    select.appendChild(new Option("（なし）", ""));
    items.forEach((item) => {
      select.appendChild(new Option(item.name, String(item.id)));
    });
  }

  try {
    const equipRes = await fetch(EQUIP_URL, { cache: "no-store" });
    if (!equipRes.ok) throw new Error(`HTTP ${equipRes.status}`);
    const equipData = await equipRes.json();
    const items = Array.isArray(equipData.items) ? equipData.items : [];

    fillSelect(slots.weapon, items.filter((i) => i.category === "weapon"));
    fillSelect(slots.head, items.filter((i) => i.category === "armor" && i.slot === "head"));
    fillSelect(slots.body, items.filter((i) => i.category === "armor" && i.slot === "body"));
    fillSelect(slots.hands, items.filter((i) => i.category === "armor" && i.slot === "hands"));
    fillSelect(slots.feet, items.filter((i) => i.category === "armor" && i.slot === "feet"));
    fillSelect(slots.shield, items.filter((i) => i.category === "armor" && i.slot === "shield"));

    const accessoryItems = items.filter((i) => i.category === "accessory");
    slots.accessory.forEach((sel) => fillSelect(sel, accessoryItems));
  } catch (e) {
    console.error("equipment.json 読み込み失敗", e);
  }

  try {
    const namesRes = await fetch(PET_NAMES_URL, { cache: "no-store" });
    if (!namesRes.ok) throw new Error(`HTTP ${namesRes.status}`);
    const namesData = await namesRes.json();
    const nameItems = Array.isArray(namesData.items) ? namesData.items : [];

    const skillsRes = await fetch(PET_SKILLS_URL, { cache: "no-store" });
    if (!skillsRes.ok) throw new Error(`HTTP ${skillsRes.status}`);
    const skillsData = await skillsRes.json();

    const validIds = new Set(Object.keys(skillsData || {}));

    const petItems = nameItems
      .filter((item) => validIds.has(String(item.id)))
      .map((item) => ({
        id: String(item.id),
        name: item.title
      }))
      .sort((a, b) => String(a.id).localeCompare(String(b.id), "ja"));

    petSelects.forEach((select) => fillSelect(select, petItems));
  } catch (e) {
    console.error("pet 読み込み失敗", e);
  }
});
</script>
