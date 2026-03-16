+++
title = "装備データベース"
home = true
weight = 40
description = "武器・防具・アクセサリーの装備データ一覧"
+++

<div class="equip-db">

<h1>装備データベース</h1>

<div class="equip-tabs">
  <button class="equip-tab active" data-tab="weapon">武器</button>
  <button class="equip-tab" data-tab="armor">防具</button>
  <button class="equip-tab" data-tab="accessory">アクセ</button>
</div>

<div id="equipTables">

<div class="equip-table active" id="tab-weapon">
<table>
<thead>
<tr>
<th>名前</th>
<th>VIT</th>
<th>SPD</th>
<th>ATK</th>
<th>INT</th>
<th>DEF</th>
<th>MDEF</th>
<th>LUK</th>
<th>MOV</th>
</tr>
</thead>
<tbody id="weaponBody"></tbody>
</table>
</div>

<div class="equip-table" id="tab-armor">
<table>
<thead>
<tr>
<th>名前</th>
<th>VIT</th>
<th>SPD</th>
<th>ATK</th>
<th>INT</th>
<th>DEF</th>
<th>MDEF</th>
<th>LUK</th>
<th>MOV</th>
</tr>
</thead>
<tbody id="armorBody"></tbody>
</table>
</div>

<div class="equip-table" id="tab-accessory">
<table>
<thead>
<tr>
<th>名前</th>
<th>VIT</th>
<th>SPD</th>
<th>ATK</th>
<th>INT</th>
<th>DEF</th>
<th>MDEF</th>
<th>LUK</th>
<th>MOV</th>
</tr>
</thead>
<tbody id="accessoryBody"></tbody>
</table>
</div>

</div>

</div>

<link rel="stylesheet" href="../css/equipment.css">
<script src="../js/equipment-db.js"></script>
