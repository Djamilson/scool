import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FcAddDatabase } from 'react-icons/fc';
import { FiCheck, FiArrowLeft, FiZap } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Layout from '../../_layouts/auth';
import {
  GobackButton,
  Header,
  ScheduleItem,
  Form,
  Footer,
} from '../../_layouts/auth/styles';
import api from '../../../_services/api';
import Button from '../../../components/Button';
import Select from '../../../components/Form/Select_';
import { useLoading } from '../../../hooks/loading';
import { useToast } from '../../../hooks/toast';
import getValidationErros from '../../../utils/getValidationErros';
import { ListDisciplineButton } from './styles';

interface ParamTypes {
  course_id: string;
}

interface IDisciplineData {
  discipline: string;
}

interface ICourse {
  id: string;
  created_at: Date;
  image: string;
  name: string;
  price: number;
  stock: number;
  updated_at: Date;
}

interface AllDiscipline {
  value: string;
  label: string;
}

const AddDisciplines: React.FC = () => {
  const { course_id } = useParams<ParamTypes>();

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { addLoading, removeLoading } = useLoading();

  const [course, setCourse] = useState<ICourse>({} as ICourse);
  const [allDisciplines, setAllDisciplines] = useState<AllDiscipline[]>([]);

  const loadCourse = useCallback(async () => {
    const { data } = await api.get(`courses/${course_id}`);
    setCourse(data);
  }, [course_id]);

  const loadDisciplines = useCallback(async () => {
    const { data } = await api.get(`disciplines/list/all`);
    setAllDisciplines(data);
  }, [setAllDisciplines]);

  useMemo(() => loadCourse(), [loadCourse]);
  useMemo(() => loadDisciplines(), [loadDisciplines]);

  const handleSubmit = useCallback(
    async (data_: IDisciplineData) => {
      try {
        formRef.current?.setErrors({});

        addLoading({
          loading: true,
          description: 'Aguarde ...',
        });

        const schema = Yup.object().shape({
          discipline: Yup.string().required('Selecione uma disciplina.'),
        });

        await schema.validate(data_, {
          abortEarly: false,
        });

        const data = {
          course_id,
          discipline_id: data_.discipline,
        };

        await api.post('courses/disciplines', data);

        addToast({
          type: 'success',
          title: 'Disciplina cadastrada!',
          description: 'Dados inseridos com sucesso!',
        });

        formRef.current?.reset();
        const select = formRef.current?.getFieldRef('discipline');
        select.select.clearValue();
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
    [addToast, addLoading, removeLoading, formRef, course_id],
  );

  const history = useHistory();

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const handleListDisciplines = useCallback(() => {
    history.push(`/courses/disciplines/${course_id}`);
  }, [history, course_id]);

  return (
    <Layout>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Header>
          <h2>Adicionando disciplina ao curso!</h2>

          <GobackButton type="button" onClick={() => goBack()}>
            <span>
              <FiArrowLeft />
            </span>
            <strong>Voltar</strong>
          </GobackButton>

          <ListDisciplineButton
            type="button"
            onClick={() => handleListDisciplines()}
          >
            <span>
              <FcAddDatabase />
            </span>
            <strong>Lista disciplinas</strong>
          </ListDisciplineButton>
        </Header>

        <fieldset>
          <legend>{course.name}</legend>
          <ScheduleItem>
            <Select
              name="discipline"
              options={allDisciplines}
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="Selecione"
              icon={FiZap}
              isClearable
            />
          </ScheduleItem>
        </fieldset>

        <Button type="submit">
          <span>
            <FiCheck />
          </span>
          <strong>Adicionar</strong>
        </Button>
      </Form>
      <Footer />
    </Layout>
  );
};

export default AddDisciplines;
