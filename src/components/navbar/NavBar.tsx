import { useEffect, useState } from 'react';

import Action from '@/components/navbar/Action';
import Logo from '@/components/navbar/Logo';
import PageLayout from '@/components/ui/layout/PageLayout';
import CartIcon from '@/features/cart/componets/cart-icon/CartIcon';
import { useUser } from '@/features/user/hooks/useUser';
import { USER_ROLES } from '@/features/user/interfaces/types/UserRole';
import useAuth from '@/hooks/auth/useAuth';
import getDefaultRouteForRole from '@/layouts/utils/get-default-route-for-role';

export default function NavBar() {
  const [isSticky, setIsSticky] = useState(false);
  const { connected } = useAuth();
  const { userInfo } = useUser({ enabled: connected });

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-10 shadow-md transition-all duration-500 ${isSticky ? 'bg-white/80 backdrop-blur-md' : 'bg-white'}`}
      data-test="navbar"
    >
      <PageLayout>
        <div className="flex justify-between items-center">
          <Logo
            width={isSticky ? 130 : 176}
            height={50}
            to={getDefaultRouteForRole(userInfo?.roles)}
          />
          <div className="flex items-center gap-6">
            {userInfo?.roles?.includes(USER_ROLES.REGULAR) && (
              <CartIcon isSticky={isSticky} />
            )}
            <Action connected={connected} isSticky={isSticky} />
          </div>
        </div>
      </PageLayout>
    </div>
  );
}
