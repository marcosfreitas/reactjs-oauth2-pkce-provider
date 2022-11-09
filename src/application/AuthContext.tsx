import { createContext, useContext } from 'react';
import { AuthContextInterface } from '../domain/contracts/AuthContextInterface';

export const AuthContext = createContext<AuthContextInterface>({});

export const useAuth = (): AuthContextInterface => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
