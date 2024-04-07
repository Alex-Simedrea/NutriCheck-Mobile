import { Pressable, Text } from 'react-native';
import { cn } from '@/lib/utils';
import React from 'react';
import Vote from '@/components/vote';

export default function PostCard({
  title,
  content,
  author,
  date,
  upVotes,
  downVotes,
  liked,
  className,
  onPress,
  onUpVote,
  onDownVote,
  onDeleteVote,
  inModal = false,
}: {
  title: string;
  content: string;
  author: string;
  date: string;
  upVotes: number;
  downVotes: number;
  liked: boolean | null;
  className?: string;
  onPress?: () => void;
  onUpVote: () => void;
  onDownVote: () => void;
  onDeleteVote: () => void;
  inModal?: boolean;
}) {
  return (
    <Pressable
      className={cn(
        'w-full rounded-2xl bg-white px-6 py-4 dark:bg-background-900',
        inModal ? 'bg-background-50 dark:bg-background-800' : '',
        className,
      )}
      onPress={onPress}
    >
      <Text className='py-1 font-medium text-black/80 dark:text-white/80'>
        {'@' + author} - {date}
      </Text>
      <Text className='pb-2 text-2xl font-bold text-black dark:text-white'>
        {title}
      </Text>
      <Text className='line-clamp-3 text-lg leading-tight text-black dark:text-white'>
        {content}
      </Text>
      <Vote
        upVotes={upVotes}
        downVotes={downVotes}
        onUpVote={onUpVote}
        onDownVote={onDownVote}
        onDeleteVote={onDeleteVote}
        liked={liked}
      />
    </Pressable>
  );
}
