import React, { useCallback, useMemo, useState } from 'react';
import { FaAngleDown, FaAngleUp, FaHandshake } from 'react-icons/fa';
import { FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Layout from '../_layout';
import api from '../../../_services/api';
import { useLoading } from '../../../hooks/loading';
import { useToast } from '../../../hooks/toast';
import IOrder from '../../../types/order';
import { dateHourFormatted } from '../../../utils';
import {
  Container,
  Header,
  Item,
  HeaderItem,
  ContentItem,
  ContentDetail,
  ButtonDetail,
} from './styles';

const Order: React.FC = () => {
  const { addToast } = useToast();

  const { addLoading, removeLoading } = useLoading();

  const [orders, setOrders] = useState<IOrder[]>([] as IOrder[]);

  const loadOrders = useCallback(async () => {
    try {
      addLoading({
        loading: true,
        description: 'Aguarde ...',
      });

      const { data } = await api.get(`orders/courses/list`);

      const newOrders = data.map((order) => {
        return {
          ...order,
          course: { ...order.course, detailUpDow: false },
        };
      });

      setOrders(newOrders);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Falha ao deletar!',
        description: 'Não foi possível carreagar os pedidos, tente novamente!',
      });
    } finally {
      removeLoading();
    }
  }, [addLoading, addToast, setOrders, removeLoading]);

  useMemo(() => {
    loadOrders();
  }, [loadOrders]);

  const [detailUpDow, setDetailUpDow] = useState<boolean>(false);

  const loadDetail = useCallback(
    (idItem: string) => {
      setOrders(
        orders.map((order) => {
          if (order.id === idItem) {
            console.log('order.course.created_at', order.course.created_at);
            return {
              ...order,
              course: {
                ...order.course,
                created_at: dateHourFormatted(String(order.course.created_at)),
                detailUpDow: !order.course.detailUpDow,
              },
            };
          }

          return order;
        }),
      );

      setDetailUpDow(!detailUpDow);
    },
    [setOrders, orders, setDetailUpDow, detailUpDow],
  );

  return (
    <Layout>
      <Container>
        <Header>
          <h2>Minhas aulas!</h2>
        </Header>

        <ul>
          {orders.length > 0 &&
            orders.map((item) => (
              <Item key={item.id} detail={item.course.detailUpDow}>
                <HeaderItem>
                  <button type="button" onClick={() => loadDetail(item.id)}>
                    <span>
                      {item.course.detailUpDow ? (
                        <FaAngleDown />
                      ) : (
                        <FaAngleUp />
                      )}
                    </span>
                    <strong>Minhas!</strong>
                  </button>
                  <h3>Status</h3>
                </HeaderItem>

                <ContentItem>
                  <img src={item.course.image_url} alt={item.course.name} />
                  <div>
                    <strong>Sala de aula</strong>
                    <span>{item.course.name}</span>
                  </div>
                </ContentItem>
                {item.course.detailUpDow && (
                  <>
                    <ContentDetail>
                      <article>
                        <div>
                          <span />
                          <span />
                          <strong>
                            <FaHandshake />
                          </strong>
                        </div>
                        <hr />
                      </article>
                      <section>
                        <div>
                          <strong>
                            <span>Pedido</span>
                            <span>Recebido</span>
                          </strong>
                          <span>{item.course.created_at}</span>
                        </div>

                        <div>
                          <strong>
                            <span>Pagamento</span>
                            <span>Aprovado</span>
                          </strong>
                          <span>{item.course.created_at}</span>
                        </div>
                        <div>
                          <strong>
                            <span>Curso</span>
                            <span>Liberado</span>
                          </strong>
                          <span>{item.course.created_at}</span>
                        </div>
                      </section>
                    </ContentDetail>

                    <ButtonDetail>
                      <button type="button">
                        <span>
                          <FiCheck />
                        </span>
                        <strong>Cancelar compra</strong>
                      </button>

                      <Link to="/signup">
                        <span>
                          <FiCheck />
                        </span>
                        <strong>Detalhes da compra</strong>
                      </Link>
                    </ButtonDetail>
                  </>
                )}
              </Item>
            ))}
        </ul>
      </Container>
    </Layout>
  );
};

export default Order;
