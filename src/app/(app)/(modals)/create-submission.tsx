import { ScrollView, Text, View } from 'react-native';
import * as yup from 'yup';
import Caption from '@/components/caption';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormInput from '@/components/form-input';
import LargeButton from '@/components/large-button';
import AutocompleteIngredients from '@/components/autocomplete-ingredients';
import React, { useState } from 'react';
import { useColorScheme } from 'nativewind';
import AutocompleteIngredietnsForm from '@/components/autocomplete-ingredietns-form';
import { Ionicons } from '@expo/vector-icons';

export default function CreateSubmission() {
  const {colorScheme} = useColorScheme();
  const inputAccessoryViewID = 'keyboard-accessory';

  const [selectedItem, setSelectedItem] = useState(null);

  const schema = yup.object({
    ean: yup.string().required(),
    product_name: yup.string().required(),
    quantity: yup.string().required(),
    price: yup.number().required(),
    brands: yup.string().required(),
    nutriments: yup
      .object({
        carbohydrates: yup.number().required(),
        carbohydrates_100g: yup.number().required(),
        'energy-kcal': yup.number().required(),
        'energy-kcal_100g': yup.number().required(),
        fat: yup.number().required(),
        fat_100g: yup.number().required(),
        'nova-group': yup.number().required(),
        'nova-group_100g': yup.number().required(),
        proteins: yup.number().required(),
        proteins_100g: yup.number().required(),
        salt: yup.number().required(),
        salt_100g: yup.number().required(),
        'saturated-fat': yup.number().required(),
        'saturated-fat_100g': yup.number().required(),
        sodium: yup.number().required(),
        sodium_100g: yup.number().required(),
        sugars: yup.number().required(),
        sugars_100g: yup.number().required(),
        folates: yup.number().required(),
        niacin: yup.number().required(),
        riboflavin: yup.number().required(),
        thiamin: yup.number().required(),
        'vitamin-a': yup.number().required(),
        'vitamin-b6': yup.number().required(),
        'vitamin-b12': yup.number().required(),
        'vitamin-c': yup.number().required(),
        'vitamin-d': yup.number().required(),
        'vitamin-e': yup.number().required(),
        'vitamin-k': yup.number().required(),
        water: yup.number().required(),
      })
      .required(),
    nutriscore_data: yup
      .object({
        energy: yup.number().required(),
        fiber: yup.number().required(),
        fruits_vegetables_nuts_colza_walnut_olive_oils: yup.number().required(),
        is_beverage: yup.number().required(),
        proteins: yup.number().required(),
        'saturated-fat': yup.number().required(),
        sodium: yup.number().required(),
        sugars: yup.number().required(),
      })
      .required(),
    nutriscore_grade: yup.string(),
    nutriscore_score: yup.number(),
    vegetarian: yup.boolean(),
    vegan: yup.boolean(),
    pescatarian: yup.boolean(),
    image_url: yup.string(),
    ingredients: yup
      .array()
      .of(
        yup.object({
          id: yup.string().required(),
          text: yup.string().required(),
        }),
      )
      .required(),
    allergens_tags: yup.array().of(yup.string()).required(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    defaultValues: {
      ingredients: [],
      allergens_tags: [],
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  return (
    <>
      <ScrollView
        className={'bg-white dark:bg-background-900'}
        contentContainerClassName={'px-4 pb-24 pt-2'}
      >
        <Caption text='General Information' className='pt-0' />
        <View className={'gap-2'}>
          <FormInput
            control={control}
            name={'ean'}
            placeholder={'EAN'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.ean?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='EAN'
          />
          <FormInput
            control={control}
            name={'product_name'}
            placeholder={'Product Name'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.product_name?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Product Name'
          />
          <FormInput
            control={control}
            name={'quantity'}
            placeholder={'Quantity'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.quantity?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Quantity'
          />
          <FormInput
            control={control}
            name={'price'}
            placeholder={'Price'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.price?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Price'
          />
          <FormInput
            control={control}
            name={'brands'}
            placeholder={'Brands'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.brands?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Brands'
          />
        </View>
        <Caption text='Nutriments' className='pt-6' />
        <View className={'gap-2'}>
          <FormInput
            control={control}
            name={'nutriments.carbohydrates'}
            placeholder={'Carbohydrates'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriments?.carbohydrates?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Carbohydrates'
          />
          <FormInput
            control={control}
            name={'nutriments.carbohydrates_100g'}
            placeholder={'Carbohydrates 100g'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriments?.carbohydrates_100g?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Carbohydrates 100g'
          />
          <FormInput
            control={control}
            name={'nutriments.energy-kcal'}
            placeholder={'Energy kcal'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriments?.['energy-kcal']?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Energy kcal'
          />
          <FormInput
            control={control}
            name={'nutriments.energy-kcal_100g'}
            placeholder={'Energy kcal 100g'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriments?.['energy-kcal_100g']?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Energy kcal 100g'
          />
          <FormInput
            control={control}
            name={'nutriments.fat'}
            placeholder={'Fat'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriments?.fat?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Fat'
          />
          <FormInput
            control={control}
            name={'nutriments.fat_100g'}
            placeholder={'Fat 100g'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriments?.fat_100g?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Fat 100g'
          />
          <FormInput
            control={control}
            name={'nutriments.nova-group'}
            placeholder={'Nova Group'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriments?.['nova-group']?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Nova Group'
          />
          <FormInput
            control={control}
            name={'nutriments.nova-group_100g'}
            placeholder={'Nova Group 100g'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriments?.['nova-group_100g']?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Nova Group 100g'
          />
          <FormInput
            control={control}
            name={'nutriments.proteins'}
            placeholder={'Proteins'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriments?.proteins?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Proteins'
          />
          <FormInput
            control={control}
            name={'nutriments.proteins_100g'}
            placeholder={'Proteins 100g'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriments?.proteins_100g?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Proteins 100g'
          />
          <FormInput
            control={control}
            name={'nutriments.salt'}
            placeholder={'Salt'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriments?.salt?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Salt'
          />
          <FormInput
            control={control}
            name={'nutriments.salt_100g'}
            placeholder={'Salt 100g'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriments?.salt_100g?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Salt 100g'
          />
          <FormInput
            control={control}
            name={'nutriments.saturated-fat'}
            placeholder={'Saturated Fat'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriments?.['saturated-fat']?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Saturated Fat'
          />
          <FormInput
            control={control}
            name={'nutriments.saturated-fat_100g'}
            placeholder={'Saturated Fat 100g'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriments?.['saturated-fat_100g']?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Saturated Fat 100g'
          />
          <FormInput
            control={control}
            name={'nutriments.sodium'}
            placeholder={'Sodium'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriments?.sodium?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Sodium'
          />
          <FormInput
            control={control}
            name={'nutriments.sodium_100g'}
            placeholder={'Sodium 100g'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriments?.sodium_100g?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Sodium 100g'
          />
          <FormInput
            control={control}
            name={'nutriments.sugars'}
            placeholder={'Sugars'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriments?.sugars?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Sugars'
          />
          <FormInput
            control={control}
            name={'nutriments.sugars_100g'}
            placeholder={'Sugars 100g'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriments?.sugars_100g?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Sugars 100g'
          />
          <FormInput
            control={control}
            name={'nutriments.folates'}
            placeholder={'Folates'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriments?.folates?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Folates'
          />
          <FormInput
            control={control}
            name={'nutriments.niacin'}
            placeholder={'Niacin'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriments?.niacin?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Niacin'
          />
          <FormInput
            control={control}
            name={'nutriments.riboflavin'}
            placeholder={'Riboflavin'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriments?.riboflavin?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Riboflavin'
          />
          <FormInput
            control={control}
            name={'nutriments.thiamin'}
            placeholder={'Thiamin'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriments?.thiamin?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Thiamin'
          />
          <FormInput
            control={control}
            name={'nutriments.vitamin-a'}
            placeholder={'Vitamin A'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriments?.['vitamin-a']?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Vitamin A'
          />
          <FormInput
            control={control}
            name={'nutriments.vitamin-b6'}
            placeholder={'Vitamin B6'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriments?.['vitamin-b6']?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Vitamin B6'
          />
          <FormInput
            control={control}
            name={'nutriments.vitamin-b12'}
            placeholder={'Vitamin B12'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriments?.['vitamin-b12']?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Vitamin B12'
          />
          <FormInput
            control={control}
            name={'nutriments.vitamin-c'}
            placeholder={'Vitamin C'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriments?.['vitamin-c']?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Vitamin C'
          />
          <FormInput
            control={control}
            name={'nutriments.vitamin-d'}
            placeholder={'Vitamin D'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriments?.['vitamin-d']?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Vitamin D'
          />
          <FormInput
            control={control}
            name={'nutriments.vitamin-e'}
            placeholder={'Vitamin E'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriments?.['vitamin-e']?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Vitamin E'
          />
          <FormInput
            control={control}
            name={'nutriments.vitamin-k'}
            placeholder={'Vitamin K'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriments?.['vitamin-k']?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Vitamin K'
          />
          <FormInput
            control={control}
            name={'nutriments.water'}
            placeholder={'Water'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriments?.water?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Water'
          />
        </View>
        <Caption text='Nutriscore Data' className='pt-6' />
        <View className={'gap-2'}>
          <FormInput
            control={control}
            name={'nutriscore_data.energy'}
            placeholder={'Energy'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriscore_data?.energy?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Energy'
          />
          <FormInput
            control={control}
            name={'nutriscore_data.fiber'}
            placeholder={'Fiber'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriscore_data?.fiber?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Fiber'
          />
          <FormInput
            control={control}
            name={
              'nutriscore_data.fruits_vegetables_nuts_colza_walnut_olive_oils'
            }
            placeholder={'Fruits Vegetables Nuts Colza Walnut Olive Oils'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={
              errors.nutriscore_data
                ?.fruits_vegetables_nuts_colza_walnut_olive_oils?.message
            }
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Fruits Vegetables Nuts Colza Walnut Olive Oils'
          />
          <FormInput
            control={control}
            name={'nutriscore_data.is_beverage'}
            placeholder={'Is Beverage'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriscore_data?.is_beverage?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Is Beverage'
          />
          <FormInput
            control={control}
            name={'nutriscore_data.proteins'}
            placeholder={'Proteins'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriscore_data?.proteins?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Proteins'
          />
          <FormInput
            control={control}
            name={'nutriscore_data.saturated-fat'}
            placeholder={'Saturated Fat'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriscore_data?.['saturated-fat']?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Saturated Fat'
          />
          <FormInput
            control={control}
            name={'nutriscore_data.sodium'}
            placeholder={'Sodium'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriscore_data?.sodium?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Sodium'
          />
          <FormInput
            control={control}
            name={'nutriscore_data.sugars'}
            placeholder={'Sugars'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriscore_data?.sugars?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Sugars'
          />
        </View>
        <Caption text='Nutriscore' className='pt-6' />
        <View className={'gap-2'}>
          <FormInput
            control={control}
            name={'nutriscore_grade'}
            placeholder={'Nutriscore Grade'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriscore_grade?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Nutriscore Grade'
          />
          <FormInput
            control={control}
            name={'nutriscore_score'}
            placeholder={'Nutriscore Score'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.nutriscore_score?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Nutriscore Score'
          />
        </View>
        <Caption text='Other data' className='pt-6' />
        <View className={'gap-2'}>
          <FormInput
            control={control}
            name={'vegetarian'}
            placeholder={'Vegetarian'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.vegetarian?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Vegetarian'
          />
          <FormInput
            control={control}
            name={'vegan'}
            placeholder={'Vegan'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.vegan?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Vegan'
          />
          <FormInput
            control={control}
            name={'pescatarian'}
            placeholder={'Pescatarian'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.pescatarian?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Pescatarian'
          />
          <FormInput
            control={control}
            name={'image_url'}
            placeholder={'Image URL'}
            secureTextEntry={false}
            inputAccessoryViewID={inputAccessoryViewID}
            errorText={errors.image_url?.message}
            contentType={'none'}
            flex1={false}
            inModal={true}
            displayName='Image URL'
          />
        </View>
        <Caption text='Ingredients' className='pt-6' />
        <Text>{JSON.stringify(watch('ingredients'))}</Text>
        {watch('ingredients') &&
          watch('ingredients')?.map((ingredient, index) => (
            <View
              key={index}
              className={
                'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
              }
            >
              <Text className={'p-0 text-lg text-black dark:text-white'}>
                {ingredient?.text}
              </Text>
              <Ionicons
                name='close-circle'
                size={24}
                color={
                  colorScheme === 'light'
                    ? 'rgba(0 0 0 / 0.7)'
                    : 'rgba(255 255 255 / 0.7)'
                }
                onPress={() =>
                  // setPrefs({
                  //   ...prefs,
                  //   ingredients: prefs.ingredients.filter(
                  //     (i) => i !== ingredient,
                  //   ),
                  // })
                  {}
                }
              />
            </View>
          ))}
        <AutocompleteIngredietnsForm
          name='ingredients'
          control={control}
          colorScheme={'dark'}
        />
        <Caption text='Allergens' className='pt-6' />
        <LargeButton text='Submit' onPress={() => {}} />
      </ScrollView>
    </>
  );
}
