// =====================================================================
//  CONFIG: the only part you need to edit
// =====================================================================
const SHEET_ID = '1KmkVZbqQi645h3KcF7YbfGjo1xLEL4uIVEvt5u-E86k';     // from the normal /edit URL
const GID      = '1283318485';
const POLL_MS  = 20000;

// chartId (matches live_gauge("...") in the qmd) -> which sheet column
// col: a number (0 = timestamp, 1 = first question) OR a string that appears
//      in the column header (robust if you reorder or add questions)
const GAUGES = {
  plotCredibility:      { col: 1, label: 'You',      showIQR: true  },
  plotActual:           { col: 2, label: 'You',      showIQR: true  },
  plotIoannidis2009:    { col: 3, label: 'Ioannidis et al.\n(2009)',      showIQR: false  },
  plotIoannidis2009you: { col: 4, label: 'You',      showIQR: true  },
  plotPrinz2011:    { col: 5, label: 'Prinz et al.\n(2011)',      showIQR: false  },
  plotPrinz2011you: { col: 6, label: 'You',      showIQR: true  },
  plotBegley2012:    { col: 7, label: 'Begley & Ellis\n(2012)',      showIQR: false  },
  plotBegley2012you: { col: 8, label: 'You',      showIQR: true  },
  plotOSC2015:    { col: 9, label: 'Psychology',      showIQR: false  },
  plotCobey2023health:    { col: 10, label: 'Health\nSciences',      showIQR: false  },
  plotCobey2023economics:    { col: 11, label: 'Economics',      showIQR: false  },
  plotCobey2023biomedicine:    { col: 12, label: 'Biomedicine',      showIQR: false  },
  plotCobey2023education:    { col: 13, label: 'Education',      showIQR: false  },
};
// =====================================================================

const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${GID}`;

// ---------- math ----------
function percentile(arr, p) {
  const s = [...arr].sort((a, b) => a - b);
  const pos = (s.length - 1) * p, base = Math.floor(pos), rest = pos - base;
  return s[base + 1] !== undefined ? s[base] + rest * (s[base + 1] - s[base]) : s[base];
}

// ---------- CSV ----------
function parseCSV(text) {
  const rows = [];
  let row = [], cell = '', inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else inQ = false; }
      else cell += c;
    } else if (c === '"') inQ = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); rows.push(row); row = []; cell = '';
    } else cell += c;
  }
  if (cell !== '' || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

function resolveCol(headers, col) {
  if (typeof col === 'number') return col;
  return headers.findIndex(h => h.toLowerCase().includes(String(col).toLowerCase()));
}

// One request -> stats for every configured gauge
async function fetchAll() {
  try {
    const res = await fetch(CSV_URL + '&_=' + Date.now(), { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const rows = parseCSV(await res.text());
    const headers = rows[0] || [];
    const data = rows.slice(1);
    const out = {};
    for (const [id, cfg] of Object.entries(GAUGES)) {
      const ci = resolveCol(headers, cfg.col);
      if (ci < 0) { console.warn(`No column matching "${cfg.col}" for ${id}`); continue; }
      const vals = data.map(r => parseFloat(r[ci])).filter(v => !isNaN(v) && v >= 0 && v <= 100);
      if (!vals.length) continue;
      out[id] = {
        n: vals.length,
        median: Math.round(percentile(vals, 0.5)),
        q25: Math.round(percentile(vals, 0.25)),
        q75: Math.round(percentile(vals, 0.75)),
      };
    }
    return out;
  } catch (err) {
    console.error('Error fetching audience data:', err);
    return null;
  }
}

// ---------- state ----------
const sleep = ms => new Promise(r => setTimeout(r, ms));
const withTimeout = (p, ms) => Promise.race([p, sleep(ms).then(() => null)]);

let statsById = {};          // chartId -> latest stats (survives slide changes)
let inflight = null;
let runId = 0;
let pollTimer = null;

function refreshStats() {
  if (inflight) return inflight;
  inflight = fetchAll()
    .then(s => { if (s) Object.assign(statsById, s); return statsById; })
    .finally(() => { inflight = null; });
  return inflight;
}

// ---------- DOM / chart helpers ----------
function gaugesOnSlide(slide) {
  return Object.keys(GAUGES).filter(id => {
    const el = document.getElementById(id);
    return el && slide.contains(el);
  });
}

function getChart(id) {
  const el = document.getElementById(id);
  if (!el || typeof echarts === 'undefined') return null;
  return echarts.getInstanceByDom(el) || echarts.init(el);
}

function setCaption(id, stats) {
  const el = document.getElementById(id);
  if (!el) return;

  const show = GAUGES[id]?.showIQR ?? true;     // defaults to shown if omitted
  let cap = document.getElementById('cap-' + id);

  if (!show) {                                  // hidden: remove any existing caption
    if (cap) cap.remove();
    return;
  }

  if (!cap) {                                   // create caption automatically
    cap = document.createElement('p');
    cap.id = 'cap-' + id;
    cap.style.cssText = 'text-align:center;font-size:1.5em;color:#4a5568;margin:0;';
    el.insertAdjacentElement('afterend', cap);
  }
  cap.textContent = stats ? `IQR ${stats.q25}%–${stats.q75}% · n = ${stats.n}` : '';
}

function withValue(opts, value, label) {
  const s = Array.isArray(opts.series) ? opts.series[0] : opts.series;
  const base = (s.data && s.data[0]) || {};
  s.data = [{
    ...base,
    ...(value !== undefined && { value }),
    ...(label !== undefined && { name: label }),   // config label wins over builder default
  }];
  return opts;
}

// Full replay: animates from empty up to the value

function replay(id) {
  const el = document.getElementById(id);
  if (!el || typeof echarts === 'undefined') return;

  echarts.getInstanceByDom(el)?.dispose();   // throw away the old (possibly mis-sized) instance
  const chart = echarts.init(el);            // re-measures the container now that the slide is visible

  const stats = statsById[id];
  const opts = get_e_charts_opts(id);
  withValue(opts, stats?.median, GAUGES[id].label);
  chart.setOption(opts, true);
  setCaption(id, stats);
}

// In-place update: dial slides from its current value
function applyStats(id) {
  const chart = getChart(id);
  const stats = statsById[id];
  if (!chart || !stats) return;
  const current = (chart.getOption().series[0].data || [])[0]?.name;
  const name = GAUGES[id].label ?? current;        // falls back to existing name if no label set
  chart.setOption({ series: [{ data: [{ name, value: stats.median }] }] });
  setCaption(id, stats);
}

// ---------- slide lifecycle ----------

function stopPolling() {
  clearInterval(pollTimer);
  pollTimer = null;
}

let activeIds = new Set();
let currentSlide = null;

function startPolling(myRun) {
  if (pollTimer) return;

  const tick = async () => {
    await refreshStats();
    if (myRun === runId) {
      activeIds.forEach(applyStats);
    }
  };

  tick();
  pollTimer = setInterval(tick, POLL_MS);
}

async function activateGauge(id, myRun) {
  await refreshStats();

  if (myRun !== runId || !currentSlide) return;

  // Allow the fragment visibility/layout to settle
  await sleep(100);
  
  const fragment = document.getElementById(id)?.closest('[data-gauge]');
  if (fragment && !fragment.classList.contains('visible')) return;

  if (myRun !== runId) return;

  replay(id);
  activeIds.add(id);

  startPolling(myRun);
}

async function enterSlide(slide) {
  const myRun = ++runId;

  stopPolling();
  activeIds.clear();
  currentSlide = slide;

  const ids = gaugesOnSlide(slide);

  if (!ids.length) {
    currentSlide = null;
    return;
  }

  // Identify gauges that are not controlled by fragments,
  // or whose fragments are already visible.
  const initiallyVisible = ids.filter(id => {
    const el = document.getElementById(id);
    const fragment = el.closest('[data-gauge]');

    return !fragment || fragment.classList.contains('visible');
  });

  if (!initiallyVisible.length) return;

  await Promise.all([
    sleep(100),
    refreshStats()
  ]);

  if (myRun !== runId) return;

  initiallyVisible.forEach(id => {
    replay(id);
    activeIds.add(id);
  });

  startPolling(myRun);
}

function leaveSlide() {
  runId++;
  activeIds.clear();
  currentSlide = null;
  stopPolling();
}

// ---------- Reveal hooks ----------

window.addEventListener('load', function () {
  if (typeof Reveal === 'undefined') return;

  refreshStats();

  Reveal.on('slidechanged', e => {
    enterSlide(e.currentSlide);
  });

  Reveal.on('ready', e => {
    enterSlide(e.currentSlide);
  });

  Reveal.on('fragmentshown', event => {
    console.log('SHOWN:', event.fragment.dataset.gauge, 'currentSlide:', currentSlide?.id || currentSlide);
    const raw = event.fragment.dataset.gauge;
    if (!raw || !currentSlide) return;

    const ids = raw.split(',').map(s => s.trim()).filter(Boolean);
    ids.forEach(id => {
      if (GAUGES[id]) {
        activateGauge(id, runId);
      }
    });
  });

  Reveal.on('fragmenthidden', event => {
    const raw = event.fragment.dataset.gauge;
    if (!raw) return;

    const ids = raw.split(',').map(s => s.trim()).filter(Boolean);
    ids.forEach(id => {
      activeIds.delete(id);
    });
  });
  
});