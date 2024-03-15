import { Button, Platform, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';

export default function HeaderCloseButton() {
  const { colorScheme } = useColorScheme();

  if (Platform.OS === 'ios')
    return (
      <Button
        title='Cancel'
        onPress={() => {
          if (router.canGoBack()) router.back();
          else router.navigate('/');
        }}
      />
    );
  else
    return (
      <Pressable
        onPress={() => {
          if (router.canGoBack()) router.back();
          else router.navigate('/');
        }}
        className={'pl-2 pr-4'}
      >
        <Ionicons
          name='close'
          size={24}
          color={colorScheme === 'light' ? 'black' : 'white'}
        />
      </Pressable>
    );
}
