import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme/theme';
import { Button } from '../components/shared/Button';
import { Input } from '../components/shared/Input';
import { useNavigation, useRoute } from '@react-navigation/native';
import db from '../database/db';
import * as Crypto from 'expo-crypto';

export const TreatmentRecordScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  // In real flow, we get scanId from previous screen
  const { scanId } = route.params || { scanId: 'mock-scan-id' }; 

  const [date, setDate] = useState(new Date().toDateString());
  const [productName, setProductName] = useState('');
  const [cost, setCost] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!productName) {
        Alert.alert('Required', 'Please enter the product name used.');
        return;
    }

    setLoading(true);
    try {
        const id = Crypto.randomUUID();
        const timestamp = Date.now();
        
        // 1. Save Scan Record (Mocking the scan save for now if not exists, in real flow scan is saved earlier)
        // For MVP, we'll just save the treatment linking to a hypothetical scan or the passed ID
        
        await db.runAsync(
            `INSERT INTO treatments (id, scan_id, treatment_name, treatment_type, cost, notes, timestamp)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [id, scanId, productName, 'synthetic', parseFloat(cost) || 0, notes, timestamp]
        );

        Alert.alert('Success', 'Treatment recorded successfully!', [
            { text: 'Back to Home', onPress: () => navigation.navigate('Main') }
        ]);
        
    } catch (error) {
        console.log('Error saving treatment:', error);
        Alert.alert('Error', 'Could not save treatment.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Record Treatment</Text>
        <Text style={styles.subtitle}>Keep track of your applications to monitor effectiveness and costs.</Text>

        <View style={styles.form}>
            <Input 
                label="Date Applied" 
                value={date} 
                onChangeText={setDate}
                placeholder="YYYY-MM-DD"
            />
            <Input 
                label="Product / Method Name" 
                value={productName} 
                onChangeText={setProductName}
                placeholder="e.g., Neem Oil, Amistar"
            />
             <Input 
                label="Cost (PHP)" 
                value={cost} 
                onChangeText={setCost}
                placeholder="0.00"
            />
            <Input 
                label="Notes" 
                value={notes} 
                onChangeText={setNotes}
                placeholder="Observation..."
                style={{ height: 100 }}
            />
        </View>

        <Button 
            label="Save Record" 
            onPress={handleSave}
            loading={loading}
        />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text.dark,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.text.light,
    marginBottom: 30,
  },
  form: {
    marginBottom: 20,
  }
});
