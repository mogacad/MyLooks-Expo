import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const MainScreen = ({ 
  hasPersonalRoutine = false
}) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  
  const handleStartAnalysis = () => {
    router.push('/upload');
  };
  
  const handleViewRoutines = () => {
    router.push('/routine');
  };
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(26, 9, 51, 0.8)', 'rgba(14, 26, 77, 0.85)']}
        style={styles.background}
      >
        {/* Top bar with profile button */}
        <View style={styles.topBar}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>MyLooks</Text>
          </View>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => setShowProfileModal(true)}
          >
            <Ionicons name="person-circle-outline" size={38} color="#6fedf1" />
          </TouchableOpacity>
        </View>

        {/* Profile Modal */}
        <Modal
          transparent={true}
          visible={showProfileModal}
          animationType="fade"
          onRequestClose={() => setShowProfileModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.profileModal}>
              <View style={styles.profileHeader}>
                <Text style={styles.profileTitle}>Profile</Text>
                <TouchableOpacity onPress={() => setShowProfileModal(false)}>
                  <Ionicons name="close" size={24} color="#FFF" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.profileContent}>
                <View style={styles.profileIcon}>
                  <Ionicons name="person" size={50} color="#6fedf1" />
                </View>
                <Text style={styles.profileName}>User</Text>
                <Text style={styles.profileEmail}>user@example.com</Text>
                
                <View style={styles.profileStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>3</Text>
                    <Text style={styles.statLabel}>Analyses</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>1</Text>
                    <Text style={styles.statLabel}>Routine</Text>
                  </View>
                </View>
                
                <TouchableOpacity style={styles.profileOption}>
                  <Ionicons name="settings-outline" size={24} color="#FFF" style={styles.optionIcon} />
                  <Text style={styles.optionText}>Settings</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.profileOption}>
                  <Ionicons name="help-circle-outline" size={24} color="#FFF" style={styles.optionIcon} />
                  <Text style={styles.optionText}>Help & Support</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.profileOption}>
                  <Ionicons name="log-out-outline" size={24} color="#FFF" style={styles.optionIcon} />
                  <Text style={styles.optionText}>Log Out</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        
        <View style={styles.contentContainer}>
          <Text style={styles.subtitle}>Perfect Your Image.</Text>
          
          <View style={styles.featuresContainer}>
            <View style={styles.featureCard}>
              <Text style={styles.featureTitle}>Instant Analysis</Text>
              <Text style={styles.featureText}>
                Get detailed ratings on facial symmetry, skin health, style compatibility, and more.
              </Text>
            </View>
            
            <View style={styles.featureCard}>
              <Text style={styles.featureTitle}>Personalized Advice</Text>
              <Text style={styles.featureText}>
                Receive custom skincare, haircare, and style recommendations tailored to your unique features with our personal routine feature.
              </Text>
            </View>
            
            <View style={styles.featureCard}>
              <Text style={styles.featureTitle}>Get Rated in Seconds</Text>
              <Text style={styles.featureText}>
                Our advanced AI analyzes 100+ unique facial features to provide accurate assessments.
              </Text>
            </View>
          </View>
          
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleStartAnalysis}
            >
              <LinearGradient
                colors={['#3D5AFE', '#99f6ff']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Text style={styles.buttonText}>Rate Your Looks</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            {hasPersonalRoutine && (
              <TouchableOpacity
                style={[styles.secondaryButton, hasPersonalRoutine ? styles.activeButton : styles.inactiveButton]}
                onPress={handleViewRoutines}
                disabled={!hasPersonalRoutine}
              >
                <Text style={styles.secondaryButtonText}>
                  View My Routine
                </Text>
              </TouchableOpacity>
            )}
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>Privacy-focused • Secure • AI-Powered</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#99f6ff',
    letterSpacing: 0.5,
  },
  profileButton: {
    padding: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileModal: {
    width: '80%',
    maxHeight: '80%',
    backgroundColor: 'rgba(26, 9, 51, 0.95)',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#6fedf1',
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#6fedf155',
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  profileContent: {
    padding: 20,
    alignItems: 'center',
  },
  profileIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(111, 237, 241, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 14,
    color: '#AAA',
    marginBottom: 20,
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6fedf1',
  },
  statLabel: {
    fontSize: 12,
    color: '#FFF',
    marginTop: 5,
  },
  profileOption: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  optionIcon: {
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
    color: '#FFF',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  subtitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featureCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#99f6ff',
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  featureText: {
    fontSize: 14,
    color: '#CCC',
    lineHeight: 20,
  },
  buttonsContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  primaryButton: {
    marginBottom: 15,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  gradientButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  activeButton: {
    borderColor: '#99f6ff',
    backgroundColor: 'rgba(111, 237, 241, 0.1)',
  },
  inactiveButton: {
    borderColor: '#6060606f',
    backgroundColor: 'rgba(60, 60, 60, 0.3)',
  },
  secondaryButtonText: {
    color: '#99f6ff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    marginTop: 10,
    alignItems: 'center',
  },
  footerText: {
    color: '#AAA',
    fontSize: 12,
  },
});

export default MainScreen;
