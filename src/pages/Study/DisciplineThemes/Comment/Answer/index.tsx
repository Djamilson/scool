import React from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';

import { useAuth } from '../../../../../hooks/auth';
import { Container } from './styles';

interface IUser {
  id: string;
  name: string;
  avatar_url: string;
}

interface IAnswer {
  id: string;
  comment_answer: string;
  created_at: string;
  user: IUser;
  comment_id: string;
}

interface IPropsAnswer {
  answer: IAnswer;
  commentId: string;
  handlerToggleModalEditAnswer: (answer: IAnswer) => void;
  handlerToggleModalDeleteAnswer: (answer: IAnswer, comment_id: string) => void;
}

const CommentAnswer: React.FC<IPropsAnswer> = ({
  answer,
  commentId,
  handlerToggleModalEditAnswer,
  handlerToggleModalDeleteAnswer,
}) => {
  const { user } = useAuth();
  const useId = user?.id;

  return (
    <Container>
      <fieldset>
        <section>
          <span>
            <img
              src={
                answer.user.avatar_url ||
                'https://api.adorable.io/avatars/50/abott@adorable.png'
              }
              alt={answer.user.name}
            />
          </span>
          <article>
            <header>
              <span>{answer.user.name}</span>
              <strong>{answer.created_at}</strong>
            </header>

            <p>{answer.comment_answer}</p>
          </article>

          <aside>
            <span>
              {useId === answer.user.id && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      handlerToggleModalDeleteAnswer(answer, commentId)
                    }
                  >
                    <MdDelete size={18} color="#7159c1" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handlerToggleModalEditAnswer(answer)}
                  >
                    <MdEdit size={18} color="#7159c1" />
                  </button>
                </>
              )}
            </span>
          </aside>
        </section>
      </fieldset>
    </Container>
  );
};

export default CommentAnswer;
