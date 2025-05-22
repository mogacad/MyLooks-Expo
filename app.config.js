// app.config.js - This is the proper way to handle environment variables in Expo
// This file gets processed by Expo CLI and values can be accessed in your app via Constants.expoConfig.extra

module.exports = {
  expo: {
    // Spread existing config from app.json
    ...require('./app.json').expo,
    // Additional config
    extra: {
      // Spread existing extras if any
      ...require('./app.json').expo.extra,
      // Define public, non-sensitive keys
      CLOUDINARY_UPLOAD_PRESET: 'ml_default',
    },
    // Hook that enables runtime environment variables via Expo
    hooks: {
      postPublish: [
        {
          file: 'expo-env/hooks/postPublish',
          config: {
            // This is where we'll access our environment variables from Expo's dashboard
            // No sensitive keys are hardcoded here
          }
        }
      ]
    }
  }
};
