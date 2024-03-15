import { Redirect, Stack, usePathname } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { Platform } from 'react-native';
import { useSession } from '@/context/AuthContext';
import LoadingView from '@/components/loading-view';
import { usePath } from '@/data/path';
import { useEffect } from 'react';

function headerHomeName(storePath: string) {
  if (storePath === '/') return 'Home';
  if (storePath === '/search') return 'Search';
  if (storePath === '/cart') return 'Shopping list';
  if (storePath === '/account') return 'Account';
  return 'Home';
}

export default function AppLayout() {
  const { colorScheme } = useColorScheme();
  const pathname = usePathname();
  const path = usePath();

  const { session, isLoading } = useSession();

  useEffect(() => {
    if (
      pathname === '/' ||
      pathname === '/search' ||
      pathname === '/cart' ||
      pathname === '/account'
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
      </Stack>
    </>
  );
}
