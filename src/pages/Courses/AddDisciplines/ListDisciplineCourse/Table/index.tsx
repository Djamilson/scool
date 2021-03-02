import React from 'react';

import { ContentTable } from './styles';

interface IDiscipline {
  id: string;
  name: string;
}

interface IProps {
  coursesDisciplines: IDiscipline[];
}

const Table: React.FC<IProps> = ({ coursesDisciplines }) => {
  return (
    <ContentTable>
      <thead>
        <tr>
          <th>#</th>
          <th>Disciplina</th>
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
          </tr>
        ))}
      </tbody>
    </ContentTable>
  );
};

export default Table;
