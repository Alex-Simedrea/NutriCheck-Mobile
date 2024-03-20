import { useGetAccount } from '@/api/account';
import { ScrollView } from 'react-native';
import EditAccountForm from '@/components/edit-account-form';
import LoadingView from '@/components/loading-view';

export default function EditAccount() {
  const { data, isSuccess, isPending, isError } = useGetAccount();

  if (isPending) {
    return <LoadingView />;
  }

  if (isError) {
    return <></>;
  }

  return (
    <ScrollView
      className={'bg-white dark:bg-background-900'}
      contentContainerClassName={'px-4 pt-4'}
    >
      <EditAccountForm
        firstName={isSuccess ? data.firstName : ''}
        lastName={isSuccess ? data.lastName : ''}
        email={isSuccess ? data.email : ''}
        user={isSuccess ? data.user : ''}
      />
    </ScrollView>
  );
}
