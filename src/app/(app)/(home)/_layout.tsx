import { Tabs } from 'expo-router';
import { Platform, PlatformColor, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';

export default function AppLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor:
            colorScheme === 'light' ? 'rgb(255, 255, 255)' : 'rgb(30,30,30)',
          borderTopColor: 'rgba(255, 255, 255, 0.3)',
          elevation: 0,
        },
        // headerTitleStyle: {
        //   color: colorScheme === 'light' ? 'black' : 'white',
        // },
        // headerStyle: {
        //   backgroundColor:
        //     colorScheme === 'light' ? 'white' : 'rgb(30, 30, 30)',
        // },
        //
        // headerShadowVisible: false,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          headerTitle: 'Home',
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused
                  ? Platform.OS === 'ios'
                    ? PlatformColor('systemBlue')
                    : colorScheme === 'dark'
                      ? 'rgb(190,190,190)'
                      : 'rgb(30,30,30)'
                  : colorScheme === 'dark'
                    ? 'rgb(190,190,190)'
                    : 'rgb(30,30,30)',
                fontSize: 10,
              }}
            >
              Home
            </Text>
          ),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons
                name='home'
                size={24}
                color={
                  Platform.OS === 'ios'
                    ? Platform.select({
                        ios: PlatformColor('systemBlue'),
                      })
                    : colorScheme === 'dark'
                      ? 'rgb(190,190,190)'
                      : 'rgb(30,30,30)'
                }
              />
            ) : (
              <Ionicons
                name='home-outline'
                size={24}
                color={
                  colorScheme === 'dark' ? 'rgb(190,190,190)' : 'rgb(30,30,30)'
                }
              />
            ),
        }}
      />
      <Tabs.Screen
        name='search'
        options={{
          title: 'Search',
          headerTitle: 'Search',
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused
                  ? Platform.OS === 'ios'
                    ? PlatformColor('systemBlue')
                    : colorScheme === 'dark'
                      ? 'rgb(190,190,190)'
                      : 'rgb(30,30,30)'
                  : colorScheme === 'dark'
                    ? 'rgb(190,190,190)'
                    : 'rgb(30,30,30)',
                fontSize: 10,
              }}
            >
              Search
            </Text>
          ),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons
                name='search'
                size={24}
                color={
                  Platform.OS === 'ios'
                    ? Platform.select({
                        ios: PlatformColor('systemBlue'),
                      })
                    : colorScheme === 'dark'
                      ? 'rgb(190,190,190)'
                      : 'rgb(30,30,30)'
                }
              />
            ) : (
              <Ionicons
                name='search-outline'
                size={24}
                color={
                  colorScheme === 'dark' ? 'rgb(190,190,190)' : 'rgb(30,30,30)'
                }
              />
            ),
        }}
      />
      <Tabs.Screen
        name='cart'
        options={{
          title: 'Shopping list',
          headerTitle: 'Shopping list',
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused
                  ? Platform.OS === 'ios'
                    ? PlatformColor('systemBlue')
                    : colorScheme === 'dark'
                      ? 'rgb(190,190,190)'
                      : 'rgb(30,30,30)'
                  : colorScheme === 'dark'
                    ? 'rgb(190,190,190)'
                    : 'rgb(30,30,30)',
                fontSize: 10,
              }}
            >
              Shopping list
            </Text>
          ),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons
                name='list'
                size={24}
                color={
                  Platform.OS === 'ios'
                    ? Platform.select({
                        ios: PlatformColor('systemBlue'),
                      })
                    : colorScheme === 'dark'
                      ? 'rgb(190,190,190)'
                      : 'rgb(30,30,30)'
                }
              />
            ) : (
              <Ionicons
                name='list-outline'
                size={24}
                color={
                  colorScheme === 'dark' ? 'rgb(190,190,190)' : 'rgb(30,30,30)'
                }
              />
            ),
        }}
      />
      <Tabs.Screen
        name='account'
        options={{
          title: 'Account',
          headerTitle: 'Account',
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused
                  ? Platform.OS === 'ios'
                    ? PlatformColor('systemBlue')
                    : colorScheme === 'dark'
                      ? 'rgb(190,190,190)'
                      : 'rgb(30,30,30)'
                  : colorScheme === 'dark'
                    ? 'rgb(190,190,190)'
                    : 'rgb(30,30,30)',
                fontSize: 10,
              }}
            >
              Account
            </Text>
          ),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons
                name='person'
                size={24}
                color={
                  Platform.OS === 'ios'
                    ? Platform.select({
                        ios: PlatformColor('systemBlue'),
                      })
                    : colorScheme === 'dark'
                      ? 'rgb(190,190,190)'
                      : 'rgb(30,30,30)'
                }
              />
            ) : (
              <Ionicons
                name='person-outline'
                size={24}
                color={
                  colorScheme === 'dark' ? 'rgb(190,190,190)' : 'rgb(30,30,30)'
                }
              />
            ),
        }}
      />
    </Tabs>
  );
}
