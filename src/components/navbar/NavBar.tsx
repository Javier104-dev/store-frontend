import { useEffect, useState } from 'react';

import Action from '@/components/navbar/Action';
import Logo from '@/components/navbar/Logo';
import PageLayout from '@/components/ui/layout/PageLayout';
import CartIcon from '@/features/cart/componets/cart-icon/CartIcon';
import useAuth from '@/hooks/auth/useAuth';

export default function NavBar() {
  const { connected } = useAuth();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 shadow-md transition-all duration-500 ${isSticky ? 'bg-white/80 backdrop-blur-md' : ' bg-white'}`}
      data-test="navbar"
    >
      <PageLayout>
        <div className="flex justify-between items-center">
          <Logo width={isSticky ? 130 : 176} height={50} />
          <div className="flex items-center gap-6">
            <CartIcon isSticky={isSticky} />
            <Action connected={connected} isSticky={isSticky} />
          </div>
        </div>
      </PageLayout>
    </div>
  );
}
