import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { Text } from 'react-native';
import Toast, { ToastConfig } from 'react-native-toast-message';
import { BlurView } from 'expo-blur';
import HeaderCloseButton from '@/components/header-close-button';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import { StatusBar } from 'expo-status-bar';

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

export default function ModalsLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <AutocompleteDropdownContextProvider headerOffset={60}>
      <Stack.Screen options={{ headerShown: false, headerTitle: '' }} />
      <Stack>
        <Stack.Screen
          name={'create-post'}
          options={{
            presentation: 'modal',
            headerTitleStyle: {
              color: colorScheme === 'light' ? 'black' : 'white',
            },
            headerStyle: {
              backgroundColor:
                colorScheme === 'light' ? 'white' : 'rgb(30, 30, 30)',
            },
            headerShadowVisible: false,
            headerTitle: 'Create a new post',
            headerLeft: () => <HeaderCloseButton />,
          }}
        />
        <Stack.Screen
          name={'edit-account'}
          options={{
            presentation: 'modal',
            headerTitleStyle: {
              color: colorScheme === 'light' ? 'black' : 'white',
            },
            headerStyle: {
              backgroundColor:
                colorScheme === 'light' ? 'white' : 'rgb(30, 30, 30)',
            },
            headerShadowVisible: false,
            headerTitle: 'Edit profile',
            headerLeft: () => <HeaderCloseButton />,
          }}
        />
        <Stack.Screen
          name={'scan-code'}
          options={{
            presentation: 'modal',
            headerTitleStyle: {
              color: colorScheme === 'light' ? 'black' : 'white',
            },
            headerStyle: {
              backgroundColor:
                colorScheme === 'light' ? 'white' : 'rgb(30, 30, 30)',
            },
            headerShadowVisible: false,
            headerTitle: 'Scan a barcode',
            headerLeft: () => <HeaderCloseButton />,
          }}
        />
        <Stack.Screen
          name={'edit-preferences'}
          options={{
            presentation: 'modal',
            headerTitleStyle: {
              color: colorScheme === 'light' ? 'black' : 'white',
            },
            headerStyle: {
              backgroundColor:
                colorScheme === 'light' ? 'white' : 'rgb(30, 30, 30)',
            },
            headerShadowVisible: false,
            headerTitle: 'Edit your dietary preferences',
            headerLeft: () => <HeaderCloseButton />,
          }}
        />
        <Stack.Screen
          name={'nutritional-facts'}
          options={{
            presentation: 'modal',
            headerTitleStyle: {
              color: colorScheme === 'light' ? 'black' : 'white',
            },
            headerStyle: {
              backgroundColor:
                colorScheme === 'light' ? 'white' : 'rgb(30, 30, 30)',
            },
            headerShadowVisible: false,
            headerTitle: 'Nutritional facts',
            headerLeft: () => <HeaderCloseButton />,
          }}
        />
        <Stack.Screen
          name={'allergens'}
          options={{
            presentation: 'modal',
            headerTitleStyle: {
              color: colorScheme === 'light' ? 'black' : 'white',
            },
            headerStyle: {
              backgroundColor:
                colorScheme === 'light' ? 'white' : 'rgb(30, 30, 30)',
            },
            headerShadowVisible: false,
            headerTitle: 'Allergens',
            headerLeft: () => <HeaderCloseButton />,
          }}
        />
        <Stack.Screen
          name={'create-submission'}
          options={{
            presentation: 'modal',
            headerTitleStyle: {
              color: colorScheme === 'light' ? 'black' : 'white',
            },
            headerStyle: {
              backgroundColor:
                colorScheme === 'light' ? 'white' : 'rgb(30, 30, 30)',
            },
            headerShadowVisible: false,
            headerTitle: 'Create a product submission',
            headerLeft: () => <HeaderCloseButton />,
          }}
        />
        <Stack.Screen
          name={'community-guidelines'}
          options={{
            presentation: 'modal',
            headerTitleStyle: {
              color: colorScheme === 'light' ? 'black' : 'white',
            },
            headerStyle: {
              backgroundColor:
                colorScheme === 'light' ? 'white' : 'rgb(30, 30, 30)',
            },
            headerShadowVisible: false,
            headerTitle: 'Community Guidelines',
            headerLeft: () => <HeaderCloseButton />,
          }}
        />
        <Stack.Screen
          name={'body-profile'}
          options={{
            presentation: 'modal',
            headerTitleStyle: {
              color: colorScheme === 'light' ? 'black' : 'white',
            },
            headerStyle: {
              backgroundColor:
                colorScheme === 'light' ? 'white' : 'rgb(30, 30, 30)',
            },
            headerShadowVisible: false,
            headerTitle: 'Edit body profile',
            headerLeft: () => <HeaderCloseButton />,
          }}
        />
        <Stack.Screen
          name={'submissions'}
          options={{
            presentation: 'modal',
            headerTitleStyle: {
              color: colorScheme === 'light' ? 'black' : 'white',
            },
            headerStyle: {
              backgroundColor:
                colorScheme === 'light' ? 'white' : 'rgb(30, 30, 30)',
            },
            headerShadowVisible: false,
            headerTitle: 'Submissions',
            headerLeft: () => <HeaderCloseButton />,
          }}
        />
        <Stack.Screen
          name={'submission'}
          options={{
            presentation: 'modal',
            headerTitleStyle: {
              color: colorScheme === 'light' ? 'black' : 'white',
            },
            headerStyle: {
              backgroundColor:
                colorScheme === 'light' ? 'white' : 'rgb(30, 30, 30)',
            },
            headerShadowVisible: false,
            headerTitle: 'Submission',
            headerLeft: () => <HeaderCloseButton />,
          }}
        />
        <Stack.Screen
          name={'account'}
          options={{
            presentation: 'modal',
            headerTitleStyle: {
              color: colorScheme === 'light' ? 'black' : 'white',
            },
            headerStyle: {
              backgroundColor:
                colorScheme === 'light' ? 'white' : 'rgb(30, 30, 30)',
            },
            headerShadowVisible: false,
            headerTitle: 'Account',
            headerLeft: () => <HeaderCloseButton />,
          }}
        />
        <Stack.Screen
          name={'edit-goals'}
          options={{
            presentation: 'modal',
            headerTitleStyle: {
              color: colorScheme === 'light' ? 'black' : 'white',
            },
            headerStyle: {
              backgroundColor:
                colorScheme === 'light' ? 'white' : 'rgb(30, 30, 30)',
            },
            headerShadowVisible: false,
            headerTitle: 'Edit your goals',
            headerLeft: () => <HeaderCloseButton />,
          }}
        />
      </Stack>
      <Toast config={toastConfig} />
      <StatusBar style='auto' />
    </AutocompleteDropdownContextProvider>
  );
}
