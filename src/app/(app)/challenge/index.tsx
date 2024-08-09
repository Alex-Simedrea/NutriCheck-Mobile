import { ScrollView, Text, View } from 'react-native';
import Caption from '@/components/caption';
import { useGetChallenge } from '@/api/challenges';
import { useLocalSearchParams } from 'expo-router';
import LoadingView from '@/components/loading-view';
import Toast from 'react-native-toast-message';
import RetryView from '@/components/retry-view';
import { useGetTeams } from '@/api/teams';

export default function Challenge() {
  const { id } = useLocalSearchParams();

  const challenge = useGetChallenge(id as string);
  const teams = useGetTeams();

  if (challenge.isPending || teams.isPending) {
    return <LoadingView />;
  }

  if (challenge.isError || teams.isError) {
    Toast.show({
      type: 'customToast',
      text1: 'Error loading challenge',
      text2: challenge.error.message,
      position: 'bottom',
      visibilityTime: 8000,
    });

    return <RetryView refetch={challenge.refetch} />;
  }

  return (
    <ScrollView className={'dark:bg-black'} contentContainerClassName={'px-4'}>
      <Caption text='Details' />
      <View
        className={'rounded-2xl bg-background-50 p-4 dark:bg-background-900'}
      >
        <Text className='text-2xl font-semibold text-black dark:text-white'>
          {challenge.data.title}
        </Text>
        <Text className='text-base text-black dark:text-white'>
          {challenge.data.description}
        </Text>
      </View>
      {/*<Caption text='Progress' />*/}
      {/*<View*/}
      {/*  className={*/}
      {/*    'items-center rounded-2xl bg-background-50 py-8 dark:bg-background-900'*/}
      {/*  }*/}
      {/*>*/}
      {/*  <CircularProgress*/}
      {/*    value={0}*/}
      {/*    maxValue={challenge.data.goal}*/}
      {/*    subtitle={`/ ${challenge.data.goal} ${challenge.data.unit}`}*/}
      {/*    radius={(width - 220) / 2}*/}
      {/*  />*/}
      {/*</View>*/}
    </ScrollView>
  );
}
