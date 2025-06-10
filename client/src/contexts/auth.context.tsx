import { createContext, useContext } from 'react';
import type { AuthContextType } from '../types/contexts.type';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  return useContext(AuthContext);
};
