import React from 'react';
import { MdSend, MdVisibility } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Container } from './styles';

interface CourseProps {
  key: string;

  itemCourseDiscipline: {
    course_discipline_id: string;
    discipline_id: string;
    name: string;
  };
}

const CourseDisciplineItem: React.FC<CourseProps> = (item: CourseProps) => {
  return (
    <Container>
      <span>
        <MdSend />
      </span>
      <strong>{item.itemCourseDiscipline.name}</strong>

      <Link
        to={`/disciplines/themes/${item.itemCourseDiscipline.course_discipline_id}`}
      >
        <span>
          <MdVisibility />
        </span>
        <strong>Aula</strong>
      </Link>
    </Container>
  );
};

export default CourseDisciplineItem;
