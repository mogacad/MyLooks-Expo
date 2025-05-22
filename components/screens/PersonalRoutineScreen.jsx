import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RoutineSection = ({ title, data, icon }) => {
  const [expanded, setExpanded] = useState(true);
  
  if (!data || !Array.isArray(data) || data.length === 0) {
    return null;
  }
  
  return (
    <View style={styles.section}>
      <TouchableOpacity 
        style={styles.sectionHeader} 
        onPress={() => setExpanded(!expanded)}
      >
        <View style={styles.sectionTitleContainer}>
          <Ionicons name={icon} size={22} color="#99f6ff" style={styles.sectionIcon} />
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        <Ionicons 
          name={expanded ? 'chevron-up' : 'chevron-down'} 
          size={22} 
          color="#FFF" 
        />
      </TouchableOpacity>
      
      {expanded && (
        <View style={styles.sectionContent}>
          {data.map((item, index) => (
            <View key={index} style={styles.routineItem}>
              <Text style={styles.routineItemNumber}>{index + 1}</Text>
              <Text style={styles.routineItemText}>{item}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const PersonalRoutineScreen = ({ routineData, loading, error, onGoBack, onGoHome }) => {
  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#99f6ff" />
          <Text style={styles.loadingText}>Loading your personal routine...</Text>
        </View>
      </View>
    );
  }

  if (error || !routineData) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onGoBack}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.title}>Personal Routine</Text>
        </View>
        
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={60} color="#ff6b6b" />
          <Text style={styles.errorTitle}>No Routine Found</Text>
          <Text style={styles.errorText}>
            {error || "You don't have a personal routine yet. Complete an analysis to create one."}
          </Text>
          <TouchableOpacity style={styles.homeButton} onPress={onGoHome}>
            <Text style={styles.homeButtonText}>Go to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onGoBack}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Your Personal Routine</Text>
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.introContainer}>
          <Text style={styles.introTitle}>Customized For You</Text>
          <Text style={styles.introText}>
            Based on your facial analysis, we've created a personalized routine to help you look your best.
            Follow these recommendations for optimal results.
          </Text>
        </View>
        
        <RoutineSection 
          title="Skincare Routine" 
          data={[
            ...(routineData.skincare?.morning ? ['Morning:'].concat(routineData.skincare.morning.map(item => `• ${item}`)) : []),
            ...(routineData.skincare?.evening ? ['Evening:'].concat(routineData.skincare.evening.map(item => `• ${item}`)) : []),
          ]}
          icon="water-outline" 
        />
        
        <RoutineSection 
          title="Haircare Routine" 
          data={routineData.haircare} 
          icon="cut-outline" 
        />
        
        <RoutineSection 
          title="Makeup Recommendations" 
          data={routineData.makeup} 
          icon="color-palette-outline" 
        />
        
        <RoutineSection 
          title="Style Recommendations" 
          data={routineData.style} 
          icon="shirt-outline" 
        />
        
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            Follow this routine consistently for at least 4-6 weeks to see optimal results.
          </Text>
          
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-social-outline" size={20} color="#FFF" style={styles.shareIcon} />
            <Text style={styles.shareButtonText}>Share Routine</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 15,
  },
  scrollContainer: {
    flex: 1,
  },
  introContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  introTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#99f6ff',
    marginBottom: 10,
    textAlign: 'center',
  },
  introText: {
    fontSize: 14,
    color: '#FFF',
    lineHeight: 22,
    textAlign: 'center',
  },
  section: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(153, 246, 255, 0.1)',
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  sectionContent: {
    padding: 15,
  },
  routineItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  routineItemNumber: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(153, 246, 255, 0.2)',
    textAlign: 'center',
    lineHeight: 20,
    color: '#99f6ff',
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 10,
    marginTop: 2,
  },
  routineItemText: {
    flex: 1,
    fontSize: 14,
    color: '#EEE',
    lineHeight: 22,
  },
  footerContainer: {
    marginTop: 10,
    marginBottom: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#CCC',
    textAlign: 'center',
    marginBottom: 20,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(57, 90, 255, 0.7)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  shareIcon: {
    marginRight: 8,
  },
  shareButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#FFF',
    marginTop: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 20,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: '#EEE',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  homeButton: {
    backgroundColor: '#3D5AFE',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  homeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PersonalRoutineScreen;
