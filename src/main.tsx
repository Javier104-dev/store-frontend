import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './index.css';

import queryClient from '@configs/query-client';
import router from '@configs/react-router';

const root = document.getElementById('root');

if (!root) throw new Error('Root element not found');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <div data-test="toast-container">
          <ToastContainer />
        </div>
      </QueryClientProvider>
    </CookiesProvider>
  </React.StrictMode>,
);
