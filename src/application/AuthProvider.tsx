import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { AuthService } from '@app/domain/services/AuthService';
import { AuthContext } from '@app/application/AuthContext';
import { UserContext } from './UserContext';

interface AuthProviderProps {
  authService: AuthService;
  children: ReactNode;
}

/**
 * Authentication Context Provider. Provides the authentication state and
 * methods to the context of its children components.
 */
const AuthProvider = ({ authService, children }: AuthProviderProps) => {
  const context = useContext(UserContext);

  return (
    <AuthContext.Provider value={{ authService }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
