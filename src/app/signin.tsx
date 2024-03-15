import { router, Stack } from 'expo-router';
import { SafeAreaView, ScrollView } from 'react-native';

import { useSession } from '@/context/AuthContext';
import { useColorScheme } from 'nativewind';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import FormInput from '@/components/form-input';
import LargeButton from '@/components/large-button';
import LinkButton from '@/components/link-button';
import KeyboardAccessory from '@/components/keyboard-accessory';
import Toast from 'react-native-toast-message';

export default function SignIn() {
  const inputAccessoryViewID = 'keyboard-accessory';
  const { signIn, session } = useSession();
  const { colorScheme } = useColorScheme();
  const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
  });
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const err = await signIn({ email: data.email, password: data.password });
    if (err !== null) {
      Toast.show({
        type: 'customToast',
        text1: "Can't sign you in!",
        text2:
          err === 'Request failed with status code 401'
            ? 'Email or password is incorrect'
            : err,
        position: 'bottom',
      });
    }
  };

  useEffect(() => {
    if (session) {
      router.replace('/');
    }
  }, [session]);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Sign in',
          headerLargeTitle: true,
          headerTransparent: true,
          headerTitleStyle:
            colorScheme === 'light' ? { color: 'black' } : { color: 'white' },
        }}
      />
      <SafeAreaView className='flex-1 items-center justify-start dark:bg-black'>
        <ScrollView
          className='android:pt-28 flex w-full flex-1 px-4 pt-8'
          contentContainerClassName='gap-2'
        >
          <FormInput
            control={control}
            name={'email'}
            placeholder={'Email'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={'Email is not valid'}
            contentType={'emailAddress'}
            flex1={false}
          />
          <FormInput
            control={control}
            name={'password'}
            placeholder={'Password'}
            secureTextEntry={true}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={'Password is not valid'}
            contentType={'password'}
            flex1={false}
          />
          <LargeButton
            text='Sign in'
            className='my-2'
            onPress={handleSubmit(onSubmit)}
          />
          <LinkButton
            text={`Don't have an account? Sign up`}
            onPress={() => {
              router.replace('signup');
            }}
          />
        </ScrollView>
      </SafeAreaView>
      <KeyboardAccessory inputAccessoryViewID={inputAccessoryViewID} />
    </>
  );
}
