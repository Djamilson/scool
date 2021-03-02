import React from 'react';

import { AuthProvider } from './auth';
import { CartCourse } from './cartCourse';
import { LoadingProvider } from './loading';
import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <LoadingProvider>
        <ToastProvider>
          <CartCourse>{children}</CartCourse>
        </ToastProvider>
      </LoadingProvider>
    </AuthProvider>
  );
};
export default AppProvider;
