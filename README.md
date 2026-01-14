# UMA.AI Mobile App

**Offline-First Intelligent Farming Assistant**

UMA.AI is a mobile application designed to help farmers reduce waste, lower costs, and improve resilience through AI-powered disease detection and smart farm management tools. Built for low-bandwidth environments with an offline-first architecture.

---

## 🏗️ Technical Architecture

- **Platform:** Android & iOS (via React Native / Expo)
- **Language:** TypeScript
- **Backend:** Supabase (Auth, DB, Storage)
- **State Management:** Zustand
- **Persistence (Offline):** Expo SQLite (Local First) with Supabase Sync
- **Navigation:** React Navigation (Native Stack & Bottom Tabs)

---

## 📂 Project Structure

```
UMA_AI/
├── src/
│   ├── components/    # Reusable UI components (Buttons, Cards, Inputs)
│   ├── screens/       # Application screens (mapped to flow)
│   ├── navigation/    # Navigator definitions
│   ├── services/      # Business logic (AI, Calculator, Sync)
│   ├── database/      # SQLite schema and migration scripts
│   ├── store/         # Zustand global state stores
│   ├── types/         # TypeScript interfaces
│   └── assets/        # Images and Fonts
├── docs/              # Project documentation & specs
├── reference/         # Original HTML/Design mockups
└── app.json           # Expo configuration
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npx expo start
   ```

---

## 📱 Feature Roadmap

### 1. Disease Detection (AI)
- **Offline Inference:** Analyze crops directly on-device.
- **Workflow:** Select Crop → Capture → Analyze → Treatment Recommendations.

### 2. User Profile & Localization
- **Local Profile:** No server login required initially.
- **Language Support:** English, Cebuano, Tagalog.

### 3. Farm Tools
- **Fertilizer Calculator:** Cost optimization engine.
- **Expense Tracker:** Monitor farm input costs.
- **Harvest Records:** Track yield and ROI.

---

## � Documentation

- [Screen Flow & Navigation](docs/SCREEN-FLOW.md)
- [Reference Designs](reference/) - HTML Mockups for UI Layouts
- [Development Progress](progress.md)

---

**Note:** This is an engineering codebase. For visual references, please consult the `reference/` directory containing the component blueprints.
