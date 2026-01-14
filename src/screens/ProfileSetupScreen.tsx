   import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Button } from '../components/shared/Button';
import { Input } from '../components/shared/Input';
import { theme } from '../theme/theme';
import db from '../database/db'; // Import default db instance
import * as Crypto from 'expo-crypto';

export const ProfileSetupScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [fullName, setFullName] = useState('');
  const [farmName, setFarmName] = useState('');
  const [region, setRegion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!fullName || !farmName) {
      Alert.alert('Missing Info', 'Please enter your Name and Farm Name.');
      return;
    }

    setLoading(true);
    try {
      const generatedId = Crypto.randomUUID();
      
      // Save locally to SQLite
      await db.runAsync(
        'INSERT INTO users (id, full_name, farm_name, region) VALUES (?, ?, ?, ?)',
        [generatedId, fullName, farmName, region]
      );
      
      console.log('User saved locally:', generatedId);
      
      // Navigate to Home
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
      
    } catch (error) {
      console.error('Save failed:', error);
      Alert.alert('Error', 'Could not save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Profile</Text>
          <Text style={styles.subtitle}>
            Tell us about you and your farm so we can customize your experience.
          </Text>
        </View>

        <View style={styles.form}>
          <Input 
            label="Full Name" 
            placeholder="Juan dela Cruz" 
            value={fullName}
            onChangeText={setFullName}
          />
          
          <Input 
            label="Farm Name" 
            placeholder="Sunshine Farm"
            value={farmName}
            onChangeText={setFarmName}
          />
          
          <Input 
            label="Region / Location" 
            placeholder="Mambajao, Camiguin"
            value={region}
            onChangeText={setRegion}
          />
        </View>

        <View style={styles.footer}>
          <Button 
            label="Save & Continue" 
            onPress={handleSave} 
            loading={loading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  content: {
    padding: theme.spacing.lg,
  },
  header: {
    marginBottom: 40,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text.dark,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.text.light,
    lineHeight: 24,
  },
  form: {
    marginBottom: 40,
  },
  footer: {
    marginTop: 'auto',
  },
});
