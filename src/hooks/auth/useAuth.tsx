import { useCookies } from 'react-cookie';

import { StoredCookies } from '@/interfaces/auth/cookies.constants';

const useAuth = () => {
  const [cookies] = useCookies([
    StoredCookies.USERNAME,
    StoredCookies.REFRESH_TOKEN,
  ]);

  const connected =
    !!cookies[StoredCookies.REFRESH_TOKEN] && !!cookies[StoredCookies.USERNAME];

  return { connected };
};

export default useAuth;
