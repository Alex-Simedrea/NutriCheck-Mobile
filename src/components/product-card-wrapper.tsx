import { useGetOFFProduct, useGetProduct } from '@/api/product';
import { ActivityIndicator, View } from 'react-native';
import { cn, merge } from '@/lib/utils';
import Toast from 'react-native-toast-message';
import ProductCard from '@/components/product-card';

export function ProductCardWrapper({
  ean,
  className,
  amount,
  onIncrement,
  onDecrement,
  onPress,
}: {
  ean: string;
  className?: string;
  amount?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onPress?: () => void;
}) {
  const product = useGetProduct(ean);
  const offProduct = useGetOFFProduct(ean);

  if (product.isPending || offProduct.isPending) {
    return (
      <View
        className={cn(
          'w-full items-center rounded-2xl bg-white p-4 dark:bg-background-900',
          className,
        )}
      >
        <ActivityIndicator size={'small'} />
      </View>
    );
  }

  if (product.isError) {
    Toast.show({
      type: 'customToast',
      text1: 'Error fetching product',
      text2: product.error.message,
      position: 'bottom',
      visibilityTime: 8000,
    });
    return null;
  }

  if (offProduct.isError) {
    Toast.show({
      type: 'customToast',
      text1: 'Error fetching product',
      text2: offProduct.error.message,
      position: 'bottom',
      visibilityTime: 8000,
    });
    return null;
  }

  const mergedProduct = merge(offProduct.data?.product, product?.data?.product);

  return (
    <ProductCard
      name={mergedProduct.product_name}
      healthScore={50}
      brand={mergedProduct.brands}
      weight={mergedProduct.quantity}
      photoUrl={mergedProduct.image_url}
      price={'10RON'}
      className={className}
      amount={amount}
      onIncrement={onIncrement}
      onDecrement={onDecrement}
      onPress={onPress}
      cartItem={true}
    />
    // <Text className={'text-white'}>{JSON.stringify(mergedProduct)}</Text>
  );
}
