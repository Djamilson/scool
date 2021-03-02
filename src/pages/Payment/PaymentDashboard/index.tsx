import React, { useCallback, useEffect, useState } from 'react';

import Layout from '../../_layouts/auth';
import api from '../../../_services/api';
import { CourseStock } from '../../../hooks/cartCourse';
import { formatPrice } from '../../../utils';
import CourseItem, { Course } from './CourseItem';
import { CourseList } from './styles';

const DashBoard: React.FC = () => {
  const [courses, setCourses] = useState<CourseStock[]>(() => {
    return [] as CourseStock[];
  });

  const loadCourses = useCallback(async () => {
    try {
      if (courses.length > 0) return;

      const { data } = await api.get('courses');

      const courseFormatted = data.data.map((course: Course) => {
        return {
          itemCourse: {
            course: {
              ...course,
              priceFormatted: formatPrice(course.price),
            },
          },
        };
      });

      setCourses(courseFormatted);
    } catch (err) {}
  }, [courses, setCourses]);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  return (
    <Layout>
      <CourseList>
        {courses.map((course: CourseStock) => {
          return (
            <CourseItem
              key={course.itemCourse.course.id}
              itemCourse={course.itemCourse}
            />
          );
        })}
      </CourseList>
    </Layout>
  );
};

export default DashBoard;
