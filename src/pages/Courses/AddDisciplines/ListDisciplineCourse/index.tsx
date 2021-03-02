import React, { useCallback, useMemo, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Layout from '../../../_layouts/auth';
import { GobackButton } from '../../../_layouts/auth/styles';
import api from '../../../../_services/api';
import { useLoading } from '../../../../hooks/loading';
import { Container, MyHeader, MyFooter } from './styles';
import Table from './Table';

interface ParamTypes {
  courseId: string;
}

interface IAddDiscipline {
  id: string;
  name: string;
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

const AddDisciplines: React.FC = () => {
  const { courseId } = useParams<ParamTypes>();

  const { addLoading, removeLoading } = useLoading();
  const [coursesDisciplines, setCoursesDisciplines] = useState<
    IAddDiscipline[]
  >([] as IAddDiscipline[]);

  const [course, setCourse] = useState<ICourse>({} as ICourse);

  const loadCourse = useCallback(async () => {
    addLoading({
      loading: true,
      description: 'Aguarde ...',
    });

    const { data } = await api.get(`courses/${courseId}`);
    setCourse(data);

    removeLoading();
  }, [courseId, addLoading, removeLoading]);

  useMemo(() => loadCourse(), [loadCourse]);

  const loadCoursesDisciplines = useCallback(async () => {
    const { data } = await api.get(`courses/disciplines/${courseId}`);

    setCoursesDisciplines(data);
  }, [courseId]);

  useMemo(() => loadCoursesDisciplines(), [loadCoursesDisciplines]);

  const history = useHistory();

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <Layout>
      <Container>
        <MyHeader>
          <GobackButton type="button" onClick={() => goBack()}>
            <span>
              <FiArrowLeft />
            </span>
            <strong>Voltar</strong>
          </GobackButton>

          <h2>{course.name}</h2>
        </MyHeader>
        <Table coursesDisciplines={coursesDisciplines} />
        <MyFooter />
      </Container>
    </Layout>
  );
};

export default AddDisciplines;
