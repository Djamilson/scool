import React, { useRef, useCallback } from 'react';
import { FiCheck } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useLoading } from '../../hooks/loading';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErros';
import InputTextArea from '../Form/InputTextArea';
import Modal from '../Modal';
import { Form } from './styles';

interface IUser {
  id: string;
  name: string;
  avatar_url: string;
}
interface IAnswer {
  id: string;
  comment_answer: string;
  created_at: string;
  user: IUser;
  comment_id: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handlerEditAnswer: (
    answer: Omit<IAnswer, 'created_at' | 'user' | 'comment_id'>,
  ) => void;
  answer: IAnswer;
}

const ModalEditAnswer: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handlerEditAnswer,
  answer,
}) => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { addLoading, removeLoading } = useLoading();

  const handleSubmit = useCallback(
    async (data: IAnswer) => {
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

        const { comment_answer, id } = data;

        handlerEditAnswer({
          comment_answer,
          id,
        });

        addToast({
          type: 'success',
          title: 'Informações editada!',
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
          title: 'Falha ao tentar enviar a resposta!',
          description:
            'Ocorreu uma falha ao tentar enviar a resposta, tente novamente!',
        });
      } finally {
        removeLoading();
      }
    },
    [addLoading, addToast, handlerEditAnswer, removeLoading, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} initialData={answer} onSubmit={handleSubmit}>
        <fieldset>
          <legend>
            Editando sua resposta
            <button type="submit">
              <span>
                <FiCheck />
              </span>
              <strong>Salvar</strong>
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

export default ModalEditAnswer;
