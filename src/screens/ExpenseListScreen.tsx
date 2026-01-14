import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme/theme';
import { Button } from '../components/shared/Button';
import { Input } from '../components/shared/Input';
import { Ionicons } from '@expo/vector-icons';
import db from '../database/db';
import * as Crypto from 'expo-crypto';

interface Expense {
  id: string;
  category: string;
  amount: number;
  date: number;
  note: string;
}

export const ExpenseListScreen = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const result = await db.getAllAsync('SELECT * FROM expenses ORDER BY date DESC') as Expense[];
      setExpenses(result);
    } catch (e) {
      console.log('Error fetching expenses', e);
    }
  };

  const handleAddExpense = async () => {
    if (!amount || !category) {
        Alert.alert('Required', 'Please fill in Category and Amount');
        return;
    }

    setLoading(true);
    try {
        const id = Crypto.randomUUID();
        const timestamp = Date.now();
        
        await db.runAsync(
            `INSERT INTO expenses (id, category, amount, date, note) VALUES (?, ?, ?, ?, ?)`,
            [id, category, parseFloat(amount), timestamp, note]
        );
        
        setModalVisible(false);
        setCategory('');
        setAmount('');
        setNote('');
        fetchExpenses(); // Refresh
        
    } catch (e) {
        Alert.alert('Error', 'Failed to save expense');
    } finally {
        setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Expense }) => (
    <View style={styles.card}>
        <View style={styles.cardHeader}>
             <Text style={styles.date}>{new Date(item.date).toDateString()}</Text>
             <Text style={styles.amount}>-₱{item.amount.toFixed(2)}</Text>
        </View>
        <Text style={styles.category}>{item.category}</Text>
        {item.note ? <Text style={styles.note}>{item.note}</Text> : null}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Expenses</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
            <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={expenses}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
            <Text style={styles.emptyText}>No expenses recorded yet.</Text>
        }
      />

      <Modal visible={modalVisible} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Expense</Text>
            
            <Input label="Category" placeholder="Seeds, Labor, Fertilizer..." value={category} onChangeText={setCategory} />
            <Input label="Amount (PHP)" placeholder="0.00" value={amount} onChangeText={setAmount} keyboardType="numeric" />
            <Input label="Note" placeholder="Optional details..." value={note} onChangeText={setNote} />

            <Button label="Save Expense" onPress={handleAddExpense} loading={loading} />
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
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: theme.colors.text.light,
  },
  amount: {
    color: theme.colors.status.danger,
    fontWeight: 'bold',
    fontSize: 16,
  },
  category: {
    fontWeight: '600',
    fontSize: 16,
    color: theme.colors.text.dark,
  },
  note: {
    marginTop: 5,
    color: theme.colors.text.light,
    fontSize: 14,
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
