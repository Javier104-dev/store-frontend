import { createContext } from 'react';

import type { IAuthenticationContext } from '@/pages/auth/interfaces/IAuthenticationContext';

export const AuthContext = createContext<IAuthenticationContext | null>(null);
