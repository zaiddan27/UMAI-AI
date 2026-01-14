import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme/theme';
import { Button } from '../components/shared/Button';
import { Input } from '../components/shared/Input';
import { Ionicons } from '@expo/vector-icons';
import db from '../database/db';
import * as Crypto from 'expo-crypto';

interface Harvest {
  id: string;
  crop_type: string;
  weight_kg: number;
  price_per_kg: number;
  date: number;
}

export const HarvestRecordScreen = () => {
  const [harvests, setHarvests] = useState<Harvest[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form
  const [cropType, setCropType] = useState('Corn');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    fetchHarvests();
  }, []);

  const fetchHarvests = async () => {
    try {
      const result = await db.getAllAsync('SELECT * FROM harvests ORDER BY date DESC') as Harvest[];
      setHarvests(result);
    } catch (e) {
      console.log('Error fetching harvests', e);
    }
  };

  const handleSave = async () => {
    if (!weight) {
        Alert.alert('Required', 'Please enter the harvest weight.');
        return;
    }

    setLoading(true);
    try {
        const id = Crypto.randomUUID();
        const timestamp = Date.now();
        
        await db.runAsync(
            `INSERT INTO harvests (id, crop_type, weight_kg, price_per_kg, date) VALUES (?, ?, ?, ?, ?)`,
            [id, cropType, parseFloat(weight), parseFloat(price) || 0, timestamp]
        );
        
        setModalVisible(false);
        setWeight('');
        setPrice('');
        fetchHarvests();
        
    } catch (e) {
        Alert.alert('Error', 'Failed to save harvest');
    } finally {
        setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Harvest }) => (
    <View style={styles.card}>
        <View style={styles.row}>
             <Text style={styles.crop}>{item.crop_type}</Text>
             <Text style={styles.date}>{new Date(item.date).toDateString()}</Text>
        </View>
        <View style={styles.row}>
             <Text style={styles.weight}>{item.weight_kg} kg</Text>
             <Text style={styles.value}>
                {item.price_per_kg > 0 
                    ? `₱${(item.weight_kg * item.price_per_kg).toFixed(2)}`
                    : 'No price set'}
             </Text>
        </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Harvest Records</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
            <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={harvests}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
            <Text style={styles.emptyText}>No harvest records yet.</Text>
        }
      />

       <Modal visible={modalVisible} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Log Harvest</Text>
            
            <Input label="Crop Type" placeholder="Corn, Rice..." value={cropType} onChangeText={setCropType} />
            <Input label="Weight (kg)" placeholder="0.0" value={weight} onChangeText={setWeight} keyboardType="numeric" />
            <Input label="Price per kg (PHP) (Optional)" placeholder="0.00" value={price} onChangeText={setPrice} keyboardType="numeric" />

            <Button label="Save Log" onPress={handleSave} loading={loading} />
            <View style={{ height: 10 }} />
            <Button label="Cancel" variant="outline" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
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
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text.dark,
  },
  addButton: {
    backgroundColor: theme.colors.primaryGreen,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primaryGreen,
    elevation: 1,
  },
  row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 5,
  },
  crop: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text.dark,
  },
  date: {
      fontSize: 12,
      color: theme.colors.text.light,
  },
  weight: {
      fontSize: 16,
      color: theme.colors.text.dark,
  },
  value: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.primaryGreen,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: theme.colors.text.light,
  },
  modalContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  }
});
