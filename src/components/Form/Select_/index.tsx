import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  SelectHTMLAttributes,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from 'react-select';

import { useField } from '@unform/core';

import { SelectBlock, Container, Error } from './styles';

interface PropsSelect extends SelectProps<OptionTypeBase> {
  name: string;
}

interface InputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  icon: React.ComponentType<IconBaseProps>;
  label?: string;
  containerStyle?: object;
}

type ComponentProps = PropsSelect & InputProps;

const Select: React.FC<ComponentProps> = (props) => {
  const { name, ...rest } = props as PropsSelect;
  const { icon: Icon, label, containerStyle = {} } = props as InputProps;

  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
      setValue: (ref, value) => {
        ref.select.setValue(value || null);
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  const style = {
    control: (base: any) => ({
      ...base,
      border: 0,
      boxShadow: 'none',
    }),
  };

  return (
    <SelectBlock>
      <label htmlFor={name}>{label}</label>

      <Container
        isErrored={!!error}
        isFocused={isFocused}
        style={containerStyle}
        isFilled={isFilled}
      >
        {Icon && <Icon size={20} />}
        <ReactSelect
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          ref={selectRef}
          styles={style}
          {...rest}
        />
        {error && (
          <Error title={error}>
            <FiAlertCircle color="#c53030" size={20} />
          </Error>
        )}
      </Container>
    </SelectBlock>
  );
};

export default Select;
