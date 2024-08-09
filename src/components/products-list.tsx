import React from 'react';
import { Text, View } from 'react-native';
import { Product } from '@/api/product';
import { useCart } from '@/data/cart';
import ProductCard from '@/components/product-card';
import { router } from 'expo-router';
import getHealthScore from '@/lib/health-score';
import { mergeEachItemInLists } from '@/lib/utils';
import Caption from '@/components/caption';
import { getNutriScore } from '@/lib/nutriscore/nutri-score';
import { FoodType } from '@/lib/nutriscore/types.d';

export default function ProductsList({
  products,
  offProducts,
}: {
  products: Product[];
  offProducts: any[];
}) {
  const { cart, removeProduct, incrementProduct, decrementProduct } = useCart();
  const mergedProducts = mergeEachItemInLists(offProducts, products);

  return (
    <View>
      <Caption text='Shopping list' className='pt-0' />
      {mergedProducts.length > 0 ? (
        mergedProducts.map((item, index) => (
          <ProductCard
            key={index}
            name={item.product_name}
            weight={item.quantity}
            brand={item.brands}
            photoUrl={item.image_url}
            price={item.price}
            healthScore={getHealthScore(
              item?.nutriscore_grade?.toUpperCase() ?? item?.nutriscore_score
                ? item?.nutriscore_grade?.toUpperCase()
                : item?.nutriscore_data
                  ? getNutriScore(
                      item?.nutriscore_data,
                      item?.nutriscore_data?.is_beverage
                        ? FoodType.beverage
                        : FoodType.solid,
                    )?.toUpperCase()
                  : 'N/A',
              products[index]?.upVotes,
              products[index]?.downVotes,
            )}
            onPress={() => {
              router.push(`/product/${item._id}`);
            }}
            amount={
              cart.products.find((product) => product.ean === item._id)?.count
            }
            onIncrement={() => {
              incrementProduct(item._id);
            }}
            onDecrement={() => {
              decrementProduct(item._id);
            }}
            onRemove={() => {
              removeProduct(item._id);
            }}
            cartItem={true}
            className='mb-3'
          />
        ))
      ) : (
        <Text className='text-lg text-black dark:text-white'>
          No items on the list
        </Text>
      )}
    </View>
  );
}
