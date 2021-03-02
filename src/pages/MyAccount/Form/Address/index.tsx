import React from 'react';
import { MdCheck } from 'react-icons/md';

import { ScheduleItem } from '../../../_layouts/auth/styles';
import Input from '../../../../components/Form/Input';
import * as masks from '../../../../utils/masks';
import SelectAsyncCity from './SelectAsyncCity';
import SelectAsyncState from './SelectAsyncState';
import { AddressItem, InputNumber } from './styles';

interface IDataOption {
  value: string;
  label: string;
}

interface Props {
  handleSelectCity: (citySelected: any) => void;
  handleSelectState: (citySelected: any) => void;
  citySelect: IDataOption;
  edit: boolean;
  stateSelectOption: IDataOption;
}

const Address: React.FC<Props> = ({
  stateSelectOption,
  handleSelectState,
  handleSelectCity,
  edit,
  citySelect,
}) => {
  return (
    <>
      <fieldset>
        <legend>Seu endereço</legend>
        <AddressItem>
          <Input
            placeholder="Rua/quadra"
            name="street"
            icon={MdCheck}
            label="Rua/quadra"
          />

          <InputNumber
            id="idNumber"
            name="number"
            icon={MdCheck}
            placeholder="Número"
            label="Número Lote/Casa"
            onChange={masks.numberByMask.onChange}
          />
        </AddressItem>
        <Input
          placeholder="Complemento"
          name="complement"
          icon={MdCheck}
          label="Complemento"
        />
        <ScheduleItem>
          <Input
            placeholder="Bairro"
            name="neighborhood"
            icon={MdCheck}
            label="Bairro"
          />

          <Input
            id="zip_code"
            name="zip_code"
            icon={MdCheck}
            label="CEP"
            placeholder="Ex: 00.000-000"
            onChange={masks.cepByMask.onChange}
          />
        </ScheduleItem>
      </fieldset>

      <fieldset>
        <legend>Localidade</legend>
        <ScheduleItem>
          <SelectAsyncState
            edit={edit}
            stateSelect={stateSelectOption}
            onChange={handleSelectState}
            limit={12}
            name="state"
            label="Estado"
          />

          <SelectAsyncCity
            edit={edit}
            stateSelectOption={stateSelectOption}
            citySelect={citySelect}
            onChange={handleSelectCity}
            limit={12}
            name="city"
            label="Cidade"
          />
        </ScheduleItem>
      </fieldset>
    </>
  );
};

export default Address;
