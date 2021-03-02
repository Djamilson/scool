import React from 'react';
import { MdSend } from 'react-icons/md';

import { Container, Title, Scroll, Item } from './styles';

interface ITheme {
  id: string;
  theme: string;
  movie_id: string;
  course_discipline_id: string;
}

interface Props {
  themes: ITheme[];
  handlerLoadMovie(movie_id: string): void;
}

const ListThemes: React.FC<Props> = ({ themes, handlerLoadMovie }) => {
  return (
    <Container>
      <Title>
        <span>Temas</span>
      </Title>

      <Scroll>
        {themes.map((theme: ITheme) => {
          return (
            <Item
              type="button"
              key={theme.id}
              title="Clique para assistir"
              onClick={() => handlerLoadMovie(theme.movie_id)}
            >
              <span>
                <MdSend />
              </span>
              <strong>{theme.theme}</strong>
            </Item>
          );
        })}
      </Scroll>
    </Container>
  );
};

export default ListThemes;
