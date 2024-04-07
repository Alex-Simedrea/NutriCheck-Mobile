import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function Goal() {
  const {goal} = useLocalSearchParams();

  return (
    <View>

    </View>
  );
}