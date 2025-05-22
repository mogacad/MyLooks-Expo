// ENV.js - Safe access to environment variables in development and production
import Constants from 'expo-constants';

// Get environment variables from different sources
const getEnvVariable = (key) => {
  // First try process.env for local development with .env file
  if (process.env[key]) {
    return process.env[key];
  }

  // Try Expo Constants for values set in app.config.js/app.json
  if (Constants.expoConfig?.extra?.[key]) {
    return Constants.expoConfig.extra[key];
  }

  // For Expo EAS secrets (production builds)
  const publicKey = `EXPO_PUBLIC_${key}`;
  if (process.env[publicKey]) {
    return process.env[publicKey];
  }

  console.warn(`Environment variable ${key} not found`);
  return null;
};

// Export environment variables with fallbacks if needed
export default {
  OPENAI_API_KEY: getEnvVariable('OPENAI_API_KEY'),
  IMGBB_API_KEY: getEnvVariable('IMGBB_API_KEY'),
  CLOUDINARY_CLOUD_NAME: getEnvVariable('CLOUDINARY_CLOUD_NAME'),
  CLOUDINARY_API_KEY: getEnvVariable('CLOUDINARY_API_KEY'),
  CLOUDINARY_UPLOAD_PRESET: getEnvVariable('CLOUDINARY_UPLOAD_PRESET') || 'ml_default',
};
