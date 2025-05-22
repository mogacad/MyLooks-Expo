import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateProfileScreen = ({ onNext }) => {
  const [name, setName] = useState('');
  const [skinType, setSkinType] = useState('');
  const [skinConcerns, setSkinConcerns] = useState([]);
  const [hairType, setHairType] = useState('');
  
  const skinConcernOptions = [
    'Acne', 'Dryness', 'Oiliness', 'Aging', 'Uneven Tone', 
    'Sensitivity', 'Dark Spots', 'Redness', 'Large Pores'
  ];
  
  const skinTypeOptions = [
    'Normal', 'Oily', 'Dry', 'Combination', 'Sensitive'
  ];
  
  const hairTypeOptions = [
    'Straight', 'Wavy', 'Curly', 'Coily', 'Fine', 'Medium', 'Thick'
  ];
  
  const toggleSkinConcern = (concern) => {
    if (skinConcerns.includes(concern)) {
      setSkinConcerns(skinConcerns.filter(item => item !== concern));
    } else {
      setSkinConcerns([...skinConcerns, concern]);
    }
  };
  
  const handleContinue = async () => {
    try {
      // Save user profile to AsyncStorage
      const profileData = {
        name: name || 'User',
        skinType,
        skinConcerns,
        hairType,
        dateCreated: new Date().toISOString(),
      };
      
      await AsyncStorage.setItem('userProfile', JSON.stringify(profileData));
      onNext();
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create Your Profile</Text>
        <Text style={styles.subtitle}>
          Tell us about yourself so we can provide more personalized recommendations.
        </Text>
        
        <View style={styles.inputSection}>
          <Text style={styles.sectionLabel}>Your Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your name"
            placeholderTextColor="#AAA"
            value={name}
            onChangeText={setName}
          />
        </View>
        
        <View style={styles.inputSection}>
          <Text style={styles.sectionLabel}>Skin Type</Text>
          <View style={styles.optionsContainer}>
            {skinTypeOptions.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.optionButton,
                  skinType === type && styles.optionButtonSelected
                ]}
                onPress={() => setSkinType(type)}
              >
                <Text 
                  style={[
                    styles.optionText,
                    skinType === type && styles.optionTextSelected
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.inputSection}>
          <Text style={styles.sectionLabel}>Skin Concerns (Select all that apply)</Text>
          <View style={styles.optionsContainer}>
            {skinConcernOptions.map((concern) => (
              <TouchableOpacity
                key={concern}
                style={[
                  styles.optionButton,
                  skinConcerns.includes(concern) && styles.optionButtonSelected
                ]}
                onPress={() => toggleSkinConcern(concern)}
              >
                <Text 
                  style={[
                    styles.optionText,
                    skinConcerns.includes(concern) && styles.optionTextSelected
                  ]}
                >
                  {concern}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.inputSection}>
          <Text style={styles.sectionLabel}>Hair Type</Text>
          <View style={styles.optionsContainer}>
            {hairTypeOptions.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.optionButton,
                  hairType === type && styles.optionButtonSelected
                ]}
                onPress={() => setHairType(type)}
              >
                <Text 
                  style={[
                    styles.optionText,
                    hairType === type && styles.optionTextSelected
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
        
        <Text style={styles.skipText}>
          You can always update your profile later.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#CCC',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputSection: {
    marginBottom: 25,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 15,
    color: '#FFF',
    fontSize: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    margin: 5,
  },
  optionButtonSelected: {
    backgroundColor: 'rgba(153, 246, 255, 0.3)',
    borderWidth: 1,
    borderColor: '#99f6ff',
  },
  optionText: {
    color: '#EEE',
    fontSize: 14,
  },
  optionTextSelected: {
    color: '#99f6ff',
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#3D5AFE',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skipText: {
    color: '#AAA',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default CreateProfileScreen;
