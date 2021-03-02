import React from 'react';
import ReactPlayer from 'react-player';

import { Container, PlayerWrapper } from './styles';

interface MovieProps {
  item: {
    id: string;
    title: string;
    movie: string;
    movie_url: string;
  };
}

const Movie: React.FC<MovieProps> = ({ item }) => {
  return (
    <Container>
      <PlayerWrapper>
        <ReactPlayer
          url={item.movie_url}
          className="react-player"
          playing
          width="100%"
          height="100%"
          controls // gives the front end video controls
          light="https://i.stack.imgur.com/zw9Iz.png"
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload', //<- this is the important bit
              },
            },
          }}
        />
      </PlayerWrapper>

      <section>
        <strong>{item.title}</strong>
      </section>
    </Container>
  );
};

export default Movie;
