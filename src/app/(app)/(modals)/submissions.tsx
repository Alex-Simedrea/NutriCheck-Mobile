import { useGetOwnSubmissions } from '@/api/submissions';
import LoadingView from '@/components/loading-view';
import RetryView from '@/components/retry-view';
import { FlatList, Pressable, Text, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { router } from 'expo-router';

export default function Submissions() {
  const { colorScheme } = useColorScheme();

  const submissions = useGetOwnSubmissions();

  if (submissions.isPending) {
    return <LoadingView />;
  }

  if (submissions.isError) {
    return <RetryView refetch={submissions.refetch} />;
  }

  return (
    <View className={'flex-1 bg-white pl-4 dark:bg-background-900'}>
      <FlatList
        data={submissions.data}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              router.push({ pathname: '/submission', params: { id: item.id } });
            }}
            className='flex-row items-center justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 active:opacity-70 dark:border-b-white/10'
          >
            <Text className='p-0 text-lg text-black dark:text-white'>
              {item.body?.product?.product_name ?? item.productEAN}
            </Text>
            <Ionicons
              name='chevron-forward'
              size={20}
              color={
                colorScheme === 'light'
                  ? 'rgba(0, 0, 0, 0.4)'
                  : 'rgba(255, 255, 255, 0.4)'
              }
            />
          </Pressable>
        )}
      />
    </View>
  );
}
