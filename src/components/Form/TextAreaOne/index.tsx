import React, {
  InputHTMLAttributes,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { FiAlertCircle } from 'react-icons/fi';

import { useField } from '@unform/core';

import { colors } from '../../../styles';
import { Container, InputBlock, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  containerStyle?: object;
}

const InputTextAreaOne: React.FC<InputProps> = ({
  name,
  label,
  containerStyle = {},
  ...rest
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <InputBlock>
      <label htmlFor={name}>{label}</label>
      <Container
        style={containerStyle}
        isErrored={!!error}
        isFilled={isFilled}
        isFocused={isFocused}
      >
        <textarea
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          ref={inputRef}
          {...rest}
        />
        {error && (
          <Error title={error}>
            <FiAlertCircle color={colors.fourth} size={20} />
          </Error>
        )}
      </Container>
    </InputBlock>
  );
};

export default InputTextAreaOne;
