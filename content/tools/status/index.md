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
  const STATS = ["vit", "spd", "atk", "int", "def", "mdef", "luk", "mov"];
  const BASE_STATS = ["vit", "spd", "atk", "int", "def", "mdef", "luk"];
  const ACCESSORY_KEYS = ["accessory1", "accessory2", "accessory3", "accessory4"];
  const PET_KEYS = ["pet1", "pet2", "pet3"];
  const STORAGE_KEY = "status_sim_inline_v2";

  const base = window.location.origin + window.location.pathname.split("/tools/status/")[0];
  const EQUIP_URL = base + "/db/equipment.json";
  const PET_SKILLS_URL = base + "/db/pet-skills.json";
  const PET_NAMES_URL = base + "/pet-names/index.json";

  const equipmentMap = new Map();
  const petSkillMap = new Map();

  function $(id) {
    return document.getElementById(id);
  }

  function n(v, fb = 0) {
    const x = Number(v);
    return Number.isFinite(x) ? x : fb;
  }

  function clamp0(v) {
    return Math.max(0, n(v, 0));
  }

  function clamp1(v) {
    return Math.max(1, n(v, 1));
  }

  function clampStage(v) {
    return Math.max(0, Math.min(4, n(v, 0)));
  }

  function floorSafe(x) {
    return Math.floor((Number(x) || 0) + 1e-6);
  }

  function roundSafe(x) {
    return Math.round((Number(x) || 0) + 1e-6);
  }

  function fmtSafe(x) {
    try {
      if (typeof window.fmt === "function") return window.fmt(x);
    } catch {}
    return String(Number(x) || 0);
  }

  function zeroStats() {
    return {
      vit: 0,
      spd: 0,
      atk: 0,
      int: 0,
      def: 0,
      mdef: 0,
      luk: 0,
      mov: 0
    };
  }

  function addStats(a, b) {
    const out = zeroStats();
    STATS.forEach((k) => {
      out[k] = (a?.[k] || 0) + (b?.[k] || 0);
    });
    return out;
  }

  function mulStats(a, m) {
    const out = zeroStats();
    STATS.forEach((k) => {
      out[k] = (a?.[k] || 0) * m;
    });
    return out;
  }

  function applyRate(stats, rateStats) {
    const out = zeroStats();
    STATS.forEach((k) => {
      out[k] = (stats?.[k] || 0) * (1 + (rateStats?.[k] || 0) / 100);
    });
    return out;
  }

  function roundStats(stats) {
    const out = zeroStats();
    STATS.forEach((k) => {
      out[k] = roundSafe(stats?.[k] || 0);
    });
    return out;
  }

  function normalizeStatKey(key) {
    const k = String(key || "").toLowerCase();
    if (k === "luck") return "luk";
    return k;
  }

  function buildTable() {
    const tbody = $("statsTbody");
    if (!tbody) return;
    tbody.innerHTML = "";

    STATS.forEach((stat) => {
      const tr = document.createElement("tr");
      tr.dataset.stat = stat;
      tr.innerHTML = `
        <td>${stat}</td>
        <td class="num" data-col="base"></td>
        <td class="num" data-col="equip"></td>
        <td class="num" data-col="total"></td>
      `;
      tbody.appendChild(tr);
    });
  }

  function renderTable(baseStats, equipStats, totalStats) {
    const tbody = $("statsTbody");
    if (!tbody) return;

    Array.from(tbody.querySelectorAll("tr")).forEach((tr) => {
      const stat = tr.dataset.stat;
      tr.querySelector('[data-col="base"]').textContent = fmtSafe(floorSafe(baseStats?.[stat] || 0));
      tr.querySelector('[data-col="equip"]').textContent = fmtSafe(floorSafe(equipStats?.[stat] || 0));
      tr.querySelector('[data-col="total"]').textContent = fmtSafe(totalStats?.[stat] || 0);
    });
  }

  function setErr(text) {
    const box = $("errBox");
    if (!box) return;
    const msg = String(text || "").trim();
    box.textContent = msg;
    box.classList.toggle("is-visible", msg.length > 0);
  }

  function fillSelect(select, items) {
    if (!select) return;
    select.innerHTML = "";
    select.appendChild(new Option("（なし）", ""));
    items.forEach((item) => {
      select.appendChild(new Option(item.name, String(item.id)));
    });
  }

  function scaleEquipBaseAdd(baseAdd, lv) {
    const mul = 1 + clamp0(lv) * 0.1;
    const out = zeroStats();
    STATS.forEach((k) => {
      if (k === "mov") out[k] = Number(baseAdd?.[k] || 0);
      else out[k] = floorSafe((baseAdd?.[k] || 0) * mul);
    });
    return out;
  }

  function scaleAccessoryBaseAdd(baseAdd, lv) {
    const internal = clamp1(lv) - 1;
    const mul = 1 + internal * 0.1;
    const out = zeroStats();
    STATS.forEach((k) => {
      out[k] = (baseAdd?.[k] || 0) * mul;
    });
    return out;
  }

  function scaleAccessoryBaseRate(baseRate, lv) {
    const internal = clamp1(lv) - 1;
    const mul = 1 + internal * 0.01;
    const out = zeroStats();
    STATS.forEach((k) => {
      out[k] = (baseRate?.[k] || 0) * mul;
    });
    return out;
  }

  function convertPetStageList(rawStages) {
    const stages = [{ add: {}, mul: {}, final_mul: {} }];

    (Array.isArray(rawStages) ? rawStages : []).forEach((stage) => {
      const add = {};
      const mul = {};
      const finalMul = {};

      Object.entries(stage?.add || {}).forEach(([k, v]) => {
        const key = normalizeStatKey(k);
        if (STATS.includes(key)) add[key] = Number(v) || 0;
      });

      Object.entries(stage?.mul || {}).forEach(([k, v]) => {
        const key = normalizeStatKey(k);
        if (STATS.includes(key)) mul[key] = Number(v) || 0;
      });

      Object.entries(stage?.final_mul || {}).forEach(([k, v]) => {
        const key = normalizeStatKey(k);
        if (STATS.includes(key)) finalMul[key] = Number(v) || 0;
      });

      stages.push({
        add,
        mul,
        final_mul: finalMul
      });
    });

    return stages;
  }

  function sumPetUpToStage(id, stageValue) {
    const outAdd = zeroStats();
    const outMul = zeroStats();
    const outFinal = zeroStats();

    const stage = clampStage(stageValue);
    const stages = petSkillMap.get(String(id)) || [];

    for (let i = 1; i <= stage; i += 1) {
      const s = stages[i] || {};
      STATS.forEach((k) => {
        outAdd[k] += Number(s.add?.[k] || 0);
        outMul[k] += Number(s.mul?.[k] || 0);
        outFinal[k] += Number(s.final_mul?.[k] || 0);
      });
    }

    return { add: outAdd, mul: outMul, final: outFinal };
  }

  function getArmorSetSeries(equipState) {
    const keys = ["head", "body", "hands", "feet", "shield"];
    let series = null;

    for (const key of keys) {
      const picked = equipState[key];
      if (!picked?.id) return "";

      const item = equipmentMap.get(String(picked.id));
      if (!item) return "";

      const s = String(item.series || "").trim();
      if (!s) return "";

      if (series === null) series = s;
      if (series !== s) return "";
    }

    return series || "";
  }

  function applyArmorSetBonus(sumStats, enabled) {
    if (!enabled) return { ...sumStats };

    const out = zeroStats();
    STATS.forEach((k) => {
      if (k === "mov") out[k] = sumStats?.[k] || 0;
      else out[k] = floorSafe((sumStats?.[k] || 0) * 1.1);
    });
    return out;
  }

  function collectState() {
    return {
      basePointTotal: clamp0($("basePointTotal")?.value),
      base: Object.fromEntries(BASE_STATS.map((k) => [k, clamp0($("base_" + k)?.value)])),
      shaker: clamp0($("shakerCount")?.value),
      protein: Object.fromEntries(BASE_STATS.map((k) => [k, clamp0($("protein_" + k)?.value)])),
      equip: {
        weapon: { id: $("select_weapon")?.value || "", lv: clamp0($("level_weapon")?.value) },
        head: { id: $("select_head")?.value || "", lv: clamp0($("level_head")?.value) },
        body: { id: $("select_body")?.value || "", lv: clamp0($("level_body")?.value) },
        hands: { id: $("select_hands")?.value || "", lv: clamp0($("level_hands")?.value) },
        feet: { id: $("select_feet")?.value || "", lv: clamp0($("level_feet")?.value) },
        shield: { id: $("select_shield")?.value || "", lv: clamp0($("level_shield")?.value) },
        accessory1: { id: $("select_accessory1")?.value || "", lv: clamp1($("level_accessory1")?.value) },
        accessory2: { id: $("select_accessory2")?.value || "", lv: clamp1($("level_accessory2")?.value) },
        accessory3: { id: $("select_accessory3")?.value || "", lv: clamp1($("level_accessory3")?.value) },
        accessory4: { id: $("select_accessory4")?.value || "", lv: clamp1($("level_accessory4")?.value) }
      },
      pets: {
        pet1: { id: $("select_pet1")?.value || "", stage: clampStage($("stage_pet1")?.value) },
        pet2: { id: $("select_pet2")?.value || "", stage: clampStage($("stage_pet2")?.value) },
        pet3: { id: $("select_pet3")?.value || "", stage: clampStage($("stage_pet3")?.value) }
      }
    };
  }

  function applyState(saved) {
    if (!saved) return;

    if ($("basePointTotal")) $("basePointTotal").value = String(clamp0(saved.basePointTotal || 0));

    BASE_STATS.forEach((k) => {
      if ($("base_" + k)) $("base_" + k).value = String(clamp0(saved.base?.[k] || 0));
      if ($("protein_" + k)) $("protein_" + k).value = String(clamp0(saved.protein?.[k] || 0));
    });

    if ($("shakerCount")) $("shakerCount").value = String(clamp0(saved.shaker || 0));

    Object.entries(saved.equip || {}).forEach(([k, v]) => {
      if ($("select_" + k)) $("select_" + k).value = String(v?.id || "");
      if ($("level_" + k)) $("level_" + k).value = String(k.startsWith("accessory") ? clamp1(v?.lv || 1) : clamp0(v?.lv || 0));
    });

    Object.entries(saved.pets || {}).forEach(([k, v]) => {
      if ($("select_" + k)) $("select_" + k).value = String(v?.id || "");
      if ($("stage_" + k)) $("stage_" + k).value = String(clampStage(v?.stage || 0));
    });
  }

  function saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function loadState() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function clearState() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function recalc() {
    const err = [];
    const state = collectState();

    const baseStats = zeroStats();
    BASE_STATS.forEach((k) => {
      baseStats[k] = state.base[k] || 0;
    });

    const proteinRaw = zeroStats();
    BASE_STATS.forEach((k) => {
      proteinRaw[k] = state.protein[k] || 0;
    });

    const proteinApplied = mulStats(proteinRaw, 1 + state.shaker * 0.01);
    const basePlusProtein = addStats(baseStats, proteinApplied);

    let weaponArmorSum = zeroStats();
    ["weapon", "head", "body", "hands", "feet", "shield"].forEach((key) => {
      const picked = state.equip[key];
      if (!picked?.id) return;
      const item = equipmentMap.get(String(picked.id));
      if (!item) return;
      weaponArmorSum = addStats(weaponArmorSum, scaleEquipBaseAdd(item.base_add || {}, picked.lv));
    });

    const armorSetSeries = getArmorSetSeries(state.equip);
    const sumBeforeSet = addStats(basePlusProtein, weaponArmorSum);
    const sumAfterSet = applyArmorSetBonus(sumBeforeSet, !!armorSetSeries);

    let accessoryFlat = zeroStats();
    let accessoryRate = zeroStats();

    ACCESSORY_KEYS.forEach((key) => {
      const picked = state.equip[key];
      if (!picked?.id) return;
      const item = equipmentMap.get(String(picked.id));
      if (!item) return;
      accessoryFlat = addStats(accessoryFlat, scaleAccessoryBaseAdd(item.base_add || {}, picked.lv));
      accessoryRate = addStats(accessoryRate, scaleAccessoryBaseRate(item.base_rate || {}, picked.lv));
    });

    let petAdd = zeroStats();
    let petMul = zeroStats();
    let petFinal = zeroStats();

    PET_KEYS.forEach((key) => {
      const picked = state.pets[key];
      if (!picked?.id || picked.stage <= 0) return;
      const summed = sumPetUpToStage(picked.id, picked.stage);
      petAdd = addStats(petAdd, summed.add);
      petMul = addStats(petMul, summed.mul);
      petFinal = addStats(petFinal, summed.final);
    });

    const equipDisplay = addStats(addStats(weaponArmorSum, accessoryFlat), petAdd);

    const sumAfterFlat = addStats(sumAfterSet, addStats(accessoryFlat, petAdd));
    const afterRate = applyRate(sumAfterFlat, addStats(accessoryRate, petMul));
    const finalTotal = roundStats(applyRate(afterRate, petFinal));

    const used = BASE_STATS.reduce((s, k) => s + (state.base[k] || 0), 0);
    const remain = state.basePointTotal - used;

    if ($("basePointInfo")) {
      $("basePointInfo").textContent = armorSetSeries
        ? `使用 ${fmtSafe(used)} / 残り ${fmtSafe(remain)}（シリーズ補正ON）`
        : `使用 ${fmtSafe(used)} / 残り ${fmtSafe(remain)}`;
    }

    if (remain < 0) err.push(`ポイント超過：残り ${remain}`);

    renderTable(basePlusProtein, equipDisplay, finalTotal);
    setErr(err.join("\n"));
    saveState(state);
  }

  buildTable();

  try {
    const equipRes = await fetch(EQUIP_URL, { cache: "no-store" });
    if (!equipRes.ok) throw new Error(`HTTP ${equipRes.status}`);
    const equipData = await equipRes.json();
    const items = Array.isArray(equipData.items) ? equipData.items : [];

    items.forEach((item) => {
      equipmentMap.set(String(item.id), item);
    });

    fillSelect($("select_weapon"), items.filter((i) => i.category === "weapon"));
    fillSelect($("select_head"), items.filter((i) => i.category === "armor" && i.slot === "head"));
    fillSelect($("select_body"), items.filter((i) => i.category === "armor" && i.slot === "body"));
    fillSelect($("select_hands"), items.filter((i) => i.category === "armor" && i.slot === "hands"));
    fillSelect($("select_feet"), items.filter((i) => i.category === "armor" && i.slot === "feet"));
    fillSelect($("select_shield"), items.filter((i) => i.category === "armor" && i.slot === "shield"));

    const accessoryItems = items.filter((i) => i.category === "accessory");
    ACCESSORY_KEYS.forEach((k) => fillSelect($("select_" + k), accessoryItems));
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

    Object.entries(skillsData || {}).forEach(([id, stageList]) => {
      petSkillMap.set(String(id), convertPetStageList(stageList));
    });

    const validIds = new Set(Object.keys(skillsData || {}));

    const petItems = nameItems
      .filter((item) => validIds.has(String(item.id)))
      .map((item) => ({
        id: String(item.id),
        name: item.title
      }))
      .sort((a, b) => String(a.id).localeCompare(String(b.id), "ja"));

    PET_KEYS.forEach((k) => fillSelect($("select_" + k), petItems));
  } catch (e) {
    console.error("pet 読み込み失敗", e);
  }

  applyState(loadState());

  document.querySelectorAll("input, select").forEach((el) => {
    el.addEventListener("input", recalc);
    el.addEventListener("change", recalc);
  });

  if ($("recalcBtn")) {
    $("recalcBtn").addEventListener("click", recalc);
  }

  if ($("resetBtn")) {
    $("resetBtn").addEventListener("click", () => {
      if ($("basePointTotal")) $("basePointTotal").value = "0";
      if ($("shakerCount")) $("shakerCount").value = "0";

      BASE_STATS.forEach((k) => {
        if ($("base_" + k)) $("base_" + k).value = "0";
        if ($("protein_" + k)) $("protein_" + k).value = "0";
      });

      ["weapon", "head", "body", "hands", "feet", "shield"].forEach((k) => {
        if ($("select_" + k)) $("select_" + k).value = "";
        if ($("level_" + k)) $("level_" + k).value = "0";
      });

      ACCESSORY_KEYS.forEach((k) => {
        if ($("select_" + k)) $("select_" + k).value = "";
        if ($("level_" + k)) $("level_" + k).value = "1";
      });

      PET_KEYS.forEach((k) => {
        if ($("select_" + k)) $("select_" + k).value = "";
        if ($("stage_" + k)) $("stage_" + k).value = "0";
      });

      recalc();
    });
  }

  if ($("clearSaveBtn")) {
    $("clearSaveBtn").addEventListener("click", () => {
      clearState();
      setErr("保存をクリアしました");
      window.setTimeout(() => setErr(""), 1000);
    });
  }

  recalc();
});
</script>
