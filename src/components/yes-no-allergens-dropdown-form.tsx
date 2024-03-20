import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Menu from 'zeego/dropdown-menu';
import { Controller } from 'react-hook-form';
import { useColorScheme } from 'nativewind';

export default function YesNoAllergensDropdownForm({
  control,
  id,
}: {
  control: any;
  id: string;
}) {
  const { colorScheme } = useColorScheme();
  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <Menu.Root>
          <Menu.Trigger>
            <View className={'flex-row gap-1'}>
              <Text className={'p-0 text-lg text-black/70 dark:text-white/70'}>
                {value?.includes(id) ? 'Yes' : 'No'}
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
              onSelect={() => {
                onChange([...(value || []), id]);
              }}
            >
              Yes
            </Menu.Item>
            <Menu.Item
              key='no'
              onSelect={() => {
                onChange(value.filter((item: string) => item !== id));
              }}
            >
              No
            </Menu.Item>
          </Menu.Content>
        </Menu.Root>
      )}
      name={'allergens_tags'}
      control={control}
    />
  );
}
