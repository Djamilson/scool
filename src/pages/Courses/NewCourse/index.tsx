import React, { useCallback, useState, useRef, useEffect } from 'react';
import { FiCheck, FiArrowLeft } from 'react-icons/fi';
import { useHistory, useParams } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Layout from '../../_layouts/auth';
import { Footer, Form } from '../../_layouts/auth/styles';
import { Header, GroupButton, GobackButton } from '../../_layouts/auth/styles';
import api from '../../../_services/api';
import Button from '../../../components/Button';
import NewFile from '../../../components/Form/File';
import Input from '../../../components/Form/Input';
import { useLoading } from '../../../hooks/loading';
import { useToast } from '../../../hooks/toast';
import getValidationErros from '../../../utils/getValidationErros';
import * as masks from '../../../utils/masks';
import { schemaValidationCurrency } from '../../../utils/schema';
import { InputPrice } from './styles';

interface ParamTypes {
  courseId: string;
}

interface FormData {
  name: string;
  price: number;
  file: File;
}

const NewCourse: React.FC = () => {
  const { courseId } = useParams<ParamTypes>();

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const { addLoading, removeLoading } = useLoading();
  const history = useHistory();
  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const [image, setImage] = useState({ preview: '' });

  useEffect(() => {
    async function searchCourse() {
      if (typeof courseId !== typeof undefined) {
        try {
          addLoading({
            loading: true,
            description: 'Aguarde ...',
          });

          const res = await api.get(`courses/${courseId}`);

          setImage({
            preview: res.data.image_url,
          });

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
  }, [addLoading, addToast, removeLoading, courseId]);

  const handleSubmit = useCallback(
    async (data_: FormData, { reset }) => {
      try {
        formRef.current?.setErrors({});

        addLoading({
          loading: true,
          description: 'Aguarde ...',
        });

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
        });

        await schema.validate(data_, {
          abortEarly: false,
        });

        const data = new FormData();

        data.append('name', data_.name);
        data.append('price', '1.00');
        data.append('stock', String('1'));

        if (typeof courseId !== typeof undefined) {
          await api.put(`courses`, { ...data_, id: courseId });

          addToast({
            type: 'success',
            title: 'Curso editado!',
            description: 'Dados editado com sucesso!',
          });

          history.goBack();
        } else {
          data.append('file', data_.file);

          await api.post('courses/new', data);
          reset();

          addToast({
            type: 'success',
            title: 'Curso cadastrado!',
            description: 'Dados inseridos com sucesso!',
          });
        }
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
    [addToast, addLoading, removeLoading, formRef, courseId, history],
  );

  return (
    <Layout>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Header>
          <h2>Cadastrar!</h2>

          <GroupButton>
            <GobackButton type="button" onClick={() => goBack()}>
              <span>
                <FiArrowLeft />
              </span>
              <strong>Voltar</strong>
            </GobackButton>

            <Button type="submit">
              <span>
                <FiCheck />
              </span>
              <strong>Salvar</strong>
            </Button>
          </GroupButton>
        </Header>

        <fieldset>
          <legend>Dados do curso</legend>
          <Input placeholder="Curso" name="name" icon={FiCheck} label="Curso" />
        </fieldset>
        {!image?.preview && (
          <fieldset>
            <legend>Selecione a imagem</legend>
            <NewFile name="file" />
          </fieldset>
        )}
      </Form>
      <Footer />
    </Layout>
  );
};

export default NewCourse;
