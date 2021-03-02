import React from 'react';

import { Container, Content, ContentTable, Total } from './styles';

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
            {coursesDisciplines.map((item, ind) => (
              <tr key={item.id}>
                <td>
                  <strong>{ind + 1}</strong>
                </td>
                <td>
                  <strong>{item.name}</strong>
                </td>
                <td>
                  <div />
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
