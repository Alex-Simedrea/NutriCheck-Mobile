import { Redirect, router, Stack, usePathname } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { Platform, TouchableOpacity } from 'react-native';
import { useSession } from '@/context/AuthContext';
import LoadingView from '@/components/loading-view';
import { usePath } from '@/data/path';
import { useEffect } from 'react';
import { useGetAccount } from '@/api/account';
import { Ionicons } from '@expo/vector-icons';

function headerHomeName(storePath: string) {
  if (storePath === '/') return 'Home';
  if (storePath === '/products') return 'Products';
  if (storePath === '/health') return 'Health';
  if (storePath === '/ai') return 'AI';
  if (storePath === '/challenges') return 'Challenges';
  return 'Home';
}

export default function AppLayout() {
  const { colorScheme } = useColorScheme();
  const pathname = usePathname();
  const path = usePath();

  const { session, isLoading } = useSession();

  const account = useGetAccount();

  useEffect(() => {
    if (
      pathname === '/' ||
      pathname === '/health' ||
      pathname === '/products' ||
      pathname === '/ai' ||
      pathname === '/challenges'
    )
      path.setPath(pathname);
  }, [pathname]);

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <LoadingView />;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href='/signin' />;
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Stack>
        <Stack.Screen
          name={'(modals)'}
          options={{ presentation: 'modal', headerShown: false }}
        />
        <Stack.Screen
          name={'(home)'}
          options={{
            headerTitleStyle: {
              color: colorScheme === 'light' ? 'black' : 'white',
            },
            headerStyle: {
              backgroundColor:
                colorScheme === 'light' ? 'white' : 'rgb(30, 30, 30)',
            },
            headerTitle: headerHomeName(path.path),
            headerTintColor:
              Platform.OS === 'android'
                ? colorScheme === 'light'
                  ? 'black'
                  : 'white'
                : '',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  router.push('/account');
                }}
              >
                <Ionicons
                  name='person-circle-outline'
                  size={30}
                  color={colorScheme === 'light' ? 'black' : 'white'}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name={'post/[postID]'}
          options={{
            headerTitleStyle: {
              color: colorScheme === 'light' ? 'black' : 'white',
            },
            headerStyle: {
              backgroundColor:
                colorScheme === 'light' ? 'white' : 'rgb(30, 30, 30)',
            },
            headerTitle: 'Post',
            headerTintColor:
              Platform.OS === 'android'
                ? colorScheme === 'light'
                  ? 'black'
                  : 'white'
                : '',
          }}
        />
        <Stack.Screen
          name={'product/[productEAN]'}
          options={{
            headerTitleStyle: {
              color: colorScheme === 'light' ? 'black' : 'white',
            },
            headerStyle: {
              backgroundColor:
                colorScheme === 'light' ? 'white' : 'rgb(30, 30, 30)',
            },
            headerTitle: 'Product',
            headerTintColor:
              Platform.OS === 'android'
                ? colorScheme === 'light'
                  ? 'black'
                  : 'white'
                : '',
          }}
        />
        <Stack.Screen
          name={'search-results'}
          options={{
            headerTitleStyle: {
              color: colorScheme === 'light' ? 'black' : 'white',
            },
            headerStyle: {
              backgroundColor:
                colorScheme === 'light' ? 'white' : 'rgb(30, 30, 30)',
            },
            headerTitle: 'Search results',
            headerTintColor:
              Platform.OS === 'android'
                ? colorScheme === 'light'
                  ? 'black'
                  : 'white'
                : '',
          }}
        />
        <Stack.Screen
          name={'challenge/index'}
          options={{
            headerTitleStyle: {
              color: colorScheme === 'light' ? 'black' : 'white',
            },
            headerStyle: {
              backgroundColor:
                colorScheme === 'light' ? 'white' : 'rgb(30, 30, 30)',
            },
            headerTitle: 'Challenge',
            headerTintColor:
              Platform.OS === 'android'
                ? colorScheme === 'light'
                  ? 'black'
                  : 'white'
                : '',
          }}
        />
        <Stack.Screen
          name={'goal/index'}
          options={{
            headerTitleStyle: {
              color: colorScheme === 'light' ? 'black' : 'white',
            },
            headerStyle: {
              backgroundColor:
                colorScheme === 'light' ? 'white' : 'rgb(30, 30, 30)',
            },
            headerTitle: 'Goal',
            headerTintColor:
              Platform.OS === 'android'
                ? colorScheme === 'light'
                  ? 'black'
                  : 'white'
                : '',
          }}
        />
        <Stack.Screen
          name={'redeem/index'}
          options={{
            headerTitleStyle: {
              color: colorScheme === 'light' ? 'black' : 'white',
            },
            headerStyle: {
              backgroundColor:
                colorScheme === 'light' ? 'white' : 'rgb(30, 30, 30)',
            },
            headerTitle: 'Redeem points',
            headerTintColor:
              Platform.OS === 'android'
                ? colorScheme === 'light'
                  ? 'black'
                  : 'white'
                : '',
          }}
        />
        <Stack.Screen
          name={'leaderboard/index'}
          options={{
            headerTitleStyle: {
              color: colorScheme === 'light' ? 'black' : 'white',
            },
            headerStyle: {
              backgroundColor:
                colorScheme === 'light' ? 'white' : 'rgb(30, 30, 30)',
            },
            headerTitle: 'Leaderboard',
            headerTintColor:
              Platform.OS === 'android'
                ? colorScheme === 'light'
                  ? 'black'
                  : 'white'
                : '',
          }}
        />
      </Stack>
    </>
  );
}
