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
  bodyProfile,
}: {
  products: ProductProps[];
  preferences: Preferences;
  bodyProfile: any;
}) {
  const reqBody = generateRecommendationsBody(
    getDeficits(
      {
        weight: bodyProfile?.weight ?? 75,
        height: bodyProfile?.height ?? 170,
        age: bodyProfile?.age ?? 25,
        sex: bodyProfile?.sex ?? 'male',
        activityLevel: bodyProfile?.activityLevel ?? 1,
        special: {
          pregnant: bodyProfile?.special?.pregnant ?? false,
          trimester: bodyProfile?.special?.trimester ?? 1,
        },
      },
      [
        // @ts-ignore
        products.map((product: ProductProps) => product.nutriments ?? {}),
      ],
    ).deficits,
    {
      // @ts-ignore
      allergens: preferences.allergens ?? {},
      // @ts-ignore
      nutriments: preferences.nutriments ?? {},
      ingredients: preferences.ingredients ?? [],
    },
  );

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
      <Caption text='Deficits' className='pt-6' />
      {Object.entries(
        getDeficits(
          {
            weight: bodyProfile?.weight ?? 75,
            height: bodyProfile?.height ?? 170,
            age: bodyProfile?.age ?? 25,
            sex: bodyProfile?.sex ?? 'male',
            activityLevel: bodyProfile?.activityLevel ?? 1,
            special: {
              pregnant: bodyProfile?.special?.pregnant ?? false,
              trimester: bodyProfile?.special?.trimester ?? 1,
            },
          },
          [
            // @ts-ignore
            products.map((product: ProductProps) => product.nutriments ?? {}),
          ],
        ).deficits,
      ).map(([key, value], index) => {
        return (
          <View key={index}>
            <Text className={'dark:text-white'}>{`${key}: ${value}\n`}</Text>
          </View>
        );
      })}
      <View>
        <Text className={'dark:text-white'}>{`BMR: ${
          getDeficits(
            {
              weight: bodyProfile?.weight ?? 75,
              height: bodyProfile?.height ?? 170,
              age: bodyProfile?.age ?? 25,
              sex: bodyProfile?.sex ?? 'male',
              activityLevel: bodyProfile?.activityLevel ?? 1,
              special: {
                pregnant: bodyProfile?.special?.pregnant ?? false,
                trimester: bodyProfile?.special?.trimester ?? 1,
              },
            },
            [
              // @ts-ignore
              products.map((product: ProductProps) => product.nutriments ?? {}),
            ],
          ).bmr
        }\n`}</Text>
      </View>
      <View>
        <Text className={'dark:text-white'}>{`EER: ${
          getDeficits(
            {
              weight: bodyProfile?.weight ?? 75,
              height: bodyProfile?.height ?? 170,
              age: bodyProfile?.age ?? 25,
              sex: bodyProfile?.sex ?? 'male',
              activityLevel: bodyProfile?.activityLevel ?? 1,
              special: {
                pregnant: bodyProfile?.special?.pregnant ?? false,
                trimester: bodyProfile?.special?.trimester ?? 1,
              },
            },
            [
              // @ts-ignore
              products.map((product: ProductProps) => product.nutriments ?? {}),
            ],
          ).eer
        }\n`}</Text>
      </View>
    </View>
  );
}
