import React, { useEffect, useState, useCallback } from 'react';
import { FiCheckSquare, FiArrowLeft } from 'react-icons/fi';
import { useHistory, useParams } from 'react-router-dom';

import Layout from '../../_layouts/auth';
import { GobackButton } from '../../_layouts/auth/styles';
import api from '../../../_services/api';
import ModalAddComment from '../../../components/ModalAddComment';
import ModalDeleteAnswer from '../../../components/ModalAnswerDelete';
import ModalCreateAnswer from '../../../components/ModalCreateAnswer';
import ModalDeleteComment from '../../../components/ModalDeleteComment';
import ModalEditAnswer from '../../../components/ModalEditAnswer';
import ModalEditComment from '../../../components/ModalEditComment';
import { useLoading } from '../../../hooks/loading';
import { useToast } from '../../../hooks/toast';
import { dateFormatted } from '../../../utils';
import Comment from './Comment';
import ListThemes from './ListThemes';
import Movie from './Movie';
import {
  ContainerForm,
  CustonHeader,
  ContetMovie,
  Box,
  ContentComment,
} from './styles';

interface ParamTypes {
  courseDisciplineId: string;
}

interface ITheme {
  id: string;
  theme: string;
  movie_id: string;
  course_discipline_id: string;
}

interface IUser {
  id: string;
  name: string;
  avatar_url: string;
}

interface IComment {
  id: string;
  comment: string;
  movie_id: string;
  created_at: string;
  user: IUser;
  comment_answers: IAnswer[];
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
  comments?: IComment[];
}

interface IAnswer {
  id: string;
  comment_answer: string;
  created_at: string;
  user: IUser;
  comment_id: string;
}

const DisciplineThemes: React.FC = () => {
  const { courseDisciplineId } = useParams<ParamTypes>();

  const history = useHistory();

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const { addToast } = useToast();
  const { addLoading, removeLoading } = useLoading();

  const [themes, setThemes] = useState<ITheme[]>(() => {
    return [] as ITheme[];
  });

  const [selectedMovie, setSelectedMovie] = useState<IMovie>({} as IMovie);
  const [comments, setComments] = useState<IComment[]>(() => {
    return [] as IComment[];
  });

  const [selectedCommentId, setSelectedCommentId] = useState<string>('');
  const [selectedComment, setSelectedComment] = useState<IComment>(
    {} as IComment,
  );
  const [selectedAnswer, setSelectedAnswer] = useState<IAnswer>({} as IAnswer);

  const [modalOpenAddComment, setModalOpenAddComment] = useState(false);
  const [modalOpenDeleteComment, setModalOpenDeleteComment] = useState(false);
  const [modalOpenEditComment, setModalOpenEditComment] = useState(false);
  const [modalOpenCreateAnswer, setModalOpenCreateAnswer] = useState(false);
  const [modalOpenEditAnswer, setModalOpenEditAnswer] = useState(false);
  const [modalOpenDeleteAnswer, setModalOpenDeleteAnswer] = useState(false);

  const loadThemes = useCallback(async () => {
    try {
      const { data } = await api.get(
        `themes/disciplines/${courseDisciplineId}`,
      );

      setThemes(data);
    } catch (err) {}
  }, [setThemes, courseDisciplineId]);

  useEffect(() => {
    loadThemes();
  }, [loadThemes]);

  const handlerLoadComments = useCallback(
    async (movie_id: string) => {
      const res = await api.get(`comments/${movie_id}`);

      const dataComment = res.data.map((comment: IComment) => {
        return {
          ...comment,
          user: { ...comment.user, name: comment.user.name.split(' ')[0] },
          created_at: dateFormatted(String(comment.created_at)),
          comment_answers: comment.comment_answers.map((answer: IAnswer) => {
            return {
              ...answer,
              user: { ...answer.user, name: answer.user.name.split(' ')[0] },
              created_at: dateFormatted(String(answer.created_at)),
            };
          }),
        };
      });

      setComments(dataComment);
    },
    [setComments],
  );

  const handlerLoadMovie = useCallback(
    async (movie_id: string) => {
      try {
        addLoading({
          loading: true,
          description: 'Aguarde ...',
        });

        const { data } = await api.get(`movies/${movie_id}`);
        setSelectedMovie(data);

        handlerLoadComments(movie_id);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Falha ao carregar!',
          description:
            'Ocorreu uma falha ao tentar carregar o vídeo, tente novamente!',
        });
      } finally {
        removeLoading();
      }
    },
    [
      addToast,
      addLoading,
      removeLoading,
      setSelectedMovie,
      handlerLoadComments,
    ],
  );

  function toggleModalAddComment(): void {
    setModalOpenAddComment(!modalOpenAddComment);
  }

  async function handlerAddComment(
    meComment: Omit<
      IComment,
      'id' | 'created_at' | 'user' | 'comment_answers' | 'movie_id'
    >,
  ): Promise<void> {
    try {
      const { data } = await api.post('/comments', {
        ...meComment,
        movie_id: selectedMovie.id,
      });

      const dataSerealizable = {
        ...data,
        created_at: dateFormatted(String(data.created_at)),
      };

      console.log('data::', data);
      console.log('comments::', comments);

      setComments([dataSerealizable, ...comments]);
    } catch (erro) {}
  }

  function toggleModalDeleteComment(): void {
    setModalOpenDeleteComment(!modalOpenDeleteComment);
  }

  async function handlerToggleModalDeleteComment(
    commentIdDelete: string,
  ): Promise<void> {
    try {
      setSelectedCommentId(commentIdDelete);
      toggleModalDeleteComment();
    } catch (error) {}
  }

  async function handlerDeleteComment(commentId: string): Promise<void> {
    try {
      await api.delete(`/comments/${commentId}`);

      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {}
  }

  function toggleModalEditComment(): void {
    setModalOpenEditComment(!modalOpenEditComment);
  }

  async function handlerEditComment(
    commentEdit: Omit<
      IComment,
      'movie_id' | 'created_at' | 'user' | 'comment_answers'
    >,
  ): Promise<void> {
    try {
      await api.put('/comments', {
        ...commentEdit,
      });

      setComments(
        comments.map((meComment) => {
          if (meComment.id === selectedComment.id) {
            return {
              ...selectedComment,
              comment: commentEdit.comment,
            };
          }
          return meComment;
        }),
      );
    } catch (erro) {}
  }

  async function handlerToggleModalEditComment(
    comment: IComment,
  ): Promise<void> {
    try {
      setSelectedComment(comment);
      toggleModalEditComment();
    } catch (error) {}
  }

  const toggleModalCreateAnswer = useCallback(() => {
    setModalOpenCreateAnswer(!modalOpenCreateAnswer);
  }, [setModalOpenCreateAnswer, modalOpenCreateAnswer]);

  async function handlerToggleModalCreateAnswer(
    comment: IComment,
  ): Promise<void> {
    try {
      setSelectedComment(comment);
      toggleModalCreateAnswer();
    } catch (error) {}
  }

  async function handlerCreateAnswer(
    answer: Omit<IAnswer, 'id' | 'created_at' | 'user' | 'comment_id'>,
  ): Promise<void> {
    try {
      const { data } = await api.post('comments/answers', {
        ...answer,
        comment_id: selectedComment.id,
      });

      const newComments = comments.map((itemComment) => {
        if (itemComment.id === selectedComment.id) {
          return {
            ...itemComment,
            comment_answers: [
              { ...data, created_at: dateFormatted(String(data.created_at)) },
              ...itemComment.comment_answers,
            ],
          };
        }
        return itemComment;
      });

      setComments(newComments);
    } catch (erro) {}
  }

  function toggleModalEditAnswer(): void {
    setModalOpenEditAnswer(!modalOpenEditAnswer);
  }

  async function handlerToggleModalEditAnswer(date: IAnswer): Promise<void> {
    try {
      setSelectedAnswer(date);
      toggleModalEditAnswer();
    } catch (error) {}
  }
  async function handlerEditAnswer(
    answerEdit: Omit<IAnswer, 'created_at' | 'user' | 'comment_id'>,
  ): Promise<void> {
    try {
      const { id } = selectedAnswer;
      const { comment_answer } = answerEdit;
      const { data } = await api.put('comments/answers/me', {
        comment_answer,
        id,
      });

      const editCommentsAnswers = comments.map((meComment) => {
        if (meComment.id === data.comment_id) {
          const resAnswer = meComment.comment_answers.map((item_answer) => {
            if (item_answer.id === data.id) {
              return {
                ...item_answer,
                comment_answer: data.comment_answer,
              };
            }

            return item_answer;
          });

          return { ...meComment, comment_answers: resAnswer };
        }

        return meComment;
      });

      setComments(editCommentsAnswers);
    } catch (erro) {}
  }

  function toggleModalDeleteAnswer(): void {
    setModalOpenDeleteAnswer(!modalOpenDeleteAnswer);
  }

  async function handlerDeleteAnswer(
    answer: IAnswer,
    comment_id: string,
  ): Promise<void> {
    try {
      await api.delete(`/comments/answers/me/${answer.id}`);

      const deleteAnswers = comments.map((meComment) => {
        if (meComment.id === comment_id) {
          const resAnswer = meComment.comment_answers.filter(
            (item_answer) => item_answer.id !== answer.id,
          );

          return { ...meComment, comment_answers: resAnswer };
        }

        return meComment;
      });

      setComments(deleteAnswers);
    } catch (erro) {}
  }

  async function handlerToggleModalDeleteAnswer(
    answer: IAnswer,
    comment_id: string,
  ): Promise<void> {
    try {
      setSelectedCommentId(comment_id);
      setSelectedAnswer(answer);
      toggleModalDeleteAnswer();
    } catch (error) {}
  }

  return (
    <Layout>
      <ModalAddComment
        isOpen={modalOpenAddComment}
        setIsOpen={toggleModalAddComment}
        handlerAddComment={handlerAddComment}
      />

      <ModalDeleteComment
        isOpen={modalOpenDeleteComment}
        setIsOpen={toggleModalDeleteComment}
        handlerDeleteComment={handlerDeleteComment}
        commentId={selectedCommentId}
      />

      <ModalEditComment
        isOpen={modalOpenEditComment}
        setIsOpen={toggleModalEditComment}
        handlerEditComment={handlerEditComment}
        comment={selectedComment}
      />

      <ModalCreateAnswer
        isOpen={modalOpenCreateAnswer}
        setIsOpen={toggleModalCreateAnswer}
        handlerCreateAnswer={handlerCreateAnswer}
      />

      <ModalEditAnswer
        isOpen={modalOpenEditAnswer}
        setIsOpen={toggleModalEditAnswer}
        handlerEditAnswer={handlerEditAnswer}
        answer={selectedAnswer}
      />

      <ModalDeleteAnswer
        isOpen={modalOpenDeleteAnswer}
        setIsOpen={toggleModalDeleteAnswer}
        handlerDelete={handlerDeleteAnswer}
        answer={selectedAnswer}
        commentId={selectedCommentId}
      />

      <ContainerForm>
        <CustonHeader>
          <GobackButton type="button" onClick={() => goBack()}>
            <span>
              <FiArrowLeft />
            </span>
            <strong>Voltar</strong>
          </GobackButton>

          <h2>Conteudos!</h2>
        </CustonHeader>

        <fieldset>
          <legend>Vamos começa!</legend>

          {themes.length > 0 && (
            <ContetMovie>
              <Box>
                {Object.keys(selectedMovie).length !== 0 && (
                  <Movie item={selectedMovie} />
                )}
              </Box>

              <ListThemes themes={themes} handlerLoadMovie={handlerLoadMovie} />
            </ContetMovie>
          )}

          {Object.keys(selectedMovie).length !== 0 && (
            <main>
              <fieldset>
                <legend>
                  Comentários!
                  <button type="button" onClick={() => toggleModalAddComment()}>
                    <span>
                      <FiCheckSquare size={24} />
                    </span>
                    <strong>Comentar</strong>
                  </button>
                </legend>
                <ContentComment>
                  {comments?.map((comment: IComment) => (
                    <Comment
                      key={comment.id}
                      comment={comment}
                      handlerToggleModalDeleteComment={
                        handlerToggleModalDeleteComment
                      }
                      handlerToggleModalEditComment={
                        handlerToggleModalEditComment
                      }
                      handlerToggleModalCreateAnswer={
                        handlerToggleModalCreateAnswer
                      }
                      handlerToggleModalEditAnswer={
                        handlerToggleModalEditAnswer
                      }
                      handlerToggleModalDeleteAnswer={
                        handlerToggleModalDeleteAnswer
                      }
                    />
                  ))}
                </ContentComment>
              </fieldset>
            </main>
          )}
        </fieldset>

        <footer>
          <p>Meus estudos</p>
        </footer>
      </ContainerForm>
    </Layout>
  );
};

export default DisciplineThemes;
