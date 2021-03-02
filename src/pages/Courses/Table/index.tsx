import React, { useCallback } from 'react';
import { MdEdit, MdAddCircle, MdFormatListBulleted } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

import { Container, Content, ContentTable, Total } from './styles';

interface ICourse {
  id: string;
  name: string;
  price: number;
  stock: number;
  image_url?: string;
}

interface IProps {
  courses: ICourse[];
}

const Table: React.FC<IProps> = ({ courses }) => {
  const history = useHistory();

  const handleNav = useCallback(
    async (course_id: string) => {
      history.push(`/add/discipline/course/${course_id}`);
    },
    [history],
  );

  const handleEditCourse = useCallback(
    (courseId: string) => {
      history.push(`/courses/${courseId}/edit/`);
    },
    [history],
  );

  const handleListDisciplines = useCallback(
    (courseId: string) => {
      history.push(`/courses/disciplines/${courseId}`);
    },
    [history],
  );

  const handleEditCourseImage = useCallback(
    (courseId: string) => {
      history.push(`/courses/${courseId}/edit/image`);
    },
    [history],
  );

  return (
    <Container>
      <Content>
        <ContentTable>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Valor R$</th>
              <th>Imagem</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((item, ind) => (
              <tr key={item.id}>
                <td>
                  <strong>{ind + 1}</strong>
                </td>
                <td>
                  <strong>{item.name}</strong>
                </td>

                <td>
                  <strong>{item.price}</strong>
                </td>

                <td>
                  <button
                    title="Editar imagem"
                    type="button"
                    onClick={() => handleEditCourseImage(item.id)}
                  >
                    <img
                      src={
                        item.image_url ||
                        'https://api.adorable.io/avatars/35/abott@adorable.png'
                      }
                      alt={item.name}
                    />
                  </button>
                </td>
                <td>
                  <div>
                    <button
                      title="Editar curso"
                      type="button"
                      onClick={() => handleEditCourse(item.id)}
                    >
                      <MdEdit size={20} color="#7159c1" />
                    </button>

                    <button
                      title="Adicionar disciplina"
                      type="button"
                      onClick={() => handleNav(item.id)}
                    >
                      <MdAddCircle size={20} color="#7159c1" />
                    </button>

                    <button
                      title="Lista disciplinas"
                      type="button"
                      onClick={() => handleListDisciplines(item.id)}
                    >
                      <MdFormatListBulleted size={20} color="#7159c1" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </ContentTable>

        <footer>
          <Total />
        </footer>
      </Content>
    </Container>
  );
};

export default Table;
