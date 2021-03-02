import React from 'react';
import { MdBook } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Container } from './styles';

export interface Course {
  id: string;
  name: string;
  price: number;
  priceFormatted: number;
  image: string;
  image_url: string;
}

interface ICourse {
  id: string;
  course_id: string;
  subtotal: string;
  order_id: string;
  price: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  course: {
    id: string;
    name: string;
    price: string;
    stock: number;
    image: string;
    created_at: string;
    updated_at: string;
    image_url: string;
  };
}

export interface CourseStock {
  itemCourse: {
    stock: number;
    course: ICourse;
  };
}

const CourseItem: React.FC<CourseStock> = (item: CourseStock) => {
  return (
    <Container>
      <img
        src={item.itemCourse.course.course.image_url}
        alt={item.itemCourse.course.course.name}
      />
      <div>
        <section>
          <strong>Sala de Aula</strong>
          <span>{item.itemCourse.course.course.name}</span>
        </section>
        <Link to={`/study/${item.itemCourse.course.course_id}`}>
          <span>
            <MdBook />
          </span>
          <strong>Assistir aulas</strong>
        </Link>
      </div>
    </Container>
  );
};

export default CourseItem;
