import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';
import { Ionicons } from '@expo/vector-icons';

export const WeatherWidget = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.location}>Camiguin, PH</Text>
          <Text style={styles.date}>Today, {new Date().toLocaleDateString()}</Text>
        </View>
        <Ionicons name="partly-sunny" size={32} color={theme.colors.primaryBlue} />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.temp}>28°C</Text>
        <Text style={styles.condition}>Mostly Sunny</Text>
      </View>

      <Text style={styles.alert}>🌱 Perfect day for planting corn!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  location: {
    fontSize: theme.typography.size.lg,
    fontWeight: 'bold',
    color: theme.colors.text.dark,
  },
  date: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.text.light,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  temp: {
    fontSize: 48,
    fontWeight: 'bold',
    color: theme.colors.text.dark,
    marginRight: 15,
  },
  condition: {
    fontSize: theme.typography.size.lg,
    color: theme.colors.text.light,
  },
  alert: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.status.success,
    fontWeight: '600',
    backgroundColor: '#e8f5e9',
    padding: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
