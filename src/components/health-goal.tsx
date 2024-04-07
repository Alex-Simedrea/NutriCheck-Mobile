import { Pressable, Text, View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { cn } from '@/lib/utils';
import { Ionicons } from '@expo/vector-icons';

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
}: {
  cur: number;
  goal: number;
  title: string;
  unit: string;
  className?: string;
  showButton?: boolean;
  buttonText?: string;
  buttonAction?: () => void;
  onPress?: () => void;
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
        maxValue={cur > goal ? cur : goal}
        subtitle={`/ ${goal} ${unit}`}
      />
      <View className={'w-full items-center p-0'}>
        <Text className={'text-2xl font-bold text-black dark:text-white'}>
          {title}
        </Text>
        {showButton && (
          <Pressable
            onPress={buttonAction}
            className={cn('mt mt-4 active:opacity-70 w-full')}
          >
            <View className='dark:android:bg-blue-400 h-14 flex-row items-center justify-center rounded-[16.5] bg-default-blue px-10'>
              {/*<Ionicons*/}
              {/*  name={'add'}*/}
              {/*  size={28}*/}
              {/*  color='white'*/}
              {/*  className={'mr-2'}*/}
              {/*/>*/}
              <Text className='text-xl font-semibold text-white'>{buttonText}</Text>
            </View>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}
