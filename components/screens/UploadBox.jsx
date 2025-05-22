import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const UploadBox = ({ onPickImage, onTakePicture, loading, error }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Upload Your Photo</Text>
      </View>

      <View style={styles.uploadArea}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#99f6ff" />
            <Text style={styles.loadingText}>Uploading your photo...</Text>
          </View>
        ) : (
          <>
            <Text style={styles.instructions}>
              Choose a clear, well-lit photo of your face for the most accurate analysis
            </Text>
            
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={onPickImage}
              >
                <Ionicons name="images-outline" size={30} color="#FFF" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Choose from Gallery</Text>
              </TouchableOpacity>
              
              <Text style={styles.orText}>OR</Text>
              
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={onTakePicture}
              >
                <Ionicons name="camera-outline" size={30} color="#FFF" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Take a Photo</Text>
              </TouchableOpacity>
            </View>
            
            {error && (
              <View style={styles.errorContainer}>
                <Ionicons name="alert-circle-outline" size={20} color="#ff6b6b" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}
            
            <View style={styles.tipContainer}>
              <Ionicons name="bulb-outline" size={20} color="#99f6ff" />
              <Text style={styles.tipText}>
                Tip: Front-facing, evenly lit photos with a neutral expression work best
              </Text>
            </View>
          </>
        )}
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.privacyText}>
          Your photos are analyzed securely and never stored permanently
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
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
  uploadArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructions: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  uploadButton: {
    backgroundColor: 'rgba(57, 90, 255, 0.3)',
    borderWidth: 1,
    borderColor: '#99f6ff',
    borderRadius: 12,
    width: '90%',
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonIcon: {
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
  orText: {
    color: '#CCC',
    fontSize: 16,
    marginVertical: 10,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    borderWidth: 1,
    borderColor: '#ff6b6b',
    borderRadius: 8,
    padding: 10,
    marginTop: 20,
  },
  errorText: {
    color: '#ff6b6b',
    marginLeft: 10,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(153, 246, 255, 0.1)',
    borderRadius: 8,
    padding: 15,
    marginTop: 30,
  },
  tipText: {
    color: '#EEE',
    marginLeft: 10,
    flex: 1,
    fontSize: 14,
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFF',
    marginTop: 20,
    fontSize: 16,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  privacyText: {
    color: '#AAA',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default UploadBox;
