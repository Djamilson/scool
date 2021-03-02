import React, { InputHTMLAttributes, useState } from 'react';

import { useField } from '@unform/core';

import { Container, SelectBlock } from './styles';

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  containerStyle?: object;
  options: Array<{
    value: string;
    label: string;
  }>;
}

const Select: React.FC<SelectProps> = ({
  name,
  label,
  options,
  containerStyle = {},
  ...rest
}) => {
  const [isFocused] = useState(false);
  const [isFilled] = useState(false);

  const { error } = useField(name);

  return (
    <SelectBlock>
      <label htmlFor={name}>{label}</label>
      <Container
        style={containerStyle}
        isErrored={!!error}
        isFilled={isFilled}
        isFocused={isFocused}
      >
        <select defaultValue="" id={name} {...rest}>
          <option value="" disabled hidden>
            Selecione
          </option>
          {options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
      </Container>
    </SelectBlock>
  );
};

export default Select;
