import { useColorScheme } from 'nativewind';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Text, View } from 'react-native';
import FormInput from '@/components/form-input';
import * as Menu from 'zeego/dropdown-menu';
import { Ionicons } from '@expo/vector-icons';
import YesNoGeneralDropdownForm from '@/components/yes-no-general-dropdown-form';
import LargeButton from '@/components/large-button';
import KeyboardAccessory from '@/components/keyboard-accessory';
import React from 'react';
import { useUpdateBodyProfile } from '@/api/body-profile';
import { router } from 'expo-router';

export default function EditBodyProfileForm({
  weight,
  height,
  age,
  sex,
  activityLevel,
  special,
}: {
  weight: string;
  height: string;
  age: string;
  sex: string;
  activityLevel: string;
  special: {
    pregnant: boolean;
    trimester: string;
    breastfeeding: boolean;
  };
}) {
  const keyboardAccessoryViewID = 'body-profile';
  const { colorScheme } = useColorScheme();

  const updatePreferences = useUpdateBodyProfile();

  const schema = yup.object({
    weight: yup.number().required().min(0),
    height: yup.number().required().min(0),
    age: yup.number().required().min(0),
    sex: yup.string().required(),
    activityLevel: yup.number().required().min(1).max(2.4),
    special: yup.object({
      pregnant: yup.boolean(),
      trimester: yup.number().min(1).max(3),
      breastfeeding: yup.boolean(),
    }),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      // @ts-ignore
      weight,
      // @ts-ignore
      height,
      // @ts-ignore
      age,
      sex,
      // @ts-ignore
      activityLevel,
      // @ts-ignore
      special,
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data: any) => {
    console.log(data);
    updatePreferences.mutate(data);
    router.back();
  };

  return (
    <>
      <View className={'gap-2 pb-2'}>
        <FormInput
          control={control}
          name='weight'
          placeholder='Weight'
          secureTextEntry={false}
          inputAccessoryViewID='weight'
          errorText={errors.weight?.message}
          contentType='none'
          flex1={true}
          keyboardType='numeric'
          inModal={true}
          displayName='Weight'
        />
        <FormInput
          control={control}
          name='height'
          placeholder='Height'
          secureTextEntry={false}
          inputAccessoryViewID='height'
          errorText={errors.height?.message}
          contentType='none'
          flex1={true}
          keyboardType='numeric'
          inModal={true}
          displayName='Height'
        />
        <FormInput
          control={control}
          name='age'
          placeholder='Age'
          secureTextEntry={false}
          inputAccessoryViewID='age'
          errorText={errors.age?.message}
          contentType='none'
          flex1={true}
          keyboardType='numeric'
          inModal={true}
          displayName='Age'
        />
      </View>
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg text-black dark:text-white'}>Sex</Text>
        <Controller
          render={({ field: { onChange, value } }) => (
            <Menu.Root>
              <Menu.Trigger>
                <View className={'flex-row gap-1'}>
                  <Text
                    className={'p-0 text-lg text-black/70 dark:text-white/70'}
                  >
                    {value === 'male' ? 'Male' : 'Female'}
                  </Text>
                  <Ionicons
                    name='chevron-expand-outline'
                    size={24}
                    color={
                      colorScheme === 'light'
                        ? 'rgba(0 0 0 / 0.7)'
                        : 'rgba(255 255 255 / 0.7)'
                    }
                  />
                </View>
              </Menu.Trigger>
              <Menu.Content>
                <Menu.Item
                  key='yes'
                  onSelect={() => {
                    onChange('male');
                  }}
                >
                  Male
                </Menu.Item>
                <Menu.Item
                  key='no'
                  onSelect={() => {
                    onChange('female');
                  }}
                >
                  Female
                </Menu.Item>
              </Menu.Content>
            </Menu.Root>
          )}
          name='sex'
          control={control}
        />
      </View>
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg text-black dark:text-white'}>
          Activity Level
        </Text>
        <Controller
          render={({ field: { onChange, value } }) => (
            <Menu.Root>
              <Menu.Trigger>
                <View className={'flex-row gap-1'}>
                  <Text
                    className={'p-0 text-lg text-black/70 dark:text-white/70'}
                  >
                    {value == 1
                      ? 'Extremely inactive'
                      : value == 1.4
                        ? 'Sedentary'
                        : value == 1.7
                          ? 'Moderately active'
                          : value == 2.0
                            ? 'Vigorously active'
                            : value == 2.4
                              ? 'Extremely active'
                              : value}
                  </Text>
                  <Ionicons
                    name='chevron-expand-outline'
                    size={24}
                    color={
                      colorScheme === 'light'
                        ? 'rgba(0 0 0 / 0.7)'
                        : 'rgba(255 255 255 / 0.7)'
                    }
                  />
                </View>
              </Menu.Trigger>
              <Menu.Content>
                <Menu.Item
                  key='extremely-inactive'
                  onSelect={() => {
                    onChange(1);
                  }}
                >
                  Extremely inactive
                </Menu.Item>
                <Menu.Item
                  key='sedentary'
                  onSelect={() => {
                    onChange(1.4);
                  }}
                >
                  Sedentary
                </Menu.Item>
                <Menu.Item
                  key='moderately-active'
                  onSelect={() => {
                    onChange(1.7);
                  }}
                >
                  Moderately active
                </Menu.Item>
                <Menu.Item
                  key='vigotously-active'
                  onSelect={() => {
                    onChange(2.0);
                  }}
                >
                  Vigorously active
                </Menu.Item>
                <Menu.Item
                  key='extremely-active'
                  onSelect={() => {
                    onChange(2.4);
                  }}
                >
                  Extremely active
                </Menu.Item>
              </Menu.Content>
            </Menu.Root>
          )}
          name='activityLevel'
          control={control}
        />
      </View>
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg text-black dark:text-white'}>
          Pregnant
        </Text>
        <YesNoGeneralDropdownForm control={control} name='special.pregnant' />
      </View>
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg text-black dark:text-white'}>
          Breastfeeding
        </Text>
        <YesNoGeneralDropdownForm
          control={control}
          name='special.breastfeeding'
        />
      </View>
      <LargeButton
        text='Save'
        onPress={handleSubmit(onSubmit)}
        className='mt-6'
      />
      <KeyboardAccessory inputAccessoryViewID={keyboardAccessoryViewID} />
    </>
  );
}
