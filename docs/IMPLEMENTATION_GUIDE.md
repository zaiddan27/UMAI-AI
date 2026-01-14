# Component Implementation Guide

This document maps the HTML reference files to the React Native component implementation strategy. Use the `reference/` folder to visually verify layout and content.

## 🎨 UI Component Mapping

We are converting the static HTML designs into reusable React Native components.

| HTML Element | React Native Component | Location | Model Property |
|--------------|------------------------|----------|----------------|
| `.header` | `<AppHeader />` | `src/components/shared` | `title`, `onBack` |
| `.btn-primary` | `<Button variant="primary" />` | `src/components/shared` | `onPress`, `label` |
| `.card` | `<InfoCard />` | `src/components/shared` | `children` |
| `.nav-bottom` | `<BottomTabs />` | `src/navigation` | N/A |
| `.input-field` | `<TextInputField />` | `src/components/shared` | `value`, `onChange` |

## 📱 Screen-to-Code Mapping

| Reference File | Screen Component | Route Name |
|----------------|------------------|------------|
| `01-welcome.html` | `WelcomeScreen.tsx` | `Welcome` |
| `02-profile-setup.html` | `ProfileSetupScreen.tsx` | `ProfileSetup` |
| `03-home-dashboard.html` | `HomeScreen.tsx` | `Home` |
| `04-crop-selection.html` | `CropSelectionScreen.tsx` | `CropSelection` |
| `05-camera-capture.html` | `CameraScreen.tsx` | `Camera` |
| `06-analyzing.html` | `AnalysisLoadingScreen.tsx` | `Analysis` |
| `07-disease-result.html` | `DiagnosisResultScreen.tsx` | `DiagnosisResult` |
| `08-record-treatment.html` | `TreatmentRecordScreen.tsx` | `TreatmentRecord` |
| `09-fertilizer-calculator.html` | `CalculatorInputScreen.tsx` | `CalculatorInput` |
| `10-calculator-result.html` | `CalculatorResultScreen.tsx` | `CalculatorResult` |
| `11-expense-tracker.html` | `ExpenseListScreen.tsx` | `Expenses` |
| `12-harvest-records.html` | `HarvestRecordScreen.tsx` | `Harvests` |

## 🛠 Design Tokens (From HTML CSS)

These values should be implemented in `src/theme/theme.ts`.

### Colors
- **Primary Green:** `#2ecc71` (Gradient Start) to `#27ae60` (Gradient End)
- **Primary Blue:** `#3498db` to `#2980b9`
- **Text Dark:** `#2c3e50`
- **Text Light:** `#7f8c8d`
- **Background:** `#f5f5f5`
- **Error:** `#dc3545`

### Spacing & Layout
- **Container Padding:** `20px`
- **Card Radius:** `15px`
- **Input Radius:** `12px`
- **Base Font Size:** `16px`
