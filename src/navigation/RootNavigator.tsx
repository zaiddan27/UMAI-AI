import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { MainTabNavigator } from './MainTabNavigator';

// Screens
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { ProfileSetupScreen } from '../screens/ProfileSetupScreen';
import { CropSelectionScreen } from '../screens/CropSelectionScreen';
import { CameraScreen } from '../screens/CameraScreen'; // Real Screen
import { AnalysisLoadingScreen } from '../screens/AnalysisLoadingScreen';
import { DiagnosisResultScreen } from '../screens/DiagnosisResultScreen';
import { TreatmentRecordScreen } from '../screens/TreatmentRecordScreen';
import { CalculatorScreen } from '../screens/CalculatorScreen';
import { ExpenseListScreen } from '../screens/ExpenseListScreen';
import { HarvestRecordScreen } from '../screens/HarvestRecordScreen'; // Real Screen

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Onboarding Flow */}
      <Stack.Group>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
      </Stack.Group>

      {/* Main App */}
      <Stack.Screen name="Main" component={MainTabNavigator} />

      {/* Feature Stacks */}
      <Stack.Screen name="CropSelection" component={CropSelectionScreen} options={{ presentation: 'modal' }}/>
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Analysis" component={AnalysisLoadingScreen} />
      <Stack.Screen name="DiagnosisResult" component={DiagnosisResultScreen} />
      <Stack.Screen name="TreatmentRecord" component={TreatmentRecordScreen} />
      <Stack.Screen name="Calculator" component={CalculatorScreen} />
      <Stack.Screen name="Expenses" component={ExpenseListScreen} />
      <Stack.Screen name="Harvests" component={HarvestRecordScreen} />
    </Stack.Navigator>
  );
};
