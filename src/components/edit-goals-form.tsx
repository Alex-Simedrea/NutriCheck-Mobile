import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormInput from '@/components/form-input';
import LargeButton from '@/components/large-button';
import { View } from 'react-native';
import KeyboardAccessory from '@/components/keyboard-accessory';
import { Goals, useUpdateGoals } from '@/api/goals';
import { router } from 'expo-router';

export default function EditGoalsForm({
  energy,
  steps,
  exercise,
  water,
  food,
}: {
  energy: string;
  steps: string;
  exercise: string;
  water: string;
  food: string;
}) {
  const updateGoals = useUpdateGoals();
  const inputAccessoryViewID = 'keyboard-accessory';
  const schema = yup.object({
    energy: yup.number().required(),
    steps: yup.number().required(),
    exercise: yup.number().required(),
    water: yup.number().required(),
    food: yup.number().required(),
  });
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      // @ts-ignore
      energy,
      // @ts-ignore
      steps,
      // @ts-ignore
      exercise,
      // @ts-ignore
      water,
      // @ts-ignore
      food,
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: Goals) => {
    updateGoals.mutate(data);
    router.back();
  };

  return (
    <>
      <View className={'gap-2'}>
        <FormInput
          control={control}
          name='energy'
          placeholder='Energy'
          inputAccessoryViewID={inputAccessoryViewID}
          errorText='Energy is required'
          contentType='none'
          flex1={false}
          secureTextEntry={false}
          displayName='Energy'
          inModal={true}
        />
        <FormInput
          control={control}
          name='steps'
          placeholder='Steps'
          secureTextEntry={false}
          errorText='Steps are required'
          flex1={false}
          inputAccessoryViewID={inputAccessoryViewID}
          contentType='none'
          displayName='Steps'
          inModal={true}
        />
        <FormInput
          control={control}
          name='exercise'
          placeholder='Exercise'
          secureTextEntry={false}
          errorText='Exercise is required'
          flex1={false}
          inputAccessoryViewID={inputAccessoryViewID}
          contentType='none'
          displayName='Exercise'
          inModal={true}
        />
        <FormInput
          control={control}
          name='water'
          placeholder='Water'
          secureTextEntry={false}
          errorText='Water is required'
          flex1={false}
          inputAccessoryViewID={inputAccessoryViewID}
          contentType='none'
          displayName='Water'
          inModal={true}
        />
        <FormInput
          control={control}
          name='food'
          placeholder='Food'
          secureTextEntry={false}
          errorText='Food is required'
          flex1={false}
          inputAccessoryViewID={inputAccessoryViewID}
          contentType='none'
          displayName='Food'
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
