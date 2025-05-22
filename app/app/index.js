import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import MainScreen from '../components/screens/MainScreen';

export default function HomeScreen() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(null);
  const [hasPersonalRoutine, setHasPersonalRoutine] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding
    const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem('hasCompletedOnboarding');
        const completed = value === 'true';
        setHasCompletedOnboarding(completed);
        
        // If not completed onboarding, redirect to onboarding
        if (!completed) {
          router.replace('/onboarding');
        }
      } catch (e) {
        console.error('Error checking onboarding status:', e);
      }
    };
    
    // Check if user has a personal routine
    const checkRoutine = async () => {
      try {
        const routine = await AsyncStorage.getItem('personalRoutine');
        setHasPersonalRoutine(!!routine);
      } catch (e) {
        console.error('Error checking routine status:', e);
      }
    };
    
    checkOnboarding();
    checkRoutine();
  }, []);

  // Show loading screen until we know onboarding status
  if (hasCompletedOnboarding === null) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['rgba(26, 9, 51, 0.8)', 'rgba(14, 26, 77, 0.85)']}
          style={styles.background}
        />
      </View>
    );
  }

  return <MainScreen hasPersonalRoutine={hasPersonalRoutine} />;
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
