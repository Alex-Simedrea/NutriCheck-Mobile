import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { router } from 'expo-router';
import KeyboardAccessory from '@/components/keyboard-accessory';
import { useQueryClient } from '@tanstack/react-query';

export default function SearchBar({
  inputAccessoryViewID,
}: {
  inputAccessoryViewID: string;
}) {
  const [input, setInput] = useState('');
  const queryClient = useQueryClient();

  return (
    <>
      <TextInput
        className='h-12 w-full rounded-2xl bg-white px-3 text-lg leading-tight text-black dark:bg-background-900 dark:text-white'
        placeholder='Enter product name...'
        returnKeyType='search'
        clearButtonMode='while-editing'
        inputAccessoryViewID={inputAccessoryViewID}
        placeholderTextColor={'rgb(160,160,160)'}
        value={input}
        onChange={(e) => {
          setInput(e.nativeEvent.text);
        }}
        onSubmitEditing={async () => {
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
            params: { search: input },
          });
          // router.push(`/product/${input}`)
        }}
      />
      <KeyboardAccessory inputAccessoryViewID={inputAccessoryViewID} />
    </>
  );
}
