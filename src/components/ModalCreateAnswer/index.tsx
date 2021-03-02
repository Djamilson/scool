import React, { useRef, useCallback } from 'react';
import { FiCheck } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useLoading } from '../../hooks/loading';
import { useToast } from '../../hooks/toast';
import getValidationErros from '../../utils/getValidationErros';
import InputTextArea from '../Form/InputTextArea';
import Modal from '../Modal';
import { Form } from './styles';

interface ICreate {
  comment_answer: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handlerCreateAnswer: (answer: ICreate) => void;
}

const ModalCreateAnswer: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handlerCreateAnswer,
}) => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { addLoading, removeLoading } = useLoading();

  const handleSubmit = useCallback(
    async (data: ICreate) => {
      try {
        formRef.current?.setErrors({});

        addLoading({
          loading: true,
          description: 'Aguarde ...',
        });

        const schema = Yup.object().shape({
          comment_answer: Yup.string().required('Mensagem obrigatória.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        handlerCreateAnswer(data);

        addToast({
          type: 'success',
          title: 'Informações cadastrada!',
          description: 'Dados inseridos com sucesso!',
        });
        setIsOpen();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Falha ao tentar enviar a resposta!',
          description:
            'Ocorreu uma falha ao tentar enviar a resposta, tente novamente!',
        });
      } finally {
        removeLoading();
      }
    },
    [addLoading, addToast, handlerCreateAnswer, removeLoading, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <fieldset>
          <legend>
            Faça sua resposta
            <button type="submit">
              <span>
                <FiCheck />
              </span>
              <strong>Salvar resposta</strong>
            </button>
          </legend>

          <InputTextArea
            placeholder="Escreva"
            name="comment_answer"
            label="Resposta"
          />
        </fieldset>
      </Form>
    </Modal>
  );
};

export default ModalCreateAnswer;
