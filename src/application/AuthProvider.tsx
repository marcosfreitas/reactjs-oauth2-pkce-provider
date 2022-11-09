import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '@app/domain/services/AuthService';
import { AuthContext } from '@app/application/AuthContext';

// @todo receive authservice as prop
export const AuthProvider = ({
  children,
  authService,
}: {
  children: ReactElement;
  authService: AuthService;
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  // @todo to decide if these methods should be part of the AuthService?

  const login = (user: object) => {
    console.log('login', user);
    setUser(JSON.stringify(user));
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

  // for every refresh of the page, check if there is a user in localStorage
  useEffect(() => {
    const user = localStorage.getItem('user');
    console.log(`user`, user);

    if (user) {
      setUser(JSON.parse(user));
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authService,
        isAuthenticated,
        user,
        isLoading: loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
