import React, {
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
  ChangeEvent,
} from 'react';
import { FiCheck, FiZap } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Layout from '../../../_layouts/auth';
import {
  Form,
  ScheduleItem,
  Header,
  Footer,
} from '../../../_layouts/auth/styles';
import api from '../../../../_services/api';
import Button from '../../../../components/Button';
import Input from '../../../../components/Form/Input';
import SelectCourse from '../../../../components/Form/Select';
import Select from '../../../../components/Form/Select_';
import { useLoading } from '../../../../hooks/loading';
import { useToast } from '../../../../hooks/toast';
import getValidationErros from '../../../../utils/getValidationErros';

interface IFormData {
  theme: string;
  title: string;
  movie: string;
  discipline: string;
}

interface IOptionCourse {
  value: string;
  label: string;
}

const FormClass: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { addLoading, removeLoading } = useLoading();

  const [selectedCourse, setSelectedCourse] = useState<string>('0');
  const [courses, setCourses] = useState<IOptionCourse[]>([]);
  const [allDisciplines, setAllDisciplines] = useState<IOptionCourse[]>([]);

  const loadCourses = useCallback(async () => {
    const { data } = await api.get(`courses/select`);
    setCourses(data);
  }, []);

  useMemo(() => loadCourses(), [loadCourses]);

  function handleSelectCourse(event: ChangeEvent<HTMLSelectElement>) {
    const myCourse = event.target.value;
    setSelectedCourse(myCourse);
  }

  const listDisciplines = useCallback(async () => {
    if (selectedCourse === '0') {
      return;
    }

    const res = await api.get(`courses/disciplines/${selectedCourse}/select`);

    setAllDisciplines(res.data);
  }, [setAllDisciplines, selectedCourse]);

  useEffect(() => {
    if (Object.keys(selectedCourse).length === 0) return;

    listDisciplines();
  }, [selectedCourse, listDisciplines]);

  const handleSubmit = useCallback(
    async (data: IFormData, { reset }) => {
      try {
        formRef.current?.setErrors({});

        addLoading({
          loading: true,
          description: 'Aguarde ...',
        });

        const schema = Yup.object().shape({
          theme: Yup.string().required('Tema obrigatório'),
          title: Yup.string().required('Título obrigatório'),
          movie: Yup.string().required('Link do vídeo obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('themes', { ...data, course_id: selectedCourse });

        reset();

        addToast({
          type: 'success',
          title: 'Aula cadastrada!',
          description: 'Dados inseridos com sucesso!',
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
    [addToast, addLoading, removeLoading, formRef, selectedCourse],
  );

  return (
    <Layout>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Header>
          <h2>
            Adicionando aula a disciplina! <br />
          </h2>

          <Button type="submit">
            <span>
              <FiCheck />
            </span>
            <strong>Salvar</strong>
          </Button>
        </Header>

        <fieldset>
          <legend>Adicionando aulas</legend>

          <ScheduleItem>
            <SelectCourse
              name="course"
              label="Curso"
              id="course"
              onChange={handleSelectCourse}
              options={courses}
              style={{
                border: 0,
                boxShadow: 'none',
                zIndex: 0,
              }}
            />

            <Select
              name="discipline_id"
              options={allDisciplines}
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="Selecione"
              icon={FiZap}
              isClearable
              label="Disciplina"
            />
          </ScheduleItem>
        </fieldset>

        <fieldset>
          <legend>Dados do vídeo</legend>
          <ScheduleItem>
            <Input
              placeholder="Título do vídeo"
              name="title"
              icon={FiCheck}
              label="Título"
            />

            <Input
              placeholder="Descrição do vídeo"
              name="theme"
              icon={FiCheck}
              label="Descrição"
            />
          </ScheduleItem>
        </fieldset>

        <fieldset>
          <legend>Link do vídeo</legend>

          <ScheduleItem>
            <Input placeholder="Link do vídeo" name="movie" icon={FiCheck} />
          </ScheduleItem>
        </fieldset>
      </Form>
      <Footer />
    </Layout>
  );
};

export default FormClass;
