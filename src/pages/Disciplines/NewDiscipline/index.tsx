import React, { useCallback, useRef, useEffect } from 'react';
import { FiCheck, FiArrowLeft } from 'react-icons/fi';
import { useHistory, useParams } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Layout from '../../_layouts/auth';
import { Form, GroupButton, Header } from '../../_layouts/auth/styles';
import { ScheduleItem, GobackButton } from '../../_layouts/auth/styles';
import api from '../../../_services/api';
import Button from '../../../components/Button';
import Input from '../../../components/Form/Input';
import { useLoading } from '../../../hooks/loading';
import { useToast } from '../../../hooks/toast';
import getValidationErros from '../../../utils/getValidationErros';

interface ParamTypes {
  disciplineId: string;
}

interface FormData {
  name: string;
}

const Disciplines: React.FC = () => {
  const history = useHistory();
  const { addLoading, removeLoading } = useLoading();
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);

  const { disciplineId } = useParams<ParamTypes>();

  useEffect(() => {
    async function searchDiscipline() {
      if (typeof disciplineId !== typeof undefined) {
        try {
          addLoading({
            loading: true,
            description: 'Aguarde ...',
          });

          const res = await api.get(`disciplines/${disciplineId}`);

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
    searchDiscipline();
  }, [addLoading, addToast, removeLoading, disciplineId]);

  const handleSubmit = useCallback(
    async (data: FormData, { reset }) => {
      try {
        formRef.current?.setErrors({});

        addLoading({
          loading: true,
          description: 'Aguarde ...',
        });

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (typeof disciplineId !== typeof undefined) {
          await api.put(`disciplines`, { ...data, id: disciplineId });

          addToast({
            type: 'success',
            title: 'Disciplina editada!',
            description: 'Dados editado com sucesso!',
          });

          history.goBack();
        } else {
          await api.post('disciplines', data);
          reset();

          addToast({
            type: 'success',
            title: 'Disciplina cadastrada!',
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
    [addToast, addLoading, removeLoading, formRef, disciplineId, history],
  );

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

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
          <legend>Dados da disciplina</legend>

          <ScheduleItem>
            <Input
              placeholder="Disciplina"
              name="name"
              icon={FiCheck}
              label="Disciplina"
            />
          </ScheduleItem>
        </fieldset>

        <footer>
          <p />
        </footer>
      </Form>
    </Layout>
  );
};

export default Disciplines;
