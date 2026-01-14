import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme/theme';
import { Button } from '../components/shared/Button';
import { Input } from '../components/shared/Input';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const CalculatorScreen = () => {
  const navigation = useNavigation();
  const [landArea, setLandArea] = useState('');
  const [cropType, setCropType] = useState('Corn'); // Default
  const [result, setResult] = useState<null | { fertilizer: string, seeds: string }>(null);

  const calculate = () => {
    const area = parseFloat(landArea);
    if (!area || isNaN(area)) {
        Alert.alert('Invalid Input', 'Please enter a valid land area in hectares.');
        return;
    }

    // Mock Calculation Logic (Simple formula for demo)
    // Corn: 20kg seeds/ha, 4 bags fertilizer/ha
    // Rice: 40kg seeds/ha, 6 bags fertilizer/ha
    
    let seedRate = 20;
    let fertRate = 4;

    if (cropType.toLowerCase().includes('rice')) {
        seedRate = 40;
        fertRate = 6;
    }

    setResult({
        seeds: `${(area * seedRate).toFixed(1)} kg`,
        fertilizer: `${(area * fertRate).toFixed(1)} bags (50kg)`
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
           <Ionicons name="arrow-back" size={24} color={theme.colors.text.dark} />
        </TouchableOpacity>
        <Text style={styles.title}>Farm Calculator</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.description}>
          Estimate your input provisions based on your land area.
        </Text>

        <View style={styles.formCard}>
            <Input
                label="Land Area (Hectares)"
                placeholder="e.g. 1.5"
                value={landArea}
                onChangeText={setLandArea}
            />
            
            {/* Simple Crop Toggle for MVP */}
            <Text style={styles.label}>Crop Type</Text>
            <View style={styles.toggleRow}>
                <TouchableOpacity 
                    style={[styles.toggleBtn, cropType === 'Corn' && styles.toggleActive]}
                    onPress={() => setCropType('Corn')}
                >
                    <Text style={[styles.toggleText, cropType === 'Corn' && styles.textActive]}>Corn</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.toggleBtn, cropType === 'Rice' && styles.toggleActive]}
                    onPress={() => setCropType('Rice')}
                >
                    <Text style={[styles.toggleText, cropType === 'Rice' && styles.textActive]}>Rice</Text>
                </TouchableOpacity>
            </View>

            <View style={{ height: 20 }} />
            <Button label="Calculate" onPress={calculate} />
        </View>

        {result && (
            <View style={styles.resultCard}>
                <Text style={styles.resultTitle}>Estimated Requirements</Text>
                
                <View style={styles.resultRow}>
                    <Ionicons name="leaf" size={24} color={theme.colors.primaryGreen} />
                    <View style={styles.resultTextContainer}>
                        <Text style={styles.resultLabel}>Seeds Needed</Text>
                        <Text style={styles.resultValue}>{result.seeds}</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.resultRow}>
                    <Ionicons name="beaker" size={24} color={theme.colors.primaryBlue} />
                    <View style={styles.resultTextContainer}>
                        <Text style={styles.resultLabel}>Fertilizer Needed</Text>
                        <Text style={styles.resultValue}>{result.fertilizer}</Text>
                    </View>
                </View>

                <Text style={styles.disclaimer}>
                    *Estimates only. Actual values may vary based on soil condition and variety.
                </Text>
            </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
};

// Start using TouchableOpacity from react-native instead of just relying on imports
import { TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
      marginRight: 15
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text.dark,
  },
  content: {
    padding: 20,
  },
  description: {
    marginBottom: 20,
    color: theme.colors.text.light,
    lineHeight: 20,
  },
  formCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text.dark,
    marginBottom: 10,
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 4,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  toggleActive: {
    backgroundColor: '#fff',
    elevation: 1,
  },
  toggleText: {
    fontWeight: '600',
    color: theme.colors.text.light,
  },
  textActive: {
    color: theme.colors.primaryGreen,
  },
  resultCard: {
    backgroundColor: theme.colors.primaryGreen,
    padding: 20,
    borderRadius: 15,
  },
  resultTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  resultTextContainer: {
    marginLeft: 15,
  },
  resultLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  resultValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginVertical: 10,
  },
  disclaimer: {
    marginTop: 10,
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
    fontStyle: 'italic',
  }

});
