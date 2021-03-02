import React, { ChangeEvent } from 'react';
import { ActionMeta, OptionTypeBase, ValueType } from 'react-select';
import AsyncSelect from 'react-select/async';

import api from '../../../_services/api';
import { Container } from './styles';

interface Props {
  onChange?:
    | ((
        value: ValueType<OptionTypeBase, false>,
        action: ActionMeta<OptionTypeBase>,
      ) => void)
    | undefined;

  limit: number;
  page: number;
  name: string;
  label: string;
  selectedUf?: string;
  value?: ValueType<OptionTypeBase, false>;
}

const Select: React.FC<Props> = ({
  name,
  label,
  onChange,
  value,
  limit,
  page,
  selectedUf,
  ...rest
}) => {
  async function callApi(valueItem: string) {
    const data = api
      .get(`cities/${selectedUf}/select`, {
        params: {
          q: `${valueItem}`,
          limit,
          page,
        },
      })
      .then((res) => {
        return res.data;
      })
      .then((final) =>
        final.filter((i: any) =>
          i.label.toLowerCase().includes(valueItem.toLowerCase()),
        ),
      );

    return data;
  }

  return (
    <AsyncSelect
      defaultValue={value}
      classNamePrefix="react-select"
      id={name}
      {...rest}
      name={name}
      cacheOptions
      loadOptions={callApi}
      value={value}
      defaultOptions
      onChange={onChange}
      noOptionsMessage={() => 'Nenhum item selecionado'}
    />
  );
};

export default Select;
