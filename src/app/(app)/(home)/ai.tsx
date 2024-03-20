import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useGenerate } from '@/api/ai';
import { router } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';
import Caption from '@/components/caption';
import { useColorScheme } from 'nativewind';
import PostNotification from '@/components/post-notification';

export default function AI() {
  const [input, setInput] = useState<string>(null);
  const [response, setResponse] = useState<string>(null);
  const generate = useGenerate();
  const queryClient = useQueryClient();
  const { colorScheme } = useColorScheme();

  return (
    <ScrollView
      className={'dark:bg-black'}
      contentContainerClassName={'px-4 pt-4 pb-20'}
    >
      <PostNotification />
      <View className={'mb-3 flex-1 flex-row gap-2'}>
        <TextInput
          className={cn(
            'h-14 w-full flex-1 rounded-2xl bg-white px-3 text-lg leading-tight text-black dark:bg-background-900 dark:text-white',
          )}
          placeholder='Type your prompt here...'
          inputAccessoryViewID='inputAccessoryViewID'
          textContentType='none'
          onChangeText={(text) => setInput(text)}
          value={input}
          placeholderTextColor={'rgb(160, 160, 160)'}
        />
        <Pressable
          onPress={() => {
            generate.mutate(input, {
              onSuccess: (data) => {
                console.log('ai', data);
                setResponse(data);
              },
            });
          }}
          className={
            'ios:bg-default-blue dark:ios:bg-default-blue items-center justify-center rounded-2xl bg-blue-600 px-5 active:opacity-70 dark:bg-blue-400'
          }
        >
          <Ionicons name='send' size={24} color={'white'} />
        </Pressable>
      </View>
      {generate.isPending && (
        <View
          className={'mt-4 rounded-2xl p-4 text-white dark:bg-background-900'}
        >
          <ActivityIndicator size={'small'} />
        </View>
      )}
      {response && (
        <View
          className={'mt-4 rounded-2xl p-4 text-white dark:bg-background-900'}
        >
          <Text className={'pb-1 text-xl font-bold dark:text-white'}>AI</Text>
          <Text className={'text-lg dark:text-white'}>
            {response.replace(/\[.*\]\s*/, '')}
          </Text>
        </View>
      )}
      {response?.match(/\[.*\]/) && (
        <View
          className={'mt-4 rounded-2xl p-4 text-white dark:bg-background-900'}
        >
          <Caption className='py-0 pb-2' text='Ingredients'></Caption>
          {JSON.parse(response?.match(/\[.*\]/)[0])?.map((item, index) => {
            return (
              <Pressable
                className={'bg-background-700 my-1 p-2 px-4 rounded-2xl flex-row'}
                key={index}
                onPress={async () => {
                  await Promise.all([
                    queryClient.resetQueries({
                      queryKey: ['offSearch'],
                    }),
                    queryClient.resetQueries({
                      queryKey: ['search'],
                    }),
                  ]);
                  router.push({
                    pathname: `/search-results`,
                    params: { search: item },
                  });
                }}
              >
                <Ionicons className='mr-2' name='search' size={24} color={colorScheme === 'dark' ? 'white' : 'black'} />
                <Text className={'dark:text-white text-lg'}>{item}</Text>
              </Pressable>
            );
          })}
        </View>
      )}
      <View
        className={'mt-4 rounded-2xl p-4 text-white dark:bg-background-900'}
      >
        <Text className={'pb-1 text-xl font-bold dark:text-white'}>
          Example prompt
        </Text>
        <Text className={'text-lg dark:text-white'}>
          Give me a banana bread recipe.
        </Text>
      </View>
    </ScrollView>
  );
}
