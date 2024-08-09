import '../global.css';
import { SplashScreen, Stack } from 'expo-router';
import { BlurView } from 'expo-blur';
import { LogBox, Text } from 'react-native';
import { useFonts } from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from '@/context/AuthContext';
import Toast, { ToastConfig } from 'react-native-toast-message';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';

const toastConfig: ToastConfig = {
  customToast: ({ text1, text2 }: { text1?: string; text2?: string }) => {
    return (
      <BlurView
        intensity={80}
        tint='light'
        style={{
          width: '90%',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: 16,
          paddingHorizontal: 12,
          paddingVertical: 8,
          overflow: 'hidden',
        }}
      >
        <Text className='text-lg font-medium text-black/80'>{text1}</Text>
        <Text className='text-sm font-light text-black/40'>{text2}</Text>
      </BlurView>
    );
  },
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '/',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  LogBox.ignoreAllLogs();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const queryClient = new QueryClient();

  return (
    <>
      <AutocompleteDropdownContextProvider>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </SessionProvider>
        </QueryClientProvider>
      </AutocompleteDropdownContextProvider>
      <Toast config={toastConfig} />
    </>
  );
}
