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
  <button id="clearSaveBtn" type="button">自動保存クリア</button>
</div>

<div class="error" id="errBox"></div>

<hr>

<details class="fold" id="foldBuildSave" open>
  <summary>ビルド保存</summary>

  <div class="row">
    <label class="pill">保存名 <input id="buildNameInput" type="text" value="" placeholder="例: 物理火力"></label>
    <button id="saveBuildBtn" type="button">保存</button>
    <button id="loadBuildBtn" type="button">読込</button>
    <button id="deleteBuildBtn" type="button">削除</button>
  </div>

  <div class="row">
    <label class="pill">保存済みビルド <select id="buildSlotSelect"></select></label>
  </div>
</details>

<hr>

<details class="fold" id="foldProtein">
  <summary>プロテイン</summary>

  <div class="row">
    <label class="pill">シェイカー <input id="shakerCount" type="number" min="0" value="0"></label>
    <button id="proteinAll1000Btn" type="button">プロテイン・シェイカーALL1000</button>
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

  <div class="equip-row accessory-row">
      <div class="slot">アクセ1</div>
      <div class="main"><select id="select_accessory1"></select></div>
      <div class="lvtag">Lv</div>
      <div class="lvbox"><input id="level_accessory1" type="number" min="1" value="1"></div>
      <div class="effectbox"><div class="acc-effect-preview" id="effect_accessory1">-</div></div>
    </div>

  <div class="equip-row accessory-row">
      <div class="slot">アクセ2</div>
      <div class="main"><select id="select_accessory2"></select></div>
      <div class="lvtag">Lv</div>
      <div class="lvbox"><input id="level_accessory2" type="number" min="1" value="1"></div>
      <div class="effectbox"><div class="acc-effect-preview" id="effect_accessory2">-</div></div>
    </div>

  <div class="equip-row accessory-row">
      <div class="slot">アクセ3</div>
      <div class="main"><select id="select_accessory3"></select></div>
      <div class="lvtag">Lv</div>
      <div class="lvbox"><input id="level_accessory3" type="number" min="1" value="1"></div>
      <div class="effectbox"><div class="acc-effect-preview" id="effect_accessory3">-</div></div>
    </div>

  <div class="equip-row accessory-row">
      <div class="slot">アクセ4</div>
      <div class="main"><select id="select_accessory4"></select></div>
      <div class="lvtag">Lv</div>
      <div class="lvbox"><input id="level_accessory4" type="number" min="1" value="1"></div>
      <div class="effectbox"><div class="acc-effect-preview" id="effect_accessory4">-</div></div>
    </div>

  </div>
</details>

<details class="fold" id="foldPet" open>
  <summary>ペットスキル</summary>

  <div class="equip-grid">

  <div class="equip-row pet-row">
      <div class="slot">ペット1</div>
      <div class="main">
        <div class="pet-search-wrap">
          <input id="pet_search_pet1" type="text" placeholder="名前で検索して選択" autocomplete="off">
          <div id="pet_suggest_pet1" class="pet-suggest" hidden></div>
          <select id="select_pet1" hidden></select>
        </div>
      </div>
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
      <div class="main">
        <div class="pet-search-wrap">
          <input id="pet_search_pet2" type="text" placeholder="名前で検索して選択" autocomplete="off">
          <div id="pet_suggest_pet2" class="pet-suggest" hidden></div>
          <select id="select_pet2" hidden></select>
        </div>
      </div>
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
      <div class="main">
        <div class="pet-search-wrap">
          <input id="pet_search_pet3" type="text" placeholder="名前で検索して選択" autocomplete="off">
          <div id="pet_suggest_pet3" class="pet-suggest" hidden></div>
          <select id="select_pet3" hidden></select>
        </div>
      </div>
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

<style>
.pet-search-wrap{
  position: relative;
  width: 100%;
}
.pet-search-wrap input{
  width: 100%;
}
.pet-suggest{
  position: absolute;
  left: 0;
  right: 0;
  top: calc(100% + 6px);
  border: 1px solid rgba(0,0,0,.18);
  border-radius: 12px;
  background: #fff;
  overflow: hidden;
  max-height: 260px;
  overflow-y: auto;
  z-index: 30;
}
.pet-suggest button{
  display: block;
  width: 100%;
  text-align: left;
  padding: 10px 12px;
  border: none;
  background: transparent;
  font-size: 16px;
}
.pet-suggest button:active{
  background: rgba(0,0,0,.06);
}
.accessory-row{
  grid-template-columns: 72px minmax(0, 1fr) 44px 110px minmax(180px, 1.2fr);
}
.effectbox{
  min-width: 0;
}
.acc-effect-preview{
  min-height: 40px;
  padding: 8px 10px;
  border: 1px solid rgba(0,0,0,.12);
  border-radius: 12px;
  background: rgba(0,0,0,.02);
  font-size: 12px;
  line-height: 1.35;
  overflow-wrap: anywhere;
}
@media (max-width: 800px){
  .accessory-row{
    grid-template-columns: 72px 1fr;
    grid-template-areas:
      "slot main"
      "lvtag lvbox"
      "effect effect";
    row-gap: 8px;
  }
  .accessory-row .slot{ grid-area: slot; }
  .accessory-row .main{ grid-area: main; }
  .accessory-row .lvtag{ grid-area: lvtag; text-align:left; padding-left:2px; }
  .accessory-row .lvbox{ grid-area: lvbox; }
  .accessory-row .effectbox{ grid-area: effect; }
}
</style>

<script>
document.addEventListener("DOMContentLoaded", async () => {
  const STATS = ["vit", "spd", "atk", "int", "def", "mdef", "luk", "mov"];
  const BASE_STATS = ["vit", "spd", "atk", "int", "def", "mdef", "luk"];
  const ACCESSORY_KEYS = ["accessory1", "accessory2", "accessory3", "accessory4"];
  const PET_KEYS = ["pet1", "pet2", "pet3"];
  const AUTO_STORAGE_KEY = "status_sim_inline_v6";
  const BUILD_STORAGE_KEY = "status_sim_build_slots_v1";

  const base = window.location.origin + window.location.pathname.split("/tools/status/")[0];
  const EQUIP_URL = base + "/db/equipment.json";
  const PET_SKILLS_URL = base + "/db/pet-skills.json";
  const PET_NAMES_URL = base + "/pet-names/index.json";

  const equipmentMap = new Map();
  const petSkillMap = new Map();
  const petNameMap = new Map();
  let petItemsCache = [];

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

  function fmtRate(v) {
    const num = Number(v) || 0;
    if (Math.abs(num - Math.round(num)) < 1e-9) return `${Math.round(num)}%`;
    return `${num.toFixed(2).replace(/\.?0+$/, "")}%`;
  }

  function normalizeJP(s) {
    const str = String(s || "").trim().toLowerCase();
    return str.replace(/[\u30a1-\u30f6]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x60));
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

  function getStatLabel(key) {
    const map = {
      vit: "VIT",
      spd: "SPD",
      atk: "ATK",
      int: "INT",
      def: "DEF",
      mdef: "MDEF",
      luk: "LUK",
      mov: "MOV"
    };
    return map[key] || String(key).toUpperCase();
  }

  function buildAccessoryEffectPreview(item, lv) {
    if (!item) return "-";

    const addStatsNow = scaleAccessoryBaseAdd(item.base_add || {}, lv);
    const rateStatsNow = scaleAccessoryBaseRate(item.base_rate || {}, lv);
    const parts = [];

    STATS.forEach((k) => {
      const add = addStatsNow[k] || 0;
      const rate = rateStatsNow[k] || 0;

      if (add !== 0) {
        if (Number.isInteger(add)) parts.push(`${getStatLabel(k)}+${add}`);
        else parts.push(`${getStatLabel(k)}+${Number(add).toFixed(2).replace(/\.?0+$/, "")}`);
      }

      if (rate !== 0) {
        parts.push(`${getStatLabel(k)}+${fmtRate(rate)}`);
      }
    });

    return parts.length ? parts.join(" / ") : "-";
  }

  function updateAccessoryEffectDisplays() {
    ACCESSORY_KEYS.forEach((key) => {
      const box = $("effect_" + key);
      if (!box) return;

      const id = $("select_" + key)?.value || "";
      const lv = clamp1($("level_" + key)?.value);
      if (!id) {
        box.textContent = "-";
        return;
      }

      const item = equipmentMap.get(String(id));
      box.textContent = buildAccessoryEffectPreview(item, lv);
    });
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

  function petInputId(key) {
    return "pet_search_" + key;
  }

  function petSuggestId(key) {
    return "pet_suggest_" + key;
  }

  function closePetSuggest(key) {
    const suggest = $(petSuggestId(key));
    if (!suggest) return;
    suggest.hidden = true;
    suggest.innerHTML = "";
  }

  function closeAllPetSuggests() {
    PET_KEYS.forEach((key) => closePetSuggest(key));
  }

  function setPetInputFromSelected(key, id) {
    const input = $(petInputId(key));
    if (!input) return;
    input.value = id ? (petNameMap.get(String(id)) || "") : "";
  }

  function selectPetById(key, id) {
    const select = $("select_" + key);
    if (!select) return;
    select.value = String(id || "");
    setPetInputFromSelected(key, id);
    closePetSuggest(key);
    recalc();
  }

  function filterPetItems(query) {
    const q = normalizeJP(query);
    if (!q) return [];
    return petItemsCache.filter((item) => {
      const title = normalizeJP(item.name);
      const searchText = normalizeJP(item.search || "");
      return title.includes(q) || searchText.includes(q);
    }).slice(0, 50);
  }

  function openPetSuggest(key, items) {
    const suggest = $(petSuggestId(key));
    if (!suggest) return;

    suggest.hidden = false;
    suggest.innerHTML = "";

    items.forEach((item) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = item.name;
      btn.addEventListener("click", () => {
        selectPetById(key, item.id);
      });
      suggest.appendChild(btn);
    });
  }

  function wirePetSearch(key) {
    const input = $(petInputId(key));
    const select = $("select_" + key);
    if (!input || !select) return;

    input.addEventListener("input", () => {
      const q = input.value || "";

      if (q.trim() === "") {
        select.value = "";
        closePetSuggest(key);
        recalc();
        return;
      }

      if (select.value && q !== (petNameMap.get(String(select.value)) || "")) {
        select.value = "";
        recalc();
      }

      const items = filterPetItems(q);
      if (items.length === 0) {
        closePetSuggest(key);
      } else {
        closeAllPetSuggests();
        openPetSuggest(key, items);
      }
    });

    input.addEventListener("focus", () => {
      const items = filterPetItems(input.value || "");
      if (items.length === 0) {
        closePetSuggest(key);
      } else {
        closeAllPetSuggests();
        openPetSuggest(key, items);
      }
    });
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
      setPetInputFromSelected(k, v?.id || "");
    });
  }

  function saveAutoState(state) {
    localStorage.setItem(AUTO_STORAGE_KEY, JSON.stringify(state));
  }

  function loadAutoState() {
    try {
      return JSON.parse(localStorage.getItem(AUTO_STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function clearAutoState() {
    localStorage.removeItem(AUTO_STORAGE_KEY);
  }

  function loadBuildSlots() {
    try {
      return JSON.parse(localStorage.getItem(BUILD_STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function saveBuildSlots(data) {
    localStorage.setItem(BUILD_STORAGE_KEY, JSON.stringify(data));
  }

  function refreshBuildSelect() {
    const select = $("buildSlotSelect");
    if (!select) return;

    const builds = loadBuildSlots();
    const names = Object.keys(builds).sort((a, b) => a.localeCompare(b, "ja"));

    select.innerHTML = "";
    select.appendChild(new Option("（未選択）", ""));
    names.forEach((name) => {
      select.appendChild(new Option(name, name));
    });
  }

  function saveNamedBuild() {
    const input = $("buildNameInput");
    if (!input) return;

    const name = String(input.value || "").trim();
    if (!name) {
      setErr("保存名を入力してください");
      return;
    }

    const builds = loadBuildSlots();
    builds[name] = collectState();
    saveBuildSlots(builds);
    refreshBuildSelect();
    $("buildSlotSelect").value = name;
    setErr(`ビルド「${name}」を保存しました`);
    window.setTimeout(() => setErr(""), 1200);
  }

  function loadNamedBuild() {
    const select = $("buildSlotSelect");
    if (!select) return;

    const name = String(select.value || "").trim();
    if (!name) {
      setErr("読込するビルドを選択してください");
      return;
    }

    const builds = loadBuildSlots();
    const state = builds[name];
    if (!state) {
      setErr("ビルドが見つかりません");
      return;
    }

    if ($("buildNameInput")) $("buildNameInput").value = name;
    applyState(state);
    recalc();
    setErr(`ビルド「${name}」を読込みました`);
    window.setTimeout(() => setErr(""), 1200);
  }

  function deleteNamedBuild() {
    const select = $("buildSlotSelect");
    if (!select) return;

    const name = String(select.value || "").trim();
    if (!name) {
      setErr("削除するビルドを選択してください");
      return;
    }

    const builds = loadBuildSlots();
    if (!builds[name]) {
      setErr("ビルドが見つかりません");
      return;
    }

    delete builds[name];
    saveBuildSlots(builds);
    refreshBuildSelect();
    if ($("buildNameInput")) $("buildNameInput").value = "";
    setErr(`ビルド「${name}」を削除しました`);
    window.setTimeout(() => setErr(""), 1200);
  }

  function recalc() {
    const err = [];
    const state = collectState();

    const baseStats = zeroStats();
    BASE_STATS.forEach((k) => {
      baseStats[k] = state.base[k] || 0;
    });
    baseStats.mov = 6;

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

    updateAccessoryEffectDisplays();
    renderTable(basePlusProtein, equipDisplay, finalTotal);
    setErr(err.join("\n"));
    saveAutoState(state);
  }

  function setProteinAll1000() {
    if ($("shakerCount")) $("shakerCount").value = "1000";
    BASE_STATS.forEach((k) => {
      if ($("protein_" + k)) $("protein_" + k).value = "1000";
    });
    recalc();
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
        name: item.title,
        search: item.search || item.title
      }))
      .sort((a, b) => String(a.id).localeCompare(String(b.id), "ja"));

    petItemsCache = petItems;

    petItems.forEach((item) => {
      petNameMap.set(String(item.id), item.name);
    });

    PET_KEYS.forEach((k) => {
      fillSelect($("select_" + k), petItems);
      wirePetSearch(k);
    });
  } catch (e) {
    console.error("pet 読み込み失敗", e);
  }

  refreshBuildSelect();
  applyState(loadAutoState());

  document.querySelectorAll("input, select").forEach((el) => {
    el.addEventListener("input", recalc);
    el.addEventListener("change", recalc);
  });

  document.addEventListener("click", (e) => {
    const target = e.target;
    let inside = false;

    PET_KEYS.forEach((key) => {
      const input = $(petInputId(key));
      const suggest = $(petSuggestId(key));
      if (target === input || (suggest && suggest.contains(target))) inside = true;
    });

    if (!inside) closeAllPetSuggests();
  });

  if ($("recalcBtn")) {
    $("recalcBtn").addEventListener("click", recalc);
  }

  if ($("proteinAll1000Btn")) {
    $("proteinAll1000Btn").addEventListener("click", setProteinAll1000);
  }

  if ($("saveBuildBtn")) {
    $("saveBuildBtn").addEventListener("click", saveNamedBuild);
  }

  if ($("loadBuildBtn")) {
    $("loadBuildBtn").addEventListener("click", loadNamedBuild);
  }

  if ($("deleteBuildBtn")) {
    $("deleteBuildBtn").addEventListener("click", deleteNamedBuild);
  }

  if ($("buildSlotSelect")) {
    $("buildSlotSelect").addEventListener("change", () => {
      const value = $("buildSlotSelect").value || "";
      if ($("buildNameInput")) $("buildNameInput").value = value;
    });
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
        if ($("effect_" + k)) $("effect_" + k).textContent = "-";
      });

      PET_KEYS.forEach((k) => {
        if ($("select_" + k)) $("select_" + k).value = "";
        if ($("stage_" + k)) $("stage_" + k).value = "0";
        if ($(petInputId(k))) $(petInputId(k)).value = "";
        closePetSuggest(k);
      });

      recalc();
    });
  }

  if ($("clearSaveBtn")) {
    $("clearSaveBtn").addEventListener("click", () => {
      clearAutoState();
      setErr("自動保存をクリアしました");
      window.setTimeout(() => setErr(""), 1000);
    });
  }

  recalc();
});
</script>
