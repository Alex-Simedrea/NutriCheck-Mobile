import React, { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useGetOFFProduct, useGetProduct } from '@/api/product';
import LoadingView from '@/components/loading-view';
import Toast from 'react-native-toast-message';
import RetryView from '@/components/retry-view';
import { merge } from '@/lib/utils';
import Title from '@/components/title';

const format = (str: string) => {
  let res = str.replace(/en:/g, '').replace(/-/g, ' ');
  return res.charAt(0).toUpperCase() + res.slice(1);
};

export default function Allergens() {
  const { ean } = useLocalSearchParams();
  const product = useGetProduct(ean as string);
  const offProduct = useGetOFFProduct(ean as string);

  useEffect(() => {
    if (ean !== undefined) {
      product.refetch();
      offProduct.refetch();
    }
  }, [ean]);

  if (product.isPending || offProduct.isPending) {
    return <LoadingView />;
  }

  if (product.isError) {
    Toast.show({
      type: 'customToast',
      text1: 'Error',
      text2: product.error.message,
      position: 'bottom',
      visibilityTime: 8000,
    });
    return <RetryView refetch={product.refetch} />;
  }

  if (offProduct.isError) {
    Toast.show({
      type: 'customToast',
      text1: 'Error',
      text2: offProduct.error.message,
      position: 'bottom',
      visibilityTime: 8000,
    });
    return <RetryView refetch={offProduct.refetch} />;
  }

  const productData = merge(offProduct.data.product, product.data.product);
  return (
    <FlatList
      className={'flex-1 dark:bg-background-900'}
      contentContainerClassName={'px-4 pb-20'}
      ListHeaderComponent={
        <View className={'pb-4'}>
          <Title
            text={productData.product_name}
            className={'pb-0 dark:text-white'}
          />
          <Text
            className={
              'py-0 text-lg font-semibold text-black/80 dark:text-white/80'
            }
          >
            {productData.brands}
          </Text>
        </View>
      }
      data={productData.allergens_tags}
      keyExtractor={(item) => item}
      ListEmptyComponent={() => {
        return (
          <View className='flex-1 items-center justify-center'>
            <Text className='text-lg text-black dark:text-white'>
              No allergens found
            </Text>
          </View>
        );
      }}
      renderItem={({ item }) => (
        <View className='flex-row items-center justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'>
          <Text className='p-0 text-lg text-black dark:text-white'>
            {format(item)}
          </Text>
        </View>
      )}
    />
  );
}
