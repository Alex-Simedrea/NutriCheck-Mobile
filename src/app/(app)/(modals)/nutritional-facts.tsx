import React, { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useGetOFFProduct, useGetProduct } from '@/api/product';
import LoadingView from '@/components/loading-view';
import Toast from 'react-native-toast-message';
import RetryView from '@/components/retry-view';
import { merge } from '@/lib/utils';
import Title from '@/components/title';

export default function NutritionalFacts() {
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
  // Define the keys you want to include
  const keysToInclude = [
    'carbohydrates',
    'carbohydrates_100g',
    'energy-kcal',
    'energy-kcal_100g',
    'fat',
    'fat_100g',
    'nova-group',
    'nova-group_100g',
    'proteins',
    'proteins_100g',
    'salt',
    'salt_100g',
    'saturated-fat',
    'saturated-fat_100g',
    'sodium',
    'sodium_100g',
    'sugars',
    'sugars_100g',
    'folates',
    'niacin',
    'riboflavin',
    'thiamin',
    'vitamin-a',
    'vitamin-b6',
    'vitamin-b12',
    'vitamin-c',
    'vitamin-d',
    'vitamin-e',
    'vitamin-k',
    'water',
  ];

  const filteredNutriments = Object.entries(productData.nutriments)
    .filter(([key]) => keysToInclude.includes(key))
    .reduce((obj, [key, value]) => {
      const newKey = key
        .replace(/-/g, ' ')
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase());
      return { ...obj, [newKey]: value };
    }, {});

  const nutrimentsArray = Object.entries(filteredNutriments).map(
    ([key, value]) => ({ key, value }),
  );

  return (
    <FlatList
      className={'flex-1 bg-white dark:bg-background-900'}
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
      data={nutrimentsArray}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => (
        <View className='flex-row items-center justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'>
          <Text className='p-0 text-lg text-black dark:text-white'>
            {item.key}
          </Text>
          <Text className='p-0 text-lg text-black dark:text-white'>
            {item.value as string}
          </Text>
        </View>
      )}
    />
  );
}
