# 🛡️ ShiftShield

> **AI-Powered Weekly Income Protection for Food Delivery Workers**
> *Parametric micro-insurance that pays out automatically — no forms, no friction, no delay.*

[![Hackathon](https://img.shields.io/badge/Guidewire-DEVTrails%202026-blue?style=flat-square)](https://www.guidewire.com/)
[![Platform](https://img.shields.io/badge/Platform-Swiggy%20%7C%20Zomato-orange?style=flat-square)]()
[![Coverage](https://img.shields.io/badge/Coverage-Weekly%20Micro--Policy-green?style=flat-square)]()
[![Status](https://img.shields.io/badge/Status-Hackathon%20MVP-yellow?style=flat-square)]()

---

## 📋 Table of Contents

1. [Problem Statement](#-problem-statement)
2. [Our Solution](#-our-solution)
3. [Target Persona](#-target-persona)
4. [User Scenario](#-realistic-user-scenario)
5. [Product Workflow](#-product-workflow)
6. [Parametric Triggers](#-parametric-trigger-set)
7. [Premium Model](#-weekly-premium-model)
8. [AI Components](#-ai-components)
9. [System Architecture](#-system-architecture)
10. [Key Features](#-key-features)
11. [Tech Stack](#-tech-stack)
12. [Roadmap](#-development-roadmap)
13. [Expected Impact](#-expected-impact)

---

## ❗ Problem Statement

India's **10+ million gig delivery workers** on platforms like Swiggy and Zomato earn between **₹3,500–₹6,000/week** — and every rupee is precarious.

Their income is vulnerable to forces entirely outside their control:

| Disruption Type | Income Impact |
|---|---|
| Heavy rain / waterlogging | Orders drop 50–70% in affected zones |
| Extreme heatwave (≥40°C) | Platform throttles; riders log off early |
| Dense fog (winter nights) | Late-night deliveries paused or restricted |
| Platform outage / tech glitch | Zero orders for 45–90+ minutes |
| Demand crash (festival, LPG shortage) | Orders per rider fall 40–60% below baseline |
| Curfew / local strike | Full zone shutdown; no operations |

**The gap:** Traditional insurance doesn't cover "income loss from demand disruptions." Claim forms require documentation these workers don't have. Payouts take weeks. There is no safety net.

---

## ✅ Our Solution

**ShiftShield** is a **shift-aware, behavior-aware parametric micro-insurance platform** that:

- 🌧️ Monitors **real-time disruption signals** — weather, platform outages, demand collapses, curfews
- 🤖 Uses an **AI Disruption Brain** to score each event's severity and estimate income loss
- 💸 Triggers **automatic payouts** into an in-app **Income Smoothing Wallet** — no claim forms
- 📅 Ties coverage to **actual active shift hours** per week (Smart Shift Shield)
- 📊 Gives riders a **live dashboard** showing protected hours, wallet balance, and disruption events

> *Unlike basic "weather-trigger" covers, ShiftShield combines multiple disruption signals, focuses on actual active shifts, and smooths earnings over time — not just one bad night.*

---

## 👤 Target Persona

**Swiggy / Zomato Delivery Partners in Tier-1 and Tier-2 Indian Cities**

| Attribute | Detail |
|---|---|
| **Age** | 20–35 years |
| **Work pattern** | 6–7 days/week; lunch (12–3 PM) & dinner (7–11 PM) shifts |
| **Weekly earnings** | ₹3,500–₹6,000 (highly variable) |
| **Income drivers** | Restaurant availability, order volume, surge bonuses |
| **Key risks** | Rain, extreme heat, fog, platform outages, curfews, strikes |
| **Insurance literacy** | Low; no existing income protection product available |
| **Payment preference** | UPI, in-app wallets |
| **Cities** | Bengaluru, Chennai, Coimbatore, Hyderabad, Mumbai, Delhi, Jaipur |

---

## 🎬 Realistic User Scenario

**Meet Ravi** — a 24-year-old Swiggy delivery partner in Coimbatore.

- **Normal week:** Ravi earns ₹4,000–₹5,000, mostly during dinner peak (7–11 PM), completing 18–20 orders per evening.
- **The bad night:** Heavy rain hits his zone. Several restaurants close early. Swiggy marks his zone "red / high risk" and stops accepting new orders for 4–5 hours.
- **The loss:** Ravi completes only 5–6 orders. He loses ₹600–₹800 in expected earnings — with no safety net and no one to call.

**With ShiftShield:**

1. Ravi bought a **Weekly plan** (₹130/week) and configured **25 protected hours** aligned with his dinner peak.
2. When rainfall crosses the threshold, restaurants in his zone drop sharply, and Swiggy flags the zone as high-risk — ShiftShield fires automatically.
3. The **AI Disruption Brain** calculates his estimated lost income, scores the event at **D = 0.84**, and pushes **₹720** into his Income Smoothing Wallet.
4. Ravi receives a push notification:

   > *"Heavy rain + order crash in your dinner slot — Disruption Score 0.84 — ₹720 credited to your wallet ✅"*

5. He withdraws via UPI to his bank the next morning. **No forms. No calls. No waiting.**

---

## 🔄 Product Workflow

### Step 1 — Onboarding
- Rider downloads ShiftShield app or accesses mobile web
- Signs up with **phone + OTP**; consents to GPS sharing during active shifts
- Links **Swiggy/Zomato Rider ID** via mock platform API
- App ingests **8–12 weeks of historical earnings**, shift timings, and preferred zones

### Step 2 — Risk Profiling & Weekly Offer
Before each new week, the **Shift & Zone Risk Brain** analyzes:
- Historical earnings per hour per slot (lunch vs. dinner, weekday vs. weekend)
- Preferred zones: city center, suburbs, highway corridors
- Historical disruption patterns in those zones
- **7-day weather forecast** for rain, heat, and fog

The app presents the rider with:
- **E** — Expected weekly earnings
- **C** — Suggested coverage limit
- **P** — Weekly premium (based on risk score R)
- Number of **protected hours** included
- Plain-language trigger explanation

### Step 3 — Policy Creation
- Rider pays weekly premium **P** via UPI / payment gateway
- System issues a **7-day food-delivery micro-policy** containing:
  - Policy dates + shift windows
  - Covered zones and parametric triggers
  - Weekly coverage cap **C**
  - Income Smoothing Wallet split (90–95% risk pool; 5–10% savings)

### Step 4 — Real-Time Disruption Detection
The **Event/Trigger Service** continuously monitors:

| Signal | Data Source |
|---|---|
| Rainfall intensity | Weather API (IMD / OpenWeatherMap) |
| Temperature | IMD forecast API |
| Fog / visibility | Visibility index API |
| Platform zone status | Mock Swiggy/Zomato API (zone flags, order pause signals) |
| Order demand | Orders-per-active-rider vs. 4-week rolling baseline |
| Curfews / strikes | Admin feeds, union/news APIs |

When metrics cross thresholds in the rider's active zone during protected hours → a **DisruptionEvent** is generated.

### Step 5 — Disruption Scoring & Auto-Claim
The **AI Disruption Brain** computes a **Disruption Score D (0–1)**:

```
D = 0.4 × Weather_Severity + 0.35 × Platform_Disruption + 0.25 × Demand_Collapse
```

The claim engine then validates:
- ✅ Is the weekly policy active?
- ✅ Is the event within the rider's protected hours?
- ✅ Does GPS trail confirm the rider is inside the affected zone?

**Payout = D × Expected_Hourly_Earnings × Disrupted_Hours**  
(scaled by protected-hour multiplier, capped at weekly limit C)

### Step 6 — Fraud Detection (Trust Brain)
- GPS vs. declared zone cross-check
- Swiggy/Zomato login logs: was the rider available? Were orders genuinely absent or rejected?
- Claim frequency benchmarked against zone peers
- Device clustering detection (multiple IDs on one device)
- Low-risk claims → **auto-approved**; suspicious claims → flagged for silent review (zero friction for rider)

### Step 7 — Payout & Dashboards
- Approved payouts → **Income Smoothing Wallet** → UPI withdrawal to bank

**Rider Dashboard:**
```
This week: ₹900 protected (3 events)
Protected hours used: 10 / 25
Wallet balance: ₹350
```

**Admin / Insurer Dashboard:**
- Loss ratios by city, zone, and shift slot
- Income Stability Index per zone
- Next-week disruption risk forecast

---

## ⚡ Parametric Trigger Set

| # | Trigger | Condition | Payout |
|---|---|---|---|
| 1 | **Heavy Rain + Restaurant Shutdown** | Rainfall > 30 mm / 3 hrs AND >50% restaurants in zone closed | 70–80% of avg hourly earnings for affected protected hours |
| 2 | **Heatwave / Extreme Heat** | Max temp ≥ 40–42°C for ≥ 3 hrs; platform throttles orders | Fixed per-day compensation for scheduled slots |
| 3 | **Dense Fog / Low Visibility** | Visibility below threshold; platform reduces/pauses late-night deliveries | Hourly benefit for protected late-night slots |
| 4 | **Platform Outage / Tech Glitch** | Downtime ≥ 45 minutes while rider is logged in | Up to 80% of expected hourly earnings for that window |
| 5 | **Demand Crash** | Orders per rider drop >40–60% below 4-week average (non-weather cause) | Partial hourly compensation for protected hours |
| 6 | **Curfew / Strike** | Zone flagged "curfew/strike" for >X hours; platform restricts operations | Flat per-day amount for each affected day |

---

## 💰 Weekly Premium Model

### Definitions

| Variable | Meaning |
|---|---|
| **E** | Average weekly earnings over last N weeks |
| **R** | Composite risk score (0–1) |
| **C** | Coverage limit = γ × E, where γ = 0.5–0.7 |
| **P** | Weekly premium |

### Risk Score Formula

```
R = 0.4 × R_rain + 0.3 × R_heat_fog + 0.3 × R_outage_demand
```

### Premium Formula

```
P = α × E + β × R × C        subject to: P ≤ 5% of E
```

### Example Calculation

| Parameter | Value |
|---|---|
| Expected weekly earnings (E) | ₹4,500 |
| Risk score (R) | 0.60 |
| Coverage limit (C = 0.6 × E) | ₹2,700 |
| **Weekly premium (P)** | **~₹130/week** |
| Premium as % of earnings | **~2.9%** |

> **Income Smoothing Wallet split:** 90–95% of P funds the risk pool; 5–10% accumulates as a monthly savings withdrawal if unused.

---

## 🤖 AI Components

| Component | Role | Technique |
|---|---|---|
| **Shift & Zone Risk Brain** | Builds rider-level risk profile pre-week | Time-series analysis on earnings history; zone-level disruption frequency |
| **AI Disruption Brain** | Scores each disruption event (D = 0–1) | Multi-signal weighted scoring model; real-time threshold evaluation |
| **Claim Estimation Engine** | Computes estimated income loss per event | Historical hourly earnings × disrupted hours × D score |
| **Trust Brain (Fraud Detection)** | Validates claims silently | GPS cross-check, login-log analysis, peer-clustering anomaly detection |
| **Adaptive Parametric Matrix** | Combines weather + platform + demand into a single score | Composite signal fusion |
| **Demand Forecasting** | Predicts next-week disruption risk | Seasonal + weather-forecast regression for admin dashboard |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        RIDER MOBILE APP                         │
│        Onboarding · Weekly Offer · Wallet · Dashboard           │
└───────────────────────────┬─────────────────────────────────────┘
                            │ REST / WebSocket
┌───────────────────────────▼─────────────────────────────────────┐
│                       API GATEWAY / BFF                         │
└──┬──────────────┬──────────────┬──────────────┬─────────────────┘
   │              │              │              │
   ▼              ▼              ▼              ▼
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────────┐
│  Rider   │ │  Policy  │ │ Claim /  │ │    Event / Trigger   │
│ Profile  │ │ Creation │ │  Payout  │ │       Service        │
│ Service  │ │ Service  │ │ Service  │ │                      │
└──────────┘ └──────────┘ └──────────┘ └──────┬───────────────┘
                                               │
                         ┌─────────────────────┼──────────────────┐
                         ▼                     ▼                  ▼
                  ┌────────────┐       ┌──────────────┐   ┌──────────────┐
                  │  Weather   │       │ Mock Swiggy/ │   │  Social/     │
                  │  API       │       │ Zomato API   │   │  Admin Feed  │
                  └────────────┘       └──────────────┘   └──────────────┘
                                               │
                         ┌─────────────────────▼──────────────────┐
                         │           AI DISRUPTION BRAIN          │
                         │  Disruption Score · Claim Estimate     │
                         │  Trust Brain · Fraud Detection         │
                         └────────────────────────────────────────┘
                                               │
                         ┌─────────────────────▼──────────────────┐
                         │         INCOME SMOOTHING WALLET        │
                         │     Risk Pool · Savings Split          │
                         │     UPI Payout Gateway (Sandbox)       │
                         └────────────────────────────────────────┘
```

---

## ✨ Key Features

### 🕐 Smart Shift Shield
Coverage is linked to **actual Swiggy/Zomato online hours**, not vague "working days." Riders configure a fixed number of **protected hours per week** (e.g., 25 hrs), with premium hours earning higher payouts.

### 📊 Adaptive Parametric Matrix
Instead of a single weather trigger, ShiftShield fuses **three disruption dimensions** into one score:
- Weather severity (rain, heat, fog)
- Platform disruption (outage duration, zone flags)
- Demand collapse (orders per rider vs. baseline)

### 💼 Income Smoothing Wallet
- Parametric payouts land here instantly (no wait for "claim processing")
- Unused premium savings (5–10%) accumulate and can be withdrawn monthly
- Visualized as a running weekly income graph so riders see their stability improving

### 🔒 Zero-Touch Claims
Riders never fill a form. The entire pipeline — detection → scoring → validation → payout — is automated and AI-driven.

### 📈 Admin Income Stability Index
Insurers and gig platforms see a per-zone **Income Stability Index** updated weekly, plus a disruption risk forecast for the coming week to manage reserve requirements.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Mobile App** | React Native / Flutter |
| **Backend API** | Node.js (Express) or Python (FastAPI) |
| **AI / ML** | Python · scikit-learn · custom scoring models |
| **Real-Time Events** | Apache Kafka / AWS EventBridge |
| **Database** | PostgreSQL (policy/earnings data) · Redis (real-time zone state) |
| **Weather Data** | OpenWeatherMap API · IMD data feeds |
| **Platform Integration** | Mock Swiggy/Zomato Rider API (sandbox) |
| **Payments** | Razorpay UPI Sandbox |
| **Infrastructure** | AWS / GCP · Docker · GitHub Actions CI/CD |
| **Insurance Core** | Guidewire PolicyCenter API (integration layer) |

---

## 🗺️ Development Roadmap

### Phase 1 — Hackathon MVP *(Current)*
- [x] Rider onboarding flow (phone OTP, mock platform ID link)
- [x] Risk profiling engine (historical earnings + zone risk score)
- [x] Weekly policy creation with parametric trigger definitions
- [x] Real-time disruption detection (weather API + mock platform signals)
- [x] AI Disruption Brain (multi-signal scoring)
- [x] Auto-claim engine with GPS validation
- [x] Income Smoothing Wallet + mock UPI payout
- [x] Rider dashboard and admin dashboard (MVP)

### Phase 2 — Post-Hackathon Pilot
- [ ] Live Swiggy/Zomato API integration (via official partner channels)
- [ ] Expanded trigger set: pollution (AQI), accident hotspots, road flooding maps
- [ ] ML model trained on 12+ months of real earnings + disruption data
- [ ] Regulatory sandbox filing (IRDAI Sandbox Framework)
- [ ] Pilot with 500–1,000 riders in 2 cities (Bengaluru + Coimbatore)
- [ ] Full fraud detection model with device fingerprinting
- [ ] Guidewire PolicyCenter deep integration for policy lifecycle management

### Phase 3 — Scale
- [ ] Expand to 10+ tier-1 and tier-2 cities
- [ ] Extend to other gig categories: cab drivers (Ola/Uber), blue-collar workers
- [ ] Group policy products for fleet operators and platform companies
- [ ] Reinsurance integration and actuarial model validation
- [ ] WhatsApp-based self-service (low-bandwidth, vernacular languages)
- [ ] Income Smoothing Wallet evolving into micro-savings and micro-credit product

---

## 📈 Expected Impact

| Metric | Projection (Year 1 Pilot) |
|---|---|
| Riders protected | 10,000+ |
| Average weekly premium | ₹100–₹150 |
| Average weekly payout per disruption | ₹400–₹900 |
| Income volatility reduction | 25–35% |
| Claim processing time | < 2 minutes (automated) |
| Cities covered | 5 (Phase 2) → 15+ (Phase 3) |

### Why It Matters

- 🔵 **For riders:** A genuine safety net against income shocks — affordable, automatic, transparent.
- 🟠 **For platforms (Swiggy/Zomato):** Higher rider retention and loyalty; less platform abandonment during disruption periods.
- 🟢 **For insurers:** A new, data-rich parametric product line with near-zero claims processing cost and rich behavioral data.
- 🏛️ **For regulators:** A model for gig-worker financial inclusion under India's evolving social protection framework.

> *ShiftShield turns disruption data into dignity — ensuring that when the rain falls, the payout rises.*

---

## 👥 Team

| Name | Role |
|---|---|
| — | Product & Strategy |
| — | AI / ML Engineering |
| — | Backend & Integrations |
| — | Mobile App & UX |

---

## 📄 License

This project was built for **Guidewire DEVTrails 2026** hackathon. All product concepts, models, and code in this repository are original work by the team.

---

*Built with ❤️ for India's gig workers — because every shift deserves a shield.*
