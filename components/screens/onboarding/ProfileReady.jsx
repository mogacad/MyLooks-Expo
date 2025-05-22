import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileReady = ({ isLastStep, onNext }) => {
  const [userName, setUserName] = useState('User');
  
  useEffect(() => {
    // Load user profile data
    const loadProfile = async () => {
      try {
        const profileData = await AsyncStorage.getItem('userProfile');
        if (profileData) {
          const { name } = JSON.parse(profileData);
          if (name) {
            setUserName(name);
          }
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };
    
    loadProfile();
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.checkmarkContainer}>
          <Ionicons name="checkmark-circle" size={80} color="#99f6ff" />
        </View>
        
        <Text style={styles.title}>You're All Set, {userName}!</Text>
        
        <Text style={styles.description}>
          Your profile has been created successfully. Now you can start analyzing your photos and get personalized recommendations.
        </Text>
        
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Ionicons name="camera-outline" size={24} color="#99f6ff" style={styles.featureIcon} />
            <Text style={styles.featureText}>
              Upload a photo for instant analysis
            </Text>
          </View>
          
          <View style={styles.featureItem}>
            <Ionicons name="analytics-outline" size={24} color="#99f6ff" style={styles.featureIcon} />
            <Text style={styles.featureText}>
              Get detailed beauty scores and ratings
            </Text>
          </View>
          
          <View style={styles.featureItem}>
            <Ionicons name="list-outline" size={24} color="#99f6ff" style={styles.featureIcon} />
            <Text style={styles.featureText}>
              Receive a personalized beauty routine
            </Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.startButton}
          onPress={onNext}
        >
          <Text style={styles.startButtonText}>
            {isLastStep ? 'Get Started' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    maxWidth: 500,
    alignItems: 'center',
  },
  checkmarkContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#EEE',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(153, 246, 255, 0.1)',
    borderRadius: 12,
    padding: 15,
  },
  featureIcon: {
    marginRight: 15,
  },
  featureText: {
    fontSize: 16,
    color: '#FFF',
    flex: 1,
  },
  startButton: {
    backgroundColor: '#3D5AFE',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileReady;
