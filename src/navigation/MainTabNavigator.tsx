import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../types/navigation';
import { theme } from '../theme/theme';
import { Ionicons } from '@expo/vector-icons';

// Screens
import { HomeScreen, ExpenseListScreen, HarvestRecordScreen, UserProfileScreen } from '../screens/Placeholders';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primaryGreen,
        tabBarInactiveTintColor: theme.colors.text.light,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Scan') iconName = 'camera';
          else if (route.name === 'Expenses') iconName = focused ? 'wallet' : 'wallet-outline';
          else if (route.name === 'Harvests') iconName = focused ? 'leaf' : 'leaf-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';

          // Special styling for Scan button
          if (route.name === 'Scan') {
             return (
               <Ionicons name="scan-circle" size={40} color={theme.colors.primaryGreen} style={{ marginTop: -10 }} />
             )
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Scan" component={HomeScreen} listeners={({ navigation }) => ({
        tabPress: (e) => {
          e.preventDefault();
          navigation.navigate('CropSelection'); // Jump out of tabs to Stack
        },
      })} />
      <Tab.Screen name="Harvests" component={HarvestRecordScreen} />
      <Tab.Screen name="Expenses" component={ExpenseListScreen} />
      <Tab.Screen name="Profile" component={UserProfileScreen} />
    </Tab.Navigator>
  );
};
