import { Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';

export default function Stepper({
  amount,
  onIncrement,
  onDecrement,
}: {
  amount: number;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  const { colorScheme } = useColorScheme();

  return (
    <View className='flex-row items-center'>
      <Pressable onPress={onDecrement}>
        <Feather
          name='minus'
          size={24}
          color={colorScheme === 'dark' ? 'white' : 'black'}
        />
      </Pressable>
      <Text className='px-2 text-lg font-bold text-black dark:text-white'>
        {amount}
      </Text>
      <Pressable onPress={onIncrement}>
        <Feather
          name='plus'
          size={24}
          color={colorScheme === 'dark' ? 'white' : 'black'}
        />
      </Pressable>
    </View>
  );
}
