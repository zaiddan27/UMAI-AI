import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { theme } from '../../theme/theme';
import db from '../../database/db';
import { useNavigation } from '@react-navigation/native';

interface ScanItem {
  id: string;
  crop_type: string;
  disease_detected: string | null;
  timestamp: number;
}

export const RecentScans = () => {
  const [scans, setScans] = useState<ScanItem[]>([]);
  
  const fetchScans = async () => {
    try {
      const result = await db.getAllAsync(
        'SELECT id, crop_type, disease_detected, timestamp FROM scans ORDER BY timestamp DESC LIMIT 5'
      ) as ScanItem[];
      setScans(result);
    } catch (error) {
      console.log('Error fetching scans', error);
    }
  };

  useEffect(() => {
    fetchScans();
    // In a real app, subscribe to focus events to refresh
  }, []);

  const renderItem = ({ item }: { item: ScanItem }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.iconPlaceholder} />
      <View>
        <Text style={styles.crop}>{item.crop_type}</Text>
        <Text style={styles.disease}>
          {item.disease_detected || 'Healthy'}
        </Text>
        <Text style={styles.time}>
          {new Date(item.timestamp).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (scans.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No recent scans.</Text>
        <Text style={styles.emptySubtext}>Tap the camera to start.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Activity</Text>
      <FlatList
        data={scans}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 5 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: theme.typography.size.lg,
    fontWeight: 'bold',
    color: theme.colors.text.dark,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: theme.borderRadius.md,
    padding: 15,
    marginRight: 15,
    width: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.background.main,
    borderRadius: 20,
    marginBottom: 10,
  },
  crop: {
    fontWeight: 'bold',
    color: theme.colors.text.dark,
  },
  disease: {
    fontSize: theme.typography.size.xs,
    color: theme.colors.status.danger,
    marginTop: 2,
  },
  time: {
    fontSize: 10,
    color: theme.colors.text.light,
    marginTop: 5,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  emptyText: {
    color: theme.colors.text.light,
    fontWeight: 'bold',
  },
  emptySubtext: {
    color: theme.colors.text.light,
    fontSize: 12,
  },
});
