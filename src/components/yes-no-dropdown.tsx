import * as Menu from 'zeego/dropdown-menu';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useColorScheme } from 'nativewind';
import { Preferences } from '@/api/preferences';

export default function YesNoDropdown({
  prefs,
  setPrefs,
  keyName,
}: {
  prefs: Preferences;
  setPrefs: (prefs: Preferences) => void;
  keyName: string;
}) {
  const { colorScheme } = useColorScheme();
  return (
    <Menu.Root>
      <Menu.Trigger>
        <View className={'flex-row gap-1'}>
          <Text className={'p-0 text-lg text-black/70 dark:text-white/70'}>
            {prefs?.nutriments?.[keyName] ? 'Yes' : 'No'}
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
          key='yes'
          onSelect={() =>
            setPrefs({
              ...prefs,
              nutriments: { ...prefs?.nutriments, [keyName]: true },
            })
          }
        >
          Yes
        </Menu.Item>
        <Menu.Item
          key='no'
          onSelect={() =>
            setPrefs({
              ...prefs,
              nutriments: { ...prefs?.nutriments, [keyName]: false },
            })
          }
        >
          No
        </Menu.Item>
      </Menu.Content>
    </Menu.Root>
  );
}
