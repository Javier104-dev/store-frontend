import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from '@/components/navbar/NavBar';
import CartDrawer from '@/features/cart/componets/cart-drawer/CartDrawer';
import useLoadCart from '@/features/cart/hooks/useLoadCart';
import { useUser } from '@/features/user/hooks/useUser';
import { USER_ROLES } from '@/features/user/interfaces/types/UserRole';
import useAuth from '@/hooks/auth/useAuth';
import AuthBootstrap from '@/layouts/AuthBootstrap';
import { AuthProvider } from '@/pages/auth/context/AuthContext';

const RootContent = () => {
  const { connected } = useAuth();
  const { userInfo } = useUser({ enabled: connected });

  const isAdmin = userInfo?.roles?.includes(USER_ROLES.ADMIN) ?? false;
  const shouldLoadCart = connected && !!userInfo && !isAdmin;

  useLoadCart(shouldLoadCart);

  return (
    <>
      <NavBar />
      <div id="pages" className="flex flex-col flex-1">
        <Outlet />
      </div>
      <CartDrawer />
    </>
  );
};

const Root = () => {
  return (
    <AuthProvider>
      <AuthBootstrap>
        <RootContent />
      </AuthBootstrap>
    </AuthProvider>
  );
};

export default Root;
