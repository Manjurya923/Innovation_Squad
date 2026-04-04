

/* ── APP STATE ── */
let state = {
  user:          null,   // { name, work, risk }
  plan:          'basic',
  weather:       'normal',
  premium:       100,
  walletBalance: 0,
  totalEarned:   0,
  eventCount:    0,
  events:        []
};

/* ── PLAN CONFIG ── */
const PLANS = {
  basic: {
    name:      'Basic Shield',
    basePrice: 100,
    maxPayout: 2000,
    multiplier: 1.0
  },
  premium: {
    name:      'Premium Shield',
    basePrice: 150,
    maxPayout: 5000,
    multiplier: 1.4
  }
};

/* ── RISK ADJUSTMENTS ── */
const RISK_SURCHARGE = { safe: 0, medium: 20, high: 40 };
const WEATHER_SURCHARGE = { normal: 0, monsoon: 25, extreme: 50 };

/* ── TRIGGER CONFIG ── */
const TRIGGERS = {
  rain:   { name: 'Heavy Rain',     icon: '🌧️', basicAllowed: true  },
  heat:   { name: 'Heatwave',       icon: '🌡️', basicAllowed: true  },
  outage: { name: 'App Outage',     icon: '📵', basicAllowed: false }, // Premium only
  demand: { name: 'Demand Drop',    icon: '📉', basicAllowed: true  }
};

/* ═══════════════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════════════ */
function goTo(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  window.scrollTo(0, 0);
}

/* ═══════════════════════════════════════════════
   REGISTRATION
═══════════════════════════════════════════════ */
function registerUser() {
  const name = document.getElementById('reg-name').value.trim();
  const work = document.getElementById('reg-work').value;
  const risk = document.querySelector('input[name="risk"]:checked').value;

  if (!name) {
    alert('Please enter your name to continue.');
    return;
  }

  state.user = { name, work, risk };
  localStorage.setItem('ss_user', JSON.stringify(state.user));

  updatePremiumDisplay();
  goTo('screen-plans');
}

/* ═══════════════════════════════════════════════
   PLAN SELECTION
═══════════════════════════════════════════════ */
function selectPlan(planKey) {
  state.plan = planKey;

  // Highlight selected plan card
  document.getElementById('plan-basic').classList.toggle('selected', planKey === 'basic');
  document.getElementById('plan-premium').classList.toggle('selected', planKey === 'premium');

  updatePremiumDisplay();
}

function setWeather(condition, btn) {
  state.weather = condition;

  // Update toggle buttons
  document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  updatePremiumDisplay();
}

function calcPremium(planKey, riskKey, weatherKey) {
  const base    = PLANS[planKey].basePrice;
  const risk    = RISK_SURCHARGE[riskKey]    || 0;
  const weather = WEATHER_SURCHARGE[weatherKey] || 0;
  return base + risk + weather;
}

function updatePremiumDisplay() {
  const risk    = state.user ? state.user.risk : 'safe';
  const weather = state.weather;

  const basicTotal   = calcPremium('basic',   risk, weather);
  const premiumTotal = calcPremium('premium', risk, weather);
  const selectedTotal = calcPremium(state.plan, risk, weather);

  // Update plan card prices
  document.getElementById('price-basic').textContent   = '₹' + basicTotal;
  document.getElementById('price-premium').textContent = '₹' + premiumTotal;

  // Update preview box
  document.getElementById('preview-amount').textContent = '₹' + selectedTotal;
  document.getElementById('preview-breakdown').textContent =
    `Base ₹${PLANS[state.plan].basePrice} + Risk ₹${RISK_SURCHARGE[risk]} + Weather ₹${WEATHER_SURCHARGE[weather]}`;

  state.premium = selectedTotal;
}

function confirmPlan() {
  // Build dashboard
  const u = state.user;
  const workLabels = {
    delivery: '🛵 Delivery Partner',
    cab:      '🚕 Cab Driver',
    grocery:  '🛒 Grocery Runner'
  };

  document.getElementById('dash-name').textContent    = u.name;
  document.getElementById('dash-plan').textContent    = state.plan === 'premium' ? 'Premium' : 'Basic';
  document.getElementById('dash-premium').textContent = '₹' + state.premium + '/wk';
  document.getElementById('dash-wallet').textContent  = '₹0';

  // Wallet tab
  document.getElementById('wallet-premium').textContent = '−₹' + state.premium;
  refreshWalletUI();

  switchTab('dashboard');
  goTo('screen-app');
}

/* ═══════════════════════════════════════════════
   TAB SWITCHING
═══════════════════════════════════════════════ */
function switchTab(tabName) {
  const tabs    = ['dashboard', 'triggers', 'wallet'];
  const tabBtns = ['tb-dashboard', 'tb-triggers', 'tb-wallet'];

  tabs.forEach((t, i) => {
    const content = document.getElementById('tab-' + t);
    const btn     = document.getElementById(tabBtns[i]);
    if (t === tabName) {
      content.classList.add('active');
      btn.classList.add('active');
    } else {
      content.classList.remove('active');
      btn.classList.remove('active');
    }
  });
}

/* ═══════════════════════════════════════════════
   TRIGGER LOGIC
═══════════════════════════════════════════════ */
function fireTrigger(type) {
  const trigger = TRIGGERS[type];
  if (!trigger) return;

  // Hide previous result and upgrade notice
  document.getElementById('result-card').style.display   = 'none';
  document.getElementById('upgrade-note').style.display  = 'none';

  // Check if basic plan can access this trigger
  if (state.plan === 'basic' && !trigger.basicAllowed) {
    showUpgradeNotice();
    return;
  }

  // Show processing overlay
  showProcessingOverlay(type, trigger);
}

function showProcessingOverlay(type, trigger) {
  const overlay = document.getElementById('processing-overlay');
  const stepEl  = document.getElementById('processing-step');
  overlay.classList.add('show');

  const steps = [
    'Fetching real-time event data...',
    'Calculating disruption score...',
    'Verifying policy coverage...',
    'Releasing payout to wallet...'
  ];

  let i = 0;
  stepEl.textContent = steps[0];

  const interval = setInterval(() => {
    i++;
    if (i < steps.length) {
      stepEl.textContent = steps[i];
    } else {
      clearInterval(interval);
    }
  }, 450);

  // After processing, show result
  setTimeout(() => {
    overlay.classList.remove('show');
    processClaimsResult(type, trigger);
  }, 2000);
}

function processClaimsResult(type, trigger) {
  // Generate random disruption score (0.30 – 0.98)
  const score  = parseFloat((Math.random() * 0.68 + 0.30).toFixed(2));

  // Calculate payout: score × 500, scaled by plan multiplier, capped
  const raw     = Math.round(score * 500 * PLANS[state.plan].multiplier);
  const payout  = Math.min(raw, PLANS[state.plan].maxPayout);

  // Update state
  state.walletBalance += payout;
  state.totalEarned   += payout;
  state.eventCount++;

  const timestamp = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  const event     = { type, name: trigger.name, icon: trigger.icon, score, payout, timestamp };
  state.events.unshift(event);

  // Update all UI
  renderResultCard(trigger, score, payout);
  refreshWalletUI();
  renderEventsList();
  showToast(payout, trigger.name);

  // Switch to triggers tab
  switchTab('triggers');
}

function renderResultCard(trigger, score, payout) {
  document.getElementById('result-icon').textContent    = trigger.icon;
  document.getElementById('result-title').textContent   = trigger.name;
  document.getElementById('result-score').textContent   = score.toFixed(2);
  document.getElementById('result-payout').textContent  = '₹' + payout;
  document.getElementById('result-message').textContent =
    `₹${payout} has been automatically credited to your wallet. No action required.`;

  // Score bar color based on severity
  const bar = document.getElementById('score-bar');
  bar.style.width = (score * 100) + '%';
  bar.style.background = score > 0.75 ? '#ef4444' : score > 0.5 ? '#f59e0b' : '#10b981';

  document.getElementById('result-card').style.display = 'block';
}

function showUpgradeNotice() {
  document.getElementById('upgrade-note').style.display = 'block';
}

/* ═══════════════════════════════════════════════
   WALLET & DASHBOARD
═══════════════════════════════════════════════ */
function refreshWalletUI() {
  // Update all wallet balance displays
  const balStr = '₹' + state.walletBalance;
  document.getElementById('wallet-balance').textContent  = balStr;
  document.getElementById('wallet-earned').textContent   = '₹' + state.totalEarned;
  document.getElementById('wallet-events').textContent   = state.eventCount;
  document.getElementById('nav-wallet').textContent      = balStr;
  document.getElementById('dash-wallet').textContent     = balStr;

  renderTxList();
}

function renderTxList() {
  const container = document.getElementById('wallet-tx-list');

  if (state.events.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span>🧾</span>
        <p>No transactions yet.</p>
      </div>`;
    return;
  }

  const html = state.events.map(ev => `
    <div class="card" style="margin-bottom:8px; padding:14px 16px;">
      <div class="tx-item" style="padding:0; border:none;">
        <div class="tx-icon">${ev.icon}</div>
        <div class="tx-details">
          <div class="tx-title">${ev.name}</div>
          <div class="tx-time">Score ${ev.score.toFixed(2)} · Auto-processed · ${ev.timestamp}</div>
        </div>
        <div class="tx-amount">+₹${ev.payout}</div>
      </div>
    </div>
  `).join('');

  container.innerHTML = html;
}

function renderEventsList() {
  const container = document.getElementById('events-list');

  if (state.events.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span>📭</span>
        <p>No disruptions yet.<br/>Your coverage is live and monitoring.</p>
      </div>`;
    return;
  }

  const latest = state.events.slice(0, 5);
  const items  = latest.map(ev => `
    <div class="event-item">
      <div class="event-icon">${ev.icon}</div>
      <div class="event-details">
        <div class="event-title">${ev.name}</div>
        <div class="event-meta">Score ${ev.score.toFixed(2)} · ${ev.timestamp} · Auto-Processed</div>
      </div>
      <div class="event-payout">+₹${ev.payout}</div>
    </div>
  `).join('');

  container.innerHTML = `<div class="card" style="padding:4px 16px;">${items}</div>`;
}

/* ═══════════════════════════════════════════════
   TOAST
═══════════════════════════════════════════════ */
function showToast(amount, label) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-text').textContent = `₹${amount} credited — ${label}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

/* ═══════════════════════════════════════════════
   RESET
═══════════════════════════════════════════════ */
function resetApp() {
  if (!confirm('Reset app and start over?')) return;

  state = {
    user: null, plan: 'basic', weather: 'normal',
    premium: 100, walletBalance: 0, totalEarned: 0,
    eventCount: 0, events: []
  };
  localStorage.clear();
  goTo('screen-landing');
}

/* ═══════════════════════════════════════════════
   INIT — Restore session if user exists
═══════════════════════════════════════════════ */
(function init() {
  const saved = localStorage.getItem('ss_user');
  if (saved) {
    try { state.user = JSON.parse(saved); } catch (e) { /* ignore */ }
  }
  // Default plan selection highlight
  selectPlan('basic');
  updatePremiumDisplay();
})();
