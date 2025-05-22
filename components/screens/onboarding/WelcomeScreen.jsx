import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>MyLooks</Text>
        </View>
        
        <Text style={styles.welcomeTitle}>Welcome to MyLooks</Text>
        
        <Text style={styles.welcomeText}>
          Discover your unique beauty profile with advanced AI analysis and personalized recommendations.
        </Text>
        
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Ionicons name="analytics-outline" size={28} color="#99f6ff" />
            </View>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>AI Analysis</Text>
              <Text style={styles.featureText}>
                Get detailed ratings on facial symmetry, skin health, and style.
              </Text>
            </View>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Ionicons name="list-outline" size={28} color="#99f6ff" />
            </View>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Personal Routines</Text>
              <Text style={styles.featureText}>
                Receive customized skincare, haircare, and style recommendations.
              </Text>
            </View>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Ionicons name="shield-checkmark-outline" size={28} color="#99f6ff" />
            </View>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Privacy First</Text>
              <Text style={styles.featureText}>
                Your photos are analyzed securely and never stored permanently.
              </Text>
            </View>
          </View>
        </View>
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
  logoContainer: {
    marginBottom: 30,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#99f6ff',
    letterSpacing: 1,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 15,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#EEE',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  featuresContainer: {
    width: '100%',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 25,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(153, 246, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  featureText: {
    fontSize: 14,
    color: '#CCC',
    lineHeight: 20,
  },
});

export default WelcomeScreen;
