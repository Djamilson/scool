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

interface IComment {
  id: string;
  comment: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handlerEditComment: (comment: IComment) => void;
  comment: IComment;
}

const ModalEditComment: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handlerEditComment,
  comment,
}) => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { addLoading, removeLoading } = useLoading();

  const handleSubmit = useCallback(
    async (data: IComment) => {
      try {
        formRef.current?.setErrors({});

        addLoading({
          loading: true,
          description: 'Aguarde ...',
        });

        const schema = Yup.object().shape({
          comment: Yup.string().required('Mensagem obrigatória.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        handlerEditComment({ comment: data.comment, id: comment.id });

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
    [
      addLoading,
      addToast,
      handlerEditComment,
      removeLoading,
      setIsOpen,
      comment.id,
    ],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} initialData={comment} onSubmit={handleSubmit}>
        <fieldset>
          <legend>
            Editando comentário
            <button type="submit">
              <span>
                <FiCheck />
              </span>
              <strong>Salvar</strong>
            </button>
          </legend>

          <InputTextArea
            placeholder="Escreva"
            name="comment"
            label="Comentário/Pergunta"
          />
        </fieldset>
      </Form>
    </Modal>
  );
};

export default ModalEditComment;
