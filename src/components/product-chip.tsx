import { router } from 'expo-router';
import { Image } from 'expo-image';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useGetOFFProduct, useGetProduct } from '@/api/product';

export default function ProductChip({ ean }: { ean: string }) {
  const product = useGetProduct(ean);
  const offProduct = useGetOFFProduct(ean);

  if (product.isPending || offProduct.isPending) {
    return (
      <View className='flex-row items-center self-start rounded-2xl bg-background-100 p-2 dark:bg-neutral-700'>
        <ActivityIndicator size={35} />
        <Text className={'line-clamp-1 px-2 text-xl dark:text-white'}>
          Loading...
        </Text>
      </View>
    );
  }

  if (product.isError && offProduct.isError) {
    return (
      <View className='flex-row items-center self-start rounded-2xl bg-background-100 p-2 dark:bg-neutral-700'>
        <View className='items-center justify-center rounded-2xl bg-background-100 dark:bg-background-600'>
          <Feather
            name='alert-circle'
            size={35}
            color='gray'
            className='self-center'
          />
        </View>
        <Text className={'line-clamp-1 px-2 text-xl dark:text-white'}>
          Product not found
        </Text>
      </View>
    );
  }

  return (
    <Pressable
      onPress={() => {
        router.push(`/product/${ean}`);
      }}
      className={
        'flex-row items-center self-start rounded-2xl bg-background-100 p-2 dark:bg-neutral-700'
      }
      style={{
        flexShrink: 1,
        alignSelf: 'flex-start',
      }}
    >
      {/*<Text>{ean}</Text>*/}
      {/*<Text>{JSON.stringify(product)}</Text>*/}
      {/*<Text>{JSON.stringify(offProduct)}</Text>*/}
      {product.data?.product?.image_url ? (
        <Image
          source={{
            uri: product.data?.product?.image_url,
          }}
          contentFit='contain'
          style={{ width: 35, height: 35 }}
        />
      ) : offProduct.data?.product?.image_url ? (
        <Image
          source={{
            uri: offProduct.data?.product?.image_url,
          }}
          contentFit='contain'
          style={{ width: 35, height: 35 }}
        />
      ) : (
        <View className='items-center justify-center rounded-2xl bg-background-100 dark:bg-background-600'>
          <Feather
            name='camera-off'
            size={35}
            color='gray'
            className='self-center'
          />
        </View>
      )}
      <Text
        className={'line-clamp-1 px-2 text-xl dark:text-white'}
        style={{ flexShrink: 1 }}
      >
        {ean && product.data?.product?.product_name
          ? product.data?.product?.product_name
          : offProduct.data?.product?.product_name}
      </Text>
    </Pressable>
  );
}
