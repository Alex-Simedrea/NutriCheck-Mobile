import { ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useDeleteSubmission, useGetSubmission } from '@/api/submissions';
import LoadingView from '@/components/loading-view';
import Toast from 'react-native-toast-message';
import RetryView from '@/components/retry-view';
import LargeButton from '@/components/large-button';
import SubmissionForm from '@/components/submission-form';

export default function Submission() {
  const { id } = useLocalSearchParams();
  const submission = useGetSubmission(id as string);
  const deleteSubmission = useDeleteSubmission();

  if (submission.isPending) {
    return <LoadingView />;
  }

  if (submission.isError) {
    Toast.show({
      type: 'customToast',
      text1: 'Error',
      text2: submission.error.message,
      position: 'bottom',
      visibilityTime: 8000,
    });
    return <RetryView refetch={submission.refetch} />;
  }

  return (
    <ScrollView
      className={'bg-white dark:bg-background-900'}
      contentContainerClassName={'px-4'}
    >
      <LargeButton
        text='Delete submission'
        onPress={() => {
          deleteSubmission.mutate(id as string);
          router.back();
        }}
        iconName='trash-outline'
      />
      <SubmissionForm
        defaultValues={JSON.parse(
          JSON.stringify(submission.data, (key, value) => {
            if (typeof value === 'number') {
              return String(value);
            }
            return value;
          }),
        )}
      />
    </ScrollView>
  );
}
