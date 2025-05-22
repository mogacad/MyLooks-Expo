# MyLooks App

An AI-powered application that analyzes your personal style and provides recommendations.

## Getting Started

1. Install dependencies

   ```bash
   npm install
   ```

2. Set up environment variables
   
   For local development, create a `.env` file in the project root with the following variables:
   ```
   OPENAI_API_KEY=your_openai_key
   IMGBB_API_KEY=your_imgbb_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   ```
   
   **IMPORTANT:** For production builds, these variables should be set through the Expo Dashboard:
   https://expo.dev/accounts/mogac/projects/MyLooks

3. Start the app

   ```bash
   npx expo start
   ```

## Project Structure

- **app/** - Main application screens and navigation (using Expo Router)
- **components/** - Reusable UI components
- **utils/** - Utility functions including environment.js for API key management
- **assets/** - Images, fonts, and other static resources

## Building for App Stores

### Prerequisites

1. An Apple Developer account (for iOS App Store)
2. A Google Play Developer account (for Android Play Store)
3. Ensure all API keys are configured in Expo Dashboard, not in code
4. Create a privacy policy and host it online

### Build Commands

```bash
# Build for Android
npm run build:android

# Build for iOS
npm run build:ios

# Submit to stores
npm run submit:android
npm run submit:ios
```

### Environment Variables

This project uses Expo's environment variables system to keep sensitive API keys secure:

1. For development: Uses `.env` file locally
2. For production: Uses Expo Dashboard secrets
3. Access variables through the `utils/environment.js` helper

Never commit the `.env` file to version control.

## Learn More

- [Expo documentation](https://docs.expo.dev/)
- [Expo Router documentation](https://docs.expo.dev/router/introduction/)
- [EAS Build documentation](https://docs.expo.dev/build/introduction/)
- [Submitting to app stores](https://docs.expo.dev/submit/introduction/)
