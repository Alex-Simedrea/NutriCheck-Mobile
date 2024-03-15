import { ScrollView } from 'react-native';
import Caption from '@/components/caption';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormInput from '@/components/form-input';
import LargeButton from '@/components/large-button';
import { router, useLocalSearchParams } from 'expo-router';
import { useCreatePost } from '@/api/posts';

export default function CreatePost() {
  const createPost = useCreatePost();
  const { ean } = useLocalSearchParams();
  const inputAccessoryViewID = 'keyboard-accessory';
  const schema = yup.object({
    title: yup.string().required(),
    content: yup.string().required(),
  });
  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: '',
      content: '',
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    createPost.mutate({ ...data, ean });
    if (router.canGoBack()) {
      router.back();
    } else {
      router.navigate('/');
    }
  };

  return (
    <ScrollView
      className={'bg-white dark:bg-background-900'}
      contentContainerClassName={'px-4'}
    >
      <Caption text='Title' />
      <FormInput
        control={control}
        name='title'
        placeholder='Title...'
        secureTextEntry={false}
        inputAccessoryViewID={inputAccessoryViewID}
        errorText='Title is required'
        contentType='none'
        flex1={false}
        inModal={true}
      />
      <Caption text='Content' />
      <FormInput
        control={control}
        name='content'
        placeholder='Content...'
        secureTextEntry={false}
        inputAccessoryViewID={inputAccessoryViewID}
        errorText='Content is required'
        contentType='none'
        flex1={false}
        inModal={true}
        multiline={true}
        numberOfLines={10}
      />
      <LargeButton
        text='Create post'
        onPress={handleSubmit(onSubmit)}
        className='mt-8'
      />
    </ScrollView>
  );
}
