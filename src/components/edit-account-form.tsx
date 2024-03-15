import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormInput from '@/components/form-input';
import LargeButton from '@/components/large-button';
import { View } from 'react-native';
import KeyboardAccessory from '@/components/keyboard-accessory';
import { Account, useUpdateAccount } from '@/api/account';
import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function EditAccountForm({
  firstName,
  lastName,
  email,
  user,
}: {
  firstName: string;
  lastName: string;
  email: string;
  user: string;
}) {
  const updateAccount = useUpdateAccount();
  const queryClient = useQueryClient();
  const inputAccessoryViewID = 'keyboard-accessory';
  const schema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    user: yup.string().required().min(3),
  });
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      firstName,
      lastName,
      email,
      user,
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: Account) => {
    updateAccount.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['account'] });
        router.back();
      },
      onError: (error) => {
        Toast.show({
          type: 'customToast',
          text1: 'Error',
          // @ts-ignore
          text2: error.response.data.message,
          position: 'bottom',
          visibilityTime: 8000,
        });
      },
    });
  };

  return (
    <>
      <View className={'gap-2'}>
        <FormInput
          control={control}
          name='firstName'
          placeholder='First name'
          inputAccessoryViewID={inputAccessoryViewID}
          errorText='First name is required'
          contentType='name'
          flex1={false}
          secureTextEntry={false}
          displayName='First name'
          inModal={true}
        />
        <FormInput
          control={control}
          name='lastName'
          placeholder='Last name'
          secureTextEntry={false}
          errorText='Last name is required'
          flex1={false}
          inputAccessoryViewID={inputAccessoryViewID}
          contentType='familyName'
          displayName='Last name'
          inModal={true}
        />
        <FormInput
          control={control}
          name='email'
          placeholder='Email'
          contentType='email'
          flex1={false}
          inputAccessoryViewID={inputAccessoryViewID}
          errorText='Email is not valid'
          secureTextEntry={false}
          displayName='Email'
          inModal={true}
        />
        <FormInput
          control={control}
          name='user'
          placeholder='Username'
          contentType='username'
          flex1={false}
          inputAccessoryViewID={inputAccessoryViewID}
          errorText='Username is not valid'
          secureTextEntry={false}
          displayName='Username'
          inModal={true}
        />
        <LargeButton
          className='mt-4'
          text={'Save changes'}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
      <KeyboardAccessory inputAccessoryViewID={inputAccessoryViewID} />
    </>
  );
}
