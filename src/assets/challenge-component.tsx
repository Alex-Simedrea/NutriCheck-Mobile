import { useGetTeamProgress } from '@/api/challenges';
import { useWindowDimensions, View } from 'react-native';
import Caption from '@/components/caption';
import CircularProgress from 'react-native-circular-progress-indicator';
import LoadingView from '@/components/loading-view';
import LargeButton from '@/components/large-button';

export default function ChallengeComponent({ teams, id, challenge }: any) {
  // const progress = useGetTeamProgress(
  //   teams?.isSuccess
  //     ? teams.data?.find((team) => team?.team?.challengeID == id).teamID
  //     : 1,
  // );
  // const { width } = useWindowDimensions();

  // if (progress.isPending) {
  //   return <LoadingView />;
  // }

  return (
    <>
      <Caption text='Enroll' />
      <LargeButton text='Enroll in the challenge' onPress={() => {}} />
    </>
  );
}
