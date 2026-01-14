import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/shared/Button';
import { theme } from '../theme/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

export const WelcomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to</Text>
          <Text style={styles.appName}>UMA.AI</Text>
          <Text style={styles.subtitle}>
            Your intelligent assistant for smarter, healthier farming.
          </Text>
        </View>

        <View style={styles.illustration}>
           {/* Placeholder for Logo/Illustration */}
           <View style={styles.placeholderIcon} />
        </View>

        <View style={styles.footer}>
          <Button 
            label="Get Started" 
            onPress={() => navigation.navigate('ProfileSetup')} 
          />
          <View style={{height: 16}} /> 
          <Button 
            label="I already have an account" 
            variant="outline"
            onPress={() => navigation.navigate('ProfileSetup')} // Simplified flow for now
          />
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
    padding: theme.spacing.lg,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: theme.colors.text.dark,
    fontWeight: '300',
  },
  appName: {
    fontSize: 48,
    color: theme.colors.primaryGreen,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.text.light,
    textAlign: 'center',
    lineHeight: 24,
  },
  illustration: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#e0e0e0',
  },
  footer: {
    marginBottom: 20,
  },
});
