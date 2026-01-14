import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme/theme';
import { Button } from '../components/shared/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Mock Data for a Result
const MOCK_DIAGNOSIS = {
  diseaseName: 'Corn Rust',
  pathogen: 'Puccinia sorghi',
  confidence: 94,
  description: 'Common fungal disease characterized by rust-colored pustules on leaves.',
  treatments: {
    organic: {
        title: 'Organic Control',
        steps: [
            'Apply Neem Oil spray every 7 days.',
            'Remove infected leaves immediately.',
            'Improve air circulation between plants.'
        ],
        cost: '₱250 est.'
    },
    biological: {
        title: 'Biological Agents',
        steps: [
            'Use Bacillus subtilis bio-fungicide.',
            'Introduce Trichoderma to soil.'
        ],
        cost: '₱400 est.'
    },
    traditional: {
        title: 'Traditional Methods',
        steps: [
            'Spray mixture of baking soda and water.',
            'Crop rotation with non-host crops.'
        ],
        cost: '₱50 est.'
    },
    synthetic: {
        title: 'Chemical Control',
        steps: [
            'Apply fungicides with Azoxystrobin.',
            'Spray Mancozeb at first sign.'
        ],
        cost: '₱850 est.'
    }
  }
};

type TreatmentType = 'organic' | 'biological' | 'traditional' | 'synthetic';

export const DiagnosisResultScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { imageUri } = route.params || {};
  const [activeTab, setActiveTab] = useState<TreatmentType>('organic');

  const diagnosis = MOCK_DIAGNOSIS;

  const renderTab = (type: TreatmentType, label: string) => (
    <TouchableOpacity 
        style={[styles.tab, activeTab === type && styles.activeTab]}
        onPress={() => setActiveTab(type)}
    >
        <Text style={[styles.tabText, activeTab === type && styles.activeTabText]}>
            {label}
        </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
             {imageUri ? (
                 <Image source={{ uri: imageUri }} style={styles.image} />
             ) : (
                 <View style={[styles.image, { backgroundColor: '#ccc' }]} />
             )}
             <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Main')}>
                 <Ionicons name="arrow-back" size={24} color="#fff" />
             </TouchableOpacity>
        </View>

        {/* Diagnosis Header */}
        <View style={styles.header}>
            <View style={styles.badge}>
                <Text style={styles.badgeText}>{diagnosis.confidence}% Confidence</Text>
            </View>
            <Text style={styles.title}>{diagnosis.diseaseName}</Text>
            <Text style={styles.subtitle}>{diagnosis.pathogen}</Text>
            <Text style={styles.description}>{diagnosis.description}</Text>
        </View>

        {/* Treatments Tabs */}
        <View style={styles.tabContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {renderTab('organic', 'Organic')}
                {renderTab('biological', 'Biological')}
                {renderTab('traditional', 'Traditional')}
                {renderTab('synthetic', 'Synthetic')}
            </ScrollView>
        </View>

        {/* Treatment Content */}
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{diagnosis.treatments[activeTab].title}</Text>
            <View style={styles.costBadge}>
                <Text style={styles.costText}>{diagnosis.treatments[activeTab].cost}</Text>
            </View>
            
            {diagnosis.treatments[activeTab].steps.map((step, index) => (
                <View key={index} style={styles.stepRow}>
                    <View style={styles.stepNumber}>
                        <Text style={styles.stepNumberText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.stepText}>{step}</Text>
                </View>
            ))}
        </View>

        <View style={{ height: 20 }} />

        <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
            <Button 
                label="Save & Record Treatment" 
                onPress={() => navigation.navigate('TreatmentRecord', { scanId: 'mock' })}
            />
        </View>
        <View style={{ height: 20 }} />

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
    paddingBottom: 40,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
    elevation: 2,
  },
  badge: {
    backgroundColor: theme.colors.primaryGreen,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 10,
    opacity: 0.9,
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text.dark,
  },
  subtitle: {
    fontSize: 16,
    fontStyle: 'italic',
    color: theme.colors.text.light,
    marginBottom: 10,
  },
  description: {
    color: theme.colors.text.dark,
    lineHeight: 22,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#e0e0e0',
  },
  activeTab: {
    backgroundColor: theme.colors.primaryBlue,
  },
  tabText: {
    color: theme.colors.text.light,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  card: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: theme.colors.text.dark,
  },
  costBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#fff3cd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  costText: {
    color: '#856404',
    fontWeight: 'bold',
    fontSize: 12,
  },
  stepRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.primaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  stepText: {
    flex: 1,
    lineHeight: 22,
    color: theme.colors.text.dark,
  },
});
