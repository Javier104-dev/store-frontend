import { useCookies } from 'react-cookie';

import Action from '@/components/navbar/Action';
import Logo from '@/components/navbar/Logo';
import PageLayout from '@/components/ui/layout/PageLayout';
import { StoredCookies } from '@/interfaces/auth/cookies.constants';

export default function NavBar() {
  const [cookies] = useCookies([
    StoredCookies.USERNAME,
    StoredCookies.REFRESH_TOKEN,
  ]);
  const connected =
    !!cookies[StoredCookies.REFRESH_TOKEN] && !!cookies[StoredCookies.USERNAME];
  return (
    <div className="flex shadow-md" data-test="navbar">
      <PageLayout>
        <div className="flex justify-between">
          <Logo width={176} height={50} />
          <Action connected={connected} />
        </div>
      </PageLayout>
    </div>
  );
}
