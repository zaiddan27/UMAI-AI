import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme/theme';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

// Mock Data for Crops
const CROPS = [
  { id: 'corn', name: 'Corn', icon: '🌽' },
  { id: 'rice', name: 'Rice', icon: '🌾' },
  { id: 'banana', name: 'Banana', icon: '🍌' },
  { id: 'coconut', name: 'Coconut', icon: '🥥' },
  { id: 'coffee', name: 'Coffee', icon: '☕' },
  { id: 'cacao', name: 'Cacao', icon: '🍫' },
  { id: 'mango', name: 'Mango', icon: '🥭' },
  { id: 'other', name: 'Other', icon: '🌱' },
];

export const CropSelectionScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSelect = (cropId: string) => {
    // Navigate to Camera, passing the selected crop
    // For now, just navigate
    console.log('Selected crop:', cropId);
    navigation.navigate('Camera');
  };

  const renderItem = ({ item }: { item: typeof CROPS[0] }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => handleSelect(item.id)}
      activeOpacity={0.7}
    >
      <Text style={styles.icon}>{item.icon}</Text>
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Ionicons name="close" size={24} color={theme.colors.text.dark} />
        </TouchableOpacity>
        <Text style={styles.title}>Select Crop</Text>
        <View style={{ width: 24 }} />
      </View>

      <Text style={styles.subtitle}>What are you scanning today?</Text>

      <FlatList
        data={CROPS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  closeButton: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  title: {
    fontSize: theme.typography.size.lg,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.text.light,
    textAlign: 'center',
    marginBottom: 20,
  },
  grid: {
    padding: theme.spacing.lg,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    width: '47%',
    aspectRatio: 1, // Square
    borderRadius: theme.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    fontSize: 48,
    marginBottom: 10,
  },
  name: {
    fontSize: theme.typography.size.md,
    fontWeight: '600',
    color: theme.colors.text.dark,
  },
});
