import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory, useParams } from 'react-router-dom';

import Layout from '../_layouts/auth';
import { GobackButton } from '../_layouts/auth/styles';
import api from '../../_services/api';
import { useLoading } from '../../hooks/loading';
import { useToast } from '../../hooks/toast';
import CourseDisciplineItem from './CourseDisciplineItem';
import { ContainerForm, CustonHeader } from './styles';

interface ParamTypes {
  course_id: string;
}

interface ICourseDiscipline {
  course_discipline_id: string;
  discipline_id: string;
  name: string;
}

const Study: React.FC = () => {
  const { course_id } = useParams<ParamTypes>();

  const history = useHistory();

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const { addToast } = useToast();
  const { addLoading, removeLoading } = useLoading();
  const [course, setCourse] = useState('');

  const [courseDisciplines, setCourseDisciplines] = useState<
    ICourseDiscipline[]
  >(() => {
    return [] as ICourseDiscipline[];
  });

  const searchCourse = useCallback(async () => {
    const { data } = await api.get(`courses/${course_id}`);
    setCourse(data.name);
  }, [course_id, setCourse]);

  useMemo(() => {
    searchCourse();
  }, [searchCourse]);

  const loadDisciplines = useCallback(async () => {
    try {
      addLoading({
        loading: true,
        description: 'Aguarde ...',
      });
      const { data } = await api.get(`courses/disciplines/${course_id}`);
      setCourseDisciplines(data);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Falha ao carregar!',
        description:
          'Ocorreu uma falha ao tentar carregar os dados, tente novamente!',
      });
    } finally {
      removeLoading();
    }
  }, [addToast, addLoading, removeLoading, course_id, setCourseDisciplines]);

  useEffect(() => {
    loadDisciplines();
  }, [loadDisciplines]);

  return (
    <Layout>
      <ContainerForm>
        <CustonHeader>
          <GobackButton type="button" onClick={() => goBack()}>
            <span>
              <FiArrowLeft />
            </span>
            <strong>Voltar</strong>
          </GobackButton>

          <h2>{course}!</h2>
        </CustonHeader>

        <fieldset>
          <legend>Lista de Disciplinas</legend>

          {courseDisciplines.map((courseDiscipline: ICourseDiscipline) => {
            return (
              <CourseDisciplineItem
                key={courseDiscipline.discipline_id}
                itemCourseDiscipline={courseDiscipline}
              />
            );
          })}
        </fieldset>

        <footer>
          <p>Estamos trabalhando pelo o seu futuro!</p>
        </footer>
      </ContainerForm>
    </Layout>
  );
};

export default Study;
