import { router, useLocalSearchParams } from 'expo-router';
import { useSearchOFFProduct, useSearchProduct } from '@/api/product';
import { FlatList, Text } from 'react-native';
import LoadingView from '@/components/loading-view';
import RetryView from '@/components/retry-view';
import React from 'react';
import ProductCard from '@/components/product-card';
import { mergeLists } from '@/lib/utils';

export default function SearchResults() {
  const { search } = useLocalSearchParams();
  const searchResults = useSearchProduct(search as string);
  const offSearchResults = useSearchOFFProduct(search as string);

  if (searchResults.isPending || offSearchResults.isPending) {
    return <LoadingView />;
  }

  if (searchResults.isError || offSearchResults.isError) {
    return <RetryView refetch={searchResults.refetch} />;
  }

  return (
    <>
      <FlatList
        className='dark:bg-black'
        contentContainerClassName='gap-3 px-4 pb-32 pt-3'
        data={mergeLists(offSearchResults.data, searchResults.data)}
        renderItem={({ item }) => {
          return (
            <ProductCard
              name={item.product_name}
              weight={item.quantity}
              brand={item.brands}
              photoUrl={item.image_url}
              price={'10RON'}
              healthScore={50}
              onPress={() => {
                router.push(`/product/${item._id}`);
              }}
            />
          );
        }}
        ListEmptyComponent={
          <Text
            className={
              'w-full pt-4 text-center text-lg font-semibold text-black/80 dark:text-white/80'
            }
          >
            No results found
          </Text>
        }
      />
    </>
  );
}
