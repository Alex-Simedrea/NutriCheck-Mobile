import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import LargeButton from '@/components/large-button';

export default function RetryView({ refetch }: { refetch: () => void }) {
  const { colorScheme } = useColorScheme();

  return (
    <View className={'w-full flex-1 items-center justify-center dark:bg-black'}>
      <Ionicons
        name='cloud-offline-outline'
        size={100}
        color={
          colorScheme === 'dark'
            ? 'rgba(255, 255, 255, 0.5)'
            : 'rgba(0, 0, 0, 0.5)'
        }
      />
      <Text className={'text-lg text-black dark:text-white'}>
        There was a problem while loading.
      </Text>
      <LargeButton
        text='Retry'
        onPress={() => refetch()}
        className='mt-4 w-1/3'
      />
    </View>
  );
}
