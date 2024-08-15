import {
  RefreshControl,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
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
import { useWater } from '@/data/water';
import { useFood } from '@/data/food';
import { setHealthData } from '@/lib/utils';

export default function Health() {
  const [steps, setSteps] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [exercise, setExercise] = useState(null);

  const { width } = useWindowDimensions();

  const water = useWater();
  const food = useFood();

  const goals = useGetGoals();

  useEffect(() => {
    if (
      new Date(water.day).toLocaleDateString() !==
      new Date().toLocaleDateString()
    ) {
      water.setDay(new Date().toISOString());
      water.setWater(0);
    }
  }, [water.day, water.water]);

  useEffect(() => {
    if (
      new Date(food.day).toLocaleDateString() !==
      new Date().toLocaleDateString()
    ) {
      food.setDay(new Date().toISOString());
      food.setFood(0);
    }
  }, [food.day, food.food]);

  useEffect(() => {
    setHealthData({ setSteps, setEnergy, setExercise });
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
      contentContainerClassName={'gap-4 px-4 pb-20 pt-4'}
      refreshControl={
        <RefreshControl
          refreshing={goals.isRefetching}
          onRefresh={async () => {
            await goals.refetch();
            setHealthData({ setSteps, setEnergy, setExercise });
          }}
        />
      }
    >
      <Caption text='Overview' />
      <View className='rounded-2xl bg-white dark:bg-background-900'>
        <RadarChart
          graphSize={width - 32}
          scaleCount={5}
          numberInterval={2}
          data={[
            {
              Steps: Math.min(steps / goals.data.steps, 1),
              Energy: Math.min(energy / goals.data.energy, 1),
              Water: Math.min(water.water / goals.data.water, 1),
              Food: Math.min(food.food / goals.data.food, 1),
              Exercise: Math.min((exercise ?? 0) / goals.data.exercise, 1),
            },
          ]}
          options={{
            graphShape: 1,
            showAxis: true,
            showIndicator: false,
            dotList: [false, true],
          }}
        />
      </View>
      <Caption text='Your goals' />
      <HealthGoal
        cur={energy ?? 0}
        goal={goals.data.energy}
        title='Energy'
        unit='kcal'
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
          cur={water.water}
          goal={goals.data.water}
          title='Water'
          unit='ml'
          showButton={true}
          buttonText='Add 250ml'
          buttonAction={() => {
            water.setWater(water.water + 250);
          }}
        />
        <HealthGoal
          className='grow basis-0'
          cur={food.food}
          goal={goals.data.food}
          title='Food'
          unit='kcal'
          showButton={true}
          buttonText='Add'
          buttonAction={() => {
            router.push('/products');
          }}
        />
      </View>
      <LargeButton
        text='Change goals'
        onPress={() => {
          router.push('/edit-goals');
        }}
        className='mt-8'
        iconName='create-outline'
      />
    </ScrollView>
  );
}
