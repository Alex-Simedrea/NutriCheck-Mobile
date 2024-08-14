import { View, Text, ScrollView } from 'react-native';
import { useGetGoals, useUpdateGoals } from '@/api/goals';
import React from 'react';
import LoadingView from '@/components/loading-view';
import RetryView from '@/components/retry-view';
import Toast from 'react-native-toast-message';
import EditGoalsForm from '@/components/edit-goals-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function EditGoals() {
  const goals = useGetGoals();

  if (goals.isPending) {
    return <LoadingView />;
  }

  if (goals.isError) {
    Toast.show({
      type: 'customToast',
      position: 'bottom',
      text1: 'Error while fetching goals',
      text2: goals.error.message,
    });
    return <RetryView refetch={goals.refetch} />;
  }

  return (
    <KeyboardAwareScrollView
      className={'bg-white dark:bg-background-900'}
      contentContainerClassName={'px-4 pt-4'}
    >
      <EditGoalsForm
        energy={goals.data?.energy.toString() ?? '2000'}
        steps={goals.data?.steps.toString() ?? '10000'}
        water={goals.data?.water.toString() ?? '2000'}
        food={goals.data?.food.toString() ?? '2000'}
        exercise={goals.data?.exercise.toString() ?? '30'}
      />
    </KeyboardAwareScrollView>
  );
}