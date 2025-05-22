import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import PersonalRoutineScreen from '../components/screens/PersonalRoutineScreen';

export default function RoutineScreen() {
  const [routineData, setRoutineData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load routine data from AsyncStorage
    const loadRoutineData = async () => {
      try {
        const storedRoutine = await AsyncStorage.getItem('personalRoutine');
        if (storedRoutine) {
          setRoutineData(JSON.parse(storedRoutine));
        } else {
          setError("No personal routine found. Please create one first.");
        }
      } catch (e) {
        console.error("Error loading routine data:", e);
        setError("Failed to load your personal routine.");
      } finally {
        setLoading(false);
      }
    };

    loadRoutineData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['rgba(26, 9, 51, 0.8)', 'rgba(14, 26, 77, 0.85)']}
        style={styles.background}
      >
        <PersonalRoutineScreen 
          routineData={routineData}
          loading={loading}
          error={error}
          onGoBack={() => router.back()}
          onGoHome={() => router.replace('/')}
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
