import { Pressable, Text, View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { cn } from '@/lib/utils';

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
  radius
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
  radius?: number;
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
      <CircularProgress
        value={cur}
        maxValue={Math.max(goal, cur)}
        subtitle={`/ ${goal} ${unit}`}
        radius={radius}
      />
      <View className={'w-full items-center p-0'}>
        {title && (
          <Text className={'text-2xl font-bold text-black dark:text-white'}>
            {title}
          </Text>
        )}
        {showButton && (
          <Pressable
            onPress={buttonAction}
            className={cn('mt mt-4 w-full active:opacity-70')}
          >
            <View className='dark:android:bg-blue-400 h-14 flex-row items-center justify-center rounded-[16.5] bg-default-blue px-10'>
              {/*<Ionicons*/}
              {/*  name={'add'}*/}
              {/*  size={28}*/}
              {/*  color='white'*/}
              {/*  className={'mr-2'}*/}
              {/*/>*/}
              <Text className='text-xl font-semibold text-white'>
                {buttonText}
              </Text>
            </View>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}
