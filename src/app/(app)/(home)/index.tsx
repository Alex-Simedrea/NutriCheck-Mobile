import { RefreshControl, SafeAreaView, ScrollView } from 'react-native';
import { router } from 'expo-router';
import LargeButton from '@/components/large-button';
import { useGetPosts } from '@/api/posts';
import Toast from 'react-native-toast-message';
import React, { useCallback, useState } from 'react';
import PostsList from '@/components/posts-list';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import PostNotification from '@/components/post-notification';

export default function Index() {
  const { data, error, isPending, isError, refetch } = useGetPosts();

  const [selectedItem, setSelectedItem] = useState(null);

  const onRefresh = useCallback(async () => {
    await refetch();
  }, []);

  if (isError) {
    Toast.show({
      type: 'customToast',
      text1: 'Error loading posts',
      text2: error.message,
      position: 'bottom',
      visibilityTime: 8000,
    });
  }

  return (
    <SafeAreaView className='flex-1 dark:bg-black'>
      <ScrollView
        contentContainerClassName='gap-3 p-4'
        refreshControl={
          <RefreshControl refreshing={isPending} onRefresh={onRefresh} />
        }
      >
      <PostNotification />
        <LargeButton
          text='Create post'
          onPress={() => {
            router.push('/create-post');
          }}
          iconName='create-outline'
          className='my-2'
        />

        <PostsList
          posts={data}
          isPending={isPending}
          isError={isError}
          refetch={refetch}
          isPendingLoading={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
