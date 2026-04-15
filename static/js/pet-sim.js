(function () {
  const monsters = (typeof window.MONSTERS !== 'undefined') ? window.MONSTERS.map(function (m) {
    return {
      id:    m.id,
      title: m.title,
      element: m.element,
      vit:  m.vit,
      spd:  m.spd,
      atk:  m.atk,
      int:  m.int,
      def:  m.def,
      mdef: m.mdef,
      luk:  m.luk,
      mov:  m.mov || 0
    };
  }) : [];

  var selected = null;

  var searchInput = document.getElementById('searchInput');
  var dropdown    = document.getElementById('dropdown');
  var badge       = document.getElementById('selectedBadge');
  var badgeName   = document.getElementById('selectedName');
  var clearBtn    = document.getElementById('clearBtn');
  var lvInput     = document.getElementById('lvInput');
  var result      = document.getElementById('result');

  var STAT_KEYS   = ['vit', 'spd', 'atk', 'int', 'def', 'mdef', 'luk'];
  var STAT_LABELS = { vit:'VIT', spd:'SPD', atk:'ATK', int:'INT', def:'DEF', mdef:'MDEF', luk:'LUK' };

  function calcBonus(lv) {
    if (lv <= 200) return (lv - 1) * 0.1;
    return 19.9 + (lv - 200) * 1.1;
  }

  function calcStat(base, lv) {
    return Math.round(base * (1 + calcBonus(lv)) * 10) / 10;
  }

  function getLevel() {
    var v = parseInt(lvInput.value, 10);
    if (isNaN(v) || v < 1)    return 1;
    if (v > 1200)              return 1200;
    return v;
  }

  function renderResult() {
    if (!selected) {
      result.innerHTML = '<p class="empty-msg">モンスターを選択してください</p>';
      return;
    }
    var lv = getLevel();
    var cards = STAT_KEYS.map(function (s) {
      return '<div class="stat-card">'
        + '<div class="stat-label">' + STAT_LABELS[s] + '</div>'
        + '<div class="stat-base">基礎値&nbsp;' + selected[s] + '</div>'
        + '<div class="stat-val">' + calcStat(selected[s], lv).toFixed(1) + '</div>'
        + '</div>';
    }).join('');

    result.innerHTML =
      '<p class="section-label">Lv.' + lv + ' のステータス</p>'
      + '<div class="stats-grid">' + cards + '</div>'
      + '<p class="section-label">固定ステータス</p>'
      + '<div class="fixed-row">'
      + '<div class="fixed-card">MOV<span>' + selected.mov + '</span></div>'
      + '</div>';
  }

  function openDropdown(query) {
    var q = (query || '').trim().toLowerCase();
    var hits = q
      ? monsters.filter(function (m) {
          return m.title.toLowerCase().indexOf(q) !== -1 || m.id.indexOf(q) !== -1;
        }).slice(0, 20)
      : monsters.slice(0, 20);

    if (!hits.length) {
      dropdown.innerHTML = '<div class="drop-item drop-empty">見つかりません</div>';
    } else {
      dropdown.innerHTML = hits.map(function (m) {
        return '<div class="drop-item" data-id="' + m.id + '">'
          + '[' + m.id + ']&nbsp;' + m.title
          + '&nbsp;<span class="drop-element">' + m.element + '</span>'
          + '</div>';
      }).join('');
    }
    dropdown.classList.add('open');
  }

  function closeDropdown() {
    dropdown.classList.remove('open');
  }

  function selectMonster(id) {
    selected = monsters.find(function (m) { return m.id === id; });
    if (!selected) return;
    searchInput.value = '';
    closeDropdown();
    badgeName.textContent = '[' + selected.id + '] ' + selected.title;
    badge.style.display = '';
    renderResult();
  }

  searchInput.addEventListener('input', function () {
    openDropdown(searchInput.value);
  });
  searchInput.addEventListener('focus', function () {
    openDropdown(searchInput.value);
  });

  dropdown.addEventListener('click', function (e) {
    var item = e.target.closest('.drop-item[data-id]');
    if (item) selectMonster(item.dataset.id);
  });

  clearBtn.addEventListener('click', function () {
    selected = null;
    badge.style.display = 'none';
    result.innerHTML = '<p class="empty-msg">モンスターを選択してください</p>';
  });

  lvInput.addEventListener('input', renderResult);

  document.addEventListener('click', function (e) {
    if (!e.target.closest('#dropdown') && !e.target.closest('#searchInput')) {
      closeDropdown();
    }
  });
})();
