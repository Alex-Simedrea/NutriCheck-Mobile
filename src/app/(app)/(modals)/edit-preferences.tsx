import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import {
  Preferences,
  useGetPreferences,
  useUpdatePreferences,
} from '@/api/preferences';
import LoadingView from '@/components/loading-view';
import Toast from 'react-native-toast-message';
import RetryView from '@/components/retry-view';
import Caption from '@/components/caption';
import * as Menu from 'zeego/dropdown-menu';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import YesNoDropdown from '@/components/yes-no-dropdown';
import AutocompleteIngredients from '@/components/autocomplete-ingredients';
import LargeButton from '@/components/large-button';
import { router } from 'expo-router';

export default function EditPreferences() {
  const { colorScheme } = useColorScheme();

  const preferences = useGetPreferences();
  const updatePreferences = useUpdatePreferences();

  const [prefs, setPrefs] = useState<Preferences>(null);
  const [ok, setOk] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (preferences.data && !ok) {
      setOk(true);
      setPrefs(preferences.data);
    }
  }, [preferences.data]);

  if (preferences.isPending) {
    return <LoadingView />;
  }

  if (preferences.isError) {
    Toast.show({
      type: 'customToast',
      text1: 'Error',
      text2: preferences.error.message,
      position: 'bottom',
      visibilityTime: 8000,
    });
    return <RetryView refetch={preferences.refetch} />;
  }

  if (updatePreferences.isError) {
    Toast.show({
      type: 'customToast',
      text1: 'Error',
      text2: updatePreferences.error.message,
      position: 'bottom',
      visibilityTime: 8000,
    });
  }

  return (
    <ScrollView
      className={'flex-1 bg-white dark:bg-background-900'}
      contentContainerClassName={'px-4 pb-20'}
    >
      <Caption text='Nutriments' />
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg text-black dark:text-white'}>
          Nutriscore
        </Text>
        <Menu.Root>
          <Menu.Trigger>
            <View className={'flex-row gap-1'}>
              <Text className={'p-0 text-lg text-black/70 dark:text-white/70'}>
                {prefs?.nutriments?.nutriscore
                  ? prefs.nutriments.nutriscore.toUpperCase()
                  : 'Choose'}
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
              key='a'
              onSelect={() =>
                setPrefs({
                  ...prefs,
                  nutriments: { ...prefs?.nutriments, nutriscore: 'a' },
                })
              }
            >
              A
            </Menu.Item>
            <Menu.Item
              key='b'
              onSelect={() =>
                setPrefs({
                  ...prefs,
                  nutriments: { ...prefs?.nutriments, nutriscore: 'b' },
                })
              }
            >
              B
            </Menu.Item>
            <Menu.Item
              key='c'
              onSelect={() =>
                setPrefs({
                  ...prefs,
                  nutriments: { ...prefs?.nutriments, nutriscore: 'c' },
                })
              }
            >
              C
            </Menu.Item>
            <Menu.Item
              key='d'
              onSelect={() =>
                setPrefs({
                  ...prefs,
                  nutriments: { ...prefs?.nutriments, nutriscore: 'd' },
                })
              }
            >
              D
            </Menu.Item>
            <Menu.Item
              key='e'
              onSelect={() =>
                setPrefs({
                  ...prefs,
                  nutriments: { ...prefs?.nutriments, nutriscore: 'e' },
                })
              }
            >
              E
            </Menu.Item>
          </Menu.Content>
        </Menu.Root>
      </View>
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg text-black dark:text-white'}>
          Salt in low quantity
        </Text>
        <YesNoDropdown prefs={prefs} setPrefs={setPrefs} keyName='salt' objName='nutriments' />
      </View>
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg text-black dark:text-white'}>
          Sugars in low quantity
        </Text>
        <YesNoDropdown prefs={prefs} setPrefs={setPrefs} keyName='sugars' objName='nutriments' />
      </View>
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg text-black dark:text-white'}>
          Fat in low quantity
        </Text>
        <YesNoDropdown prefs={prefs} setPrefs={setPrefs} keyName='fat' objName='nutriments' />
      </View>
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg text-black dark:text-white'}>
          Saturated fat in low quantity
        </Text>
        <YesNoDropdown
          prefs={prefs}
          setPrefs={setPrefs}
          keyName='saturated-fat'
          objName='nutriments'
        />
      </View>

      <Caption text='Ingredients' />
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg text-black dark:text-white'}>
          Palm oil
        </Text>
        <YesNoDropdown prefs={prefs} setPrefs={setPrefs} keyName='palm-oil' objName='nutriments' />
      </View>
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg text-black dark:text-white'}>Diet</Text>
        <Menu.Root>
          <Menu.Trigger>
            <View className={'flex-row gap-1'}>
              <Text className={'p-0 text-lg text-black/70 dark:text-white/70'}>
                {prefs?.pescatarian
                  ? 'Pescatarian'
                  : prefs?.vegetarian
                    ? 'Vegetarian'
                    : prefs?.vegan
                      ? 'Vegan'
                      : 'None'}
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
              key='vegetarian'
              onSelect={() =>
                setPrefs({
                  ...prefs,
                  vegetarian: true,
                  vegan: false,
                  pescatarian: false,
                })
              }
            >
              Vegetarian
            </Menu.Item>
            <Menu.Item
              key='vegan'
              onSelect={() =>
                setPrefs({
                  ...prefs,
                  vegan: true,
                  vegetarian: false,
                  pescatarian: false,
                })
              }
            >
              Vegan
            </Menu.Item>
            <Menu.Item
              key='pescatarian'
              onSelect={() =>
                setPrefs({
                  ...prefs,
                  pescatarian: true,
                  vegan: false,
                  vegetarian: false,
                })
              }
            >
              Pescatarian
            </Menu.Item>
            <Menu.Item
              key='none'
              onSelect={() =>
                setPrefs({
                  ...prefs,
                  vegan: false,
                  vegetarian: false,
                  pescatarian: false,
                })
              }
            >
              None
            </Menu.Item>
          </Menu.Content>
        </Menu.Root>
      </View>
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg font-bold text-black dark:text-white'}>
          Restricted ingredients
        </Text>
      </View>
      {prefs?.ingredients &&
        prefs?.ingredients?.map((ingredient, index) => (
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
                setPrefs({
                  ...prefs,
                  ingredients: prefs.ingredients.filter(
                    (i) => i !== ingredient,
                  ),
                })
              }
            />
          </View>
        ))}
      <AutocompleteIngredients
        prefs={prefs}
        setPrefs={setPrefs}
        setSelectedItem={setSelectedItem}
        colorScheme={colorScheme}
      />

      <Caption text='Allergens' />
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg text-black dark:text-white'}>Gluten</Text>
        <YesNoDropdown prefs={prefs} setPrefs={setPrefs} keyName='en:gluten' objName='allergens' />
      </View>
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg text-black dark:text-white'}>Milk</Text>
        <YesNoDropdown prefs={prefs} setPrefs={setPrefs} keyName='en:milk' objName='allergens' />
      </View>
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg text-black dark:text-white'}>Eggs</Text>
        <YesNoDropdown prefs={prefs} setPrefs={setPrefs} keyName='en:eggs' objName='allergens' />
      </View>
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg text-black dark:text-white'}>Nuts</Text>
        <YesNoDropdown prefs={prefs} setPrefs={setPrefs} keyName='en:nuts' objName='allergens' />
      </View>
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg text-black dark:text-white'}>
          Peanuts
        </Text>
        <YesNoDropdown prefs={prefs} setPrefs={setPrefs} keyName='en:peanuts' objName='allergens' />
      </View>
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg text-black dark:text-white'}>
          Sesame seeds
        </Text>
        <YesNoDropdown
          prefs={prefs}
          setPrefs={setPrefs}
          keyName='en:sesame-seeds'
          objName='allergens'
        />
      </View>
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg text-black dark:text-white'}>
          Soybeans
        </Text>
        <YesNoDropdown prefs={prefs} setPrefs={setPrefs} keyName='en:soybeans' objName='allergens' />
      </View>
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg text-black dark:text-white'}>Celery</Text>
        <YesNoDropdown prefs={prefs} setPrefs={setPrefs} keyName='en:celery' objName='allergens' />
      </View>
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg text-black dark:text-white'}>
          Mustard
        </Text>
        <YesNoDropdown prefs={prefs} setPrefs={setPrefs} keyName='en:mustard' objName='allergens' />
      </View>
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg text-black dark:text-white'}>Lupin</Text>
        <YesNoDropdown prefs={prefs} setPrefs={setPrefs} keyName='en:lupin' objName='allergens' />
      </View>
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg text-black dark:text-white'}>Fish</Text>
        <YesNoDropdown prefs={prefs} setPrefs={setPrefs} keyName='en:fish' objName='allergens' />
      </View>
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg text-black dark:text-white'}>
          Crustaceans
        </Text>
        <YesNoDropdown
          prefs={prefs}
          setPrefs={setPrefs}
          keyName='en:crustaceans'
          objName='allergens'
        />
      </View>
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg text-black dark:text-white'}>
          Molluscs
        </Text>
        <YesNoDropdown prefs={prefs} setPrefs={setPrefs} keyName='en:molluscs' objName='allergens' />
      </View>
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg text-black dark:text-white'}>
          Sulphur dioxide and sulphites
        </Text>
        <YesNoDropdown
          prefs={prefs}
          setPrefs={setPrefs}
          keyName='en:sulphur-dioxide-and-sulphites'
          objName='allergens'
        />
      </View>
      <LargeButton className='pt-10' text='Save' onPress={() => { updatePreferences.mutate(prefs); router.back() }} />
    </ScrollView>
  );
}
