import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';

import Input from '../../../../components/Form/Input';
import * as masks from '../../../../utils/masks';

const Phone: React.FC = () => {
  return (
    <fieldset>
      <legend>Seu fone</legend>

      <Input
        id="phone"
        name="phone"
        icon={FaPhoneAlt}
        label="Fone"
        placeholder="Fone"
        onChange={masks.phoneMask.onChange}
      />
    </fieldset>
  );
};

export default Phone;
