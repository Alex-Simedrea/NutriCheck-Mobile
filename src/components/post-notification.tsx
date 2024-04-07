import { Pressable, Text, View } from 'react-native';
import Caption from '@/components/caption';
import LargeButton from '@/components/large-button';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { useNotification } from '@/data/notification';

export default function PostNotification() {
  const { colorScheme } = useColorScheme();
  const { shown, setShown } = useNotification();

  if (true) return null;

  return (
    <View className={'rounded-2xl bg-white px-6 py-6 dark:bg-background-900 my-4'}>
      <View className={'mb-4 flex-row items-center justify-between'}>
        <Caption className='py-0' text='Engage with the Community!'></Caption>
        <Pressable onPress={() => {
          setShown(false);
        }}>
          <Ionicons
            name='close-outline'
            size={24}
            color={
              colorScheme === 'light'
                ? 'rgba(0, 0, 0, 0.4)'
                : 'rgba(255, 255, 255, 0.4)'
            }
          />
        </Pressable>
      </View>
      <Text className={'text-lg leading-tight text-black dark:text-white'}>
        Join the conversation on nutrition! Share insights, ask questions, and
        support others in their wellness journey. Tap to share now.
      </Text>
      <LargeButton
        text='Create a new post'
        iconName='arrow-forward-outline'
        className='mt-6'
        onPress={() => {
          router.push('/create-post');
        }}
      />
    </View>
  );
}
