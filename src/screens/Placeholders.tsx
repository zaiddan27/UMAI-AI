import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlaceholderScreen = ({ name }: { name: string }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{name} Screen</Text>
    <Text style={styles.subtext}>Coming Soon</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtext: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
});

export const WelcomeScreen = () => <PlaceholderScreen name="Welcome" />;
export const ProfileSetupScreen = () => <PlaceholderScreen name="Profile Setup" />;
export const HomeScreen = () => <PlaceholderScreen name="Home Dashboard" />;
export const CropSelectionScreen = () => <PlaceholderScreen name="Crop Selection" />;
export const CameraScreen = () => <PlaceholderScreen name="Camera" />;
export const ExpenseListScreen = () => <PlaceholderScreen name="Expenses" />;
export const HarvestRecordScreen = () => <PlaceholderScreen name="Harvest Records" />;
export const UserProfileScreen = () => <PlaceholderScreen name="User Profile" />;
