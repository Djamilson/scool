import React from 'react';
import { RiMoneyDollarBoxLine } from 'react-icons/ri';

import { CourseStock } from '../../../../hooks/cartCourse';
import { Container } from './styles';

export interface Course {
  id: string;
  name: string;
  price: number;
  priceFormatted: number;
  image: string;
  image_url: string;
}

export interface CourseItemProps {
  course: Course;
}

const CourseItem: React.FC<CourseStock> = (itemCourse: CourseStock) => {
  return (
    <Container>
      <img
        src={itemCourse.itemCourse.course.image_url}
        alt={itemCourse.itemCourse.course.name}
      />
      <div>
        <section>
          <strong>Ano Letivo</strong>
          <span>{itemCourse.itemCourse.course.name}</span>
        </section>
        <button type="button" onClick={() => {}}>
          <span>
            <RiMoneyDollarBoxLine />
          </span>
          <strong>Editar</strong>
        </button>
      </div>
    </Container>
  );
};

export default CourseItem;
