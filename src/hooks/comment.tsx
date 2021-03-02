import React, { createContext, useCallback, useState, useContext } from 'react';

import { useToast } from './toast';

interface IUser {
  id: string;
  name: string;
  avatar_url: string;
}

interface ICommentAnswer {
  id: string;
  comment_answer: string;
  comment_id: string;
  created_at: Date;
  user: IUser;
}
interface IComment {
  id: string;
  comment: string;
  movie_id: string;
  created_at: Date;
  user: IUser;
  comment_answers: ICommentAnswer[];
}

interface IMovie {
  id: string;
  title: string;
  movie: string;
  theme: {
    id: string;
    theme: string;
  };
  movie_url: string;
  comments: IComment[];
}

interface CommentContextData {
  addToCommentAnswer(id: string): Promise<void>;
  clearComments(): void;
  removeComment(index: string): Promise<void>;
  updateSuccess(id: any, stock: any): Promise<void>;
  movie: IMovie;
}

const CommentContext = createContext<CommentContextData>(
  {} as CommentContextData,
);

const Comment: React.FC = ({ children }) => {
  const { addToast } = useToast();

  const [movie, setMovie] = useState<IMovie>(() => {
    return {} as IMovie;
  });

  const clearComments = useCallback(() => {
    setMovie({} as IMovie);
  }, []);

  const updateSuccess = useCallback(async (id, stock) => {}, []);

  const addToCommentAnswer = useCallback(async (answer) => {
    addToast({
      type: 'error',
      title: 'Falha!',
      description: 'Não temos mais produto para adicionar!',
    });

    setMovie(answer);
  }, []);

  const removeComment = useCallback(async (id) => {
    //const removeCart = cart;
  }, []);

  return (
    <CommentContext.Provider
      value={{
        movie,
        addToCommentAnswer,
        clearComments,
        updateSuccess,
        removeComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

function useComment(): CommentContextData {
  const context = useContext(CommentContext);

  if (!context) {
    throw new Error('useCourse mus be used within an CartCourse');
  }

  return context;
}

export { Comment, useComment };
