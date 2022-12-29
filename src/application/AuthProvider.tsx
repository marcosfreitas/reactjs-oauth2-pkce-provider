import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { AuthService } from '@app/domain/services/AuthService';
import { store } from '@shared/store';
import { Provider } from 'react-redux';

interface AuthProviderProps {
  authService: AuthService;
  children: ReactNode;
}

/**
 * Authentication Context Provider. Provides the authentication state and
 * methods to the context of its children components.
 */
const AuthProvider = ({ authService, children }: AuthProviderProps) => {
  console.log(authService);

  return <Provider store={store}>{children}</Provider>;
};

export { AuthProvider };
