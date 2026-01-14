import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme/theme';
import { WeatherWidget } from '../components/dashboard/WeatherWidget';
import { RecentScans } from '../components/dashboard/RecentScans';
import { Button } from '../components/shared/Button';
import { useNavigation } from '@react-navigation/native';
import db from '../database/db';
import { FeatureCard } from '../components/dashboard/FeatureCard';

// Icons
// const iconCalculator = require('../assets/icons/calculator.png');
// const iconExpenses = require('../assets/icons/expenses.png');
// const iconHarvest = require('../assets/icons/harvest.png');

export const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const [userName, setUserName] = useState('Farmer');
  const [refreshing, setRefreshing] = useState(false);

  // Initial Load
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const result: any = await db.getFirstAsync('SELECT full_name FROM users LIMIT 1');
      if (result) {
        setUserName(result.full_name);
      }
    } catch (e) {
      console.log('Error loading profile', e);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Reload logic here (weather, scans)
    loadProfile();
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Maayong Buntag,</Text>
            <Text style={styles.name}>{userName}</Text>
          </View>
          <View style={styles.avatarPlaceholder} />
        </View>

        <WeatherWidget />

        <View style={styles.actionContainer}>
            <Button 
                label="Scan Plant for Disease" 
                onPress={() => navigation.navigate('CropSelection')}
                style={{ height: 64, backgroundColor: theme.colors.primaryGreen }} 
            />
        </View>

        <RecentScans />

        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Farm Tools</Text>
        </View>

        <View style={styles.grid}>
             <FeatureCard 
                title="Calculator" 
                iconName="calculator"
                onPress={() => navigation.navigate('Calculator')} 
             />
             <FeatureCard 
                title="Expenses" 
                iconName="wallet"
                onPress={() => navigation.navigate('Expenses')} 
             />
             <FeatureCard 
                title="Harvests" 
                iconName="leaf"
                onPress={() => navigation.navigate('Harvests')} 
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
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  greeting: {
    fontSize: theme.typography.size.md,
    color: theme.colors.text.light,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text.dark,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ddd', // Could replace with profile icon later
  },
  actionContainer: {
    marginVertical: 20,
  },
  sectionHeader: {
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text.dark,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});
