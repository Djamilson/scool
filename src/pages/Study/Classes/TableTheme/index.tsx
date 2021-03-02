import React from 'react';
import { MdEdit } from 'react-icons/md';

import warningIcon from '../../../../assets/images/icons/warning.svg';
import { Container, Content, ContentTable } from './styles';

interface IMovie {
  id: string;
  title: string;
}

interface ITheme {
  id: string;
  theme: string;
  movie: IMovie;
}

interface IProps {
  themes: ITheme[];
}

const TableTheme: React.FC<IProps> = ({ themes }) => {
  return (
    <Container>
      <Content>
        <header>
          <p>
            <img src={warningIcon} alt="Aviso importante" />
            Aulas da cadastradas!
          </p>
        </header>

        <ContentTable>
          <thead>
            <tr>
              <th>#</th>
              <th>Aula</th>
              <th>Video</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {themes.map((item, ind) => (
              <tr key={item.id}>
                <td>
                  <strong>{ind + 1}</strong>
                </td>
                <td>
                  <strong>{item.theme}</strong>
                </td>
                <td>
                  <strong>{item.movie.title}</strong>
                </td>
                <td>
                  <div>
                    <button
                      title="Editar Tema"
                      type="button"
                      onClick={() => {}}
                    >
                      <MdEdit size={20} color="#7159c1" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </ContentTable>

        <footer>
          <p>
            <img src={warningIcon} alt="Aviso importante" />
            Lista de conteudos! <br />
          </p>
        </footer>
      </Content>
    </Container>
  );
};

export default TableTheme;
