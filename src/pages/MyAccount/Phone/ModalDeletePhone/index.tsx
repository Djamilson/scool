import React, { useCallback } from 'react';
import { FiCheckSquare, FiX } from 'react-icons/fi';

import Modal from '../../../../components/Modal';
import { useLoading } from '../../../../hooks/loading';
import { useToast } from '../../../../hooks/toast';
import {
  Container,
  IconBox,
  ButtonClose,
  ModalFooter,
  ButtonCancel,
  ButtonDelete,
} from './styles';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handlerDeletePhone: (phoneId: string) => void;
  phoneId: string;
}

const ModalDeletePhone: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handlerDeletePhone,
  phoneId,
}) => {
  const { addToast } = useToast();
  const { addLoading, removeLoading } = useLoading();

  const handle = useCallback(async () => {
    addLoading({
      loading: true,
      description: 'Aguarde ...',
    });

    try {
      handlerDeletePhone(phoneId);
      addToast({
        type: 'success',
        title: 'Sucesso!',
        description: 'Fone deletado com sucesso!',
      });

      setIsOpen();
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Falha ao deletar!',
        description: 'Não foi possível deletar o fone, tente novamente!',
      });
    } finally {
      removeLoading();
    }
  }, [
    handlerDeletePhone,
    setIsOpen,
    addLoading,
    addToast,
    removeLoading,
    phoneId,
  ]);

  function close(): void {
    setIsOpen();
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <div className="modal-confirm">
          <div className="modal-content">
            <div className="modal-header flex-column">
              <ButtonClose type="button" onClick={close}>
                <span>
                  <FiX size={24} />
                </span>
              </ButtonClose>
              <IconBox>
                <FiX size={24} />
              </IconBox>

              <h4 className="modal-title w-100">
                Tem certeza que deseja deletar?
              </h4>
            </div>
            <ModalFooter>
              <ButtonCancel type="button" onClick={close}>
                <span>
                  <FiX size={24} />
                </span>
                <strong>Cancelar</strong>
              </ButtonCancel>
              <ButtonDelete type="button" onClick={() => handle()}>
                <span>
                  <FiCheckSquare size={24} />
                </span>
                <strong>Delete</strong>
              </ButtonDelete>
            </ModalFooter>
          </div>
        </div>
      </Container>
    </Modal>
  );
};

export default ModalDeletePhone;
