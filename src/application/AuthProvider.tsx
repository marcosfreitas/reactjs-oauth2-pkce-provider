import React, { ReactElement } from 'react';
import { AuthService } from '@app/domain/services/AuthService';
import { AuthContext } from '@app/application/AuthContext';

interface AuthProviderProps {
  authService: AuthService;
  children: ReactElement;
}

/**
 * Authentication Context Provider. Provides the authentication state and
 * methods to the context of its children components.
 */
const AuthProvider: React.FC<AuthProviderProps> = ({
  authService,
  children,
}) => {
  return (
    <AuthContext.Provider value={{ authService }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
