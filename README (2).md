# ⚡ ShiftShield — Parametric Income Protection for Gig Workers

> **Your shift ends. Your income shouldn't.**

[![Hackathon](https://img.shields.io/badge/Guidewire-DEVTrails%202026-f59e0b?style=for-the-badge)](https://devtrails.guidewire.com)
[![Live Demo](https://img.shields.io/badge/Live-Demo-10b981?style=for-the-badge)](https://your-username.github.io/shiftshield)
[![License](https://img.shields.io/badge/License-MIT-3b82f6?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Prototype-f59e0b?style=for-the-badge)](#)

---

## 🚨 The Problem

Over **50 million gig workers** in India — delivery riders, cab drivers, grocery runners — earn daily wages with **zero income protection**. A single heavy rain, a platform outage, or an extreme heatwave can wipe out an entire week's earnings. Traditional insurance demands paperwork, waiting periods, and claim agents. Workers can't afford any of that.

---

## 💡 The Solution

**ShiftShield** is a parametric income insurance platform built specifically for the gig economy. It uses **real-world disruption events as automatic triggers** — the moment a qualifying event is detected, the payout lands in the worker's wallet instantly. No forms. No calls. No waiting.

> **Parametric = the event *is* the claim.** The trigger fires. The payout happens. That's it.

---

## ✨ Features

### 🪪 Worker Registration
- Name, work type (Delivery / Cab / Grocery), and location risk zone
- Risk zone selection adjusts premium in real time

### 📊 Dynamic Premium Calculation
Premiums are calculated dynamically based on:
- **Base plan price** (₹100 Basic / ₹150 Premium)
- **Location risk surcharge** (Safe +₹0 / Medium +₹20 / High +₹40)
- **Weather condition surcharge** (Normal +₹0 / Monsoon +₹25 / Extreme +₹50)

### 🗂️ Plan Selection

| Feature | Basic Shield | Premium Shield |
|---|---|---|
| Weekly Premium | From ₹100 | From ₹150 |
| Max Payout | ₹2,000/week | ₹5,000/week |
| Triggers Covered | Rain, Heatwave, Demand Drop | All 4 triggers |
| Payout Multiplier | 1.0× | 1.4× |

### ⚡ Automated Trigger Buttons

| Trigger | Coverage |
|---|---|
| 🌧️ Heavy Rain | Basic + Premium |
| 🌡️ Heatwave | Basic + Premium |
| 📉 Demand Drop | Basic + Premium |
| 📵 App Outage | Premium only |

Each trigger:
1. Shows a processing overlay (claim pipeline simulation)
2. Generates a **random disruption score** (0.30–0.98)
3. Calculates: `payout = score × 500 × plan_multiplier`
4. Displays result with score bar, payout amount
5. Credits wallet automatically

### 💰 Wallet Dashboard
- Live wallet balance (updated after every trigger)
- Total earned, total events, premium paid
- Full transaction history with timestamps and disruption scores

---

## 🎮 How to Use the Demo

1. Open `index.html` in any browser
2. Click **"Get Protected Now"**
3. Enter your name, pick a work type, select location risk → **Continue**
4. Toggle weather condition to see premium update live
5. Select **Basic** or **Premium** plan → **Activate Coverage**
6. Go to the **⚡ Triggers** tab
7. Tap any disruption button (e.g., 🌧️ Heavy Rain)
8. Watch the zero-touch claim process in real time
9. Check the **💰 Wallet** tab to see your credited payout

---

## 📸 Screenshots

<table>
  <tr>
    <th align="center">Landing</th>
    <th align="center">Registration</th>
    <th align="center">Plan Selection</th>
  </tr>
  <tr>
    <td align="center"><img width="240" src="https://github.com/user-attachments/assets/61b2a301-23db-4d65-826d-88f9ccc517cf" alt="Landing Screen"/></td>
    <td align="center"><img width="240" src="https://github.com/user-attachments/assets/e685d7ef-6df8-4066-b8e6-2f7bec55b407" alt="Registration Screen"/></td>
    <td align="center"><img width="240" src="https://github.com/user-attachments/assets/2ffd134e-3928-4412-bbc5-a91b57b250f7" alt="Plan Selection Screen"/></td>
  </tr>
</table>

<table>
  <tr>
    <th align="center">Premium Calculator</th>
    <th align="center">Dashboard</th>
    <th align="center">Wallet</th>
  </tr>
  <tr>
    <td align="center"><img width="240" src="https://github.com/user-attachments/assets/55dbf52b-c21f-4ae6-b995-1c5b9a804397" alt="Premium Calculator"/></td>
    <td align="center"><img width="240" src="https://github.com/user-attachments/assets/acdbd6d9-e955-431a-b6e9-08f49150dda1" alt="Dashboard Screen"/></td>
    <td align="center"><img width="240" src="https://github.com/user-attachments/assets/cdef24f4-4366-4f25-a065-39b6205c81bb" alt="Wallet Screen"/></td>
  </tr>
</table>

<table>
  <tr>
    <th align="center" colspan="2">Trigger Fired — Auto Claim Pipeline</th>
  </tr>
  <tr>
    <td align="center"><img width="320" src="https://github.com/user-attachments/assets/170d555e-733a-4b03-a2ea-be2ed924238d" alt="Trigger Processing"/></td>
    <td align="center"><img width="320" src="https://github.com/user-attachments/assets/105760f2-e12b-4b0d-abe7-2fc967ca10da" alt="Trigger Result"/></td>
  </tr>
</table>

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic, accessible) |
| Styling | CSS3 (custom properties, grid, flexbox, animations) |
| Logic | Vanilla JavaScript ES6+ |
| Fonts | Manrope + Space Mono |
| Storage | `localStorage` for session persistence |
| Deployment | GitHub Pages (zero dependencies) |

> **No frameworks. No npm. No build tools.** One folder, three files, open and go.

---

## 🚀 How to Run Locally

```bash
# Clone the repository
git clone https://github.com/your-username/shiftshield.git

# Navigate into the project
cd shiftshield

# Open in browser (macOS)
open index.html

# Open in browser (Windows)
start index.html

# Open in browser (Linux)
xdg-open index.html
```

Or simply **double-click `index.html`** — no server needed.

---

## 🌐 GitHub Pages Deployment

1. Push the repo to GitHub
2. Go to your repo → **Settings** → **Pages**
3. Under **Source**, set:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**
5. Your app is live at: `https://your-username.github.io/shiftshield`

> ⏱️ GitHub Pages typically goes live within 60–90 seconds.

---

## 📁 Project Structure

```
shiftshield/
├── index.html          ← App structure and screens
├── style.css           ← All styles (dark fintech theme)
├── script.js           ← All logic (state, triggers, wallet)
├── README.md           ← This file
├── LICENSE             ← MIT License
└── screenshots/        ← Add demo screenshots here
```

---

## 🏆 Hackathon Submission

**Event:** Guidewire DEVTrails 2026  
**Track:** Emerging Risk / Gig Economy Insurance

### Submission Description

ShiftShield is a parametric income insurance platform for gig workers — delivery riders, cab drivers, and grocery partners — who lose earnings every time it rains, a platform goes down, or a heatwave locks up the city. Unlike traditional insurance that demands forms and days of waiting, ShiftShield uses real-world disruption events as automatic claim triggers: the moment a qualifying event fires, the payout hits the worker's wallet instantly with zero human intervention. What makes it unique is the combination of shift-based dynamic pricing (premiums recalculate live based on work type, location risk, and weather conditions) with a fully automated zero-touch claims pipeline that settles in under 2 seconds. The live demo walks through complete registration, real-time premium calculation across risk variables, plan selection, and four disruption trigger simulations — each producing a scored, auto-processed claim credited directly to an in-app wallet.

---

## 📄 License

MIT © 2026 — Free to use, fork, and extend.

---

<div align="center">
  <strong>⚡ Built for Guidewire DEVTrails 2026</strong><br/>
  <em>Because gig workers deserve protection that works as fast as they do.</em>
</div>
