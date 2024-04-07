import { ScrollView, Text, useWindowDimensions, View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import Caption from '@/components/caption';
import { useGetChallenge, useGetTeamProgress } from '@/api/challenges';
import { useLocalSearchParams } from 'expo-router';
import LoadingView from '@/components/loading-view';
import Toast from 'react-native-toast-message';
import RetryView from '@/components/retry-view';
import { useGetTeams } from '@/api/teams';
import { useEffect } from 'react';
import ChallengeComponent from '@/assets/challenge-component';

export default function Challenge() {
  const { width } = useWindowDimensions();
  const { id } = useLocalSearchParams();

  const challenge = useGetChallenge(id as string);
  const teams = useGetTeams();

  // useEffect(() => {
  //   const progress = useGetTeamProgress(teams?.isSuccess ? teams.data.find(team => team.team.challengeID === id).teamID : '');
  // }, [teams]);

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
        className={
          'p-4 rounded-2xl bg-background-50 dark:bg-background-900'
        }
      >
        <Text className='text-2xl text-black font-semibold dark:text-white'>
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
        <ChallengeComponent teams={teams} id={id} challenge={challenge} />
      {/*</View>*/}
    </ScrollView>
);
}
