import React, { useCallback, useEffect, useState } from 'react';
import { FcAddDatabase } from 'react-icons/fc';
import { Link } from 'react-router-dom';

import Layout from '../_layouts/auth';
import api from '../../_services/api';
import { formatPrice } from '../../utils';
import { Man, NavButton } from './styles';
import Table from './Table';

interface ICourse {
  id: string;
  name: string;
  price: number;
  stock: number;
  image_url?: string;
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<ICourse[]>([] as ICourse[]);

  const loadCourses = useCallback(async () => {
    try {
      const { data } = await api.get('courses');

      const serealizable = data.data.map((course: ICourse) => {
        return {
          ...course,
          price: formatPrice(course.price),
        };
      });

      setCourses(serealizable);
    } catch (erro) {}
  }, [setCourses]);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  return (
    <Layout>
      <Man>
        <NavButton>
          <header>
            <h1>Cursos</h1>
            <Link to="/courses/new">
              <span>
                <FcAddDatabase />
              </span>
              <strong>Novo Curso</strong>
            </Link>
          </header>
        </NavButton>

        <Table courses={courses} />
      </Man>
    </Layout>
  );
};

export default Courses;
