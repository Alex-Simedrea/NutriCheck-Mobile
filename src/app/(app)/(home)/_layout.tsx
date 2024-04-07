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
        name='ai'
        options={{
          title: 'AI',
          headerTitle: 'AI',
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
              AI
            </Text>
          ),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons
                name='sparkles'
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
                name='sparkles-outline'
                size={24}
                color={
                  colorScheme === 'dark' ? 'rgb(190,190,190)' : 'rgb(30,30,30)'
                }
              />
            ),
        }}
      />
      <Tabs.Screen
        name='products'
        options={{
          title: 'Products',
          headerTitle: 'Products',
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
              Products
            </Text>
          ),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons
                name='basket'
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
                name='basket-outline'
                size={24}
                color={
                  colorScheme === 'dark' ? 'rgb(190,190,190)' : 'rgb(30,30,30)'
                }
              />
            ),
        }}
      />
      <Tabs.Screen
        name='health'
        options={{
          title: 'Health',
          headerTitle: 'Health',
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
              Health
            </Text>
          ),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons
                name='heart'
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
                name='heart-outline'
                size={24}
                color={
                  colorScheme === 'dark' ? 'rgb(190,190,190)' : 'rgb(30,30,30)'
                }
              />
            ),
        }}
      />
      <Tabs.Screen
        name='challenges'
        options={{
          title: 'Challenges',
          headerTitle: 'Challenges',
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
              Challenges
            </Text>
          ),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons
                name='walk'
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
                name='walk-outline'
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
