import React from 'react';
import { MdEdit } from 'react-icons/md';

import { Container, ContentTable } from './styles';

interface IDiscipline {
  id: string;
  name: string;
}

interface IProps {
  handleToggleModal: (discipline: IDiscipline) => void;
  coursesDisciplines: IDiscipline[];
}

const Table: React.FC<IProps> = ({ coursesDisciplines, handleToggleModal }) => {
  return (
    <Container>
      <ContentTable>
        <thead>
          <tr>
            <th>#</th>
            <th>Discipline</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {coursesDisciplines.map((item, ind) => (
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
                    onClick={() => {}}
                  >
                    <MdEdit size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </ContentTable>
    </Container>
  );
};

export default Table;
