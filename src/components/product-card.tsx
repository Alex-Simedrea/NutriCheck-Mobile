import { Pressable, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { cn } from '@/lib/utils';
import LargeButton from '@/components/large-button';
import Stepper from '@/components/stepper';

export default function ProductCard({
  name,
  brand,
  weight,
  price,
  healthScore,
  photoUrl,
  className,
  cartItem = false,
  amount,
  onIncrement,
  onDecrement,
  onRemove,
  suggestionItem = false,
  suggestionItemAction,
  onPress,
}: {
  name: string;
  brand: string;
  weight: string;
  price: string;
  healthScore: number;
  photoUrl?: string;
  className?: string;
  cartItem?: boolean;
  amount?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onRemove?: () => void;
  suggestionItem?: boolean;
  suggestionItemAction?: () => void;
  onPress?: () => void;
}) {
  return (
    <Pressable
      className={cn(
        'w-full items-center rounded-2xl bg-white p-4 dark:bg-background-900',
        className,
      )}
      onPress={onPress}
    >
      <View className='flex-row items-center'>
        {photoUrl ? (
          <Image
            source={{
              uri: photoUrl,
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
          // <Text>{photoUrl}</Text>
          <View className='h-24 w-24 items-center justify-center rounded-2xl bg-background-100 dark:bg-background-600'>
            <Feather
              name='camera-off'
              size={24}
              color='gray'
              className='self-center'
            />
          </View>
        )}
        <View className='ml-4 flex-1'>
          <Text className='text-2xl font-bold leading-tight text-black dark:text-white'>
            {name}
          </Text>
          <Text className='pb-2 font-semibold leading-tight text-black dark:text-white'>
            {brand} - {weight}
          </Text>
          <View className='flex-row justify-between'>
            <Text
              className={cn(
                'text-lg leading-tight text-black',
                healthScore < 80
                  ? healthScore < 40
                    ? 'text-red-500'
                    : 'text-yellow-500'
                  : healthScore >= 80
                  ? 'text-green-500'
                  : 'text-background-400',
              )}
            >
              Health score: {healthScore}
            </Text>
            {!cartItem && price && (
              <Text className='text-lg leading-tight text-black dark:text-white'>
                {`$${price}`}
              </Text>
            )}
          </View>
        </View>
      </View>
      {cartItem ? (
        <View className='w-full flex-1 flex-row justify-between pt-4'>
          <Stepper
            amount={amount}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
          />
          <View className='flex-1 flex-row justify-end'>
            <Text className='self-center pr-4 text-lg font-bold text-black dark:text-white'>
              {price ? `$${price}` : ''}
            </Text>
            <LargeButton
              text={null}
              onPress={onRemove}
              iconName='checkmark-outline'
              className='w-16'
            />
          </View>
        </View>
      ) : null}
      {suggestionItem ? (
        <LargeButton
          text='Add to shopping list'
          className='bg-primary-500 mt-4 w-full flex-row justify-center rounded-2xl py-2'
          onPress={suggestionItemAction}
          iconName='add-outline'
        />
      ) : null}
    </Pressable>
  );
}
