import React, { useEffect } from 'react';
import { router, Stack } from 'expo-router';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSession } from '@/context/AuthContext';
import { useForm } from 'react-hook-form';
import { SafeAreaView, ScrollView } from 'react-native';
import FormInput from '@/components/form-input';
import LargeButton from '@/components/large-button';
import LinkButton from '@/components/link-button';
import { useColorScheme } from 'nativewind';
import KeyboardAccessory from '@/components/keyboard-accessory';
import Toast from 'react-native-toast-message';

export default function SignUp() {
  const inputAccessoryViewID = 'keyboard-accessory';
  const { signIn, signUp, session } = useSession();
  const { colorScheme } = useColorScheme();
  const schema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    username: yup
      .string()
      .required()
      .min(3)
      .matches(/^[a-zA-Z0-9_]+$/),
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
    repeatPassword: yup
      .string()
      .required()
      .oneOf([yup.ref('password')]),
  });
  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      repeatPassword: '',
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: any) => {
    const err = await signUp({
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      password: data.password,
    });
    if (err !== null) {
      Toast.show({
        type: 'customToast',
        text1: "Can't sign you up!",
        text2: err,
        position: 'bottom',
        visibilityTime: 8000,
      });
    } else {
      await signIn({ email: data.email, password: data.password });
    }
  };

  useEffect(() => {
    if (session) {
      console.log(session);
      router.replace('/');
    }
  }, [session]);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Sign up',
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
            name={'firstName'}
            placeholder={'Name'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={'Name is required'}
            contentType={'givenName'}
            flex1={false}
          />
          <FormInput
            control={control}
            name={'lastName'}
            placeholder={'Surname'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={'Surname is required'}
            contentType={'familyName'}
            flex1={false}
          />
          <FormInput
            control={control}
            name={'username'}
            placeholder={'Username'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={
              'The username must have at least 3 characters, which should be letters (a-z), numbers(0-9) or underscores (_)'
            }
            contentType={'username'}
            flex1={false}
          />
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
            errorText={'The password must have at least 8 characters'}
            contentType={'newPassword'}
            flex1={false}
          />
          <FormInput
            control={control}
            name={'repeatPassword'}
            placeholder={'Repeat password'}
            secureTextEntry={true}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={"'The passwords don't match"}
            contentType={'newPassword'}
            flex1={false}
          />
          <LargeButton
            text='Sign up'
            className='my-2'
            onPress={handleSubmit(onSubmit)}
          />
          <LinkButton
            text={`Already have an account? Sign in`}
            onPress={() => {
              router.replace('/signin');
            }}
          />
        </ScrollView>
      </SafeAreaView>
      <KeyboardAccessory inputAccessoryViewID={inputAccessoryViewID} />
    </>
  );
}
