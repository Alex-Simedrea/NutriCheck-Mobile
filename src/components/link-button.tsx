import React from 'react';
import { Pressable, Text } from 'react-native';

export default function LinkButton({
  text,
  className,
  onPress,
}: {
  text: string;
  className?: string;
  onPress: () => void;
}) {
  return (
    <Pressable className={className} onPress={onPress}>
      <Text className='text-base text-black/80 underline dark:text-white/80'>
        {text}
      </Text>
    </Pressable>
  );
}
