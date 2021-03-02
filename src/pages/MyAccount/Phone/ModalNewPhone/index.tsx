import React, { useRef, useCallback } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Modal from '../../../../components/Modal';
import { useLoading } from '../../../../hooks/loading';
import { useToast } from '../../../../hooks/toast';
import getValidationErros from '../../../../utils/getValidationErros';
import { schemaValidationPhone } from '../../../../utils/schema';
import Phone from '../../Form/Phone';
import { Container, Form } from './styles';

interface IPhone {
  phone: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handlerNewPhone: (phone: IPhone) => void;
}

const ModalNewPhone: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handlerNewPhone,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { addLoading, removeLoading } = useLoading();

  const handleSubmit = useCallback(
    async (data: IPhone) => {
      try {
        formRef.current?.setErrors({});

        addLoading({
          loading: true,
          description: 'Aguarde ...',
        });

        const schema = Yup.object().shape({
          phone: schemaValidationPhone,
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        handlerNewPhone(data);

        setIsOpen();

        addToast({
          type: 'success',
          title: 'Fone cadastrado!',
          description: 'Fone inserido com sucesso!',
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
    [addLoading, addToast, removeLoading, handlerNewPhone, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <fieldset>
            <legend>
              Cadastra o novo fone
              <button type="submit">
                <span>
                  <FiCheckSquare size={24} />
                </span>
                <strong>Salvar</strong>
              </button>
            </legend>

            <Phone />
          </fieldset>
        </Form>
      </Container>
    </Modal>
  );
};

export default ModalNewPhone;
