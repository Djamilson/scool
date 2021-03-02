import React, { InputHTMLAttributes } from 'react';

import { TextareaBlock } from './styles';

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
}

const Textarea: React.FC<TextAreaProps> = ({ name, label, ...rest }) => {
  return (
    <TextareaBlock>
      <label htmlFor={name}>{label}</label>
      <textarea id={name} {...rest} />
    </TextareaBlock>
  );
};

export default Textarea;
