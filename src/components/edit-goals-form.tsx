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
    energy: yup.number().min(100).max(2000).required(),
    steps: yup.number().min(1000).max(20000).required(),
    exercise: yup.number().min(10).max(300).required(),
    water: yup.number().min(1500).max(3000).required(),
    food: yup.number().min(500).max(4000).required(),
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
          errorText='Energy must be between 100 and 2000 kcal'
          contentType='none'
          flex1={false}
          secureTextEntry={false}
          displayName='Energy (kcal)'
          inModal={true}
          keyboardType='numeric'
        />
        <FormInput
          control={control}
          name='steps'
          placeholder='Steps'
          secureTextEntry={false}
          errorText='Steps must be between 1000 and 20000'
          flex1={false}
          inputAccessoryViewID={inputAccessoryViewID}
          contentType='none'
          displayName='Steps'
          inModal={true}
          keyboardType='numeric'
        />
        <FormInput
          control={control}
          name='exercise'
          placeholder='Exercise'
          secureTextEntry={false}
          errorText='Exercise must be between 10 and 300 minutes'
          flex1={false}
          inputAccessoryViewID={inputAccessoryViewID}
          contentType='none'
          displayName='Exercise (minutes)'
          inModal={true}
          keyboardType='numeric'
        />
        <FormInput
          control={control}
          name='water'
          placeholder='Water'
          secureTextEntry={false}
          errorText='Water must be between 1500 and 3000 ml'
          flex1={false}
          inputAccessoryViewID={inputAccessoryViewID}
          contentType='none'
          displayName='Water (ml)'
          inModal={true}
          keyboardType='numeric'
        />
        <FormInput
          control={control}
          name='food'
          placeholder='Food intake'
          secureTextEntry={false}
          errorText='Food intake must be between 500 and 4000 kcal'
          flex1={false}
          inputAccessoryViewID={inputAccessoryViewID}
          contentType='none'
          displayName='Food intake (kcal)'
          inModal={true}
          keyboardType='numeric'
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
