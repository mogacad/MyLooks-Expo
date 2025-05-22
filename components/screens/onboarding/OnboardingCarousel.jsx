import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Onboarding screens
import WelcomeScreen from './WelcomeScreen';
import CreateProfileScreen from './CreateProfileScreen';
import ProfileReady from './ProfileReady';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ONBOARDING_STEPS = [
  {
    id: 'welcome',
    component: WelcomeScreen,
  },
  {
    id: 'createProfile',
    component: CreateProfileScreen,
  },
  {
    id: 'profileReady',
    component: ProfileReady,
  },
];

const OnboardingCarousel = ({ currentStep, onNext, onBack, onComplete }) => {
  const renderStep = (step, index) => {
    const StepComponent = step.component;
    return (
      <View key={step.id} style={styles.step}>
        <StepComponent 
          onNext={index < ONBOARDING_STEPS.length - 1 ? onNext : onComplete}
          isLastStep={index === ONBOARDING_STEPS.length - 1}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          style={styles.carousel}
        >
          {ONBOARDING_STEPS.map((step, index) => renderStep(step, index))}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <View style={styles.progressIndicator}>
          {ONBOARDING_STEPS.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index === currentStep && styles.progressDotActive,
              ]}
            />
          ))}
        </View>

        <View style={styles.navigationButtons}>
          {currentStep > 0 && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={onBack}
            >
              <Ionicons name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>
          )}

          {currentStep < ONBOARDING_STEPS.length - 1 ? (
            <TouchableOpacity
              style={styles.nextButton}
              onPress={onNext}
            >
              <Text style={styles.nextButtonText}>Next</Text>
              <Ionicons name="arrow-forward" size={24} color="#FFF" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.completeButton}
              onPress={onComplete}
            >
              <Text style={styles.completeButtonText}>Get Started</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  carouselContainer: {
    flex: 1,
  },
  carousel: {
    flex: 1,
  },
  step: {
    width: SCREEN_WIDTH,
    flex: 1,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  progressIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 5,
  },
  progressDotActive: {
    backgroundColor: '#99f6ff',
    width: 20,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 10,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(57, 90, 255, 0.7)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  completeButton: {
    backgroundColor: '#3D5AFE',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  completeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OnboardingCarousel;
