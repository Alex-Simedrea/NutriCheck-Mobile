import { cn, formatDate } from '@/lib/utils';
import { Pressable, Text } from 'react-native';

export default function ChallengeCard({
  title,
  description,
  organizer,
  startDate,
  endDate,
  goal,
  unit,
  onPress,
  className,
}: {
  title: string;
  description: string;
  organizer: string;
  startDate: string;
  endDate: string;
  goal: number;
  unit: string;
  onPress: () => void;
  className?: string;
}) {


  return (
    <Pressable
      className={cn(
        'w-full rounded-2xl bg-white px-6 py-4 dark:bg-background-900',
        className,
      )}
      onPress={onPress}
    >
      <Text className='pb-2 text-2xl font-bold text-black dark:text-white'>
        {title}
      </Text>
      <Text className='line-clamp-3 text-lg leading-tight text-black dark:text-white'>
        {description}
      </Text>
      <Text className='py-1 text-black/80 dark:text-white/80'>
        Organizer: {organizer}
      </Text>
      <Text className='py-1 text-black/80 dark:text-white/80'>
        {formatDate(startDate)} - {formatDate(endDate)}
      </Text>
      <Text className='py-1 font-semibold text-xl text-black dark:text-white'>
        Goal: {goal} {unit}
      </Text>
    </Pressable>
  );
}