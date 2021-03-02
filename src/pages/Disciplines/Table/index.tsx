import React, { useCallback } from 'react';
import { MdEdit } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

import { Container, Content, ContentTable, Total } from './styles';

interface IDiscipline {
  id: string;
  name: string;
}

interface IProps {
  disciplines: IDiscipline[];
}

const Table: React.FC<IProps> = ({ disciplines }) => {
  const history = useHistory();

  const handleEditCourse = useCallback(
    (disciplineId: string) => {
      history.push(`/disciplines/${disciplineId}/edit/`);
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
              <th>Discipline</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {disciplines.map((item, ind) => (
              <tr key={item.id}>
                <td>
                  <strong>{ind + 1}</strong>
                </td>
                <td>
                  <strong>{item.name}</strong>
                </td>
                <td>
                  <div>
                    <button
                      title="Editar Disciplina"
                      type="button"
                      onClick={() => handleEditCourse(item.id)}
                    >
                      <MdEdit size={20} color="#7159c1" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </ContentTable>

        <footer>
          <Total>p</Total>
        </footer>
      </Content>
    </Container>
  );
};

export default Table;
