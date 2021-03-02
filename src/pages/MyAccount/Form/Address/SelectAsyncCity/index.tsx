import React, { useCallback, useEffect, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';

import { useField } from '@unform/core';

import api from '../../../../../_services/api';
import { Container, SelectBlock } from './styles';

interface IOption {
  value: string;
  label: string;
}
interface Props {
  onChange: (citySelected: any) => void;
  limit: number;
  name: string;
  containerStyle?: object;
  label: string;
  edit: boolean;
  citySelect: IOption;
  stateSelectOption: IOption;
}

const SelectAsyncCity: React.FC<Props> = ({
  name,
  label,
  onChange,
  limit,
  stateSelectOption,
  citySelect,
  edit,
  containerStyle = {},
}) => {
  const [isFocused] = useState(false);
  const [isFilled] = useState(false);

  const { error } = useField(name);
  const [option, setOption] = useState<IOption>({} as IOption);

  const loadOptions = useCallback(
    async (searchQuery: any, loadedOptions: any, { page }) => {
      const { value } = stateSelectOption;
      const { data } = await api.get(`cities/${value}/select`, {
        params: {
          q: `${searchQuery}`,
          limit,
          page,
        },
      });

      return {
        options: data.cities,
        hasMore: data.cities.length >= 1,
        additional: {
          page: searchQuery ? 2 : page + 1,
        },
      };
    },
    [stateSelectOption, limit],
  );

  const myOnChange = useCallback(
    (selectOption: any) => {
      if (typeof selectOption !== typeof undefined) {
        onChange(selectOption);
      }

      setOption(selectOption);

      return selectOption;
    },
    [setOption, onChange],
  );

  useEffect(() => {
    const INITIAL_CITY = {
      value: '0',
      label: 'Nome cidade',
    };
    setOption(INITIAL_CITY);
  }, [stateSelectOption, setOption]);

  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (stateSelectOption.value !== '0') setDisabled(true);
  }, [setDisabled, stateSelectOption]);

  return (
    <SelectBlock>
      <label htmlFor={name}>{label}</label>
      <Container
        style={containerStyle}
        isErrored={!!error}
        isFilled={isFilled}
        isFocused={isFocused}
        disabled={disabled}
      >
        <AsyncPaginate
          key={JSON.stringify(stateSelectOption.value)}
          value={edit === true ? citySelect : option}
          loadOptions={loadOptions}
          getOptionValue={(myOption) => {
            return myOption.value;
          }}
          getOptionLabel={(myOption) => {
            return myOption.label;
          }}
          onChange={myOnChange}
          isSearchable
          placeholder="Seleciona a cidade"
          additional={{ page: 1 }}
          noOptionsMessage={() => 'Nenhuma cidade encontrada!'}
        />
      </Container>
    </SelectBlock>
  );
};

export default SelectAsyncCity;
