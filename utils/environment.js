// environment.js - Safe access to environment variables
import Constants from 'expo-constants';

// Function to get environment variables safely
export const getEnvVariable = (key) => {
  // First try to get from process.env (used in development with .env file)
  if (process.env[key]) {
    return process.env[key];
  }
  
  // Then try to get from Expo Constants (used in production)
  if (Constants.expoConfig && 
      Constants.expoConfig.extra && 
      Constants.expoConfig.extra[key]) {
    return Constants.expoConfig.extra[key];
  }

  // Finally, try to get from EAS build-time environment variables
  // This is for variables set in eas.json
  const publicKey = `EXPO_PUBLIC_${key}`;
  if (process.env[publicKey]) {
    return process.env[publicKey];
  }

  console.warn(`Environment variable ${key} not found`);
  return null;
};

// API Keys - Access these instead of directly using environment variables
export const getOpenAIApiKey = () => getEnvVariable('OPENAI_API_KEY');
export const getImgbbApiKey = () => getEnvVariable('IMGBB_API_KEY');
export const getCloudinaryCloudName = () => getEnvVariable('CLOUDINARY_CLOUD_NAME');
export const getCloudinaryApiKey = () => getEnvVariable('CLOUDINARY_API_KEY');
export const getCloudinaryUploadPreset = () => {
  // This is not sensitive, so we can hardcode a fallback
  return getEnvVariable('CLOUDINARY_UPLOAD_PRESET') || 'ml_default';
};
