import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import Layout from '../../_layouts/auth';
import api from '../../../_services/api';
import { useLoading } from '../../../hooks/loading';
import { useToast } from '../../../hooks/toast';
import { formatPrice } from '../../../utils';
import { CourseTable, Footer, Total, TransactionsTable } from './styles';

interface Course {
  id: string;
  name: string;
  price: number;
  stock: string;
  image: string;
  image_url: string;
}

interface IOrderCourses {
  id: string;
  price: number;
  course_id: string;
  course: Course;
  subtotal: number;
  order_id: string;
  quantity: number;
}

interface Order {
  id: string;
  total: string;
  fee: string;
  created_at: Date;
  subtotal: string;
}

interface ParamTypes {
  order_id: string;
}
interface PropsTransaction {
  id: string;
  transaction_id: string;
  order_id: string;
  status: string;
  authorization_code: string;
  brand: string;
  tid: string;
  authorized_amount: string;
  installments: number;
  created_at: string;
}

const OrderCourses: React.FC = () => {
  const { order_id } = useParams<ParamTypes>();
  const { addToast } = useToast();

  const { addLoading, removeLoading } = useLoading();

  const [order, setOrder] = useState<Order>({} as Order);
  const [transaction, setTransaction] = useState<PropsTransaction>(
    {} as PropsTransaction,
  );

  const [orderCourses, setOrderCourses] = useState<IOrderCourses[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const { data } = await api.get(`orders/${order_id}`);

        const t = {
          id: String(data.id),
          subtotal: formatPrice(Number(data.total)),
          total: formatPrice(Number(data.total) + Number(data.fee)),
          fee: formatPrice(Number(data.fee)),
          created_at: new Date(
            format(new Date(data.created_at), 'dd/MM/yyyy', {
              locale: ptBR,
            }),
          ),
        };

        setOrder(t);

        const formatCourse = data.order_courses.map((item: IOrderCourses) => {
          return {
            id: item.id,
            course_id: item.course_id,
            order_id: item.order_id,
            quantity: item.quantity,
            price: formatPrice(Number(item.price)),
            course: {
              ...item.course,
              price: formatPrice(Number(item.course.price)),
            },
            subtotal: formatPrice(Number(item.subtotal)),
          };
        });

        setOrderCourses(formatCourse);
      } catch (err) {
      } finally {
      }
    }

    load();
  }, [order_id, orderCourses]);

  useEffect(() => {
    async function loadTransaction() {
      try {
        const { data } = await api.get(`/transactions/orders/${order_id}`);

        setTransaction({
          ...data,
          authorized_amount: formatPrice(Number(data.authorized_amount)),
          created_at: new Date(
            format(new Date(data.created_at), 'dd/MM/yyyy', {
              locale: ptBR,
            }),
          ),
        });
      } catch (err) {
      } finally {
      }
    }

    loadTransaction();
  }, [order_id, orderCourses]);

  const handlerCanceledTransaction = useCallback(
    async (id: string) => {
      try {
        addLoading({
          loading: true,
          description: 'Aguarde ...',
        });

        await api.delete(`/transactions/${id}`);

        addToast({
          type: 'success',
          title: 'Informações cadastrada!',
          description: 'Dados inseridos com sucesso!',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Falha no cadastro!',
          description:
            'Ocorreu uma falha ao tentar fazer o cadastro, tente novamente!',
        });
      } finally {
        removeLoading();
      }
    },
    [addToast, addLoading, removeLoading],
  );

  return (
    <Layout>
      <CourseTable>
        <thead>
          <tr>
            <th />
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {!order
            ? `${(
                <tr>
                  <td colSpan={3}>Carregando...</td>
                </tr>
              )}`
            : orderCourses.map((item: IOrderCourses) => {
                return (
                  <tr key={item.id}>
                    <td>
                      <img src={item.course.image} alt={item.course.name} />
                    </td>
                    <td>
                      <strong>{item.course.name}</strong>
                      <span>{item.price}</span>
                    </td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>{item.subtotal}</td>
                  </tr>
                );
              })}
        </tbody>
      </CourseTable>

      <TransactionsTable>
        <thead>
          <tr>
            <th />
            <th>Bandeira do cartão</th>
            <th>Status</th>
            <th>N transação</th>
            <th>N de parcelas</th>
            <th>Valor autorizado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td />
            <td>
              <div>{transaction.brand}</div>
            </td>
            <td>{transaction.status}</td>
            <td>{transaction.authorization_code}</td>
            <td>{transaction.installments}</td>
            <td>{transaction.authorized_amount}</td>
          </tr>
        </tbody>
      </TransactionsTable>

      <Footer>
        <button
          type="button"
          onClick={() => handlerCanceledTransaction(transaction.id)}
        >
          Cancelar pedido
        </button>

        <Total>
          <div>
            <div>
              <span>Frete</span>
              <strong>{order.fee}</strong>
            </div>
            <div>
              <span>SubTotal</span>
              <strong>{order.subtotal}</strong>
            </div>
          </div>

          <section>
            <span>TOTAL</span>
            <strong>{order.total}</strong>
          </section>
        </Total>
      </Footer>
    </Layout>
  );
};

export default OrderCourses;
