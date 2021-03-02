import React from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';

import { useAuth } from '../../../../hooks/auth';
import FAnswer from './Answer';
import { Container, ContainerAnswer } from './styles';

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

interface IComment {
  id: string;
  comment: string;
  movie_id: string;
  created_at: string;
  user: IUser;
  comment_answers: IAnswer[];
}

interface Props {
  comment: IComment;
  handlerToggleModalDeleteComment: (commentIdDelete: string) => void;
  handlerToggleModalEditComment: (comment: IComment) => void;
  handlerToggleModalCreateAnswer: (comment: IComment) => void;
  handlerToggleModalEditAnswer: (answer: IAnswer) => void;
  handlerToggleModalDeleteAnswer: (answer: IAnswer, comment_id: string) => void;
}

const Comment: React.FC<Props> = ({
  comment,
  handlerToggleModalDeleteComment,
  handlerToggleModalEditComment,
  handlerToggleModalCreateAnswer,
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
                comment.user.avatar_url ||
                'https://api.adorable.io/avatars/50/abott@adorable.png'
              }
              alt="Djamilson Alves"
            />
          </span>
          <article>
            <header>
              <span>{comment.user.name}</span>
              <strong>{comment.created_at}</strong>
            </header>

            <p>{comment.comment}</p>
          </article>
          <aside>
            <span>
              <button
                type="button"
                onClick={() => handlerToggleModalCreateAnswer(comment)}
              >
                <strong>Responder</strong>
              </button>
              {useId === comment.user.id && (
                <>
                  <button
                    type="button"
                    onClick={() => handlerToggleModalDeleteComment(comment.id)}
                  >
                    <MdDelete size={18} color="#7159c1" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handlerToggleModalEditComment(comment)}
                  >
                    <MdEdit size={18} color="#7159c1" />
                  </button>
                </>
              )}
            </span>
          </aside>
        </section>

        {comment.comment_answers.length > 0 && (
          <ContainerAnswer>
            {comment.comment_answers?.map((answer: IAnswer) => (
              <FAnswer
                key={answer.id}
                answer={answer}
                commentId={comment.id}
                handlerToggleModalEditAnswer={handlerToggleModalEditAnswer}
                handlerToggleModalDeleteAnswer={handlerToggleModalDeleteAnswer}
              />
            ))}
          </ContainerAnswer>
        )}
      </fieldset>
    </Container>
  );
};

export default Comment;
