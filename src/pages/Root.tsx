import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from '@/components/navbar/NavBar';
import CartDrawer from '@/features/cart/componets/cart-drawer/CartDrawer';
import useLoadCart from '@/features/cart/hooks/useLoadCart';
import useAuth from '@/hooks/auth/useAuth';
import { AuthProvider } from '@/pages/auth/context/AuthContext';

const Root = () => {
  const { connected } = useAuth();
  useLoadCart(connected);

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
