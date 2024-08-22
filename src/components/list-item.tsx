import { Pressable, Text, useColorScheme, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { cn } from '@/lib/utils';

export default function ListItem({
  text,
  onPress,
  leftComponent,
  rightComponent,
  textStyle,
  firstItem,
  lastItem,
  shouldPress = true,
  backgroundColor,
}: {
  text: string;
  onPress?: () => void;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  textStyle?: string;
  firstItem?: boolean;
  lastItem?: boolean;
  shouldPress?: boolean;
  backgroundColor?: string;
}) {
  const colorScheme = useColorScheme();

  return (
    <Pressable
      onPress={() => {
        if (shouldPress && onPress) {
          onPress();
        }
      }}
      android_ripple={
        shouldPress ? { color: 'rgba(0, 0, 0, 0.1)', borderless: false } : null
      }
      className={cn(
        'flex-row items-center justify-between bg-white pl-4 dark:bg-background-900',
        lastItem && 'rounded-b-2xl',
        firstItem && 'rounded-t-2xl',
        backgroundColor && backgroundColor,
      )}
    >
      <View
        className={cn(
          'flex-1 flex-row items-center justify-between gap-4 py-3 pr-4',
          lastItem ??
            'border-b-[0.7px] border-b-black/10 dark:border-b-white/10',
        )}
      >
        {leftComponent ? (
          leftComponent
        ) : (
          <Text
            className={cn(
              'flex-1 p-0 text-lg text-black dark:text-white',
              textStyle,
            )}
          >
            {text}
          </Text>
        )}
        {rightComponent ? (
          rightComponent
        ) : (
          <Ionicons
            name='chevron-forward'
            size={20}
            color={
              colorScheme === 'light'
                ? 'rgba(0, 0, 0, 0.4)'
                : 'rgba(255, 255, 255, 0.4)'
            }
          />
        )}
      </View>
    </Pressable>
  );
}
