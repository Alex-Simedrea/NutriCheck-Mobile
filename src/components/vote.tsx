import { Platform, PlatformColor, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useColorScheme } from 'nativewind';
import { cn } from '@/lib/utils';

export default function Vote({
  upVotes,
  downVotes,
  onUpVote,
  onDownVote,
  onDeleteVote,
  className,
  liked,
}: {
  upVotes: number;
  downVotes: number;
  onUpVote: () => void;
  onDownVote: () => void;
  onDeleteVote: () => void;
  liked: boolean | null;
  className?: string;
}) {
  const { colorScheme } = useColorScheme();
  return (
    <View className={cn('mt-4 flex-row gap-4', className)}>
      <Pressable
        className='flex-row items-center'
        onPress={() => {
          if (liked !== true) {
            onUpVote();
          } else {
            onDeleteVote();
          }
        }}
      >
        <View className='flex-row items-center'>
          <Ionicons
            name='arrow-up'
            size={24}
            color={
              liked === true
                ? Platform.OS === 'ios'
                  ? PlatformColor('systemBlue')
                  : colorScheme === 'dark'
                    ? 'rgb(96, 165, 250)'
                    : 'rgb(37, 99, 235)'
                : colorScheme === 'light'
                  ? 'black'
                  : 'white'
            }
          />
          <Text
            className={cn(
              'text-lg text-black dark:text-white',
              liked
                ? Platform.OS === 'ios'
                  ? 'ios:text-default-blue ios:dark:text-default-blue'
                  : 'text-blue-600 dark:text-blue-400'
                : '',
            )}
          >
            {upVotes}
          </Text>
        </View>
      </Pressable>
      <Pressable
        className='flex-row items-center'
        onPress={() => {
          if (liked !== false) {
            onDownVote();
          } else {
            onDeleteVote();
          }
        }}
      >
        <View className='flex-row items-center'>
          <Ionicons
            name='arrow-down'
            size={24}
            color={
              liked === false
                ? colorScheme === 'dark'
                  ? 'rgb(251 146 60)'
                  : 'rgb(234 88 12)'
                : colorScheme === 'light'
                  ? 'black'
                  : 'white'
            }
          />
          <Text
            className={cn(
              'text-lg text-black dark:text-white',
              liked === false && 'text-orange-600 dark:text-orange-400',
            )}
          >
            {downVotes}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
