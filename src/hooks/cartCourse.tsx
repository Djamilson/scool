import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../_services/api';
import { Course } from '../pages/Dashboard/CourseItem';
import { useToast } from './toast';

interface CartContextData {
  cart: CourseStock[];
  addToCart(id: string): Promise<void>;
  clearCart(): void;
  removeCourse(index: string): Promise<void>;
  updateAmount(index: string, stock: number): Promise<void>;
}

export interface CourseStock {
  itemCourse: {
    stock: number;
    course: Course;
  };
}

const CartContext = createContext<CartContextData>({} as CartContextData);

const CartCourse: React.FC = ({ children }) => {
  const { addToast } = useToast();
  const [cart, setCart] = useState<CourseStock[]>(() => {
    const courseList = localStorage.getItem('@list:course');

    if (courseList) {
      return JSON.parse(courseList);
    }

    return [] as CourseStock[];
  });

  const clearCart = useCallback(() => {
    localStorage.removeItem('@list:course');
    setCart([] as CourseStock[]);
  }, []);

  const updateSuccess = useCallback(
    async (id, stock) => {
      const newCart = cart;

      const courseIndex = newCart.findIndex(
        (p) => p.itemCourse.course.id === id,
      );

      if (courseIndex >= 0) {
        newCart[courseIndex].itemCourse.stock = Number(stock);

        setCart([...newCart]);
        localStorage.setItem('@list:course', JSON.stringify(newCart));
      }
    },
    [cart],
  );

  const updateAmount = useCallback(
    async (id, stock) => {
      if (stock <= 0) return;

      const searchStock = await api.get(`/courses/${id}`);
      const stockAmount = searchStock.data.stock;

      if (stock > stockAmount) {
        addToast({
          type: 'error',
          title: 'Falha!',
          description: 'Não temos mais produto para adicionar!',
        });
        return;
      }

      updateSuccess(id, stock);
    },
    [addToast, updateSuccess],
  );

  const addToCart = useCallback(
    async (id) => {
      const newCart = cart;

      const courseExists = newCart.find(
        (p: CourseStock) => p.itemCourse.course.id === id,
      );

      const stock = await api.get(`/courses/${id}`);

      const stockAmount = stock.data.stock;
      const currentAmount = courseExists ? courseExists.itemCourse.stock : 0;

      const amount = currentAmount + 1;
      if (amount > stockAmount) {
        addToast({
          type: 'error',
          title: 'Falha!',
          description: 'Não temos mais produto para adicionar!',
        });

        return;
      }

      if (courseExists) {
        updateSuccess(id, amount);
      } else {
        const res = await api.get(`/courses/${id}`);

        const { data } = res;

        const item = { stock: 1, course: data };

        newCart.push({
          itemCourse: {
            ...item,
            stock: 1,
          },
        });

        localStorage.setItem('@list:course', JSON.stringify(newCart));

        setCart([...newCart]);
      }
    },
    [cart, addToast, updateSuccess, setCart],
  );

  const removeCourse = useCallback(
    async (id) => {
      const removeCart = cart;

      const courseIndex = removeCart.findIndex(
        (p) => p.itemCourse.course.id === id,
      );

      if (courseIndex >= 0) {
        removeCart.splice(courseIndex, 1);
        setCart([...removeCart]);
        localStorage.setItem('@list:course', JSON.stringify(removeCart));
      }
    },
    [cart],
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateAmount,
        removeCourse,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

function useCartCourse(): CartContextData {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCourse mus be used within an CartCourse');
  }

  return context;
}

export { CartCourse, useCartCourse };
