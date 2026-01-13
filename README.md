# 🛡️ Sentinel Secure
### Local-First Ransomware Detection & Response Dashboard

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active_Development-brightgreen?style=for-the-badge)

**Sentinel Secure** is a lightweight, client-side forensics and security dashboard tailored for Indian SMEs. It provides file anomaly detection, secure tools, and incident response workflows without sending sensitive data to the cloud.

Built with a distinct **Neo-Brutalist** design aesthetic using **React (Vite)** and **Tailwind CSS**.

## 🚀 Key Features

### 🔍 Forensics Engine (Real Logic)
* **Shannon Entropy Analysis:** Detects high-randomness files (a signature of encryption/ransomware) locally in the browser.
* **SHA-256 Hashing:** Generates cryptographic hashes of files using the native Web Crypto API.
* **Magic Byte Detection:** Identifies "Extension Spoofing" (e.g., an `.exe` disguised as a `.pdf`) by reading raw ArrayBuffers.

### ⚡ System Monitoring
* **Live Heartbeat:** Monitors network latency and render loop performance.
* **Hardware Stats:** Displays available CPU cores and Device Memory via Navigator API.
* **Battery & Network:** Real-time listeners for connection status and battery health.

### 🛠️ Security Tools Suite
* **CSPRNG Password Generator:** Uses `window.crypto.getRandomValues` for cryptographically secure passwords.
* **Phishing Link Detector:** Heuristic analysis of URLs (IP usage, typosquatting, suspicious TLDs).
* **Browser Fingerprinting:** Displays data exposed to websites via the Navigator object.
* **Secure Local Vault:** AES-simulated local storage for sensitive notes.
* **Honeyfile Generator:** Creates dummy files to detect unauthorized modification.

### 🚨 Incident Response
* **Panic Button:** One-click WhatsApp API integration to alert the support team immediately.
* **Local Incident Log:** Persistent logging of security events in LocalStorage.

## 🛠️ Tech Stack

| Category | Technology | Usage |
| :--- | :--- | :--- |
| **Frontend Framework** | ![React](https://img.shields.io/badge/-React-black?logo=react) | Core Component Logic |
| **Build Tool** | ![Vite](https://img.shields.io/badge/-Vite-black?logo=vite) | Fast HMR & Bundling |
| **Styling** | ![Tailwind](https://img.shields.io/badge/-Tailwind-black?logo=tailwindcss) | Neo-Brutalist Design System |
| **Routing** | ![Router](https://img.shields.io/badge/-React_Router-black?logo=react-router) | SPA Navigation |
| **Icons** | ![Lucide](https://img.shields.io/badge/-Lucide_React-black?logo=lucide) | Consistent UI Iconography |
| **Cryptography** | `Web Crypto API` | SHA-256, Entropy, RNG |
| **Auth** | `ReqRes API` | Simulated JWT Session Management |

## 📂 Directory Structure

```text
/sentinel-secure
├── /public                   # Static Assets
└── /src
    ├── /assets               # Images/Icons
    ├── /components           # Reusable UI (Header, Footer, Buttons)
    ├── /pages
    │   ├── /Auth             # Login & Signup (Real Logic)
    │   ├── /Legal            # Privacy, Terms, Disclaimer
    │   ├── /Tools            # Pass Gen, Speed Test, Browser Check
    │   ├── Dashboard.jsx     # Main Forensics Tool
    │   └── Home.jsx          # Landing Page
    ├── /utils
    │   └── cryptoLogic.js    # 🧠 THE BRAIN (Entropy & Math Logic)
    ├── App.jsx               # Route Definitions
    └── index.css             # Tailwind Directives

```

## ⚡ Installation & Setup

Follow these steps to run the project locally.

### Prerequisites

* Node.js (v16+)
* npm or yarn

### 1. Clone the Repository

```bash
git clone [https://github.com/aammisetty/sentinel-secure.git](https://github.com/aammisetty/sentinel-secure.git)
cd sentinel-secure

```

### 2. Install Dependencies

```bash
npm install
# Installs React, Vite, Tailwind, Lucide-React, React-Router-Dom

```

### 3. Initialize Tailwind (If not configured)

*Note: The repo comes with config, but if starting fresh:*

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

```

### 4. Run Development Server

```bash
npm run dev

```

> Open your browser to `http://localhost:5173`

## 🧠 Under The Hood: The "Real Logic"

This project deliberately avoids mock data for its tools. Here is how the core features function:

### 1. Entropy Calculation (Ransomware Detection)

We calculate the **Shannon Entropy** of a file's byte stream.

* **Formula:** 
* **Logic:** Text files usually have entropy ~3.5-4.5. Encrypted files (Ransomware) appear as high-noise data, resulting in entropy > 7.5 (max is 8.0).

### 2. Magic Byte Analysis

We read the first 4 bytes (`ArrayBuffer`) of any uploaded file to verify its signature against its extension.

* *Example:* If a file is named `invoice.pdf` but the header is `4D 5A` (The DOS MZ executable header), the dashboard flags it as **CRITICAL**.

### 3. Authentication

* **Demo User:** Uses `reqres.in` public API to POST credentials and receive a real JWT token.
* **New User:** Uses LocalStorage with a simulated 2-step OTP process (Browser Alert -> Verify -> Session).

## 📸 Screenshots

| Landing Page | Command Center |
| --- | --- |
| *(Hero section with live stats)* | *(File Scanner & Lockdown)* |

| Phishing Detector | Secure Tools |
| --- | --- |
| *(URL Heuristic Scan)* | *(Password Gen & IP Lookup)* |

## ⚠️ Disclaimer

**Sentinel Secure** is a forensic aid and educational tool. It is **NOT** a replacement for full-suite Antivirus software or Endpoint Detection and Response (EDR) systems.

* It does not actively block processes.
* It analyzes files you manually select.
* The "Lockdown" feature sends a WhatsApp message; it does not mechanically sever network cables.

## 👨‍💻 Developer

**Arun Ammisetty**

* **Website:** [arunammisetty.in](https://www.google.com/search?q=https://arunammisetty.in)
* **GitHub:** [@aammisetty](https://github.com/aammisetty)
* **Role:** Developer & Security Researcher

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://www.google.com/search?q=LICENSE) file for details.

```
