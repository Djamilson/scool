import React from 'react';
import { MdVisibility } from 'react-icons/md';

import { Container, Content, ContentTable, Total } from './styles';

interface ICourseDiscipline {
  disciplineId: string;
  cursoDisciplineId: string;
  label: string;
}

interface IProps {
  coursesDisciplines: ICourseDiscipline[];
  setSelectedCourseDisciplineId: (course_discipine_id: string) => void;
}

const Table: React.FC<IProps> = ({
  coursesDisciplines,
  setSelectedCourseDisciplineId,
}) => {
  return (
    <Container>
      <Content>
        <ContentTable>
          <thead>
            <tr>
              <th>#</th>
              <th>Discipline</th>
              <th>Visualizar aulas</th>
            </tr>
          </thead>
          <tbody>
            {coursesDisciplines.map((item, ind) => (
              <tr key={item.disciplineId}>
                <td>
                  <strong>{ind + 1}</strong>
                </td>
                <td>
                  <strong>{item.label}</strong>
                </td>
                <td>
                  <div>
                    <button
                      title="Visualizar Temas"
                      type="button"
                      onClick={() =>
                        setSelectedCourseDisciplineId(item.cursoDisciplineId)
                      }
                    >
                      <MdVisibility size={20} color="#7159c1" />
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
