import React from 'react';
import { Text, View } from 'react-native';
import { useGetOFFProducts, useGetProducts } from '@/api/product';
import { useCart } from '@/data/cart';
import LoadingView from '@/components/loading-view';
import Toast from 'react-native-toast-message';
import RetryView from '@/components/retry-view';
import { mergeEachItemInLists } from '@/lib/utils';
import ProductCard from '@/components/product-card';
import { router } from 'expo-router';

export default function ProductsList() {
  const { cart, removeProduct, incrementProduct, decrementProduct } = useCart();
  const products = useGetProducts(
    cart.products.map((item) => item.ean as string),
  );
  const offProducts = useGetOFFProducts(
    cart.products.map((item) => item.ean as string),
  );

  if (products.isPending || offProducts.isPending) {
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

  const mergedProducts = mergeEachItemInLists(offProducts.data, products.data);

  return (
    <View>
      {mergedProducts.length > 0 ? (
        mergedProducts.map((item) => (
          <ProductCard
            key={item._id}
            name={item.product_name}
            weight={item.quantity}
            brand={item.brands}
            photoUrl={item.image_url}
            price={item.price}
            healthScore={50}
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
