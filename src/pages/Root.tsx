import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from '@/components/navbar/NavBar';
import CartDrawer from '@/features/cart/componets/cart-drawer/CartDrawer';
import { AuthProvider } from '@/pages/auth/context/AuthContext';

const Root = () => {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <div id="pages" className="flex flex-col flex-1">
          <Outlet />
        </div>
      </AuthProvider>
      <CartDrawer />
      <div data-test="toast-container">
        <ToastContainer data-test="toast-container" />
      </div>
    </>
  );
};

export default Root;
