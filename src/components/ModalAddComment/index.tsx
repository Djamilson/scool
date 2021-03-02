import React, { useRef, useCallback } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useLoading } from '../../hooks/loading';
import { useToast } from '../../hooks/toast';
import getValidationErros from '../../utils/getValidationErros';
import InputTextArea from '../Form/InputTextArea';
import Modal from '../Modal';
import { Container, Form } from './styles';

interface IComment {
  comment: string;
  movie_id: string;
}
interface ICreateCommentData {
  comment: string;
  movie_id: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handlerAddComment: (comment: IComment) => void;
}

const ModalAddComment: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handlerAddComment,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { addLoading, removeLoading } = useLoading();

  const handleSubmit = useCallback(
    async (data: ICreateCommentData) => {
      try {
        formRef.current?.setErrors({});

        addLoading({
          loading: true,
          description: 'Aguarde ...',
        });

        const schema = Yup.object().shape({
          comment: Yup.string().required('Comentário obrigatória.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        handlerAddComment(data);

        setIsOpen();

        addToast({
          type: 'success',
          title: 'Informações cadastrada!',
          description: 'Comentário inserido com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Falha no cadastro!',
          description:
            'Ocorreu uma falha ao tentar fazer o cadastro, tente novamente!',
        });
      } finally {
        removeLoading();
      }
    },
    [addLoading, addToast, removeLoading, handlerAddComment, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <fieldset>
            <legend>
              Faça sua pergunta
              <button type="submit">
                <span>
                  <FiCheckSquare size={24} />
                </span>
                <strong>Salvar pergunta</strong>
              </button>
            </legend>

            <InputTextArea
              placeholder="Escreva"
              name="comment"
              label="Comentário/Pergunta"
            />
          </fieldset>
        </Form>
      </Container>
    </Modal>
  );
};

export default ModalAddComment;
