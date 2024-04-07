import { ScrollView, View } from 'react-native';
import AppleHealthKit, {
  HealthActivity,
  HealthKitPermissions,
  HealthValue,
} from 'react-native-health';
import React, { useEffect, useState } from 'react';
import RadarChart from '@/components/spider-graph';
import HealthGoal from '@/components/health-goal';
import LargeButton from '@/components/large-button';
import { router } from 'expo-router';
import Caption from '@/components/caption';
import { useGetGoals } from '@/api/goals';
import LoadingView from '@/components/loading-view';
import Toast from 'react-native-toast-message';
import RetryView from '@/components/retry-view';

const permissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
      AppleHealthKit.Constants.Permissions.AppleExerciseTime,
    ],
  },
} as HealthKitPermissions;

export default function Health() {
  const [steps, setSteps] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [exercise, setExercise] = useState(null);

  const goals = useGetGoals();

  useEffect(() => {
    AppleHealthKit.initHealthKit(permissions, (error: string) => {
      /* Called after we receive a response from the system */

      if (error) {
        console.log('[ERROR] Cannot grant permissions!');
      }

      /* Can now read or write to HealthKit */

      const options = {
        startDate: new Date(+new Date() - 1000 * 24 * 60 * 60).toISOString(),
        endDate: new Date().toISOString(),
      };

      console.log(options);

      AppleHealthKit.getStepCount(
        options,
        (err: string, results: HealthValue) => {
          if (err) {
            console.log('[ERROR] Cannot get step count!');
          }

          setSteps(results.value);
        },
      );

      AppleHealthKit.getActiveEnergyBurned(
        options,
        (err: string, results: HealthValue[]) => {
          if (err) {
            console.log('[ERROR] Cannot get active energy burned!');
          }

          setEnergy(results[0].value);
        },
      );

      AppleHealthKit.getAppleExerciseTime(
        options,
        (err: string, results: HealthValue[]) => {
          if (err) {
            console.log('[ERROR] Cannot get exercise time!');
          }

          setExercise(results[0]?.value);
        },
      );

      const options2 = {
        type: 'AmericanFootball' as HealthActivity, // See HealthActivity Enum
        startDate: new Date(2024, 4, 6, 20, 0, 0, 0).toISOString(),
        endDate: new Date(2024, 4, 6, 20, 30, 0, 0).toISOString(),
        energyBurned: 50, // In Energy burned unit,
        energyBurnedUnit: 'calorie',
        distance: 50, // In Distance unit
        distanceUnit: 'meter',
      };
    });
  }, []);

  if (goals.isPending) {
    return <LoadingView />;
  }

  if (goals.isError) {
    Toast.show({
      type: 'customToast',
      text1: 'Error fetching goals',
      text2: goals.error.message,
      position: 'bottom',
      visibilityTime: 8000,
    });
    return <RetryView refetch={goals.refetch} />;
  }

  return (
    <ScrollView
      className={'dark:bg-black'}
      contentContainerClassName={'gap-4 px-4 pb-20'}
    >
      <RadarChart
        graphSize={300}
        scaleCount={5}
        numberInterval={2}
        data={[
          {
            Steps: steps / goals.data.steps,
            Energy: energy / goals.data.energy,
            Water: 0.9,
            Food: 0.67,
            Exercise: exercise ?? 0 / goals.data.exercise,
          },
        ]}
        options={{
          graphShape: 1,
          showAxis: true,
          showIndicator: false,
          dotList: [false, true],
        }}
      />
      <Caption text='Your goals' className='mt-4' />
      <HealthGoal
        cur={energy ?? 0}
        goal={goals.data.energy}
        title='Energy'
        unit='kcal'
        onPress={() => {
          router.push({
            pathname: '/goal',
            params: {
              goal: 'energy',
            },
          });
        }}
      />
      <View className={'flex-row gap-4'}>
        <HealthGoal
          className='grow basis-0'
          cur={steps ?? 0}
          goal={goals.data.steps}
          title='Steps'
          unit=''
        />
        <HealthGoal
          className='grow basis-0'
          cur={exercise ?? 0}
          goal={goals.data.exercise}
          title='Exercise'
          unit='minutes'
        />
      </View>
      <View className={'flex-row gap-4'}>
        <HealthGoal
          className='grow basis-0'
          cur={energy}
          goal={goals.data.water}
          title='Water'
          unit='ml'
          showButton={true}
          buttonText='Add 250ml'
        />
        <HealthGoal
          className='grow basis-0'
          cur={energy}
          goal={goals.data.food}
          title='Food'
          unit='kcal'
          showButton={true}
          buttonText='Add'
        />
      </View>
      <LargeButton
        text='Change goals'
        onPress={() => {
          router.push('/edit-goals');
        }}
        className='mt-8'
      />
    </ScrollView>
  );
}
