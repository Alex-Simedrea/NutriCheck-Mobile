import { Pressable, Text, View } from 'react-native';
import { cn } from '@/lib/utils';
import { Ionicons } from '@expo/vector-icons';

export default function LargeButton({
  text,
  className,
  onPress,
  iconName,
}: {
  text: string;
  className?: string;
  onPress: () => void;
  iconName?: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(' active:opacity-70', className)}
    >
      <View className='dark:android:bg-blue-400 h-14 w-full flex-row items-center justify-center rounded-[16.5] bg-default-blue'>
        {iconName && (
          <Ionicons
            name={iconName as any}
            size={28}
            color='white'
            className={cn(text ? 'mr-2' : '')}
          />
        )}
        <Text className='text-xl font-semibold text-white'>{text}</Text>
      </View>
    </Pressable>
  );
}
