// @ts-nocheck

import {
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Title from '@/components/title';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { router, Stack } from 'expo-router';
import { useSession } from '@/context/AuthContext';
import { useGetAccount } from '@/api/account';
import Toast from 'react-native-toast-message';
import LoadingView from '@/components/loading-view';
import { useGetOwnPosts } from '@/api/posts';
import Caption from '@/components/caption';
import PostsList from '@/components/posts-list';
import RetryView from '@/components/retry-view';
import { useBadges } from '@/data/badges';
import { Image } from 'expo-image';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const images = {
  'lvl1.png': require('@/assets/badges/lvl1.png'),
  'lvl2.png': require('@/assets/badges/lvl2.png'),
  'lvl3.png': require('@/assets/badges/lvl3.png'),
  'lvl4.png': require('@/assets/badges/lvl4.png'),
  'lvl5.png': require('@/assets/badges/lvl5.png'),
  'lvl6.png': require('@/assets/badges/lvl6.png'),
  'lvl7.png': require('@/assets/badges/lvl7.png'),
  'lvl8.png': require('@/assets/badges/lvl8.png'),
  'lvl9.png': require('@/assets/badges/lvl9.png'),
  'lvl10.png': require('@/assets/badges/lvl10.png'),
  'calories.png': require('@/assets/badges/calories.png'),
  'steps.png': require('@/assets/badges/steps.png'),
  'exercise.png': require('@/assets/badges/exercise.png'),
};

export default function Account() {
  const { signOut } = useSession();
  const { colorScheme } = useColorScheme();
  const account = useGetAccount();
  const posts = useGetOwnPosts();

  if (account.isPending) {
    return <LoadingView />;
  }

  if (account.isError) {
    Toast.show({
      type: 'customToast',
      text1: 'Error loading profile',
      text2: account.error.message,
      position: 'bottom',
      visibilityTime: 8000,
    });
    return (
      <RetryView
        refetch={async () => {
          await Promise.all([posts.refetch(), account.refetch()]);
        }}
      />
    );
  }

  if (posts.isError) {
    Toast.show({
      type: 'customToast',
      text1: 'Error',
      text2: posts.error.message,
      position: 'bottom',
      visibilityTime: 8000,
    });
  }

  const onRefresh = async () => {
    await posts.refetch();
  };

  const badges = useBadges();

  useEffect(() => {
    if (account.data.points >= 0) {
      badges.addBadge('lvl1.png');
    }
    if (account.data.points >= 10) {
      badges.addBadge('lvl2.png');
    }
    if (account.data.points >= 100) {
      badges.addBadge('lvl3.png');
    }
    if (account.data.points >= 500) {
      badges.addBadge('lvl4.png');
    }
    if (account.data.points >= 1000) {
      badges.addBadge('lvl5.png');
    }
    if (account.data.points >= 5000) {
      badges.addBadge('lvl6.png');
    }
    if (account.data.points >= 10000) {
      badges.addBadge('lvl7.png');
    }
    if (account.data.points >= 50000) {
      badges.addBadge('lvl8.png');
    }
    if (account.data.points >= 100000) {
      badges.addBadge('lvl9.png');
    }
    if (account.data.points >= 500000) {
      badges.addBadge('lvl10.png');
    }
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerTitle: 'Account' }} />
      <ScrollView
        className={'flex-1 bg-white px-4 dark:bg-background-900'}
        refreshControl={
          <RefreshControl
            refreshing={posts.isRefetching}
            onRefresh={onRefresh}
          />
        }
      >
        <View className='items-center'>
          <Ionicons
            name='person-circle'
            size={100}
            color={
              colorScheme === 'dark'
                ? 'rgba(255, 255,255, 0.7)'
                : 'rgba(0, 0, 0, 0.6)'
            }
            className='mt-8'
          />
          <Title
            text={account.data.firstName + ' ' + account.data.lastName}
            className='pb-0 pt-1'
          />
          <Text
            className={'text-lg text-background-600 dark:text-background-400'}
          >
            {'@' + account.data.user}
          </Text>
        </View>
        {/*<Text className='mt-4 text-2xl font-bold text-black dark:text-white'>*/}
        {/*  Thank for using premium!*/}
        {/*</Text>*/}
        <Caption text='Points and badges' className='mt-8' />
        <View className='w-full gap-2'>
          <View className='flex-row items-center gap-2'>
            <Text className='text-2xl font-bold text-black dark:text-white'>
              {account.data.points}
            </Text>
            <Text className='text-base text-background-600 dark:text-background-400'>
              points
            </Text>
          </View>
          <ScrollView horizontal={true} className={'w-full grow flex-row'}>
            {badges.badges.length > 0
              ? badges.badges.map((badge, index) => {
                  return (
                    <Image
                      key={index}
                      source={images[badge]}
                      contentFit='contain'
                      style={{
                        width: 96,
                        height: 96,
                        borderRadius: 16,
                        // backgroundColor: 'white',
                      }}
                    />
                  );
                })
              : null}
          </ScrollView>
        </View>
        {/*<View className={'gap-4'}>*/}
        {/*  <LargeButton*/}
        {/*    text='Redeem your points'*/}
        {/*    onPress={() => {*/}
        {/*      router.replace('/redeem');*/}
        {/*      // router.back();*/}
        {/*    }}*/}
        {/*  />*/}
        {/*  <LargeButton*/}
        {/*    text='View the leaderboard'*/}
        {/*    onPress={() => {*/}
        {/*      router.replace('/leaderboard');*/}
        {/*    }}*/}
        {/*  />*/}
        {/*</View>*/}
        <Caption text='Settings' />
        <View className={'gap-2'}>
          <View className='my-4 mt-0 divide-y divide-yellow-300 rounded-2xl bg-background-50 pl-4 dark:bg-background-800'>
            <Pressable
              onPress={() => router.push('/edit-account')}
              className='flex-row items-center justify-between border-b-[0.7px] border-b-black/10 py-3 pr-4 pt-4 active:opacity-70 dark:border-b-white/10'
            >
              <Text className='p-0 text-lg text-black dark:text-white'>
                Edit profile
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
            <Pressable
              onPress={() => {
                router.push('/edit-preferences');
              }}
              className='flex-row items-center justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 active:opacity-70 dark:border-b-white/10'
            >
              <Text className='p-0 text-lg text-black dark:text-white'>
                Edit dietary preferences
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
            <Pressable
              onPress={() => {
                router.push('/body-profile');
              }}
              className='flex-row items-center justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 active:opacity-70 dark:border-b-white/10'
            >
              <Text className='p-0 text-lg text-black dark:text-white'>
                Edit body profile
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
            {/*<Pressable*/}
            {/*  onPress={() => {*/}
            {/*    router.push('/create-submission');*/}
            {/*  }}*/}
            {/*  className='flex-row items-center justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 active:opacity-70 dark:border-b-white/10'*/}
            {/*>*/}
            {/*  <Text className='p-0 text-lg text-black dark:text-white'>*/}
            {/*    Submit a new product*/}
            {/*  </Text>*/}
            {/*  <Ionicons*/}
            {/*    name='chevron-forward'*/}
            {/*    size={20}*/}
            {/*    color={*/}
            {/*      colorScheme === 'light'*/}
            {/*        ? 'rgba(0, 0, 0, 0.4)'*/}
            {/*        : 'rgba(255, 255, 255, 0.4)'*/}
            {/*    }*/}
            {/*  />*/}
            {/*</Pressable>*/}
            {/*<Pressable*/}
            {/*  onPress={() => {*/}
            {/*    router.push('/submissions');*/}
            {/*  }}*/}
            {/*  className='flex-row items-center justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 active:opacity-70 dark:border-b-white/10'*/}
            {/*>*/}
            {/*  <Text className='p-0 text-lg text-black dark:text-white'>*/}
            {/*    Your submissions*/}
            {/*  </Text>*/}
            {/*  <Ionicons*/}
            {/*    name='chevron-forward'*/}
            {/*    size={20}*/}
            {/*    color={*/}
            {/*      colorScheme === 'light'*/}
            {/*        ? 'rgba(0, 0, 0, 0.4)'*/}
            {/*        : 'rgba(255, 255, 255, 0.4)'*/}
            {/*    }*/}
            {/*  />*/}
            {/*</Pressable>*/}
            <Pressable
              onPress={() => {
                router.push('/community-guidelines');
              }}
              className='flex-row items-center justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 active:opacity-70 dark:border-b-white/10'
            >
              <Text className='p-0 text-lg text-black dark:text-white'>
                Community guidelines
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
            {/*<Pressable className='flex-row items-center justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 active:opacity-70 dark:border-b-white/10'>*/}
            {/*  <Text className='p-0 text-lg text-red-500'>Change password</Text>*/}
            {/*  <Ionicons*/}
            {/*    name='chevron-forward'*/}
            {/*    size={20}*/}
            {/*    color={*/}
            {/*      colorScheme === 'light'*/}
            {/*        ? 'rgba(0, 0, 0, 0.4)'*/}
            {/*        : 'rgba(255, 255, 255, 0.4)'*/}
            {/*    }*/}
            {/*  />*/}
            {/*</Pressable>*/}
            <Pressable
              onPress={async () => {
                await AsyncStorage.clear();
                signOut();
              }}
              className='flex-row items-center justify-between py-3 pb-4 pr-4 active:opacity-70'
            >
              <Text className='p-0 text-lg text-red-500'>Log out</Text>
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
          </View>
        </View>
        <Caption text='Your posts' />
        <View className={'items-center gap-3 pb-4'}>
          <PostsList
            inModal={true}
            posts={posts.data}
            isPending={posts.isPending}
            isError={posts.isError}
            refetch={posts.refetch}
          />
        </View>
      </ScrollView>
    </>
  );
}
