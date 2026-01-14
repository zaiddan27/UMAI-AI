import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { theme } from '../theme/theme';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const AnalysisLoadingScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { imageUri } = route.params || {};

  useEffect(() => {
    // Simulate AI Processing Delay
    const timer = setTimeout(() => {
        // Navigate to result with mock scan ID
        // In real app, we would upload image -> get ID -> navigate
        navigation.replace('DiagnosisResult', { 
            scanId: 'mock-scan-id', 
            imageUri: imageUri 
        });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Analyzing Crop...</Text>
        <Text style={styles.subtitle}>Our AI is checking for diseases</Text>
        
        <View style={styles.previewContainer}>
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
            <View style={styles.overlay}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        </View>

        <View style={styles.tips}>
             <Text style={styles.tipTitle}>Did you know?</Text>
             <Text style={styles.tipText}>Early detection of Corn Rust can save up to 40% of your yield.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: theme.spacing.xl,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text.dark,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.text.light,
    marginBottom: 40,
  },
  previewContainer: {
    width: 250,
    height: 250,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 40,
    elevation: 10,
    shadowColor: theme.colors.primaryGreen,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tips: {
    backgroundColor: '#e8f5e9',
    padding: 20,
    borderRadius: 15,
    width: '100%',
  },
  tipTitle: {
    fontWeight: 'bold',
    color: theme.colors.primaryGreen,
    marginBottom: 5,
  },
  tipText: {
    color: theme.colors.text.dark,
    lineHeight: 20,
  }
});
