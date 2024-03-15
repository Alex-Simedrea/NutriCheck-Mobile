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
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';

export default function EditPreferences() {
  const { colorScheme } = useColorScheme();

  const preferences = useGetPreferences();
  const updatePreferences = useUpdatePreferences();

  const [prefs, setPrefs] = useState<Preferences>(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (preferences.data) {
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
                  nutriments: { ...prefs.nutriments, nutriscore: 'a' },
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
                  nutriments: { ...prefs.nutriments, nutriscore: 'b' },
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
                  nutriments: { ...prefs.nutriments, nutriscore: 'c' },
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
                  nutriments: { ...prefs.nutriments, nutriscore: 'd' },
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
                  nutriments: { ...prefs.nutriments, nutriscore: 'e' },
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
        <YesNoDropdown prefs={prefs} setPrefs={setPrefs} keyName='salt' />
      </View>
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg text-black dark:text-white'}>
          Sugars in low quantity
        </Text>
        <YesNoDropdown prefs={prefs} setPrefs={setPrefs} keyName='sugars' />
      </View>
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg text-black dark:text-white'}>
          Fat in low quantity
        </Text>
        <YesNoDropdown prefs={prefs} setPrefs={setPrefs} keyName='fat' />
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
        />
      </View>

      <Caption text='Allergens' />
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg text-black dark:text-white'}>Gluten</Text>
        <YesNoDropdown prefs={prefs} setPrefs={setPrefs} keyName='gluten' />
      </View>
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg text-black dark:text-white'}>Milk</Text>
        <YesNoDropdown prefs={prefs} setPrefs={setPrefs} keyName='milk' />
      </View>
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg text-black dark:text-white'}>Eggs</Text>
        <YesNoDropdown prefs={prefs} setPrefs={setPrefs} keyName='eggs' />
      </View>
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg text-black dark:text-white'}>Nuts</Text>
        <YesNoDropdown prefs={prefs} setPrefs={setPrefs} keyName='nuts' />
      </View>
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg text-black dark:text-white'}>
          Peanuts
        </Text>
        <YesNoDropdown prefs={prefs} setPrefs={setPrefs} keyName='peanuts' />
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
          keyName='sesame-seeds'
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
        <YesNoDropdown prefs={prefs} setPrefs={setPrefs} keyName='soybeans' />
      </View>
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg text-black dark:text-white'}>Celery</Text>
        <YesNoDropdown prefs={prefs} setPrefs={setPrefs} keyName='celery' />
      </View>
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg text-black dark:text-white'}>
          Mustard
        </Text>
        <YesNoDropdown prefs={prefs} setPrefs={setPrefs} keyName='mustard' />
      </View>
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg text-black dark:text-white'}>Lupin</Text>
        <YesNoDropdown prefs={prefs} setPrefs={setPrefs} keyName='lupin' />
      </View>
      <View
        className={
          'flex-row justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 dark:border-b-white/10'
        }
      >
        <Text className={'p-0 text-lg text-black dark:text-white'}>Fish</Text>
        <YesNoDropdown prefs={prefs} setPrefs={setPrefs} keyName='fish' />
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
          keyName='crustaceans'
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
        <YesNoDropdown prefs={prefs} setPrefs={setPrefs} keyName='molluscs' />
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
          keyName='sulphur-dioxide-and-sulphites'
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
        <YesNoDropdown prefs={prefs} setPrefs={setPrefs} keyName='palm-oil' />
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
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
        initialValue={{ id: '2' }} // or just '2'
        onSelectItem={setSelectedItem}
        dataSet={[
          { id: '1', title: 'Alpha' },
          { id: '2', title: 'Beta' },
          { id: '3', title: 'Gamma' },
        ]}
      />
    </ScrollView>
  );
}
