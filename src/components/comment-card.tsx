import { Text, View } from 'react-native';
import { formatDate } from '@/lib/utils';
import { useColorScheme } from 'nativewind';
import { Comment } from '@/api/posts';
import { UseMutationResult } from '@tanstack/react-query';
import DeleteDropdown from '@/components/delete-dropdown';

export default function CommentCard({
  comment,
  deleteComment,
  refetch,
}: {
  comment: Comment;
  deleteComment: UseMutationResult<any, Error, string, unknown>;
  refetch: () => void;
}) {
  const { colorScheme } = useColorScheme();

  return (
    <View
      className='mb-4 rounded-2xl bg-white p-4 pt-3 dark:bg-background-900'
      key={comment.id}
    >
      <View className='flex-row items-center justify-between'>
        <Text className='text-lg font-semibold dark:text-white'>
          {comment.author.user} - {formatDate(comment.date)}
        </Text>
        {comment.own ? (
          <DeleteDropdown
            onDelete={() => {
              deleteComment.mutate(comment.id.toString());
              refetch();
            }}
          />
        ) : null}
      </View>
      <Text className='pt-2 text-lg dark:text-white'>{comment.body}</Text>
    </View>
  );
}
