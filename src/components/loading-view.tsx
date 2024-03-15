import { ActivityIndicator, View } from 'react-native';

export default function LoadingView() {
  return (
    <View className={'flex-1 items-center justify-center dark:bg-black'}>
      <ActivityIndicator size={'large'} />
    </View>
  );
}
