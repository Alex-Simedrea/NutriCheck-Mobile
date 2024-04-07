import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';

export default function Leaderboard() {
  const { colorScheme } = useColorScheme();

  return (
    <View className={'flex-1 dark:bg-black'}>
      <Pressable
        onPress={() => router.push('/edit-account')}
        className='flex-row items-center justify-between border-b-[0.7px] border-b-black/10 py-3 pr-4 pt-4 active:opacity-70 dark:border-b-white/10'
      >
        <Text className='p-0 text-lg text-black dark:text-white'>Eee eee</Text>
        <Text className='p-0 text-lg text-black dark:text-white'>
          50000 points
        </Text>
      </Pressable>
    </View>
  );
}
