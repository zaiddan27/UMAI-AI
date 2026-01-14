import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { MainTabNavigator } from './MainTabNavigator';

// Screens
import { WelcomeScreen, ProfileSetupScreen, CropSelectionScreen, CameraScreen } from '../screens/Placeholders';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  // TODO: Check if user is onboarding to initiate initial route
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
    </Stack.Navigator>
  );
};
