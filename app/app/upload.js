import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';

// Import environment utilities for secure API access
import { 
  getImgbbApiKey, 
  getCloudinaryCloudName, 
  getCloudinaryApiKey,
  getCloudinaryUploadPreset,
  getOpenAIApiKey
} from '../utils/environment';

// Placeholder for UploadBox component, will implement later
import UploadBox from '../components/screens/UploadBox';

export default function UploadScreen() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper for timeout
  function timeoutPromise(promise, ms, label) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error(`${label} timed out after ${ms}ms`));
      }, ms);
      
      promise
        .then((value) => {
          clearTimeout(timer);
          resolve(value);
        })
        .catch((error) => {
          clearTimeout(timer);
          reject(error);
        });
    });
  }

  // Upload image to imgbb, fallback to Cloudinary
  const uploadImage = async (imageData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Try ImgBB first
      const imgbbApiKey = getImgbbApiKey();
      if (imgbbApiKey) {
        try {
          const formData = new FormData();
          formData.append('key', imgbbApiKey);
          formData.append('image', imageData.base64);
          
          const imgbbResponse = await timeoutPromise(
            axios.post('https://api.imgbb.com/1/upload', formData), 
            15000, 
            'ImgBB upload'
          );
          
          if (imgbbResponse.data && imgbbResponse.data.data && imgbbResponse.data.data.url) {
            setImageUrl(imgbbResponse.data.data.url);
            setLoading(false);
            router.push({
              pathname: '/results',
              params: { imageUrl: imgbbResponse.data.data.url }
            });
            return;
          }
        } catch (imgbbError) {
          console.log('ImgBB upload failed, trying Cloudinary:', imgbbError);
        }
      }
      
      // Fallback to Cloudinary
      const cloudName = getCloudinaryCloudName();
      const cloudinaryApiKey = getCloudinaryApiKey();
      const uploadPreset = getCloudinaryUploadPreset();
      
      if (cloudName && cloudinaryApiKey && uploadPreset) {
        const formData = new FormData();
        formData.append('file', `data:image/jpeg;base64,${imageData.base64}`);
        formData.append('upload_preset', uploadPreset);
        
        const cloudinaryResponse = await timeoutPromise(
          axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData),
          15000,
          'Cloudinary upload'
        );
        
        if (cloudinaryResponse.data && cloudinaryResponse.data.secure_url) {
          setImageUrl(cloudinaryResponse.data.secure_url);
          setLoading(false);
          router.push({
            pathname: '/results',
            params: { imageUrl: cloudinaryResponse.data.secure_url }
          });
          return;
        }
      }
      
      throw new Error('Both image upload services failed');
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload image. Please try again.');
      setLoading(false);
    }
  };

  const handlePickImage = async () => {
    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'We need permission to access your photos to analyze them.'
      );
      return;
    }
    
    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
      base64: true,
    });
    
    if (!result.canceled && result.assets && result.assets[0]) {
      setImage(result.assets[0]);
      uploadImage(result.assets[0]);
    }
  };

  const handleTakePicture = async () => {
    // Request permission
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'We need camera permission to take photos for analysis.'
      );
      return;
    }
    
    // Launch camera
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
      base64: true,
    });
    
    if (!result.canceled && result.assets && result.assets[0]) {
      setImage(result.assets[0]);
      uploadImage(result.assets[0]);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(26, 9, 51, 0.8)', 'rgba(14, 26, 77, 0.85)']}
        style={styles.background}
      >
        <UploadBox
          onPickImage={handlePickImage}
          onTakePicture={handleTakePicture}
          loading={loading}
          error={error}
        />
      </LinearGradient>
    </View>
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
