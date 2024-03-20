import { ScrollView, Text } from 'react-native';
import React from 'react';
import EditBodyProfileForm from '@/components/edit-body-profile-form';
import { useGetPreferences } from '@/api/preferences';
import LoadingView from '@/components/loading-view';
import RetryView from '@/components/retry-view';
import EditAccountForm from '@/components/edit-account-form';
import { useGetBodyProfile } from '@/api/body-profile';

export default function BodyProfile() {
  const preferences = useGetBodyProfile();

  if (preferences.isPending) {
    return <LoadingView />;
  }

  if (preferences.isError) {
    return <RetryView refetch={preferences.refetch} />;
  }

  return (
    <>
      <ScrollView
        className='bg-white dark:bg-background-900'
        contentContainerClassName={'px-4 pb-20'}
      >
        <EditBodyProfileForm
          weight={preferences.data?.weight?.toString() ?? '75'}
          height={preferences.data?.height?.toString() ?? '170'}
          age={preferences.data?.age?.toString() ?? '25'}
          sex={preferences.data?.sex?.toString() ?? 'male'}
          activityLevel={preferences.data?.activityLevel?.toString() ?? 1}
          special={{
            pregnant: preferences.data?.special?.pregnant ?? false,
            trimester: preferences.data?.special?.trimester?.toString() ?? '1',
            breastfeeding: preferences.data?.special?.breastfeeding ?? false,
          }}
        />
      </ScrollView>
    </>
  );
}
