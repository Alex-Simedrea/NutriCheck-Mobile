import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';

export default function Redeem() {
  const { colorScheme } = useColorScheme();

  return (
    <View className={'flex-1 dark:bg-black'}>
      <Pressable
        onPress={() => router.push('/edit-account')}
        className='flex-row items-center justify-between border-b-[0.7px] border-b-black/10 py-3 pr-4 pt-4 active:opacity-70 dark:border-b-white/10'
      >
        <Text className='p-0 text-lg text-black dark:text-white'>
          Redeem a gift card
        </Text>
        <Ionicons
          name='chevron-forward'
          size={20}
          color={
            colorScheme === 'light'
              ? 'rgba(0, 0, 0, 0.4)'
              : 'rgba(255, 255, 255, 0.4)'
          }
        />
      </Pressable>
      <Pressable
        onPress={() => {
          router.push('/edit-preferences');
        }}
        className='flex-row items-center justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 active:opacity-70 dark:border-b-white/10'
      >
        <Text className='p-0 text-lg text-black dark:text-white'>
          Donate to charity
        </Text>
        <Ionicons
          name='chevron-forward'
          size={20}
          color={
            colorScheme === 'light'
              ? 'rgba(0, 0, 0, 0.4)'
              : 'rgba(255, 255, 255, 0.4)'
          }
        />
      </Pressable>
      <Pressable
        onPress={() => {
          router.push('/body-profile');
        }}
        className='flex-row items-center justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 active:opacity-70 dark:border-b-white/10'
      >
        <Text className='p-0 text-lg text-black dark:text-white'>
          Subscribe to available services
        </Text>
        <Ionicons
          name='chevron-forward'
          size={20}
          color={
            colorScheme === 'light'
              ? 'rgba(0, 0, 0, 0.4)'
              : 'rgba(255, 255, 255, 0.4)'
          }
        />
      </Pressable>
    </View>
  );
}
