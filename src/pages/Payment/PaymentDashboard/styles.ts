import styled from 'styled-components';

export const Container = styled.div`
  border: 0;
  margin: auto 150px;
`;

export const CourseList = styled.ul`
  margin-top: 30px;

  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 20px;
  list-style: none;
`;
