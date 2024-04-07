import { Post, useDeleteVote, useVotePost } from '@/api/posts';
import PostCard from '@/components/post-card';
import { router } from 'expo-router';
import { formatDate } from '@/lib/utils';
import LoadingView from '@/components/loading-view';
import { Text } from 'react-native';
import RetryView from '@/components/retry-view';

export default function PostsList({
  posts,
  isPending,
  isError,
  refetch,
  isPendingLoading = true,
  inModal = false,
}: {
  posts: Post[];
  isPending: boolean;
  isError: boolean;
  refetch: () => void;
  isPendingLoading?: boolean;
  inModal?: boolean;
}) {
  if (isPending) {
    if (isPendingLoading) return <LoadingView />;
    else return null;
  }

  if (isError) {
    return <RetryView refetch={refetch} />;
  }

  const reviewPost = useVotePost();
  const deleteReview = useDeleteVote();

  return (
    <>
      {posts?.length > 0 ? (
        posts?.map((post: Post, index) => (
          <PostCard
            onPress={() => {
              if (inModal) {
                router.back();
              }
              router.push(`/post/${post.id}`);
            }}
            key={index}
            title={post.title}
            date={formatDate(post.date)}
            author={post.author.user}
            content={post.content}
            downVotes={post.downVotes}
            upVotes={post.upVotes}
            liked={post.vote}
            onUpVote={() =>
              reviewPost.mutate({ id: post.id.toString(), like: true })
            }
            onDownVote={() =>
              reviewPost.mutate({ id: post.id.toString(), like: false })
            }
            onDeleteVote={() => deleteReview.mutate(post.id.toString())}
            inModal={inModal}
          />
        ))
      ) : (
        <Text className={'text-lg font-bold text-black/80 dark:text-white/80'}>
          Nothing here yet
        </Text>
      )}
    </>
  );
}
