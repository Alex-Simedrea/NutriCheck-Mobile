import { Text } from 'react-native';
import React from 'react';
import { cn } from '@/lib/utils';

export default function Title({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <Text
      className={cn(
        'py-4 text-3xl font-extrabold text-black dark:text-white',
        className,
      )}
    >
      {text}
    </Text>
  );
}
