import { Pressable, Text, View } from 'react-native';
import { cn } from '@/lib/utils';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default function HealthGoal({
  cur,
  goal,
  title,
  unit,
  className,
  showButton,
  buttonText,
  buttonAction,
  onPress,
  size,
  titleClassName,
  subtitleClassName,
}: {
  cur: number;
  goal: number;
  title?: string;
  unit: string;
  className?: string;
  showButton?: boolean;
  buttonText?: string;
  buttonAction?: () => void;
  onPress?: () => void;
  size?: number;
  titleClassName?: string;
  subtitleClassName?: string;
}) {
  if (cur === null) {
    return null;
  }

  return (
    <Pressable
      onPress={onPress}
      className={cn(
        'grow items-center rounded-2xl bg-white px-4 py-8 dark:bg-background-900',
        className,
      )}
    >
      <AnimatedCircularProgress
        size={size ?? 120}
        width={10}
        fill={(cur / goal) * 100}
        rotation={0}
        tintColor='#2ecc71'
        onAnimationComplete={() => console.log('onAnimationComplete')}
        backgroundColor='#40404050'
        lineCap='round'
      >
        {() => (
          <View className='items-center'>
            <Text className={cn('text-3xl font-bold text-[#2ecc71]', titleClassName)}>
              {cur.toFixed(0)}
            </Text>
            <Text className={cn('text-sm font-medium text-[#2ecc71]', subtitleClassName)}>
              / {goal} {unit}
            </Text>
          </View>
        )}
      </AnimatedCircularProgress>
      <View className={'w-full items-center p-0'}>
        {title && (
          <Text className={'text-2xl font-bold text-black dark:text-white'}>
            {title}
          </Text>
        )}
        {showButton && (
          <Pressable
            onPress={buttonAction}
            className={cn('mt-4 w-full active:opacity-70')}
          >
            <View className='dark:android:bg-blue-400 h-14 flex-row items-center justify-center rounded-[16.5] bg-default-blue px-4'>
              <Text className='text-lg font-semibold leading-tight text-white'>
                {buttonText}
              </Text>
            </View>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}
