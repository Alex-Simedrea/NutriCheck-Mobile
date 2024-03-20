import {
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Caption from '@/components/caption';
import { Ionicons } from '@expo/vector-icons';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormInput from '@/components/form-input';
import Vote from '@/components/vote';
import {
  useCreateComment,
  useDeleteComment,
  useDeletePost,
  useDeleteVote,
  useGetPost,
  useVotePost,
} from '@/api/posts';
import { router, useGlobalSearchParams } from 'expo-router';
import Toast from 'react-native-toast-message';
import { formatDate } from '@/lib/utils';
import LoadingView from '@/components/loading-view';
import { useCallback } from 'react';
import KeyboardAccessory from '@/components/keyboard-accessory';
import CommentCard from '@/components/comment-card';
import DeleteDropdown from '@/components/delete-dropdown';
import ProductChip from '@/components/product-chip';
import RetryView from '@/components/retry-view';

export default function Post() {
  const { postID } = useGlobalSearchParams();
  const { data, isPending, isError, error, refetch } = useGetPost(
    postID as string,
  );
  const createReview = useVotePost();
  const deleteReview = useDeleteVote();
  const createComment = useCreateComment();
  const deleteComment = useDeleteComment();
  const deletePost = useDeletePost();

  const inputAccessoryViewID = 'keyboard-accessory';
  const schema = yup.object({
    comment: yup.string().trim().required(),
  });
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      comment: '',
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: { comment: string }) => {
    createComment.mutate({ id: postID as string, body: data.comment });
    reset();
  };

  const onRefresh = useCallback(async () => {
    await refetch();
  }, []);

  if (isPending) {
    return <LoadingView />;
  }

  if (isError) {
    Toast.show({
      type: 'customToast',
      text1: 'Error',
      text2: error.message,
      position: 'bottom',
      visibilityTime: 8000,
    });
    return <RetryView refetch={refetch} />;
  }

  return (
    <>
      <ScrollView
        className={'p-4 dark:bg-black'}
        contentContainerClassName={'pb-12'}
        refreshControl={
          <RefreshControl refreshing={isPending} onRefresh={onRefresh} />
        }
      >
        <View
          className={'mb-4 rounded-2xl bg-white p-4 dark:bg-background-900'}
        >
          <View className='flex-row items-center justify-between'>
            <Caption className='flex-1 p-0' text={data.title} />
            {data.own && (
              <DeleteDropdown
                onDelete={() => {
                  deletePost.mutate(data.id.toString());
                  router.back();
                  Toast.show({
                    type: 'customToast',
                    text1: 'Post deleted',
                    text2: 'Your post has been deleted successfully!',
                    position: 'bottom',
                  });
                }}
              />
            )}
          </View>
          <Text className={'text-lg dark:text-white'}>
            {'@' + data.author.user} - {formatDate(data.date)}
          </Text>
          <Text className={'pt-4 text-lg leading-tight dark:text-white'}>
            {data.content}
          </Text>
          <View className={'flex-row items-center justify-between pt-4'}>
            <Vote
              upVotes={data.upVotes}
              downVotes={data.downVotes}
              onUpVote={() => {
                createReview.mutate({ id: data.id.toString(), like: true });
              }}
              onDownVote={() => {
                createReview.mutate({ id: data.id.toString(), like: false });
              }}
              onDeleteVote={() => deleteReview.mutate(data.id.toString())}
              liked={data.vote}
              className='pr-6'
            />
            {data.productEAN && <ProductChip ean={data?.productEAN} />}
          </View>
        </View>
        <Caption text='Comments' />
        <View className={'mb-3 flex-1 flex-row gap-2'}>
          <FormInput
            control={control}
            name='comment'
            placeholder='Write your comment here...'
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText=''
            contentType='none'
            flex1={true}
            shouldError={false}
          />
          <Pressable
            onPress={handleSubmit(onSubmit)}
            className={
              'ios:bg-default-blue dark:ios:bg-default-blue items-center justify-center rounded-2xl bg-blue-600 px-5 active:opacity-70 dark:bg-blue-400'
            }
          >
            <Ionicons name='send' size={24} color={'white'} />
          </Pressable>
        </View>
        {data.comments.map((comment, index) => (
          <CommentCard
            comment={comment}
            deleteComment={deleteComment}
            refetch={refetch}
            key={index}
          />
        ))}
      </ScrollView>
      <KeyboardAccessory inputAccessoryViewID={inputAccessoryViewID} />
    </>
  );
}
