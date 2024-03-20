import { router, useLocalSearchParams } from 'expo-router';
import { useSearchOFFProduct, useSearchProduct } from '@/api/product';
import { FlatList, Text } from 'react-native';
import LoadingView from '@/components/loading-view';
import RetryView from '@/components/retry-view';
import React from 'react';
import ProductCard from '@/components/product-card';
import { mergeLists } from '@/lib/utils';
import getHealthScore from '@/lib/health-score';
import { getNutriScore } from '@/lib/nutriscore/nutri-score';
import { FoodType } from '@/lib/nutriscore/types.d';

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
        renderItem={({ item, index }) => {
          return (
            <ProductCard
              name={item.product_name}
              weight={item.quantity}
              brand={item.brands}
              photoUrl={item.image_url}
              price={JSON.stringify(searchResults.data[index]?.upVotes)}
              healthScore={getHealthScore(item?.nutriscore_grade?.toUpperCase() ??
              item?.nutriscore_score
                ? item?.nutriscore_grade?.toUpperCase()
                : item?.nutriscore_data
                  ? getNutriScore(
                    item?.nutriscore_data,
                    item?.nutriscore_data?.is_beverage
                      ? FoodType.beverage
                      : FoodType.solid,
                  )?.toUpperCase()
                  : 'N/A', searchResults.data[index]?.upVotes, searchResults.data[index]?.downVotes)}
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
