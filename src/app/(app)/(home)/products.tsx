import { Pressable, RefreshControl, ScrollView, View } from 'react-native';
import Caption from '@/components/caption';
import ProductsList from '@/components/products-list';
import RecommendationsList from '@/components/recommendations-list';
import { useCart } from '@/data/cart';
import { useGetOFFProducts, useGetProducts } from '@/api/product';
import LoadingView from '@/components/loading-view';
import Toast from 'react-native-toast-message';
import RetryView from '@/components/retry-view';
import { cn, mergeEachItemInLists } from '@/lib/utils';
import React from 'react';
import { useGetPreferences } from '@/api/preferences';
import PostNotification from '@/components/post-notification';
import { useGetBodyProfile } from '@/api/body-profile';
import SearchBar from '@/components/search-bar';
import KeyboardAccessory from '@/components/keyboard-accessory';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Products() {
  const inputAccessoryViewID = 'keyboard-accessory';
  const { cart } = useCart();
  const products = useGetProducts(
    cart.products.map((item) => item.ean as string),
  );
  const offProducts = useGetOFFProducts(
    cart.products.map((item) => item.ean as string),
  );
  const preferences = useGetPreferences();
  const bodyProfile = useGetBodyProfile();

  if (
    products.isPending ||
    offProducts.isPending ||
    preferences.isPending ||
    bodyProfile.isPending
  ) {
    return <LoadingView />;
  }

  if (products.isError) {
    Toast.show({
      type: 'customToast',
      text1: 'Error fetching products',
      text2: products.error.message,
      position: 'bottom',
      visibilityTime: 8000,
    });
    return <RetryView refetch={products.refetch} />;
  }

  if (offProducts.isError) {
    Toast.show({
      type: 'customToast',
      text1: 'Error fetching products',
      text2: offProducts.error.message,
      position: 'bottom',
      visibilityTime: 8000,
    });
    return <RetryView refetch={offProducts.refetch} />;
  }

  if (preferences.isError) {
    Toast.show({
      type: 'customToast',
      text1: 'Error fetching preferences',
      text2: preferences.error.message,
      position: 'bottom',
      visibilityTime: 8000,
    });
    return <RetryView refetch={preferences.refetch} />;
  }

  if (bodyProfile.isError) {
    Toast.show({
      type: 'customToast',
      text1: 'Error fetching body profile',
      text2: bodyProfile.error.message,
      position: 'bottom',
      visibilityTime: 8000,
    });
    return <RetryView refetch={bodyProfile.refetch} />;
  }

  const mergedProducts = mergeEachItemInLists(offProducts.data, products.data);

  return (
    <ScrollView
      className={'px-4 pt-4 dark:bg-black'}
      contentContainerClassName={'pb-4'}
      refreshControl={
        <RefreshControl
          refreshing={products.isRefetching}
          onRefresh={products.refetch}
        />
      }
    >
      <PostNotification />
      <Caption text='Search' />
      <View className={'flex-row pb-4'}>
        <SearchBar inputAccessoryViewID={inputAccessoryViewID} />
        <Pressable
          onPress={() => {
            router.push('/scan-code');
          }}
          className={cn('ml-2 active:opacity-70')}
        >
          <View className='dark:android:bg-blue-400 h-12 flex-row items-center justify-center rounded-[14] bg-default-blue px-4'>
            <Ionicons name={'barcode-outline'} size={28} color='white' />
          </View>
        </Pressable>
      </View>
      <KeyboardAccessory inputAccessoryViewID={inputAccessoryViewID} />
      <ProductsList products={products.data} offProducts={offProducts.data} />
      <RecommendationsList
        products={mergedProducts}
        preferences={preferences.data}
        bodyProfile={bodyProfile.data}
      />
    </ScrollView>
  );
}
