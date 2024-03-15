import { ScrollView, Text } from 'react-native';
import Caption from '@/components/caption';
import ProductCard from '@/components/product-card';
import { router } from 'expo-router';
import { useCart } from '@/data/cart';
import ProductsList from '@/components/products-list';

export default function Cart() {
  const { reset } = useCart();
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

  return (
    <ScrollView
      className={'px-4 pt-4 dark:bg-black'}
      contentContainerClassName={'pb-4'}
    >
      {/*<Button title='Reset' onPress={reset} />*/}
      <Caption text='Items' className='pt-0' />
      <ProductsList />
      {/*<Caption text='Total' className='pb-1 pt-6' />*/}
      {/*<View className='flex-row justify-between'>*/}
      {/*  <Text className={'text-lg text-black dark:text-white'}>*/}
      {/*    Aproximate price*/}
      {/*  </Text>*/}
      {/*  <Caption*/}
      {/*    text='200RON'*/}
      {/*    className='p-0'*/}
      {/*  />*/}
      {/*</View>*/}
      <Caption text='Suggestions' className='pt-6' />
      {suggestions.length > 0 ? (
        suggestions.map((item) => (
          <ProductCard
            key={item.id}
            name={item.name}
            brand={item.brand}
            weight={item.weight}
            price={item.price}
            healthScore={item.healthScore}
            className='mb-3'
            suggestionItem={true}
            onPress={() => {
              router.push('/product/1');
            }}
          />
        ))
      ) : (
        <Text className='text-lg text-black dark:text-white'>
          No suggestions at the moment
        </Text>
      )}
    </ScrollView>
  );
}
