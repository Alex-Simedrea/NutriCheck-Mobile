import React from 'react';
import { Controller } from 'react-hook-form';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import ingredients from '@/data/ingredients';

const AutocompleteIngredientsForm = ({
  control,
  name,
  colorScheme,
}: {
  control: any;
  name: string;
  colorScheme: string;
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <AutocompleteDropdown
          clearOnFocus={false}
          closeOnBlur={true}
          closeOnSubmit={false}
          direction='up'
          onSelectItem={(item) => {
            if (item) {
              onChange([...(value || []), {
                id: item.id,
                text: item.title
              }]);
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
      )}
    />
  );
};

export default AutocompleteIngredientsForm;
