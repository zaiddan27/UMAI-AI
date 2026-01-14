import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  // Onboarding
  Welcome: undefined;
  ProfileSetup: undefined;

  // Main App (Tab Navigator)
  Main: NavigatorScreenParams<MainTabParamList>;

  // Sub-flows
  CropSelection: undefined;
  Camera: undefined;
  Analysis: { imageUri: string };
  DiagnosisResult: { scanId: string };
  TreatmentRecord: { scanId: string; diseaseId: string };
  
  // Tools
  CalculatorInput: undefined;
  CalculatorResult: { recommendationId: string };
};

export type MainTabParamList = {
  Home: undefined;
  Scan: undefined; // Takes you to CropSelection usually
  Expenses: undefined;
  Harvests: undefined;
  Profile: undefined;
};
