# MyLooks App - Testing Instructions

This folder contains a clean, consolidated version of the MyLooks app that's ready for testing with Expo Go and publishing.

## Setup Instructions

1. **Install dependencies**:
   ```
   cd MyLooks-Final
   npm install
   ```

2. **Create an environment file**:
   Create a `.env` file in the root directory with the following content (replace with your actual API keys):
   ```
   OPENAI_API_KEY=your_openai_api_key
   IMGBB_API_KEY=your_imgbb_api_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   ```

3. **Start the app with Expo Go**:
   ```
   npm start
   ```
   Then scan the QR code with the Expo Go app on your device.

## Testing the App

The app flow should be:
1. Onboarding screens (first run only)
2. Main Screen
3. Upload photo screen
4. Results screen
5. Personal routine screen

## Publishing to Expo

To publish this app to Expo (making it available via a link without requiring a local build):

```
npx expo publish
```

This will create a project on your Expo account that others can access via a link or QR code.

## Building for App Stores

When you're ready to create app store builds:

```
# For Android
npm run build:android

# For iOS
npm run build:ios
```

For questions or issues, refer to the main README.md file or Expo documentation.
