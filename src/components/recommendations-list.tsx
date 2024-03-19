import { ProductProps, useSearchByProps } from '@/api/product';
import React from 'react';
import { Text, View } from 'react-native';
import {
  generateRecommendationsBody,
  getDeficits,
} from '@/lib/recommendations/nutriment-calculator';
import { Preferences } from '@/api/preferences';
import Caption from '@/components/caption';
import ProductCard from '@/components/product-card';
import { router } from 'expo-router';
import LoadingView from '@/components/loading-view';
import Toast from 'react-native-toast-message';
import RetryView from '@/components/retry-view';
import { useCart } from '@/data/cart';

export default function RecommendationsList({
  products,
  preferences,
}: {
  products: ProductProps[];
  preferences: Preferences;
}) {
  const weight = 70;
  const height = 170;
  const age = 30;
  const sex = 'male';
  const activityLevel = 1;

  const reqBody = generateRecommendationsBody(
    getDeficits(
      {
        weight,
        height,
        age,
        sex,
        activityLevel,
        // special: {
        //   pregnant: true,
        //   trimester: 3,
        // },
      },
      [
        // @ts-ignore
        // products.map((product: ProductProps) => product.nutriments ?? {}),
      ],
    ).deficits,
    {
      // @ts-ignore
      allergens: {},
      // @ts-ignore
      nutriments: {},
      ingredients: [],
    },
  );
  // console.log(JSON.stringify(reqBody));
  // ...preferences,
  // @ts-ignore
  // allergens: preferences.allergens ?? {},
  // @ts-ignore
  // nutriments: preferences.nutriments ?? {},
  // ingredients: preferences.ingredients ?? [],
  const recommendedProducts = useSearchByProps({
    ...reqBody,
    optional: reqBody.optional ?? {},
  });
  const { addProduct } = useCart();

  if (recommendedProducts.isPending) {
    return <LoadingView />;
  }

  if (recommendedProducts.isError) {
    Toast.show({
      type: 'customToast',
      text1: 'Error fetching recommendations',
      text2: recommendedProducts.error.message,
      position: 'bottom',
      visibilityTime: 8000,
    });
    return <RetryView refetch={recommendedProducts.refetch} />;
  }

  return (
    <View>
      <Caption text='Recommendations' className='pt-6' />
      {recommendedProducts.data.length > 0 ? (
        recommendedProducts.data.map((item: any, index) => (
          <ProductCard
            key={index}
            name={item?.data?.product?.product_name}
            brand={item?.data?.product?.brands}
            weight={item?.data?.product?.quantity}
            price={item?.data?.product?.price}
            photoUrl={item?.data?.product?.image_url}
            healthScore={1}
            className='mb-3'
            suggestionItem={true}
            onPress={() => {
              router.push(`/product/${item?.ean}`);
            }}
            suggestionItemAction={() => {
              addProduct(item?.ean, 1);
            }}
          />
        ))
      ) : (
        <Text className='text-lg text-black dark:text-white'>
          No recommendations at the moment
        </Text>
      )}
    </View>
  );
}
