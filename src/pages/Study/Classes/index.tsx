import React, {
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
  ChangeEvent,
} from 'react';
import { FiCheck } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';

import Layout from '../../_layouts/auth';
import { Form, ScheduleItem } from '../../_layouts/auth/styles';
import api from '../../../_services/api';
import warningIcon from '../../../assets/images/icons/warning.svg';
import Select from '../../../components/Form/Select';
import authRoutes from '../../../routes/Routes/AuthRoutes';
import Table from './Table';
import TableTheme from './TableTheme';

interface IMovie {
  id: string;
  title: string;
}
interface ITheme {
  id: string;
  theme: string;
  movie: IMovie;
}

interface ICourseDiscipline {
  disciplineId: string;
  cursoDisciplineId: string;
  label: string;
}

interface ICourse {
  value: string;
  label: string;
}

const Classes: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const [selectedCourse, setSelectedCourse] = useState<string>('0');
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [coursesDisciplines, setCoursesDisciplines] = useState<
    ICourseDiscipline[]
  >([] as ICourseDiscipline[]);

  const [themes, setThemes] = useState<ITheme[]>([] as ITheme[]);

  const [
    selectedCourseDisciplineId,
    setSelectedCourseDisciplineId,
  ] = useState<string>('');

  const handleNav = useCallback(() => {
    history.push(authRoutes.classesForm);
  }, [history]);

  function handleSelectCourse(event: ChangeEvent<HTMLSelectElement>) {
    const myCourse = event.target.value;
    setSelectedCourse(myCourse);
  }

  async function loadCourses() {
    const { data } = await api.get(`courses/select`);
    setCourses(data);
  }

  useMemo(() => loadCourses(), []);

  const listDisciplines = useCallback(async () => {
    if (selectedCourse === '0') {
      return;
    }

    const res = await api.get(`courses/disciplines/${selectedCourse}/table`);

    setCoursesDisciplines(res.data);
  }, [selectedCourse]);

  useEffect(() => {
    if (Object.keys(selectedCourse).length === 0) return;

    listDisciplines();
  }, [selectedCourse, listDisciplines]);

  // load aulas
  async function handleLoadTema(course_discipline_id: string): Promise<void> {
    try {
      const res = await api.get(
        `themes/course/discipline/${course_discipline_id}`,
      );

      setThemes(res.data);
    } catch (erro) {}
  }

  useEffect(() => {
    if (Object.keys(selectedCourseDisciplineId).length === 0) return;

    handleLoadTema(selectedCourseDisciplineId);
  }, [selectedCourseDisciplineId]);

  return (
    <Layout>
      <Form ref={formRef} onSubmit={() => {}}>
        <header>
          <p>
            <img src={warningIcon} alt="Aviso importante" />
            Aula da disciplina!
            <br />
          </p>

          <button type="button" onClick={() => handleNav()}>
            <span>
              <FiCheck />
            </span>
            <strong>Nova aula</strong>
          </button>
        </header>

        <fieldset>
          <legend>Escolhe o curso</legend>

          <ScheduleItem>
            <Select
              name="course"
              label="Curso"
              id="course"
              onChange={handleSelectCourse}
              options={courses}
            />
          </ScheduleItem>
        </fieldset>

        <footer>
          <p>
            <img src={warningIcon} alt="Aviso importante" />

            {coursesDisciplines.length > 0
              ? 'Lista de disciplinas!'
              : 'Atenção, selecione o curso!'}
          </p>
        </footer>
      </Form>

      {coursesDisciplines.length > 0 && (
        <Table
          coursesDisciplines={coursesDisciplines}
          setSelectedCourseDisciplineId={setSelectedCourseDisciplineId}
        />
      )}
      {themes.length > 0 && <TableTheme themes={themes} />}
    </Layout>
  );
};

export default Classes;
