import React, { useRef, useCallback } from 'react';
import { FiCheck } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useLoading } from '../../hooks/loading';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErros';
import Input from '../Form/Input';
import Modal from '../Modal';
import { Form } from './styles';

interface ITheme {
  id: string;
  theme: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handle: (theme: ITheme) => void;
  theme: ITheme;
}

const ModalEditTheme: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handle,
  theme,
}) => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { addLoading, removeLoading } = useLoading();

  const handleSubmit = useCallback(
    async (data: ITheme, { reset }) => {
      try {
        formRef.current?.setErrors({});

        addLoading({
          loading: true,
          description: 'Aguarde ...',
        });

        const schema = Yup.object().shape({
          theme: Yup.string().required('Tema obrigatório.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { id } = theme;

        const newTheme = {
          theme: data.theme,
          id,
        };

        handle(newTheme);

        reset();

        addToast({
          type: 'success',
          title: 'Informação editada!',
          description: 'Dados editado com sucesso!',
        });
        setIsOpen();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Falha ao tentar editar!',
          description: 'Ocorreu uma falha ao tentar editar, tente novamente!',
        });
      } finally {
        removeLoading();
      }
    },
    [addLoading, addToast, handle, removeLoading, setIsOpen, theme, formRef],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} initialData={theme} onSubmit={handleSubmit}>
        <fieldset>
          <legend>
            Editar
            <button type="submit">
              <span>
                <FiCheck />
              </span>
              <strong>Salvar</strong>
            </button>
          </legend>

          <Input placeholder="Tema" name="theme" icon={FiCheck} label="Tema" />
        </fieldset>
      </Form>
    </Modal>
  );
};

export default ModalEditTheme;
