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
  onChange: (stateSelected: any) => void;
  limit: number;
  name: string;
  containerStyle?: object;
  label: string;
  edit: boolean;
  stateSelect: IOption;
  selectedUf?: string | undefined;
}

const SelectAsyncState: React.FC<Props> = ({
  name,
  label,
  onChange,
  limit,
  selectedUf,
  stateSelect,
  edit,
  containerStyle = {},
}) => {
  const [isFocused] = useState(false);
  const [isFilled] = useState(false);

  const { error } = useField(name);
  const [option, setOption] = useState<IOption>({} as IOption);

  const loadOptions = useCallback(
    async (searchQuery: any, loadedOptions: any, { page }) => {
      const { data } = await api.get(`states`, {
        params: {
          q: `${searchQuery}`,
          limit,
          page,
        },
      });

      return {
        options: data.states,
        hasMore: data.states.length >= 1,
        additional: {
          page: searchQuery ? 2 : page + 1,
        },
      };
    },
    [limit],
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
    const INITIAL_STATE = {
      value: '0',
      label: 'Nome estado',
    };
    setOption(INITIAL_STATE);
  }, [selectedUf, setOption]);

  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (selectedUf !== '0') setDisabled(true);
  }, [setDisabled, selectedUf]);

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
          key={JSON.stringify(selectedUf)}
          value={edit === true ? stateSelect : option}
          loadOptions={loadOptions}
          getOptionValue={(myOption) => {
            return myOption.value;
          }}
          getOptionLabel={(myOption) => {
            return myOption.label;
          }}
          onChange={myOnChange}
          isSearchable
          placeholder="Nome do estado"
          additional={{ page: 1 }}
          noOptionsMessage={() => 'Nenhum estado encontrado!'}
        />
      </Container>
    </SelectBlock>
  );
};

export default SelectAsyncState;
