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

interface IDiscipline {
  id: string;
  name: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handle: (discipline: IDiscipline) => void;
  discipline: IDiscipline;
}

const ModalEditAnswer: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handle,
  discipline,
}) => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { addLoading, removeLoading } = useLoading();

  const handleSubmit = useCallback(
    async (data: IDiscipline, { reset }) => {
      try {
        formRef.current?.setErrors({});

        addLoading({
          loading: true,
          description: 'Aguarde ...',
        });

        const schema = Yup.object().shape({
          name: Yup.string().required('Discipline obrigatória.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { name } = data;
        const { id } = discipline;

        const newDiscipline = {
          name,
          id,
        };

        handle(newDiscipline);
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
    [
      addLoading,
      addToast,
      handle,
      removeLoading,
      setIsOpen,
      formRef,
      discipline,
    ],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} initialData={discipline} onSubmit={handleSubmit}>
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

          <Input
            placeholder="Disciplina"
            name="name"
            icon={FiCheck}
            label="Disciplina"
          />
        </fieldset>
      </Form>
    </Modal>
  );
};

export default ModalEditAnswer;
