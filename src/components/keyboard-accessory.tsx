import {
  Button,
  InputAccessoryView,
  Keyboard,
  Platform,
  View,
} from 'react-native';

export default function KeyboardAccessory({
  inputAccessoryViewID,
}: {
  inputAccessoryViewID: string;
}) {
  if (Platform.OS === 'ios') {
    return (
      <InputAccessoryView
        style={{ flex: 1, alignItems: 'flex-start' }}
        nativeID={inputAccessoryViewID}
      >
        <View className='items-end bg-white py-1 pr-4 dark:bg-black'>
          <Button title='Done' onPress={Keyboard.dismiss} />
        </View>
      </InputAccessoryView>
    );
  }
  return null;
}
