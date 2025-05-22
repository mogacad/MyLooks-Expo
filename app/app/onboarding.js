import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnboardingCarousel from '../components/screens/onboarding/OnboardingCarousel';

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  
  const handleComplete = async () => {
    try {
      // Mark onboarding as complete
      await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
      // Navigate to main screen
      router.replace('/');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };
  
  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };
  
  const handleBack = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['rgba(26, 9, 51, 0.8)', 'rgba(14, 26, 77, 0.85)']}
        style={styles.background}
      >
        <OnboardingCarousel 
          currentStep={currentStep}
          onNext={handleNext}
          onBack={handleBack}
          onComplete={handleComplete}
        />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
