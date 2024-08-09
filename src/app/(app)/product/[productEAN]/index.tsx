import { Pressable, ScrollView, Text, View } from 'react-native';
import Caption from '@/components/caption';
import { cn, merge } from '@/lib/utils';
import { Image } from 'expo-image';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { router, useGlobalSearchParams } from 'expo-router';
import Vote from '@/components/vote';
import LargeButton from '@/components/large-button';
import { useGetPostsByEAN } from '@/api/posts';
import PostsList from '@/components/posts-list';
import Toast from 'react-native-toast-message';
import {
  useDeleteVote,
  useGetOFFProduct,
  useGetProduct,
  useVoteProduct,
} from '@/api/product';
import LoadingView from '@/components/loading-view';
import RetryView from '@/components/retry-view';
import { useCart } from '@/data/cart';
import Stepper from '@/components/stepper';
import getHealthScore from '@/lib/health-score';
import { useGetPreferences } from '@/api/preferences';
import { getMatchScore } from '@/lib/recommendations/match-score';
import { getNutriScore } from '@/lib/nutriscore/nutri-score';
import { FoodType } from '@/lib/nutriscore/types.d';
import { useFood } from '@/data/food';
import HealthGoal from '@/components/health-goal';
import React from 'react';
import { useGetGoals } from '@/api/goals';

export default function Product() {
  const { productEAN } = useGlobalSearchParams();
  const product = useGetProduct(productEAN as string);
  const offProduct = useGetOFFProduct(productEAN as string);
  const reviewProduct = useVoteProduct();
  const deleteReview = useDeleteVote();
  const posts = useGetPostsByEAN(productEAN as string);
  const preferences = useGetPreferences();
  const goals = useGetGoals();

  const cart = useCart();
  const food = useFood();

  const { colorScheme } = useColorScheme();

  if (posts.isError) {
    Toast.show({
      type: 'customToast',
      text1: 'Error',
      text2: product.error.message,
      position: 'bottom',
      visibilityTime: 8000,
    });
  }

  if (
    product.isPending ||
    offProduct.isPending ||
    preferences.isPending ||
    goals.isPending
  ) {
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

  if (preferences.isError) {
    Toast.show({
      type: 'customToast',
      text1: 'Error',
      text2: preferences.error.message,
      position: 'bottom',
      visibilityTime: 8000,
    });
    return <RetryView refetch={preferences.refetch} />;
  }

  if (goals.isError) {
    Toast.show({
      type: 'customToast',
      text1: 'Error',
      text2: goals.error.message,
      position: 'bottom',
      visibilityTime: 8000,
    });
    return <RetryView refetch={goals.refetch} />;
  }

  const mergedProduct = merge(
    offProduct?.data?.product,
    product?.data?.product,
  );
  // console.log(JSON.stringify(product.data));
  // console.log(JSON.stringify(mergedProduct.nutriscore_score, null, 2));

  // console.log(JSON.stringify(preferences.data));
  let match: string | number;
  if (mergedProduct?.nutriscore_score) {
    match = getMatchScore(mergedProduct, {
      ...preferences.data,
      allergens: preferences.data.allergens ?? [],
      ingredients: preferences.data.ingredients ?? [],
    });
  } else {
    match = 'N/A';
  }

  if (typeof match === 'number' && !Number.isNaN(match)) {
    if (match < 40) {
      match = 'Bad';
    } else if (match > 80) {
      match = 'Good';
    } else {
      match = 'Medium';
    }
  }

  let nutriScore: 'A' | 'B' | 'C' | 'D' | 'E' | 'N/A';

  if (mergedProduct?.nutriscore_score) {
    nutriScore = mergedProduct?.nutriscore_grade?.toUpperCase();
  } else if (mergedProduct?.nutriscore_data) {
    getNutriScore(
      mergedProduct?.nutriscore_data,
      mergedProduct?.nutriscore_data?.is_beverage
        ? FoodType.beverage
        : FoodType.solid,
    )?.toUpperCase();
  } else {
    nutriScore = 'N/A';
  }

  return (
    <ScrollView className={'flex-1 px-4 dark:bg-black'}>
      <View className='my-4 rounded-2xl bg-white px-4 dark:bg-background-900'>
        <View className='flex-row items-center py-4'>
          {mergedProduct?.image_url ? (
            <Image
              source={{
                uri: mergedProduct?.image_url,
              }}
              contentFit='contain'
              style={{
                width: 96,
                height: 96,
                borderRadius: 16,
                backgroundColor: 'white',
              }}
            />
          ) : (
            <View className='h-24 w-24 items-center justify-center rounded-2xl bg-background-100 dark:bg-background-600'>
              <Feather
                name='camera-off'
                size={24}
                color='gray'
                className='self-center'
              />
            </View>
          )}
          <View className={'flex-1 pl-4'}>
            <Caption text={mergedProduct?.product_name} className='py-0' />
            <View className='flex-row justify-between'>
              <Text
                className={
                  'shrink text-lg font-bold leading-tight text-black/80 dark:text-white/80'
                }
              >
                {mergedProduct?.brands}
              </Text>
              <Text className='text-lg font-semibold text-black/80 dark:text-white/80'>
                {mergedProduct?.quantity}
              </Text>
            </View>
            {product.data?.product?.price && (
              <Text
                className={'text-lg font-medium text-black dark:text-white'}
              >
                {product.data?.product?.price}
              </Text>
            )}
          </View>
        </View>
      </View>
      {!cart.cart.products.find((item) => productEAN === item.ean) ? (
        <LargeButton
          text='Add to shopping list'
          onPress={() => {
            cart.addProduct(productEAN as string, 1);
          }}
          iconName='add-outline'
        />
      ) : (
        <View
          className={
            'flex-row items-center justify-between rounded-2xl bg-white px-4 py-4 dark:bg-background-900'
          }
        >
          <Text className='text-lg text-black dark:text-white'>
            Shopping list
          </Text>
          <Stepper
            amount={
              cart.cart.products.find((item) => productEAN === item.ean)
                ?.count as number
            }
            onIncrement={() => {
              cart.incrementProduct(productEAN as string);
            }}
            onDecrement={() => {
              cart.decrementProduct(productEAN as string);
            }}
          />
        </View>
      )}
      <HealthGoal
        className='grow basis-0 mt-4'
        cur={food.food}
        goal={goals.data.food}
        unit='kcal'
        showButton={true}
        buttonText='Log product'
        buttonAction={() => {
          food.setFood(
            food.food + offProduct.data.product.nutriments['energy-kcal'],
          );
        }}
      />
      <Caption text='Stats' />
      <View className='my-4 mt-0 divide-y divide-yellow-300 rounded-2xl bg-white pl-4 dark:bg-background-900'>
        <View className='flex-row items-center justify-between border-b-[0.7px] border-b-black/10 py-3 pr-4 pt-4 dark:border-b-white/10'>
          <Text className='p-0 text-lg text-black dark:text-white'>
            Match for you
          </Text>
          <Text
            className={cn(
              'text-lg font-bold capitalize',
              match === 'Good'
                ? 'text-green-500'
                : match === 'Bad'
                  ? 'text-red-500'
                  : match === 'Medium'
                    ? 'text-yellow-500'
                    : 'text-background-400',
            )}
          >
            {match}
          </Text>
        </View>
        <View className='flex-row items-center justify-between border-b-[0.7px] border-b-black/10 py-3 pr-4 dark:border-b-white/10'>
          <Text className='p-0 text-lg text-black dark:text-white'>
            Health score
          </Text>
          <Text
            className={cn(
              'text-lg font-bold capitalize',
              getHealthScore(
                nutriScore,
                product?.data?.upVotes,
                product?.data?.downVotes,
              ) === -1
                ? 'text-background-400'
                : getHealthScore(
                      nutriScore,
                      product?.data?.upVotes,
                      product?.data?.downVotes,
                    ) < 80
                  ? getHealthScore(
                      nutriScore,
                      product?.data?.upVotes,
                      product?.data?.downVotes,
                    ) < 40
                    ? 'text-red-500'
                    : 'text-yellow-500'
                  : getHealthScore(
                        nutriScore,
                        product?.data?.upVotes,
                        product?.data?.downVotes,
                      ) >= 80
                    ? 'text-green-500'
                    : 'text-background-400',
            )}
          >
            {Number.isNaN(
              getHealthScore(
                nutriScore,
                product?.data?.upVotes,
                product?.data?.downVotes,
              ),
            )
              ? 'N/A'
              : getHealthScore(
                  nutriScore,
                  product?.data?.upVotes,
                  product?.data?.downVotes,
                )}
          </Text>
        </View>
        <View className='flex-row items-center justify-between border-b-[0.7px] border-b-black/10 py-3 pr-4 dark:border-b-white/10'>
          <Text className='p-0 text-lg text-black dark:text-white'>
            Nutri-Score
          </Text>
          <Text
            className={cn(
              'text-lg font-bold capitalize',
              nutriScore === 'A'
                ? 'text-green-500'
                : nutriScore === 'B' || nutriScore === 'C'
                  ? 'text-yellow-500'
                  : nutriScore === 'D' || nutriScore === 'E'
                    ? 'text-red-500'
                    : 'text-background-400',
            )}
          >
            {nutriScore}
          </Text>
        </View>
        <Pressable
          onPress={() => {
            router.push({
              pathname: '/nutritional-facts',
              params: { ean: productEAN },
            });
          }}
          className='flex-row items-center justify-between border-b-[0.7px] border-b-black/10 py-3 pr-4 active:opacity-70 dark:border-b-white/10'
        >
          <Text className='p-0 text-lg text-black dark:text-white'>
            Nutritional facts
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
            router.push({
              pathname: '/allergens',
              params: { ean: productEAN },
            });
          }}
          className='flex-row items-center justify-between py-3 pb-4 pr-4 active:opacity-70'
        >
          <Text className='p-0 text-lg text-black dark:text-white'>
            Allergens
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
      </View>
      <Caption text='Review' />
      <View
        className={
          'flex-row items-center justify-between rounded-2xl bg-white px-4 py-4 dark:bg-background-900'
        }
      >
        <Text className='text-lg text-black dark:text-white'>Votes</Text>
        <Vote
          upVotes={product.data.upVotes}
          downVotes={product.data.downVotes}
          onUpVote={() => {
            reviewProduct.mutate({ ean: product.data.ean, like: true });
          }}
          onDownVote={() => {
            reviewProduct.mutate({ ean: product.data.ean, like: false });
          }}
          liked={product.data.vote}
          onDeleteVote={() => deleteReview.mutate(product.data.ean)}
          className='m-0 pr-2'
        />
      </View>
      <Caption text='Posts' />
      <LargeButton
        text='Create post'
        onPress={() => {
          router.push({
            pathname: '/create-post',
            params: { ean: productEAN },
          });
        }}
        iconName='create-outline'
        className='mb-4'
      />
      <View className='mb-12 gap-3'>
        <PostsList
          posts={posts.data}
          isPending={posts.isPending}
          refetch={posts.refetch}
          isError={posts.isError}
        />
      </View>
    </ScrollView>
  );
}
