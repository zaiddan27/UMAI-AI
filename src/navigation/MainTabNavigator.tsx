import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { MainTabParamList } from '../types/navigation';
import { theme } from '../theme/theme';
import { Ionicons } from '@expo/vector-icons';

// Screens
import { HomeScreen } from '../screens/HomeScreen';
import { ExpenseListScreen } from '../screens/ExpenseListScreen';
import { HarvestRecordScreen } from '../screens/HarvestRecordScreen';
import { UserProfileScreen } from '../screens/Placeholders';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primaryGreen,
        tabBarInactiveTintColor: theme.colors.text.light,
        tabBarStyle: {
          height: 70, // Increased height for better spacing
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Scan') iconName = 'scan-circle'; // Not used in standard tab, handled below
          else if (route.name === 'Expenses') iconName = focused ? 'wallet' : 'wallet-outline';
          else if (route.name === 'Harvests') iconName = focused ? 'leaf' : 'leaf-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';

          // Special styling for Scan button
          if (route.name === 'Scan') {
             return (
               <View style={{
                   width: 60,
                   height: 60,
                   borderRadius: 30,
                   backgroundColor: theme.colors.primaryGreen,
                   justifyContent: 'center',
                   alignItems: 'center',
                   marginBottom: 30, // Move it up
                   elevation: 5,
                   shadowColor: "#000",
                   shadowOffset: { width: 0, height: 4 },
                   shadowOpacity: 0.3,
                   shadowRadius: 4.65,
               }}>
                   <Ionicons name="scan" size={32} color="#fff" />
               </View>
             )
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 4,
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Harvests" component={HarvestRecordScreen} />
      
      <Tab.Screen 
        name="Scan" 
        component={HomeScreen} // Component doesn't matter as we intercept press
        options={{
            tabBarLabel: ''
        }}
        listeners={({ navigation }) => ({
        tabPress: (e) => {
          e.preventDefault();
          navigation.navigate('CropSelection'); // Jump out of tabs to Stack
        },
      })} />
      
      <Tab.Screen name="Expenses" component={ExpenseListScreen} />
      <Tab.Screen name="Profile" component={UserProfileScreen} />
    </Tab.Navigator>
  );
};
