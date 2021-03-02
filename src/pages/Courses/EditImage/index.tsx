import React, { useCallback, useRef, useEffect } from 'react';
import { FiCheck, FiArrowLeft } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Layout from '../../_layouts/auth';
import api from '../../../_services/api';
import warningIcon from '../../../assets/images/icons/warning.svg';
import NewFile from '../../../components/Form/File';
import { useLoading } from '../../../hooks/loading';
import { useToast } from '../../../hooks/toast';
import getValidationErros from '../../../utils/getValidationErros';
import { ContainerForm, GobackButton, SaveButton } from './styles';

interface ParamTypes {
  courseId: string;
}

interface FormData {
  file: File;
}

const NewCourse: React.FC = () => {
  const { courseId } = useParams<ParamTypes>();

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const { addLoading, removeLoading } = useLoading();

  const history = useHistory();

  useEffect(() => {
    async function searchCourse() {
      if (typeof courseId !== typeof undefined) {
        try {
          addLoading({
            loading: true,
            description: 'Aguarde ...',
          });

          const res = await api.get(`courses/${courseId}`);

          formRef.current?.setData(res.data);
        } catch (err) {
          addToast({
            type: 'error',
            title: 'Falha na busca,',
            description:
              'Ocorreu uma falha ao fazer a busca, tente volta para página anterior!',
          });
        } finally {
          removeLoading();
        }
      }
    }
    searchCourse();
  }, [addLoading, removeLoading, addToast, courseId]);

  const handleSubmit = useCallback(
    async (data_: FormData) => {
      try {
        formRef.current?.setErrors({});

        addLoading({
          loading: true,
          description: 'Aguarde ...',
        });

        const schema = Yup.object().shape({
          file: Yup.string().required('Preço obrigatório'),
        });

        await schema.validate(data_, {
          abortEarly: false,
        });

        const data = new FormData();

        if (typeof courseId !== typeof undefined) {
          data.append('id', courseId);
          data.append('file', data_.file);
          await api.patch('courses/image', data);

          history.goBack();
          addToast({
            type: 'success',
            title: 'Imagem editada!',
            description: 'Imagem editada com sucesso!',
          });
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Falha na edição!',
          description:
            'Ocorreu uma falha ao tentar editar a imagem, tente novamente!',
        });
      } finally {
        removeLoading();
      }
    },
    [addToast, addLoading, removeLoading, formRef, courseId, history],
  );

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <Layout>
      <ContainerForm>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <header>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Cadastra! <br />
            </p>

            <GobackButton type="button" onClick={() => goBack()}>
              <span>
                <FiArrowLeft />
              </span>
              <strong>Voltar</strong>
            </GobackButton>

            <SaveButton type="submit">
              <span>
                <FiCheck />
              </span>
              <strong>Salvar</strong>
            </SaveButton>
          </header>

          <fieldset>
            <legend>Nova image</legend>
            <NewFile name="file" />
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
            </p>
          </footer>
        </Form>
      </ContainerForm>
    </Layout>
  );
};

export default NewCourse;
