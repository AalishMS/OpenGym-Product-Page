<div align="center">

# 🏋️‍♂️ OpenGym — Product Showcase & Landing Page

<p align="center">
  <strong>The official high-performance, modern product landing page for OpenGym — the open-source, offline-first workout tracker.</strong>
</p>

<p align="center">
  <a href="https://github.com/AalishMS/OpenGym"><img src="https://img.shields.io/badge/OpenGym-App%20Repo-00A8FF?style=for-the-badge&logo=github" alt="OpenGym App"></a>
  <a href="https://github.com/AalishMS/OpenGym/releases/latest"><img src="https://img.shields.io/badge/Download-Latest%20APK-22C55E?style=for-the-badge&logo=android" alt="Download APK"></a>
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React 19"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript"></a>
  <a href="https://vite.dev"><img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite" alt="Vite"></a>
  <a href="https://motion.dev"><img src="https://img.shields.io/badge/Framer%20Motion-13-FF0055?style=for-the-badge&logo=framer" alt="Framer Motion"></a>
</p>

---

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-key-features">Key Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-app-screenshots">Screenshots</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-configuration">Configuration</a> •
  <a href="#-related-projects">Related Projects</a>
</p>

</div>

---

## 📖 Overview

**OpenGym Product Page** is an interactive, design-focused web application built to showcase the **[OpenGym](https://github.com/AalishMS/OpenGym)** mobile app. It communicates OpenGym's core philosophy: *a fast, distraction-free training journal that works 100% offline with zero cloud friction.*

Engineered with **React 19**, **TypeScript**, **Vite 8**, and **Framer Motion**, the site delivers a tactile, app-like experience with fluid scroll-driven animations, interactive mockups, a live set logging simulator, and a real-time theme customizer.

---

## ✨ Key Features

### 📱 Realistic 3D Phone Hero
- Custom-crafted CSS 3D phone frame with realistic speaker, camera notch, and chassis highlights.
- Smooth cursor-tracking perspective tilt on desktop with spring-damped Framer Motion animation.
- Automatic fallback for devices with `prefers-reduced-motion`.

### 📜 Scroll-Driven Product Walkthrough
- Multi-stage storytelling that walks visitors through the core user journey:
  1. **Plan your week:** Building schedules, split routines, and bundled workout templates.
  2. **Log your session:** Fast rep/weight recording, smart auto-fill from previous sets, and RPE dials.
  3. **See your progress:** Automatic personal record (PR) tracking and interactive volume charts.
- Sticky phone frame with scroll-synced screen transitions powered by `IntersectionObserver`.
- Mobile tab bar with smooth layout transitions.

### 🏋️ Interactive Workout Logging Sandbox
- Hands-on interactive component allowing prospective users to experience the logging UX right on the web.
- Try entering weights, reps, and RPE ratings with real-time state feedback.

### 🎨 Live Accent Theme Customizer
- Instant preview of OpenGym's in-app customization engine.
- Switch between 7 authentic app accent palettes in real time:
  - ⚡ **Electric Blue** (`#00A8FF`)
  - 🍊 **Warm Amber** (`#FF9500`)
  - 🔥 **Deep Orange** (`#FF5722`)
  - 💖 **Hot Pink** (`#FF1493`)
  - 🌊 **Cyan** (`#00CED1`)
  - 🔮 **Purple** (`#8B5CF6`)
  - 🪙 **Steel Gray** (`#7C8AA0`)

### 🌐 Offline-First Architecture Highlight
- Clear explanation of OpenGym's local-first philosophy: on-device SQLite persistence, instant load times, zero telemetry, and conflict-free optional sync.

### ❓ Accordion FAQ & Resource Hub
- Answering top user questions regarding data export (JSON), installation via Android APK, multi-device sync, and privacy.

---

## 📸 App Screenshots

<div align="center">
  <table>
    <tr>
      <td align="center" width="25%">
        <img src="./public/screenshots/home.png" alt="Home Screen" width="100%" />
        <br />
        <b>Weekly Routine</b>
      </td>
      <td align="center" width="25%">
        <img src="./public/screenshots/workout.png" alt="Active Workout" width="100%" />
        <br />
        <b>Active Workout Logging</b>
      </td>
      <td align="center" width="25%">
        <img src="./public/screenshots/workout_keypad.png" alt="Custom Numeric Pad" width="100%" />
        <br />
        <b>Speed Keypad</b>
      </td>
      <td align="center" width="25%">
        <img src="./public/screenshots/statistics.png" alt="Progress & Analytics" width="100%" />
        <br />
        <b>Progress Analytics</b>
      </td>
    </tr>
  </table>
</div>

---

## 🛠️ Tech Stack

| Technology | Purpose | Why It Was Chosen |
| :--- | :--- | :--- |
| **React 19** | UI Library | Modern concurrent rendering, fast reconciliation, and clean component composition. |
| **TypeScript** | Type Safety | Strict typing across application state, config models, and UI props. |
| **Vite 8** | Build Tooling | Instant Hot Module Replacement (HMR) and lightning-fast production bundle generation. |
| **Framer Motion 13** | Animations | Hardware-accelerated transitions, gesture handling, and responsive scroll effects. |
| **Oxlint** | Linting | Ultra-fast Rust-based static code analysis. |
| **Custom Design System** | Styling | Crafted without heavy CSS frameworks, using modular CSS tokens and dark mode styling. |

### 🔤 Typography
- **Space Grotesk** — Display headings and brand wordmark (`> OpenGym`)
- **Inter** — High-legibility UI body and navigation typography
- **JetBrains Mono** — Numeric data, workout metrics, and timestamps

---

## 📁 Project Structure

```text
OpenGym_Product_Page/
├── public/
│   ├── favicon.svg             # Favicon
│   ├── icons.svg               # SVG sprite sheet
│   ├── og-image.png            # Open Graph social preview
│   └── screenshots/            # Hi-res app screenshots
│       ├── home.png
│       ├── home_dark.png
│       ├── statistics.png
│       ├── workout.png
│       └── workout_keypad.png
├── src/
│   ├── components/
│   │   ├── FAQ.tsx & .css           # Collapsible FAQ accordion
│   │   ├── Footer.tsx & .css        # Site footer & release downloads
│   │   ├── Header.tsx & .css        # Sticky navigation bar & links
│   │   ├── Hero.tsx & .css          # 3D interactive hero showcase
│   │   ├── LoggingDemo.tsx & .css   # Interactive set-logging simulator
│   │   ├── OfflineSection.tsx & .css# Offline-first feature breakdown
│   │   ├── Personalization.tsx &.css# Live accent theme switcher
│   │   ├── PhoneFrame.tsx & .css    # Reusable 3D phone chassis component
│   │   └── ProductStory.tsx & .css  # Scroll-driven narrative feature deck
│   ├── App.tsx                      # Page layout composition
│   ├── config.ts                    # Single source of truth for site copy & data
│   ├── index.css                    # Design tokens, reset, & typography
│   └── main.tsx                     # React entrypoint
├── index.html                       # HTML5 template & SEO meta tags
├── package.json                     # Dependencies & npm scripts
├── tsconfig.json                    # TypeScript compiler configuration
└── vite.config.ts                   # Vite configuration
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18.0 or higher recommended)
- **npm** (or `pnpm` / `yarn`)

### 1. Clone the Repository
```bash
git clone https://github.com/AalishMS/OpenGym-Product-Page.git
cd OpenGym-Product-Page
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the site.

### 4. Build for Production
```bash
npm run build
```
The optimized production output will be generated in the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

## ⚙️ Configuration & Content Customization

All text content, URLs, sample workout routines, FAQ questions, and theme options are consolidated into a single configuration file:
[`src/config.ts`](./src/config.ts).

```typescript
export const config = {
  brand: {
    name: 'OpenGym',
    wordmark: '> OpenGym',
    tagline: 'A training journal, brought to life.',
  },
  links: {
    download: 'https://github.com/AalishMS/OpenGym/releases/latest',
    repository: 'https://github.com/AalishMS/OpenGym',
  },
  // Customize app accents, sample routines, FAQs, and more...
};
```

Updating this file automatically propagates changes across the entire product page without modifying individual UI components.

---

## 🔗 Related Projects

- 📱 **[OpenGym (Mobile App)](https://github.com/AalishMS/OpenGym)** — The official Flutter-based mobile workout tracker.
- 📝 **[OpenGym JSON Editor](https://github.com/AalishMS/OpenGym-JSON-Editor-)** — Web utility for desktop workout template creation and editing.
- 📦 **[Latest Releases](https://github.com/AalishMS/OpenGym/releases/latest)** — Direct Android APK downloads.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) (or the corresponding open-source license of the OpenGym project).

<div align="center">
  <sub>Built with ❤️ for lifters who value focus, speed, and privacy.</sub>
</div>
