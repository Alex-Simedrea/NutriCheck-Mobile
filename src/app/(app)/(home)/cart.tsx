import { ScrollView, Text } from 'react-native';
import Caption from '@/components/caption';
import ProductCard from '@/components/product-card';
import { router } from 'expo-router';
import ProductsList from '@/components/products-list';
import RecommendationsList from '@/components/recommendations-list';
import { useCart } from '@/data/cart';
import { useGetOFFProducts, useGetProducts } from '@/api/product';
import LoadingView from '@/components/loading-view';
import Toast from 'react-native-toast-message';
import RetryView from '@/components/retry-view';
import { mergeEachItemInLists } from '@/lib/utils';
import React from 'react';
import { useGetPreferences } from '@/api/preferences';

export default function Cart() {
  const suggestions = [
    {
      id: '1',
      name: 'Nutella Hazelnut & Chocolate Spread - Nutella',
      brand: 'Ferrero',
      weight: '450g',
      price: '20RON',
      healthScore: 30,
    },
    {
      id: '2',
      name: 'Nutella Hazelnut & Chocolate Spread - Nutella',
      brand: 'Ferrero',
      weight: '450g',
      price: '20RON',
      healthScore: 100,
    },
    {
      id: '3',
      name: 'Nutella Hazelnut & Chocolate Spread - Nutella',
      brand: 'Ferrero',
      weight: '450g',
      price: '20RON',
      healthScore: 50,
    },
  ];

  const { cart } = useCart();
  const products = useGetProducts(
    cart.products.map((item) => item.ean as string),
  );
  const offProducts = useGetOFFProducts(
    cart.products.map((item) => item.ean as string),
  );
  const preferences = useGetPreferences();

  if (products.isPending || offProducts.isPending || preferences.isPending) {
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
      text1: 'Error fetching off products',
      text2: offProducts.error.message,
      position: 'bottom',
      visibilityTime: 8000,
    });
    // return <RetryView refetch={offProducts.refetch} />;
  }

  if (preferences.isError) {
    Toast.show({
      type: 'customToast',
      text1: 'Error fetching preferences',
      text2: preferences.error.message,
      position: 'bottom',
      visibilityTime: 8000,
    });
    // return <RetryView refetch={preferences.refetch} />;
  }

  console.log(JSON.stringify(products.data));
  const mergedProducts = mergeEachItemInLists([{}, {}], products.data);
  console.log(JSON.stringify(mergedProducts));

  return (
    <ScrollView
      className={'px-4 pt-4 dark:bg-black'}
      contentContainerClassName={'pb-4'}
    >
      <ProductsList products={products.data} offProducts={offProducts.data} />
      <RecommendationsList products={mergedProducts} preferences={preferences.data} />
    </ScrollView>
  );
}
