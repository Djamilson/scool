import React, { useRef, useCallback, useEffect } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Modal from '../../../../components/Modal';
import { useLoading } from '../../../../hooks/loading';
import { useToast } from '../../../../hooks/toast';
import getValidationErros from '../../../../utils/getValidationErros';
import * as masks from '../../../../utils/masks';
import { schemaValidationPhone } from '../../../../utils/schema';
import Phone from '../../Form/Phone';
import { Container, Form } from './styles';

interface IPhone {
  id: string;
  person_id: string;
  phone: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handlerEditPhone: (number: string) => Promise<IPhone | undefined>;
  phone: IPhone;
}

const ModalEditPhone: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handlerEditPhone,
  phone: myPhone,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { addLoading, removeLoading } = useLoading();

  const loadPhone = useCallback(() => {
    const { id, phone, person_id } = myPhone;

    formRef.current?.setData({ phone: masks.phoneMask.maskDefault(phone) });
    formRef.current?.setData({ id });
    formRef.current?.setData({ person_id });
  }, [myPhone, formRef]);

  useEffect(() => {
    loadPhone();
  }, [loadPhone]);

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

        const myRetorno = await handlerEditPhone(data.phone);

        if (typeof myRetorno !== typeof undefined) {
          addToast({
            type: 'success',
            title: 'Fone editado!',
            description: 'Fone editado com sucesso!',
          });
        }
        setIsOpen();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Falha na edição!',
          description:
            'Ocorreu uma falha ao tentar fazer a edição, tente novamente!',
        });
      } finally {
        removeLoading();
      }
    },
    [addLoading, addToast, removeLoading, handlerEditPhone, setIsOpen],
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

export default ModalEditPhone;
