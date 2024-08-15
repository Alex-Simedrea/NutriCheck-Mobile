import { RefreshControl, ScrollView } from 'react-native';
import { useGetChallenges } from '@/api/challenges';
import LoadingView from '@/components/loading-view';
import React, { useEffect, useState } from 'react';
import RetryView from '@/components/retry-view';
import Toast from 'react-native-toast-message';
import Caption from '@/components/caption';
import { useDay } from '@/data/day';
import AppleHealthKit, { HealthKitPermissions } from 'react-native-health';
import api from '@/api/api';
import { useBadges } from '@/data/badges';
import HealthGoal from '@/components/health-goal';
import { setHealthData } from '@/lib/utils';

const dailyChallenges = [
  {
    goal: 10000,
    unit: 'steps',
  },
  {
    goal: 15000,
    unit: 'steps',
  },
  {
    goal: 600,
    unit: 'kcal',
  },
  {
    goal: 1000,
    unit: 'kcal',
  },
  {
    goal: 120,
    unit: 'minutes',
  },
];

const permissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
      AppleHealthKit.Constants.Permissions.AppleExerciseTime,
    ],
  },
} as HealthKitPermissions;

export default function Challenges() {
  const challenges = useGetChallenges();
  const day = useDay();

  const [steps, setSteps] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [exercise, setExercise] = useState(0);

  const badges = useBadges();

  useEffect(() => {
    setHealthData({ setSteps, setEnergy, setExercise });
  }, []);

  useEffect(() => {
    if (new Date(day.day).getDate() !== new Date().getDate()) {
      day.setDay(new Date().toISOString());
      day.setChallenge(
        dailyChallenges[Math.floor(Math.random() * dailyChallenges.length)],
      );
    } else {
      if (
        (day.challenge.unit === 'kcal'
          ? energy
          : day.challenge.unit === 'steps'
            ? steps
            : day.challenge.unit === 'minutes'
              ? exercise
              : 0) >= day.challenge.goal
      ) {
        api.post('/profile/daily-challenge', {});
        badges.addBadge(
          day.challenge.unit === 'kcal'
            ? 'calories.png'
            : day.challenge.unit === 'steps'
              ? 'steps.png'
              : day.challenge.unit === 'minutes'
                ? 'exercise.png'
                : '',
        );
      }
    }
  }, [day, steps, energy, exercise]);

  if (challenges.isPending) {
    return <LoadingView />;
  }

  if (challenges.isError) {
    Toast.show({
      type: 'customToast',
      position: 'bottom',
      text1: 'Error while fetching challenges',
      text2: challenges.error.message,
    });
    return <RetryView refetch={challenges.refetch} />;
  }

  const challengess = [
    {
      id: 1,
      title: 'Challenge 1',
      description: 'lorem ipsum dolor sit amet consectetur adipiscing elit ',
      organizer: 'Organizer 1',
      startDate: new Date(),
      endDate: new Date(),
      goal: 100,
      unit: 'steps',
    },
    {
      id: 2,
      title: 'Challenge 2',
      description: 'lorem ipsum dolor sit amet consectetur adipiscing elit ',
      organizer: 'Organizer 2',
      startDate: new Date(),
      endDate: new Date(),
      goal: 200,
      unit: 'steps',
    },
    {
      id: 3,
      title: 'Challenge 3',
      description: 'lorem ipsum dolor sit amet consectetur adipiscing elit ',
      organizer: 'Organizer 3',
      startDate: new Date(),
      endDate: new Date(),
      goal: 300,
      unit: 'steps',
    },
  ];

  return (
    <ScrollView
      className={'dark:bg-black'}
      contentContainerClassName={'px-4 pb-20 pt-4'}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={async () => {
            setHealthData({ setSteps, setEnergy, setExercise });
          }}
        />
      }
    >
      <Caption text='Daily challenge' />
      <HealthGoal
        className='grow basis-0'
        cur={
          day.challenge.unit === 'kcal'
            ? energy
            : day.challenge.unit === 'steps'
              ? steps
              : day.challenge.unit === 'minutes'
                ? exercise
                : 0
        }
        goal={day.challenge.goal}
        unit={day.challenge.unit}
        size={200}
        titleClassName='text-5xl'
        subtitleClassName='text-xl'
      />
      {/*<Caption text='Community challenges' />*/}
      {/*<View className={'gap-3'}>*/}
      {/*  {challenges.data.length ? (*/}
      {/*    challenges.data.map((challenge, i) => (*/}
      {/*      <ChallengeCard*/}
      {/*        key={i}*/}
      {/*        {...challenge}*/}
      {/*        onPress={() => {*/}
      {/*          router.push({*/}
      {/*            pathname: `/challenge`,*/}
      {/*            params: { id: challenge.id },*/}
      {/*          });*/}
      {/*        }}*/}
      {/*      />*/}
      {/*    ))*/}
      {/*  ) : (*/}
      {/*    <Text className={'font-bold dark:text-white'}>*/}
      {/*      No challenges found*/}
      {/*    </Text>*/}
      {/*  )}*/}
      {/*</View>*/}
    </ScrollView>
  );
}
