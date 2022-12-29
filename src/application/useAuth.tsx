import { useContext, useState } from 'react';

import { AuthContext } from '@app/application/AuthContext';
import { UserContext } from '@app/application/UserContext';
import { AuthContextInterface } from '@app/domain/contracts/AuthContextInterface';
import { NavigateFunction } from 'react-router-dom';

/**
 * @bug triggers a Invalid hook call if use hooks inside of it
 */
export function useAuth(): AuthContextInterface {
  const context = useContext<AuthContextInterface>(AuthContext);

  if (!context) {
    console.info('useAuth must be used within a AuthProvider');
    return {};
  }

  return context;
}

/**
 * @bug triggers a Invalid hook call if use hooks inside of it
 */
export function useLogin(
  navigate: NavigateFunction,
  __useContext: typeof useContext,
) {
  const { user, setUser } = __useContext(UserContext);

  if (!setUser || !user) {
    console.info('useAuth must be used within a AuthProvider');
    return {};
  }

  const login = (user: object) => {
    console.log('login', user);
    setUser(user);
    // @todo add to storage
    navigate('/');
  };

  const logout = () => {
    console.log('logout');
    setUser({});
    localStorage.removeItem('user');
  };

  const isAuthenticated = (): boolean => {
    return !!Object.values(user).length;
  };

  return { login, logout, isAuthenticated };
}
