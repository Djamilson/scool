import React, { useCallback, useEffect, useState } from 'react';
import { FiInfo } from 'react-icons/fi';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import Layout from '../_layouts/auth';
import api from '../../_services/api';
import { formatPrice } from '../../utils';
import CourseItem from './CourseItem';
import {
  CourseList,
  OpenDetails,
  OpenOnWeekends,
  OpenButton,
  LinkGiveClasses,
} from './styles';

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

const DashBoard: React.FC = () => {
  const [ordersCourses, setOrdersCourses] = useState<CourseStock[]>(() => {
    return [] as CourseStock[];
  });

  const handleLoadCourses = useCallback(async () => {
    const { data } = await api.get(`orders/courses/list`);

    const courseFormatted = data.map((item: any) => {
      return {
        itemCourse: {
          course: {
            ...item,
            priceFormatted: formatPrice(item.course.price),
            created_at: format(new Date(item.created_at), 'dd/MM/yyyy', {
              locale: ptBR,
            }),
          },
        },
      };
    });
    setOrdersCourses(courseFormatted);
  }, []);

  useEffect(() => {
    handleLoadCourses();
  }, [handleLoadCourses]);

  return (
    <Layout>
      <CourseList>
        {ordersCourses.length > 0 ? (
          ordersCourses.map((course: CourseStock) => {
            return (
              <CourseItem
                key={course.itemCourse.course.id}
                itemCourse={course.itemCourse}
              />
            );
          })
        ) : (
          <OpenDetails>
            <OpenOnWeekends>
              <FiInfo size={32} color="#39CC83" />
              Ainda não estou matriculado em nenhuma disciplina.
            </OpenOnWeekends>
          </OpenDetails>
        )}
      </CourseList>
    </Layout>
  );
};

export default DashBoard;
