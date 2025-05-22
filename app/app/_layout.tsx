import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

export default function RootLayout() {
  const [loaded] = useFonts({
    // You can add custom fonts here if needed
  });

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LinearGradient
          colors={['rgba(26, 9, 51, 0.8)', 'rgba(14, 26, 77, 0.85)']}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
        />
        <ActivityIndicator size="large" color="#99f6ff" />
      </View>
    );
  }

  return (
    <ThemeProvider value={{ 
        dark: true, 
        colors: { 
          background: '#1a0933',
          primary: '#99f6ff',
          card: '#2a1459',
          text: '#ffffff',
          border: '#373268',
          notification: '#ff6b6b'
        },
        fonts: {
          regular: {
            fontFamily: 'System',
            fontWeight: 'normal',
          },
          medium: {
            fontFamily: 'System',
            fontWeight: '500',
          },
          bold: {
            fontFamily: 'System',
            fontWeight: 'bold',
          },
          heavy: {
            fontFamily: 'System',
            fontWeight: '900',
          }
        }
      }}>
      <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="upload" />
        <Stack.Screen name="results" />
        <Stack.Screen name="routine" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
