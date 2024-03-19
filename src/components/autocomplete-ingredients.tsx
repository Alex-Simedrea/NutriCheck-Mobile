import React, { useMemo } from 'react';
import ingredients from '@/data/ingredients';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { Preferences } from '@/api/preferences';

export default function AutocompleteIngredients({
  prefs,
  setPrefs,
  setSelectedItem,
  colorScheme,
}: {
  prefs: Preferences;
  setPrefs: (prefs: Preferences) => void;
  setSelectedItem: (item: any) => void;
  colorScheme: string;
}) {
  return useMemo(
    () => (
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
        onClear={() => setSelectedItem(null)}
        direction='up'
        onSelectItem={(item) => {
          if (item) {
            setPrefs({
              ...JSON.parse(JSON.stringify(prefs)),
              ingredients: prefs?.ingredients
                ? [...prefs?.ingredients, { id: item?.id, text: item?.title }]
                : [{ id: item?.id, text: item?.title }],
            });
          }
        }}
        inputContainerStyle={{
          backgroundColor: 'transparent',
        }}
        textInputProps={{
          placeholder: 'Search for an ingredient',
          placeholderTextColor: 'rgb(116,116,116)',
          style: {
            color: colorScheme === 'light' ? 'black' : 'white',
          },
        }}
        dataSet={ingredients}
      />
    ),
    [colorScheme, prefs, setSelectedItem]
  );
}
